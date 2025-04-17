// controllers/receiptController.js
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const dbPromise = require('../config/database');

// Path to the Python executable in your virtual environment
// const pythonExecutable = "/home/terryastacio/myproject_env/bin/python";
const pythonExecutable = path.join(__dirname, '../..', 'venv', 'bin', 'python');

exports.uploadReceipt = (req, res) => {
  console.log("POST /api/upload-receipt route hit");

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.file.path;
  console.log("Uploaded file saved to:", filePath);

  // Construct the relative path to your Python script
  const pythonScriptPath = path.join(__dirname, "../python/readimgandfillform.py");
  console.log("Using Python script at:", pythonScriptPath);

  // Spawn the Python process
  const pythonProcess = spawn(pythonExecutable, [pythonScriptPath, filePath]);
  let pythonOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    pythonOutput += data.toString();
    console.log("Python stdout:", data.toString());
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    if (code === 0) {
      try {
        // Assume the JSON summary is the last non-empty line
        const outputLines = pythonOutput.split("\n").filter(line => line.trim() !== "");
        const jsonLine = outputLines[outputLines.length - 1];
        const receiptData = JSON.parse(jsonLine);
        console.log("Receipt data from Python:", receiptData);
        return res.status(200).json({ receiptData: receiptData });
      } catch (error) {
        console.error("Error parsing Python output:", error);
        return res.status(500).json({ message: "Receipt processing failed due to JSON parsing error." });
      }
    } else {
      return res.status(500).json({ message: "Receipt processing failed in the OCR process." });
    }
  });
};

exports.confirmReceipt = async (req, res) => {
  const receiptData = req.body.receiptData;
  if (!receiptData) {
    return res.status(400).json({ message: "No receipt data provided." });
  }
  console.log("Confirming receipt with data:", receiptData);

  const insertReceiptQuery = `
    INSERT INTO receipts (total, time, date, payment_method, address, phone)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const receiptValues = [
    receiptData.total,
    receiptData.time,
    receiptData.date,
    receiptData.payment_method,
    receiptData.address,
    receiptData.phone
  ];

  try {
    const db = await dbPromise;
    db.query(insertReceiptQuery, receiptValues, (err, result) => {
      if (err) {
        console.error("Error inserting receipt data:", err);
        return res.status(500).json({ 
          message: "Receipt confirmation failed during DB insertion.",
          error: err.message 
        });
      }
      console.log("Receipt insert result:", result);
      const receiptId = result.insertId;

      // Check if there are item entries to insert
      if (receiptData.items && Array.isArray(receiptData.items) && receiptData.items.length > 0) {
        const insertItemQuery = `
          INSERT INTO item (receipt_id, description, price)
          VALUES (?, ?, ?)
        `;
        let insertCount = 0;
        let itemErrors = [];

        receiptData.items.forEach((item) => {
          db.query(insertItemQuery, [receiptId, item.description, item.price], (err, itemResult) => {
            insertCount++;
            if (err) {
              console.error("Error inserting item:", err);
              itemErrors.push(err.message);
            } else {
              console.log("Item inserted:", itemResult);
            }
            if (insertCount === receiptData.items.length) {
              if (itemErrors.length > 0) {
                return res.status(500).json({ 
                  message: "Receipt confirmed but failed to insert some items.",
                  errors: itemErrors 
                });
              } else {
                return res.status(200).json({
                  message: "Receipt has been successfully uploaded to the database and is pending review.",
                  receiptId: receiptId,
                  data: receiptData
                });
              }
            }
          });
        });
      } else {
        return res.status(200).json({
          message: "Receipt has been successfully uploaded to the database and is pending review.",
          receiptId: receiptId,
          data: receiptData
        });
      }
    });
  } catch (error) {
    console.error("Error during receipt confirmation:", error);
    res.status(500).json({ message: "Receipt confirmation failed.", error: error.message });
  }
};
