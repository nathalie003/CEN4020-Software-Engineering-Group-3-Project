// backend/routes/supervisor.js
const router        = require('express').Router();
// const { Employee } = require("../models/userClass");
const employeeController    = require('../controllers/supervisorController');

router.post('/analytics', employeeController.analytics);

router.get('/:userId', employeeController.getEmployeeByUserId);

module.exports = router;
