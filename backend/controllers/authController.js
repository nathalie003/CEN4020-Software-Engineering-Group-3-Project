// controllers/authController.js
const bcrypt = require('bcryptjs');
const dbPromise = require('../config/database');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!['employee','supervisor'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const sql    = "INSERT INTO user (username,password,email,role) VALUES(?,?,?,?)";
    const db     = await dbPromise;
    db.query(sql, [username, hashed, email, role], (err, result) => {
      if (err) {
        console.error("Error inserting new user:", err);
        return res.status(500).json({ error: "Failed to create user" });
      }
      res.status(201).json({
        message: "User created successfully",
        userId:  result.insertId
      });
    });
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({ error: "Failed to register user" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT user_id,password,role FROM users WHERE username = ?";
  try {
    const db = await dbPromise;
    db.query(sql, [username], async (err, rows) => {
      if (err)   return res.status(500).json({ error: "DB error" });
      if (!rows.length) 
        return res.status(401).json({ error: "No such user" });

      const { user_id, password: hash, role } = rows[0];
      if (!await bcrypt.compare(password, hash))
        return res.status(401).json({ error: "Bad credentials" });

      res.json({ userId: user_id, role });
    });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ error: "Failed to log in" });
  }
};

