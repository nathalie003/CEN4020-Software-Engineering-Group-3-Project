const db = await dbPromise;
const [rows] = await db.query('SELECT category_id, category_name FROM category');
res.json(rows);