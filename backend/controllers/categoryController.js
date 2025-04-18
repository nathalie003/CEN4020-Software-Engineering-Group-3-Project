// backend/controllers/categoryController.js
exports.listCategories = async (req, res) => {
    try {
      const db = await dbPromise;
      const [rows] = await db.query(
        'SELECT category_id, category_name FROM category ORDER BY category_name'
      );
      res.json(rows);
    } catch (err) {
      console.error('Could not fetch categories:', err);
      res.status(500).json({ message: 'Server error' });
    }
};
  