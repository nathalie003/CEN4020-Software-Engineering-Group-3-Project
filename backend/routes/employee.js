// backend/routes/employee.js
const router = require("express").Router();
const employeeController = require("../controllers/employeeController");

// Route to get ALL employees (should be listed FIRST!)
router.get("/all", employeeController.getAllEmployees);

// Route to get a single employee by userId
router.get("/:userId", employeeController.getEmployeeByUserId);

// Route for employee analytics
router.post("/analytics", employeeController.analytics);

module.exports = router;
