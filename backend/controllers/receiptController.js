// backend/controllers/receiptController.js
require("dotenv").config();
const dbPromise = require("../config/database");
const fs       = require("fs");
const { OpenAI } = require("openai");
const openai   = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Phase 1: parse image via OpenAI Vision ─────────────────────────────────
exports.uploadReceipt = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  const mime = req.file.mimetype;
  if (!["image/jpeg", "image/png"].includes(mime)) {
    return res.status(400).json({ message: "Only JPEG or PNG accepted." });
  }

  const imageBuffer = fs.readFileSync(req.file.path);
  const dataUrl     = `data:${mime};base64,${imageBuffer.toString("base64")}`;

  const systemPrompt = `
You are a receipt‑parsing assistant.
Extract ONLY the following and reply **valid JSON**:
{
  "storeName":      string,
  "storeAddress":   string,
  "storePhone":     string,
  "dateOfPurchase": string,
  "paymentMethod":  string,
  "total":          string,
  "items":          [ { "description": string, "price": number } ],
  "category":       string
}`;

  let completion;
  try {
    completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: [{ type: "image_url", image_url: { url: dataUrl } }] },
      ],
    });
  } catch (err) {
    console.error("OpenAI Vision error:", err);
    fs.unlink(req.file.path, () => {});
    return res.status(500).json({ message: "OpenAI request failed." });
  }

  let msg = completion.choices[0].message.content || "";
  if (msg.startsWith("```")) {
    msg = msg.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }

  let receiptData;
  try {
    receiptData = JSON.parse(msg);
  } catch (err) {
    console.error("AI did not return valid JSON:", msg);
    fs.unlink(req.file.path, () => {});
    return res.status(500).json({ message: "Failed to parse AI response.", raw: msg });
  }

  fs.unlink(req.file.path, () => {});
  return res.status(200).json({ receiptData });
};

// ── Phase 2: confirm & save to DB ───────────────────────────────────────────
exports.confirmReceipt = (req, res) => {
  const r = req.body;
  if (!r) return res.status(400).json({ message: "No receipt data." });

  // 1) Normalize total (strip "$" etc)
  let total = r.total;
  if (typeof total === "string") {
    total = parseFloat(total.replace(/[^0-9.-]+/g, "")) || 0;
  }

  // 2) Normalize date "MM/DD/YYYY" → "YYYY-MM-DD"
  let receiptDate = r.dateOfPurchase;
  if (typeof receiptDate === "string") {
    const [m, d, y] = receiptDate.split(/[/\-]/);
    if (m && d && y) {
      receiptDate = `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
  }

  // 3) Normalize items into [{description, price}]
  let items = [];
  if (Array.isArray(r.items)) {
    items = r.items;
  } else if (typeof r.items === "string") {
    items = r.items
      .split(",")
      .map(s => s.trim())
      .map(s => {
        const m = s.match(/^(.+?)\s*\(\s*\$?([0-9]+(?:\.[0-9]+)?)\s*\)$/);
        return m
          ? { description: m[1].trim(), price: parseFloat(m[2]) }
          : { description: s, price: null };
      });
  }

  // 4) Insert receipt, now including subcategory_name
  const receiptSql = `
    INSERT INTO receipts
      (user_id, receipt_total, receipt_date, payment_method,
       store_address, store_phone, category_id, subcategory_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const receiptParams = [
    r.userId,                   // must come from your front‑end payload
    total,                      // pure number, e.g. 50.59
    receiptDate,                // ISO date, e.g. "2025-01-20"
    r.paymentMethod || "",
    r.storeAddress  || "",
    r.storePhone    || "",
    r.category_id   || null,
    r.subcategory_name || null  // <-- your new subcategory field
  ];

  dbPromise
    .then(db => {
      db.query(receiptSql, receiptParams, (err, result) => {
        if (err) {
          console.error("Receipt insert error:", err);
          return res.status(500).json({ message: "DB insert failed." });
        }
        const receiptId = result.insertId;

        // 5) Bulk insert items if any
        if (items.length) {
          const itemSql = `
            INSERT INTO item (receipt_id, item_description, item_price)
            VALUES ?
          `;
          const values = items.map(it => [receiptId, it.description, it.price]);
          db.query(itemSql, [values], err2 => {
            if (err2) {
              console.error("Item bulk insert error:", err2);
              return res.status(500).json({ message: "DB insert failed." });
            }
            return res.status(200).json({ message: "Receipt saved.", receiptId });
          });
        } else {
          return res.status(200).json({ message: "Receipt saved.", receiptId });
        }
      });
    })
    .catch(err => {
      console.error("DB connection error:", err);
      res.status(500).json({ message: "DB connection failed." });
    });
};