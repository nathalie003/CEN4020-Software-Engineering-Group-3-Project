// backend/routes/supervisor.js
const router = require("express").Router();
// const { Employee } = require("../models/userClass");
const employeeController = require("../controllers/employeeController");

router.post("/analytics", employeeController.analytics);

router.get("/:userId", employeeController.getEmployeeByUserId);

router.get('/all', employeeController.getAllEmployees);

module.exports = router;
