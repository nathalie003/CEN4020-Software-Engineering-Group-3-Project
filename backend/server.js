// server.js file
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
const bcrypt = require("bcryptjs");
const { spawn } = require("child_process");
const multer = require("multer"); // For receipt uploading/storing
const path = require("path");      // For constructing file paths
const pythonExecutable = path.join(__dirname, "../venv/Scripts/python.exe");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json("Backend Running Perfectly 4-9-25 10:23PM");
});

//test-db endpoint
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 AS test", (err, results) => {
    if (err) {
      console.error("Test query error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Database query succeeded", results });
  });
});

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [username, hashedPassword, email, role], (err, result) => {
      if (err) {
        console.error("Error inserting new user:", err);
        return res.status(500).json({ error: "Failed to create user" });
      }
      res.status(201).json({ message: "User created successfully", userId: result.insertId });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], async (err, data) => {
    if (err) {
      console.error("Error during login query:", err);
      return res.status(500).json({ error: "Failed to log in" });
    }
    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid username or password. Please try again" });
    }
    const user = data[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password. Please try again" });
    }
    res.json({ role: user.role });
  });
});

//------------ RECEIPT PROCESSING SECTION ------------

//------------ RECEIPT PROCESSING SECTION ------------

// Configure multer for file uploads (saves files to the "uploads" directory)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Receipt upload route
app.post("/api/upload-receipt", upload.single("receiptPDF"), (req, res) => {
  console.log("POST /api/upload-receipt route hit");
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.file.path;
  console.log("Uploaded file saved to:", filePath);

  // Construct the relative path to the Python script
  const pythonScriptPath = path.join(__dirname, "../python/readImage.py");
  console.log("Using Python script at:", pythonScriptPath);

  // Spawn a Python process to run the OCR script with the uploaded file as argument.
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
        // Parse the JSON output from the Python script.
        const receiptData = JSON.parse(pythonOutput);
        console.log("Receipt data from Python:", receiptData);

        // Insert into the receipts table.
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

        console.log("Insert receipt query:", insertReceiptQuery);
        console.log("Receipt values:", receiptValues);

        db.query(insertReceiptQuery, receiptValues, (err, results) => {
          if (err) {
            console.error("Error inserting receipt data:", err);
            return res.status(500).json({ 
              message: "Receipt processing failed during DB insertion.",
              error: err.message 
            });
          } else {
            console.log("Receipt insert results:", results);
            const receiptId = results.insertId;
            // If receiptData includes items, insert them into the `item` table.
            if (receiptData.items && Array.isArray(receiptData.items) && receiptData.items.length > 0) {
              const insertItemQuery = `
                INSERT INTO item (receipt_id, description, price)
                VALUES (?, ?, ?)
              `;
              
              // Process item inserts.
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
                  // When all items have been processed, send a final response.
                  if (insertCount === receiptData.items.length) {
                    if (itemErrors.length > 0) {
                      return res.status(500).json({ 
                        message: "Receipt processed but failed to insert some items.",
                        errors: itemErrors 
                      });
                    } else {
                      return res.status(200).json({
                        message: "Receipt processed and inserted successfully.",
                        receiptId: receiptId,
                        data: receiptData
                      });
                    }
                  }
                });
              });
            } else {
              // If there are no items, respond immediately.
              return res.status(200).json({
                message: "Receipt processed and inserted successfully.",
                receiptId: receiptId,
                data: receiptData
              });
            }
          }
        });
      } catch (error) {
        console.error("Error parsing Python output:", error);
        return res.status(500).json({ message: "Receipt processing failed due to JSON parsing error." });
      }
    } else {
      return res.status(500).json({ message: "Receipt processing failed in the OCR process." });
    }
  });
});


// Start the server only once
app.listen(port, () => console.log("Server running on port " + port));
