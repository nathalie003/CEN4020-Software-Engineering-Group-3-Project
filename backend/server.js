const express = require("express"); //needed for mysql database
const cors = require("cors");//needed for mysql database
const db = require("./database"); // Import the database connection

// const axios = require("axios");
// const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });

const app = express();//needed for mysql database

app.use(cors());//needed for mysql database
app.use(express.json());

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


