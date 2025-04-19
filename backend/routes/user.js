const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/user/:id
router.get("/:id", userController.getById);
router.get("/api/employee/:id/expense-reports", userController.getEmployeeExpenseReports);

module.exports = router;