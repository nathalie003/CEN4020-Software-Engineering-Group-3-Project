// GPT Code dont trust

const express = require("express"); //needed for mysql database
const mysql = require('mysql');//needed for mysql database
// const multer = require("multer");
const cors = require("cors");//needed for mysql database
// const axios = require("axios");

const app = express();//needed for mysql database
// const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());//needed for mysql database

app.get('/', (re, res)=> {
    return res.json("From BAckend Side");
})//needed for mysql database

app.get('/users', (req, res)=>{
    const sql = "SELECT * FROM User"
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);

    })
})

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'test'

})//needed for mysql database

app.use(express.json());

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

app.listen(5000, () => console.log("Server running on port 5000"));