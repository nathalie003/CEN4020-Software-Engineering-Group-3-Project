// server.js file
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database"); // Import the database connection
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

app.listen(5000, () => console.log("Server running on port 5000"));

// POST endpoint to create new account (register)

app.post('/register', (req, res) => {
  const { username, email, password, role } = req.body;
  // Validate data and consider hashing the password before inserting
  const sql = "INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [username, password, email, role], (err, result) => {
    if (err) {
      console.error('Error inserting new user:', err);
      return res.status(500).json({ error: "Failed to create user" });
    }
    res.status(201).json({ message: "User created successfully", userId: result.insertId });
  });
});
