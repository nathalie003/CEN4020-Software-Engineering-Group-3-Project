const bcrypt = require("bcryptjs");
const dbPromise = require("../config/database");

class AuthController {
  async register(req, res) {
    const { username, email, password, role } = req.body;

    if (!["employee", "supervisor"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    try {
      const hashed = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)";
      const db = await dbPromise;

      db.query(sql, [username, hashed, email, role], (err, result) => {
        if (err) {
          console.error("Error inserting new user:", err);
          return res.status(500).json({ error: "Failed to create user" });
        }

        const userId = result.insertId;
        console.log(`User created with ID: ${userId}`);

        // Insert into the specific role table
        let insertRoleSql;
        if (role === "supervisor") {
          insertRoleSql = "INSERT INTO supervisor (user_id) VALUES (?)";
        } else if (role === "employee") {
          insertRoleSql = "INSERT INTO employee (user_id) VALUES (?)";
        }

        db.query(insertRoleSql, [userId], (roleErr, roleResult) => {
          if (roleErr) {
            console.error(`Error inserting new ${role}:`, roleErr);
            return res.status(500).json({ error: `Failed to create ${role}` });
          }

          console.log(`${role} created successfully for userId: ${userId}`);
          res.status(201).json({
            message: `User and ${role} created successfully`,
            userId: userId,
          });
        });
      });
    } catch (e) {
      console.error("Error during registration:", e);
      res.status(500).json({ error: "Failed to register user" });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    const sql = "SELECT user_id, username, password AS hash, role FROM user WHERE username = ?";

    try {
      const db = await dbPromise;
      db.query(sql, [username], async (err, rows) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        if (!rows.length) {
          return res.status(401).json({ error: "No such user" });
        }

        const { user_id: userId, username: uname, hash, role } = rows[0];
        const ok = await bcrypt.compare(password, hash);

        if (!ok) {
          return res.status(401).json({ error: "Bad credentials" });
        }

        res.json({ userId, role, username: uname });
      });
    } catch (e) {
      console.error("Error during login:", e);
      res.status(500).json({ error: "Failed to log in" });
    }
  }
}

// Export object (an instance of the class)
module.exports = new AuthController();
