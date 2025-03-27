const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
// Password hashing library
const bcrypt = require('bcryptjs');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json("From Backend Side 3-26-25 11:37PM");
});

app.get('/user', (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [username, hashedPassword, email, role], (err, result) => {
      if (err) {
        console.error('Error inserting new user:', err);
        return res.status(500).json({ error: "Failed to create user" });
      }
      res.status(201).json({ message: "User created successfully", userId: result.insertId });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], async (err, data) => {
      if (err) {
          console.error('Error during login query:', err);
          return res.status(500).json({ error: "Failed to log in" });
      }

      if (data.length === 0) {
          return res.status(401).json({ error: "Invalid username or password. Please try again" });
      }

      const user = data[0];

      // Compare password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(401).json({ error: "Invalid username or password. Please try again" });
      }

      // If login is successful, return the user's role
      res.json({ role: user.role });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
