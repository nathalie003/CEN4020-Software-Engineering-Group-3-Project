const dbPromise = require('../config/database');

exports.createReport = async (req, res) => {
    const { receiptID, userID } = req.body;
    if (!receiptID) return res.status(400).json({ message: "No receipt id." });
    if (!userID) return res.status(400).json({ message: "No user id." });

    try {
        const sql = "INSERT INTO expense_report (user_id, date_generated, receipt_id) VALUES (?, ?, ?) "
        const db = await dbPromise;
        db.query(sql, [userID, CURRENT_DATE, receiptID], (err) => {
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
        const sql = "SELECT * FROM expense_report WHERE user_id = ?"
        const db = await dbPromise;
        db.query(sql, [userID], (err, result) => {
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