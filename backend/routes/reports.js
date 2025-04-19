// backend/routes/reports.js
const express = require('express');
const router  = express.Router();
const reportController = require('../controllers/reportController.js');


router.get('/getReceipt/:id', reportController.getReceipt);
router.post('/createReport/:uid/:rid', reportController.createReport);
router.get('/getAllUserReports/:id', reportController.getAllUserReports);
router.post('/updateReceipt',reportController.updateReceipt);
router.get('/getItems/:rid', reportController.getItems);

module.exports = router;