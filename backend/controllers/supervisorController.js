// backend/controllers/supervisorController.js
const dbPromise       = require('../config/database');
const { Supervisor } = require('../models/userClass');

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
