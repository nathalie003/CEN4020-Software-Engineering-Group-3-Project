// backend/routes/categories.js
const express = require('express');
const router  = express.Router();
const { listCategories } = require('../controllers/categoryController');

// GET /api/categories → return [ { category_id, category_name }, … ]
router.get('/category', listCategories);

module.exports = router;
