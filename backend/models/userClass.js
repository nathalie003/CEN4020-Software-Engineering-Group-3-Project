//backend/models/userClass.js
class User {
  constructor(user_id, username, password, email, role) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }

  static getIdByUsername(db, username, callback) {
    const sql = "SELECT user_id FROM user WHERE username = ?";
    db.query(sql, [username], callback);
  }
  static getUsernameById(db, id, callback) {
    const sql = "SELECT username FROM user WHERE user_id = ?";
    db.query(sql, [id], callback);
  }
  static getPassword(db, id, callback) {
    const sql = "SELECT password FROM user WHERE user_id = ?";
    db.query(sql, [id], callback);
  }
  static getEmail(db, id, callback) {
    const sql = "SELECT email FROM user WHERE user_id = ?";
    db.query(sql, [id], callback);
  }
  static getRole(db, id, callback) {
    const sql = "SELECT role FROM user WHERE user_id = ?";
    db.query(sql, [id], callback);
  }
  static printUser(db, id, callback) {
    const sql = "SELECT * FROM user WHERE id = ?";
    db.query(sql, [id], callback);
  }
  static findByUsername(db, username, callback) {
    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null); // No user found

      const { id, username, password, email, role } = results[0];
      const user = new User(id, username, password, email, role);
      callback(null, user);
    });
  }
}

// Employee Class
class Employee extends User {
  constructor(user_id, username, password, email, role) {
    super(user_id, username, password, email, role);
  }

  viewExpenseReports(db, callback) {
    const sql = "SELECT * FROM expense_report WHERE employee_id = ?";
    db.query(sql, [this.id], callback);
  }

  viewDashboard(db, callback) {
    const sql = "SELECT * FROM expense_report WHERE employee_id = ?";
    db.query(sql, [this.id], callback);
  }
}

// Supervisor Class
class Supervisor extends User {
  constructor(id, username, password, email, role) {
    super(id, username, password, email, role);
  }

  // View all expense reports from employees
  viewExpenseReports(db, callback) {
    const sql = "SELECT * FROM expense_report WHERE supervisor_id = ?";
    db.query(sql, [this.id], callback);
  }

  // View a specific employee's expense reports
  viewEmployeeReports(db, employeeId, callback) {
    const sql =
      "SELECT * FROM expense_report WHERE employee_id = ? AND supervisor_id = ?";
    db.query(sql, [employeeId, this.id], callback);
  }

  // Track the status of a specific expense report
  trackExpenseReportStatus(db, reportId, callback) {
    const sql =
      "SELECT status FROM expense_report WHERE id = ? AND supervisor_id = ?";
    db.query(sql, [reportId, this.id], callback);
  }

  // Flag an expense report for review (change status to "Flagged")
  flagExpenseReport(db, reportId, callback) {
    const sql =
      "UPDATE expense_report SET status = 'Flagged' WHERE id = ? AND supervisor_id = ?";
    db.query(sql, [reportId, this.id], callback);
  }

  // Route for supervisor to generate expense analytics by category
  // Generate a report/analytics of all submitted expense reports (e.g., by category, total sum)
  generateAnalytics(db, callback) {
    const sql = `
      SELECT category, SUM(amount) AS total_amount 
      FROM expense_report 
      WHERE supervisor_id = ?
      GROUP BY category
    `;
    db.query(sql, [this.id], callback);
  }

  assignEmployee(db, employeeId, callback) {
    const checkSql = "SELECT * FROM manages WHERE supervisor_id = ? AND employee_id = ?";
    const insertSql = "INSERT INTO manages (supervisor_id, employee_id) VALUES (?, ?)";
  
    // First check if already assigned
    db.query(checkSql, [this.user_id, employeeId], (err, results) => {
      if (err) {
        return callback(err);
      }
  
      if (results.length > 0) {
        // Already exists
        return callback(new Error("Employee already assigned to this supervisor."));
      }
  
      // If not assigned yet, insert
      db.query(insertSql, [this.user_id, employeeId], (insertErr, insertResult) => {
        if (insertErr) {
          return callback(insertErr);
        }
        callback(null, insertResult);
      });
    });
  }
  
  

  // Remove an employee from supervisor's management (unassign)
  removeEmployeeFromSupervisor(db, employeeId, callback) {
    const sql = "DELETE FROM manages WHERE supervisor_id = ? AND employee_id = ?";
    db.query(sql, [this.user_id, employeeId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
  
}

module.exports = { User, Employee, Supervisor };
//THIS DOES NOT BELONG HERE
// // Route for supervisor to generate expense analytics by category
// app.post("/supervisor/analytics", (req, res) => {
//   const { supervisorId } = req.body;

//   const supervisor = new Supervisor(supervisorId);
//   supervisor.generateAnalytics(db, (err, analytics) => {
//     if (err)
//       return res.status(500).json({ error: "Failed to generate analytics" });
//     res.status(200).json(analytics);
//   });
// });