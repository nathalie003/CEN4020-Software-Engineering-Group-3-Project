// backend/routes/categories.js
const express = require('express');
const router  = express.Router();
const { listCategories } = require('../controllers/categoryController');
const ctrl    = require('../controllers/categoryController');

// GET /api/categories → return [ { category_id, category_name }, … ]
router.get('/category', listCategories);

// GET   /api/category         → list all
router.get('/', ctrl.listCategories);

// GET   /api/category/:id     → fetch one
router.get('/:id', ctrl.getCategoryById);

// POST  /api/category         → create new
router.post('/', ctrl.createCategory);

// PUT   /api/category/:id     → rename / update
router.put('/:id', ctrl.updateCategory);

// DELETE /api/category/:id    → remove
router.delete('/:id', ctrl.deleteCategory);

module.exports = router;
