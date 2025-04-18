const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user/:username', userController.user);
router.get("/api/employee/:id/expense-reports", userController.getEmployeeExpenseReports);

module.exports = router;