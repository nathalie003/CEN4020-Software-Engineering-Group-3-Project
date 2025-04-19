// backend/routes/supervisor.js
const router        = require('express').Router();
// const { Supervisor } = require("../models/userClass");
const supervisorController    = require('../controllers/supervisorController');

router.post('/analytics', supervisorController.analytics);


module.exports = router;
