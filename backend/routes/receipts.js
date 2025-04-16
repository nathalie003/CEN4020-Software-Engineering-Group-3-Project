// routes/receipts.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const receiptController = require('../controllers/receiptController');

// Configure multer for file uploads – files will be stored in the "uploads" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Receipt upload route – Phase 1: Process and return receipt summary
router.post('/upload-receipt', upload.single('receiptPDF'), receiptController.uploadReceipt);

// Receipt confirmation route – Phase 2: Confirm and insert receipt data into the DB
router.post('/confirm-receipt', receiptController.confirmReceipt);

module.exports = router;
