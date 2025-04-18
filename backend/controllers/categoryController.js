// backend/controllers/categoryController.js
const dbPromise = require('../config/database');

exports.listCategories = async (req, res) => {
  try {
    const db = await dbPromise;
    const sql = 'SELECT category_id, category_name FROM category ORDER BY category_name';
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Could not fetch categories:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(rows);
    });
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const db = await dbPromise;
    db.query('SELECT * FROM category WHERE category_id = ?', [id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!rows.length) return res.status(404).end();
      res.json(rows[0]);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const db = await dbPromise;
    db.query(
      'INSERT INTO category (category_name) VALUES (?)',
      [category_name],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ category_id: result.insertId, category_name });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const { category_name } = req.body;
  try {
    const db = await dbPromise;
    db.query(
      'UPDATE category SET category_name = ? WHERE category_id = ?',
      [category_name, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const db = await dbPromise;
    db.query(
      'DELETE FROM category WHERE category_id = ?',
      [id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};