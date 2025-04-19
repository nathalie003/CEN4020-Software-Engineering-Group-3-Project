// backend/routes/supervisor.js
const router        = require('express').Router();
// const { Supervisor } = require("../models/userClass");
const supervisorController    = require('../controllers/supervisorController');

router.post('/analytics', supervisorController.analytics);

router.get('/:userId', supervisorController.getSupervisorByUserId);

module.exports = router;
