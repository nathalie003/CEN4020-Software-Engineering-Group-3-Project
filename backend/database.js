// database.js file
const mysql = require('mysql');

function createConnection(config) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    connection.connect(err => {
      if (err) return reject(err);
      resolve(connection);
    });
  });
}

const localConfig = {
  host: '127.0.0.1',
  user: 'cashpilotadmin',
  password: 'T!5GCAJf',
  database: 'new_schema',
  port: 3306
};

const externalConfig = {
  host: '35.225.79.158',
  user: 'cashpilotadmin',
  password: 'T!5GCAJf',
  database: 'new_schema',
  port: 3306
};

let db;

// Immediately try to create a connection (local first, then external)
(async () => {
  try {
    db = await createConnection(localConfig);
    console.log('Connected to **local** MySQL database.');
  } catch (localErr) {
    console.warn('Local DB unavailable. Trying external connection...');
    try {
      db = await createConnection(externalConfig);
      console.log('Connected to **external** MySQL database.');
    } catch (externalErr) {
      console.error('Failed to connect to any database:', externalErr);
      process.exit(1);
    }
  }
})();

// Export a function that returns the connection when needed
module.exports = () => db;
