const dbPromise = require('../config/database');

exports.createReport = async (req, res) => {
    const { receiptID, userID } = req.body;
    if (!receiptID) return res.status(400).json({ message: "No receipt id." });
    if (!userID) return res.status(400).json({ message: "No user id." });

    try {
        const sql = "INSERT INTO expense_report (user_id, date_generated, receipt_id) VALUES (?, ?, ?) "
        const db = await dbPromise;
        db.query(sql, [userID, CURRENT_DATE, receiptID], (err, result) => {
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

exports.getAllUserReports = async (req, res) => {
    const userID = req.body;
    if (!userID) return res.status(400).json({ message: "No user id." });

    try {
        const sql = "SELECT * FROM expense_report WHERE"
        const db = await dbPromise;
        db.query(sql, [userID, CURRENT_DATE, receiptID], (err, result) => {
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
}