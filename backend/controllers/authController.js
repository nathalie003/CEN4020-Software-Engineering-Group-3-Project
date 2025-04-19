// controllers/authController.js
const bcrypt = require('bcryptjs');
const dbPromise = require('../config/database');

// exports.register = async (req, res) => {
//   const { username, email, password, role } = req.body;
//   if (!['employee','supervisor'].includes(role)) {
//     return res.status(400).json({ error: 'Invalid role' });
//   }

//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     const sql    = "INSERT INTO user (username,password,email,role) VALUES(?,?,?,?)";
//     const db     = await dbPromise;
//     db.query(sql, [username, hashed, email, role], (err, result) => {
//       if (err) {
//         console.error("Error inserting new user:", err);
//         return res.status(500).json({ error: "Failed to create user" });
//       }
//       res.status(201).json({
//         message: "User created successfully",
//         userId:  result.insertId
//       });
//     });
//   } catch (e) {
//     console.error("Error during registration:", e);
//     res.status(500).json({ error: "Failed to register user" });
//   }
// };
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!['employee','supervisor'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const sqlUser = "INSERT INTO user (username,password,email,role) VALUES (?,?,?,?)";
    const db      = await dbPromise;
    db.query(sqlUser, [username, hashed, email, role], (err, result) => {
      if (err) {
        console.error("Error inserting new user:", err);
        return res.status(500).json({ error: "Failed to create user" });
      }

      const userId = result.insertId;
      // now insert into the proper child table:
      const childTable = role === 'employee' ? 'employee' : 'supervisor';
      const sqlChild   = `INSERT INTO ${childTable} (user_id) VALUES (?)`;
      db.query(sqlChild, [userId], childErr => {
        if (childErr) {
          console.error(`Error inserting into ${childTable}:`, childErr);
          // you might want to roll back the user insert here, depending on your needs
          return res.status(500).json({ error: `Failed to create ${role} record` });
        }
        res.status(201).json({
          message: "User created successfully",
          userId
        });
      });
    });
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({ error: "Failed to register user" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT user_id, username, password AS hash, role FROM user WHERE username = ?";
  try {
    const db = await dbPromise;
    db.query(sql, [username], async (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (!rows.length) return res.status(401).json({ error: "No such user" });

      // Pull out all four fields in one go:
      const { user_id: userId, username: uname, hash, role } = rows[0];

      // Check their password _before_ sending anything:
      const ok = await bcrypt.compare(password, hash);
      if (!ok) return res.status(401).json({ error: "Bad credentials" });

      // Only once it’s verified do we send back the payload:
      res.json({ userId, role, username: uname });
    });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ error: "Failed to log in" });
  }
};


