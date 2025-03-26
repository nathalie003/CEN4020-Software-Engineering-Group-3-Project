// server.js file
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database"); // Import the database connection
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json("From Backend Side 3-26-25 5:24PM");
});

app.get('/user', (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));