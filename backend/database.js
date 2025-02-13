const mysql = require('mysql');

const db = mysql.createConnection({
  host: "mysql-database-1-cashpilotproject.crua2cacctz3.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "cashpilotadmin",
  password: "shZBhkTS4lGd",
  database: "cashpilot_schema"
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
