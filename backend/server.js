const express = require("express"); //needed for mysql database
const cors = require("cors");//needed for mysql database
const db = require("./database"); // Import the database connection

// const axios = require("axios");
// const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });

const app = express();//needed for mysql database

app.use(cors());//needed for mysql database
app.use(express.json());


// const db = mysql.createConnection({
//     host: 'mysql-database-1-cashpilotproject.crua2cacctz3.us-east-1.rds.amazonaws.com',
//     port: '3306',
//     user: 'cashpilotadmin',
//     password: 'shZBhkTS4lGd',
//     database: 'user'

// })//needed for mysql database
// //mysql-database-1-cashpilotproject.crua2cacctz3.us-east-1.rds.amazonaws.com


// Test route to verify backend connectivity
app.get('/', (req, res) => {
    res.json("From Backend Side");
});

// Endpoint to fetch all users
app.get('/user', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));

// //needed for mysql database
// const db = mysql.createConnection({
//     host: "localhost",
//     user: 'root',
//     password: '',
//     database: 'test'

// })

// app.post("/upload", upload.single("file"), async (req, res) => {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     try {
//         // Send file to Python OCR microservice
//         const response = await axios.post("http://localhost:5001/extract_text", req.file.buffer, {
//             headers: { "Content-Type": "image/png" } // Adjust for file type
//         });

//         res.json({ text: response.data.text });
//     } catch (error) {
//         res.status(500).json({ error: "OCR service error" });
//     }
// });

