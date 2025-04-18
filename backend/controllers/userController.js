//backend/controllers/userController.js
const dbPromise = require('../config/database');
const { User, Employee, Supervisor } = require("../models/userClass");

exports.user = (req, res) => {
    const { username } = req.params;
  
    User.findByUsername(db, username, (err, user) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (user.role === 3) {
        const employee = new Employee(user.id, user.username, user.password, user.email, user.role);
        return res.json(employee);
      } else if (user.role === 2) {
        const supervisor = new Supervisor(user.id, user.username, user.password, user.email, user.role);
        return res.json(supervisor);
      } else {
        return res.status(400).json({ error: "Invalid user role" });
      }
    });
  };

exports.getEmployeeExpenseReports = (req, res) => {
    const employeeId = req.params.id;
    const employee = new Employee(employeeId); // ID is enough since the method only uses `this.id`

    employee.viewExpenseReports(db, (err, reports) => {
        if (err) {
        console.error("Error fetching reports:", err);
        return res.status(500).json({ error: "Error fetching reports" });
        }
        res.status(200).json(reports);
    });
};