//receipts.js
const multer = require("multer");
const path   = require("path");
const router = require("express").Router();
const receiptController  = require("../controllers/receiptController");

// ── store in backend/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../uploads")),
  filename   : (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});

// ── ACCEPT **ONLY** JPEG / PNG
const fileFilter = (req, file, cb) => {
  const ok = /image\/(jpeg|png)/.test(file.mimetype);
  cb(null, ok);
};

const upload = multer({ storage, fileFilter });

router.post("/upload-receipt", upload.single("receiptImage"), 
  receiptController.uploadReceipt
);
// Final “Save to Database”
router.post("/confirm-receipt", receiptController.confirmReceipt);

module.exports = router;

