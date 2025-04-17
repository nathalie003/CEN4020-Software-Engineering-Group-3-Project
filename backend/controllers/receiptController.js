// controllers/receiptController.js
const { spawn } = require("child_process");
const path = require("path");
// const dbPromise = require('../config/database');

// Path to the Python executable in your virtual environment
// const pythonExecutable = "/home/terryastacio/myproject_env/bin/python";
// const pythonExecutable = path.join(__dirname, '../..', 'venv', 'bin', 'python');
// Path to the Python executable in your project‑root venv (Windows vs UNIX)
const pythonExecutable = path.resolve(
  __dirname, '..', '..', 'venv',
  process.platform === 'win32'
    ? 'Scripts/python.exe'
    : 'bin/python'
);

// // Construct the relative path to your Python script
// const pythonScriptPath = path.join(__dirname, "../python/readimgandfillform.py");
// point at your readimgandfillform.py in the python folder at the repo root
const pythonScriptPath = path.resolve(
  __dirname, "..", // backend/controllers → backend
  "..",            // backend → project root
  "python",
  "readimgandfillform.py"
);
console.log("Using Python script at:", pythonScriptPath);

exports.uploadReceipt = (req, res) => {
  console.log("POST /api/upload-receipt route hit");
  
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.file.path;
  console.log("Uploaded file saved to:", filePath);
  console.log("Spawning:", pythonExecutable, pythonScriptPath, filePath);



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