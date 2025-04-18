// backend/controllers/expenseReportController.js
const db = require('../config/database'); // whatever exports your promise/pool

exports.getReportById = async (req, res) => {
  const reportId = req.params.reportId;
  try {
    // 1) header
    const [[report]] = await db.query(
      `SELECT 
         er.report_id    AS id,
         u.username      AS employeeName,
         er.date_generated AS dateSubmitted,
         er.receipt_id
       FROM expense_report er
       JOIN user u ON er.user_id = u.user_id
       WHERE er.report_id = ?`,
      [reportId]
    );
    if (!report) return res.status(404).json({ error: 'Not found' });

    // 2) items
    const [items] = await db.query(
      `SELECT 
         item_id          AS id,
         item_description AS description,
         item_price       AS amount
       FROM item
       WHERE receipt_id = ?`,
      [report.receipt_id]
    );

    report.receipts = items;
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

exports.postReportAction = async (req, res) => {
  const reportId = req.params.reportId;
  const { action, comment } = req.body;

  const map = { approve: 'Approved', deny: 'Denied', request_info: 'Pending' };
  const newStatus = map[action];
  if (!newStatus) return res.status(400).json({ error: 'Invalid action' });

  try {
    const [result] = await db.query(
      `UPDATE expense_report
         SET status         = ?,
             manager_comment = ?
       WHERE report_id = ?`,
      [ newStatus, action === 'request_info' ? comment : null, reportId ]
    );
    if (result.affectedRows === 0) 
      return res.status(404).json({ error: 'Not found' });

    res.json({ id: Number(reportId), status: newStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};
