// backend/controllers/receiptController.js
require("dotenv").config();
const dbPromise = require("../config/database");
const fs       = require("fs");
const { OpenAI } = require("openai");
const openai   = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//PARSE AND UPLOAD RECEIPT TO MANUALENTRYFORM HANDLER
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
      model:       "gpt-4.1-nano",       // any Vision‑capable model
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
  // --- token accounting -----------------------------------------------
  const u = completion.usage; // { prompt_tokens, completion_tokens, total_tokens }
  console.log(
    `OpenAI tokens — prompt: ${u.prompt_tokens}, completion: ${u.completion_tokens}, total: ${u.total_tokens}`
  );
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

// controllers/receiptController.js
exports.confirmReceipt = (req, res) => {
  const r = req.body;
  if (!r) return res.status(400).json({ message: "No receipt data." });

  // 1) normalize items upfront
  let items = Array.isArray(r.items)
    ? r.items
    : typeof r.items === 'string'
      ? r.items
          .split(",")
          .map(s => s.trim())
          .map(s => {
            const m = s.match(/^(.+?)\s*\(\s*\$?([\d.]+)\)$/);
            return m
              ? { description: m[1], price: parseFloat(m[2]) }
              : { description: s, price: null };
          })
      : [];
  const receiptSql = `
    INSERT INTO receipts
      (receipt_total, receipt_date, payment_method, store_address, store_phone, category)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const receiptParams = [
    r.total,
    r.dateOfPurchase,
    r.paymentMethod || "",
    r.storeAddress  || "",
    r.storePhone    || "",
    r.category      || ""
  ];

  dbPromise
    .then(db => {
      // 2) insert receipt
      db.query(receiptSql, receiptParams, (err, receiptResult) => {
        if (err) {
          console.error("Receipt insert error:", err);
          return res.status(500).json({ message: "DB insert failed." });
        }
        const receiptId = receiptResult.insertId;

        // 3) if we have items, do a bulk insert
        if (items.length) {
          const itemSql = `
            INSERT INTO item (receipt_id, description, price)
            VALUES ?
          `;
          // build the 2D array for bulk insert
          const values = items.map(it => [receiptId, it.description, it.price]);
          db.query(itemSql, [values], err2 => {
            if (err2) {
              console.error("Item bulk insert error:", err2);
              return res.status(500).json({ message: "DB insert failed." });
            }
            // done!
            return res.status(200).json({ message: "Receipt saved.", receiptId });
          });
        } else {
          // no items → respond immediately
          return res.status(200).json({ message: "Receipt saved.", receiptId });
        }
      });
    })
    .catch(err => {
      console.error("DB connection error:", err);
      res.status(500).json({ message: "DB connection failed." });
    });
};