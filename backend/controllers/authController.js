// controllers/authController.js
const bcrypt = require('bcryptjs');
const dbPromise = require('../config/database');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)";
    const db = await dbPromise;

    db.query(sql, [username, hashedPassword, email, role], (err, result) => {
      if (err) {
        console.error("Error inserting new user:", err);
        return res.status(500).json({ error: "Failed to create user" });
      }
      res.status(201).json({ message: "User created successfully", userId: result.insertId });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username = ?";

  try {
    const db = await dbPromise;
    db.query(sql, [username], async (err, data) => {
      if (err) {
        console.error("Error during login query:", err);
        return res.status(500).json({ error: "Failed to log in" });
      }
      if (!data || data.length === 0) {
        return res.status(401).json({ error: "Invalid username or password. Please try again" });
      }
      const user = data[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password. Please try again" });
      }
      res.json({ role: user.role });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};
