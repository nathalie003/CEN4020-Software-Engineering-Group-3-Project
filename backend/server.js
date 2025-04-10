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

// configure multer for file uploads (saves files to the "uploads" directory)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

//receipt upload route
app.post("/api/upload-receipt", upload.single("receiptPDF"), (req, res) => {
  console.log("POST /api/upload-receipt route hit");
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.file.path;
  console.log("Uploaded file saved to:", filePath);

  //construct relative path to Python script
  const pythonScriptPath = path.join(__dirname, "../python/readImage.py");

  //spawn a Python process to run the OCR script with the uploaded file as an argument.
  const pythonProcess = spawn(pythonExecutable, [pythonScriptPath, filePath]);

  let pythonOutput = "";
  pythonProcess.stdout.on("data", (data) => {
    pythonOutput += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    if (code === 0) {
      //try to parse JSON output from Python script
      try {
        const receiptData = JSON.parse(pythonOutput);
        //inserting this receipt data into the database using the DB module

        const insertQuery = `
          INSERT INTO receipts (total, time, date, payment_method, address, phone)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        const dataTuple = [
          receiptData.total,
          receiptData.time,
          receiptData.date,
          receiptData.payment_method,
          receiptData.address,
          receiptData.phone
        ];

        console.log("Insert query:", insertQuery);
        console.log("Data tuple:", dataTuple);
        db.query(insertQuery, dataTuple, (err, results) => {
          if (err) {
            console.error("Error inserting receipt data:", err);
            return res.status(500).json({ 
              message: "Receipt processing failed during DB insertion.",
              error: err.message 
            });
          } else {
            console.log("Insert results:", results);
            return res.status(200).json({
              message: "Receipt processed and inserted successfully.",
              data: receiptData
            });
          }
        });
      } catch (error) {
        console.error("Error parsing Python output:", error);
        res.status(500).json({ message: "Receipt processing failed due to JSON parsing error." });
      }
    } else {
      res.status(500).json({ message: "Receipt processing failed in the OCR process." });
    }
  });
});


// Start the server only once
app.listen(port, () => console.log("Server running on port " + port));
