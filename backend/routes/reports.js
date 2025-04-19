// backend/routes/reports.js
const express = require('express');
const router  = express.Router();
const reportController = require('../controllers/reportController copy.js');


router.get('/getReceipt/:id', reportController.getReceipt);
router.post('/createReceipt', reportController.createReport)

module.exports = router;