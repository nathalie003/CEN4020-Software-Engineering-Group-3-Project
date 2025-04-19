// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use("/api/auth", require("./routes/auth"))
app.use('/api/receipts',    require('./routes/receipts'));    // e.g. POST /api/receipts/upload, /api/receipts/confirm
app.use('/api/category',  require('./routes/category'));    // e.g. GET  /api/categories, POST /api/categories
app.use("/api/user", require("./routes/user"));
app.use('/api/supervisor', require('./routes/supervisor'));  // e.g. POST /api/supervisor/analytics
app.use('/api/employee', require('./routes/employee'));  // e.g. POST /api/employee/analytics

// Root endpoint for basic server check
app.get("/", (req, res) => {
  res.json("Backend Running Perfectly 4-16-25 3:05PM");
});

// Start the server after ensuring a DB connection
const dbPromise = require("./config/database.js");
dbPromise
  .then((db) => {
    app.listen(port, "0.0.0.0", () => {
      console.log("Server running on port " + port);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database. Server not started.", err);
    process.exit(1);
  });
