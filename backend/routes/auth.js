// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Endpoint for user registration
router.post("/register", (req, res) => authController.register(req, res));

// Endpoint for user login
router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
