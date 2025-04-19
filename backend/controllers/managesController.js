// backend/controllers/managesController.js
const dbPromise = require("../config/database");
const { Supervisor } = require("../models/userClass");

// Get all employees assigned to a supervisor
exports.getAssignedEmployees = async (req, res) => {
  const { supervisorId } = req.params;

  try {
    const db = await dbPromise;
    const query = `
      SELECT e.employee_id, u.username
      FROM manages m
      JOIN employee e ON m.employee_id = e.employee_id
      JOIN user u ON e.user_id = u.user_id
      WHERE m.supervisor_id = ?;
    `;

    db.query(query, [supervisorId], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Assign an employee to a supervisor
exports.assignEmployee = async (req, res) => {
  const { supervisorId, employeeId } = req.body;

  if (!supervisorId || !employeeId) {
    return res.status(400).json({ error: "Missing supervisorId or employeeId" });
  }

  try {
    const db = await dbPromise;
    const supervisor = new Supervisor(supervisorId);  // create Supervisor instance
    supervisor.assignEmployeeToSupervisor(db, employeeId, (err, result) => {
      if (err) {
        console.error("Error assigning employee:", err);
        return res.status(500).json({ error: "Failed to assign employee" });
      }
      res.json({ message: "Employee assigned successfully", result });
    });
  } catch (err) {
    console.error("Server error during assignment:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Unassign an employee from a supervisor
exports.unassignEmployee = async (req, res) => {
  const { supervisorId, employeeId } = req.body;

  if (!supervisorId || !employeeId) {
    return res.status(400).json({ error: "Missing supervisorId or employeeId" });
  }

  try {
    const db = await dbPromise;
    const supervisor = new Supervisor(supervisorId); // Create Supervisor object

    supervisor.removeEmployeeFromSupervisor(db, employeeId, (err, result) => {
      if (err) {
        console.error("Error unassigning employee:", err);
        return res.status(500).json({ error: "Failed to unassign employee" });
      }
      res.status(200).json({ message: "Employee unassigned successfully", result });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
