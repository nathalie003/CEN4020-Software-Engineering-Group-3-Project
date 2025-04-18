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
app.use(express.static(path.join(__dirname, '../frontend/build')));

const authRouter       = require('./routes/auth');
const receiptsRouter   = require('./routes/receipts');
const categoryRouter   = require('./routes/category');
const userRouter       = require('./routes/user');
const supervisorRouter = require('./routes/supervisor');

app.use('/api/auth',        authRouter);        // e.g. POST /api/auth/login, /api/auth/register
app.use('/api/receipts',    receiptsRouter);    // e.g. POST /api/receipts/upload, /api/receipts/confirm
app.use('/api/category',  categoryRouter);    // e.g. GET  /api/categories, POST /api/categories
app.use('/api/users',       userRouter);        // e.g. GET  /api/users/:username
app.use('/api/supervisor',  supervisorRouter);  // e.g. POST /api/supervisor/analytics

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
