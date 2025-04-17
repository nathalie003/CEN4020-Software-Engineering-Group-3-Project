// backend/controllers/receiptController.js
require("dotenv").config();

const fs       = require("fs");
const { OpenAI } = require("openai");
const openai   = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.uploadReceipt = async (req, res) => {
  // ───────── 0. sanity checks ─────────
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  const mime = req.file.mimetype;                   // image/jpeg  |  image/png
  if (!["image/jpeg", "image/png"].includes(mime)) {
    return res.status(400).json({ message: "Only JPEG or PNG accepted." });
  }

  // ───────── 1. read the image → data‑URL ─────────
  const imageBuffer = fs.readFileSync(req.file.path);
  const dataUrl     = `data:${mime};base64,${imageBuffer.toString("base64")}`;

  // ───────── 2. ask OpenAI Vision to parse it ─────────
  const systemPrompt = `
You are a receipt‑parsing assistant.  
From the image extract ONLY the information below and reply with **valid JSON**:
{
  "storeName":      string,
  "storeAddress":   string,
  "storePhone":    string,
  "dateOfPurchase": string,
  "paymentMethod":  string,
  "total":          string,
  "items": [ { "description": string, "price": number } ],
  "category":       string
}`;

  let completion;
  try {
    completion = await openai.chat.completions.create({
      model:       "gpt-4.1-mini",       // any Vision‑capable model
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: dataUrl } }
          ],
        },
      ],
    });
  } catch (err) {
    console.error("OpenAI Vision error:", err);
    fs.unlink(req.file.path, () => {});
    return res.status(500).json({ message: "OpenAI request failed." });
  }

  // ───────── 3. parse the model’s JSON ─────────
let assistantMsg = completion.choices?.[0]?.message?.content ?? "";

// ▸ delete leading  ```json / ``` and trailing ```
if (assistantMsg.startsWith("```")) {
    assistantMsg = assistantMsg
      .replace(/^```(?:json)?\s*/i, "")   // opening fence
      .replace(/\s*```$/, "");            // closing fence
}
let receiptData;
try {
    receiptData = JSON.parse(assistantMsg);
} catch (err) {
    console.error("AI did not return valid JSON:", assistantMsg);
    fs.unlink(req.file.path, () => {});
    return res
      .status(500)
      .json({ message: "Failed to parse AI response.", raw: assistantMsg });
  }

  fs.unlink(req.file.path, () => {});     // tidy up temporary upload
  return res.status(200).json({ receiptData });
};
