// backend/routes/expenseReports.js
const router = require('express').Router();
const expenseReportCtrl = require('../controllers/expenseReportController');

// GET  /api/expense-reports/:reportId
router.get('/:reportId', expenseReportCtrl.getReportById);

// PATCH /api/expense-reports/:reportId/action
router.patch('/:reportId/action', expenseReportCtrl.postReportAction);

module.exports = router;
