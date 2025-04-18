// backend/routes/categories.js
const express = require('express');
const router  = express.Router();
const { listCategories } = require('../controllers/categoryController');

// GET /api/categories → return [ { category_id, category_name }, … ]
router.get('/categories', listCategories);

module.exports = router;
