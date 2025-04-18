// backend/routes/supervisor.js
const router        = require('express').Router();
// const { Supervisor } = require("../models/userClass");
const supervisorController    = require('../controllers/supervisorController');

router.post('/analytics', supervisorController.analytics);

// GET  /api/supervisor/user/:userId
router.get('/user/:userId', supervisorController.getSupervisorIdByUser);

// GET  /api/supervisor/:supervisorId/pending-expense-reports
router.get('/:supervisorId/pending-expense-reports', supervisorController.getPendingReports);


module.exports = router;
