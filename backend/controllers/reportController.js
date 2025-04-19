// backend/controllers/reportController.js
const dbPromise = require('../config/database');

exports.createReport = async (req, res) => {
  console.log(req.body)
    const  userID  = req.params.uid;
    const receiptID = req.params.rid;

    if (!receiptID) return res.status(400).json({ message: "No receipt id." });
    if (!userID) return res.status(400).json({ message: "No user id." });

    try {
        const sql = "INSERT INTO expense_report (user_id, date_generated, receipt_id) VALUES (?, CURRENT_DATE, ?) "
        const db = await dbPromise;
        db.query(sql, [userID, receiptID], (err) => {
            if (err) {
              console.error("Error creating expense report:", err);
              return res.status(500).json({ error: "Failed to expense report" });
            }
            res.status(201).json({
              message: "report created successfully",
            });
          });
    } catch (e) {
        console.error("Error during report creation:", e);
        res.status(500).json({ error: "Failed to create report" });
    }
};

exports.getAllUserReports = async (req, res) => { // use on list view
    const userID = req.params.id;
    if (!userID) return res.status(400).json({ message: "No user id." });

    try {
        const sql = "SELECT * FROM expense_report WHERE user_id = (?)"
        const db = await dbPromise;
        db.query(sql, userID, (err, result) => {
            if (err) {
              console.error("Error retrieving expense reports:", err);
              return res.status(500).json({ error: "Failed to get Expense Reports" });
            }
            res.status(200).json({
                message: "Reports retrieved successfully",
                reports: result, // send the rows back
            });
          });
    } catch (e) {
        console.error("Error during report retrieval:", e);
        res.status(500).json({ error: "Failed to get reports" });
    }
};

exports.getReceipt = async (req, res) => { // use on selection
  const receipt_id  = req.params.id;
  console.log(receipt_id)
  if (!receipt_id) return res.status(400).json({ message: "No receipt id." });

  try {
    const sql = "SELECT * FROM receipts WHERE receipt_id = ?"
    const db = await dbPromise;
    db.query(sql, [receipt_id], (err, result) => {
        if (err) {
          console.error("Error retrieving receipt:", err);
          return res.status(500).json({ error: "Failed to get receipt" });
        }
        res.status(200).json({
            message: "receipt retrieved successfully",
            reports: result, // send the rows back
        });
      });
  } catch (e) {
      console.error("Error during receipt retrieval:", e);
      res.status(500).json({ error: "Failed to get receipt" });
  }
};

exports.updateReceipt = async (req, res) => { // use on submission
  const {receiptContent} = req.body;
  if (!receiptContent) return res.status(400).json({ message: "No receipt id." });
  const receiptID = receiptContent.receipt_id;
  if (!receiptID) return res.status(400).json({ message: "No receipt ID provided." });

  const receiptParams = [
    receiptContent.receipt_total,                      // pure number, e.g. 50.59
    receiptContent.receipt_date,                // ISO date, e.g. "2025-01-20"
    receiptContent.payment_method || "",
    receiptContent.store_address  || "",
    receiptContent.store_phone    || "",
    receiptContent.store_website || null,
    receiptContent.category_id   || null,
    receiptContent.subcategory_name || null,  // <-- your new subcategory field
    receiptContent.receipt_id                  // must come from your front‑end payload
  ];

  try {
    const sql = `UPDATE receipts 
      SET 
      receipt_total = ?, 
      receipt_date = ?, 
      payment_method = ?, 
      store_address = ?, 
      store_phone = ?, 
      store_website = ?,
      category_id = ?,
      subcategory_name = ?
      WHERE receipt_id = ?
      `
    const db = await dbPromise;
    db.query(sql, [receiptParams], (err, result) => {
        if (err) {
          console.error("Error updating receipt:", err);
          return res.status(500).json({ error: "Failed to update receipt" });
        }
        res.status(200).json({
            message: "receipt updated successfully",
            reports: result, // send the rows back
        });
      });
  } catch (e) {
      console.error("Error during receipt update:", e);
      res.status(500).json({ error: "Failed to update receipt" });
  }
  const itemSql = "INSERT INTO item (receipt_id, description, price) VALUES ?";
  let items = [];
  if (Array.isArray(receiptContent.items)) {
    items = receiptContent.items;
  } else if (typeof receiptContent.items === "string") {
    items = receiptContent.items
      .split(",")
      .map(s => s.trim())
      .map(s => {
        const m = s.match(/^(.+?)\s*\(\s*\$?([0-9]+(?:\.[0-9]+)?)\s*\)$/);
        return m
          ? { description: m[1].trim(), price: parseFloat(m[2]) }
          : { description: s, price: null };
      });
  }
  try {
    // Clear all items for this receipt first
    await db.query("DELETE FROM item WHERE receipt_id = ?", [receiptID]);
  
    if (items.length > 0) {
      const values = items.map(it => [receiptID, it.description, it.price ?? null]);
  
      db.query(itemSql, [values], (err2) => {
        if (err2) {
          console.error("Item bulk insert error:", err2);
          return res.status(500).json({ message: "DB insert failed." });
        }
        return res.status(200).json({ message: "Receipt saved." });
      });
    } else {
      return res.status(200).json({ message: "Receipt saved (no items)." });
    }
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ message: "Failed to update receipt items." });
  }
};

exports.getItems = async (req, res) => {
  const receiptID = req.params.rid;
  if (!receiptID) return res.status(400).json({ message: "No receipt id." });

  try {
      const sql = "SELECT item_description, item_price FROM item WHERE receipt_id = ?"
      const db = await dbPromise;
      db.query(sql, receiptID, (err, result) => {
          if (err) {
            console.error("Error retrieving items:", err);
            return res.status(500).json({ error: "Failed to get items" });
          }
          res.status(200).json({
              message: "Items retrieved successfully",
              reports: result, // send the rows back
          });
        });
  } catch (e) {
      console.error("Error during item retrieval:", e);
      res.status(500).json({ error: "Failed to get items" });
  }
};