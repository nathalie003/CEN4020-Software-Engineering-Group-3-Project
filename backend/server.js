// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend build directory (adjust the path as needed)
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Define routes
const authRoutes = require('./routes/auth');
const receiptRoutes = require('./routes/receipts');
const categoriesRoutes = require('./routes/categories');

// Use routes with the '/api' prefix (e.g., /api/register, /api/upload-receipt)
app.use('/api', authRoutes);
app.use('/api', receiptRoutes);
app.use('/api', categoriesRoutes);

// Root endpoint for basic server check
app.get("/", (req, res) => {
  res.json("Backend Running Perfectly 4-16-25 3:05PM");
});

// Start the server after ensuring a DB connection
const dbPromise = require('./config/database.js');
dbPromise.then(db => {
  app.listen(port, '0.0.0.0', () => {
    console.log("Server running on port " + port);
  });
}).catch(err => {
  console.error("Failed to connect to database. Server not started.", err);
  process.exit(1);
});
