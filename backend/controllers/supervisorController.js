// backend/controllers/supervisorController.js
const dbPromise       = require('../config/database');
const { Supervisor } = require('../models/userClass');

exports.getSupervisorByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const db = await dbPromise;
    db.query(
      "SELECT supervisor_id, user_id FROM supervisor WHERE user_id = ?",
      [userId],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
          return res.status(404).json({ error: "Supervisor not found" });
        }

        res.json(result[0]); // send back { supervisor_id: ..., user_id: ... }
      }
    );
  } catch (err) {
    console.error("Error fetching supervisor:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.analytics = async (req, res) => {
  const { supervisorId } = req.body;
  try {
    const db = await dbPromise;
    // load basic Supervisor instance (you might need another finder)
    const sup = new Supervisor(supervisorId);
    sup.generateAnalytics(db, (err, analytics) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(analytics);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
