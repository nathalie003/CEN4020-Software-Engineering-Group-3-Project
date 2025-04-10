//server.js file
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
// Password hashing library
const bcrypt = require('bcryptjs');

const User = require('./userClass');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json("From Backend Side 4-8-25 1:11PM");
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
    console.log("Registering user:", username, password, hashedPassword);

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
  console.log("Login attempt:", username, password);

  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], async (err, data) => {
    console.log("Login attempt:", username, password);
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
      const hashedPassword = await bcrypt.hash(password, 10);

      if (!isMatch) {
          console.error('Invalid password attempt:', username, password);
          console.error(hashedPassword);
          console.error(user.password);
          return res.status(401).json({ error: "Invalid username or password. Please try again" });
      }

      // If login is successful, return the user's role
      res.json({ role: user.role, username: user.username });
  });
});

app.get('/api/user/:username', (req, res) => {
  const { username } = req.params;
  console.log("Fetching user by username:", username);
  User.findByUsername(db, username, (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
});


app.listen(5000, () => console.log("Server running on port 5000"));