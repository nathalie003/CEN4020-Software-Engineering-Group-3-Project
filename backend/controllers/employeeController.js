// backend/controllers/employeeController.js
const dbPromise = require('../config/database');
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
          return res.status(404).json({ error: "Employee not found" });
        }

        res.json(result[0]); // send { employee_id: ..., user_id: ... }
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
    const emp = new Employee(employeeId);
    emp.generateAnalytics(db, (err, analytics) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(analytics);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const db = await dbPromise;
    const sql = `
      SELECT e.employee_id, u.username
      FROM employee e
      JOIN user u ON e.user_id = u.user_id
      LEFT JOIN manages m ON e.employee_id = m.employee_id
      WHERE m.supervisor_id IS NULL;
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};