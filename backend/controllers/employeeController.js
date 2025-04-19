// backend/controllers/employeeController.js
const dbPromise       = require('../config/database');
const { Employee } = require('../models/userClass');

exports.getEmployeeByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const db = await dbPromise;
    db.query(
      "SELECT employee_id, user_id FROM employee WHERE user_id = ?",
      [userId],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
          return res.status(404).json({ error: "employee not found" });
        }

        res.json(result[0]); // send back { employee_id: ..., user_id: ... }
      }
    );
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.analytics = async (req, res) => {
  const { employeeId } = req.body;
  try {
    const db = await dbPromise;
    // load basic employee instance (you might need another finder)
    const sup = new employee(employeeId);
    sup.generateAnalytics(db, (err, analytics) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(analytics);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
