// backend/routes/reports.js
const express = require('express');
const router  = express.Router();
const reportController = require('../controllers/reportController.js');

// GET /api/categories → return [ { category_id, category_name }, … ]
router.get('/categories', listCategories);

module.exports = router;