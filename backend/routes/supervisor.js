// backend/routes/supervisor.js
const express       = require("express");
const router        = express.Router();
const dbPromise     = require("../config/database");
const { Supervisor } = require("../models/userClass");

router.post("/analytics", async (req, res) => {
  const { supervisorId } = req.body;
  const db = await dbPromise;
  const sup = new Supervisor(supervisorId);
  sup.generateAnalytics(db, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
