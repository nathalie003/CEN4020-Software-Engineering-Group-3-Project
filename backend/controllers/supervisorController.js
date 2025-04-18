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

exports.getSupervisorIdByUser = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT supervisor_id FROM supervisor WHERE user_id = ?`,
      [req.params.userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'No supervisor found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

exports.getPendingReports = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         er.report_id    AS id,
         u.username      AS employeeName,
         er.date_generated AS dateSubmitted
       FROM manages m
       JOIN employee e  ON m.employee_id = e.employee_id
       JOIN user u      ON e.user_id      = u.user_id
       JOIN expense_report er
         ON er.user_id = e.user_id
       WHERE m.supervisor_id = ?
         AND er.status       = 'Pending'
       ORDER BY er.date_generated DESC`,
      [req.params.supervisorId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};