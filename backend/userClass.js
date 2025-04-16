//server.js file
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
// Password hashing library
const bcrypt = require("bcryptjs");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

class User {
  constructor(id, username, password, email, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }

  static getIdByUsername(db, username, callback) {
    const sql = "SELECT id FROM user WHERE username = ?";
    db.query(sql, [username], callback);
  }
  static getUsernameById(db, id, callback) {
    const sql = "SELECT username FROM user WHERE id = ?";
    db.query(sql, [id], callback);
  }
  static getPassword(db, id, callback) {
    const sql = "SELECT password FROM user WHERE id = ?";
    db.query(sql, [id], callback);
  }
  static getEmail(db, id, callback) {
    const sql = "SELECT email FROM user WHERE id = ?";
    db.query(sql, [id], callback);
  }
  static getRole(db, id, callback) {
    const sql = "SELECT role FROM user WHERE id = ?";
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
  constructor(id, username, password, email, role) {
    super(id, username, password, email, role);
  }

  viewExpenseReports(db, callback) {
    const sql = "SELECT * FROM expense_reports WHERE employee_id = ?";
    db.query(sql, [this.id], callback);
  }

  viewDashboard(db, callback) {
    const sql = "SELECT * FROM expense_reports WHERE employee_id = ?";
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
    const sql = "SELECT * FROM expense_reports WHERE supervisor_id = ?";
    db.query(sql, [this.id], callback);
  }

  // View a specific employee's expense reports
  viewEmployeeReports(db, employeeId, callback) {
    const sql =
      "SELECT * FROM expense_reports WHERE employee_id = ? AND supervisor_id = ?";
    db.query(sql, [employeeId, this.id], callback);
  }

  // Track the status of a specific expense report
  trackExpenseReportStatus(db, reportId, callback) {
    const sql =
      "SELECT status FROM expense_reports WHERE id = ? AND supervisor_id = ?";
    db.query(sql, [reportId, this.id], callback);
  }

  // Flag an expense report for review (change status to "Flagged")
  flagExpenseReport(db, reportId, callback) {
    const sql =
      "UPDATE expense_reports SET status = 'Flagged' WHERE id = ? AND supervisor_id = ?";
    db.query(sql, [reportId, this.id], callback);
  }

  // Route for supervisor to generate expense analytics by category
  // Generate a report/analytics of all submitted expense reports (e.g., by category, total sum)
  generateAnalytics(db, callback) {
    const sql = `
      SELECT category, SUM(amount) AS total_amount 
      FROM expense_reports 
      WHERE supervisor_id = ?
      GROUP BY category
    `;
    db.query(sql, [this.id], callback);
  }

  // Assign an employee to the supervisor (relationship between employee and supervisor)
  assignEmployeeToSupervisor(db, employeeId, callback) {
    const sql = "UPDATE user SET supervisor_id = ? WHERE id = ?";
    db.query(sql, [this.id, employeeId], callback);
  }

  // Remove an employee from supervisor's management (unassign)
  removeEmployeeFromSupervisor(db, employeeId, callback) {
    const sql =
      "UPDATE user SET supervisor_id = NULL WHERE id = ? AND supervisor_id = ?";
    db.query(sql, [employeeId, this.id], callback);
  }
}

module.exports = { User, Employee, Supervisor };
// Route for supervisor to generate expense analytics by category
app.post("/supervisor/analytics", (req, res) => {
  const { supervisorId } = req.body;

  const supervisor = new Supervisor(supervisorId);
  supervisor.generateAnalytics(db, (err, analytics) => {
    if (err)
      return res.status(500).json({ error: "Failed to generate analytics" });
    res.status(200).json(analytics);
  });
});

module.exports = { User, Employee, Supervisor };
