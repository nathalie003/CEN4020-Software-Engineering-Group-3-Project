// database.js file
const mysql = require('mysql');

// SQL connection with external IP from Google VM
const db = mysql.createConnection({
  host: '35.225.79.158',
  user: 'root',
  port: '3306',
  password: 'T!5GCAJf', // only if you've removed the root password
  database: 'new_schema'
});
// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;