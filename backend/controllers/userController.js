// backend/controllers/userController.js
const dbPromise = require('../config/database');
const { User, Employee, Supervisor } = require("../models/userClass");

exports.user = async (req, res) => {
  try {
    const db = await dbPromise;
    const { username } = req.params;                      // fix typo

    User.findByUsername(db, username, (err, user) => {
      if (err)    return res.status(500).json({ error: err.message });
      if (!user)  return res.status(404).json({ error: 'Not found' });

      // Compare to strings, not numbers
      if (user.role === 'employee') {
        // user.user_id, not user.id
        const emp = new Employee(
          user.user_id, user.username, user.password, user.email, user.role
        );
        return res.json(emp);

      } else if (user.role === 'supervisor') {
        const sup = new Supervisor(
          user.user_id, user.username, user.password, user.email, user.role
        );
        return res.json(sup);

      } else {
        return res.status(400).json({ error: "Invalid user role" });
      }
    });

  } catch (err) {
    console.error("DB/Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmployeeExpenseReports = async (req, res) => {
  try {
    const db = await dbPromise;           // ← get your db connection
    const employeeId = req.params.id;
    const emp = new Employee(employeeId); // constructor only needs ID

    emp.viewExpenseReports(db, (err, reports) => {
      if (err) {
        console.error("Error fetching reports:", err);
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json(reports);
    });

  } catch (err) {
    console.error("DB/Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
