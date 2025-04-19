// backend/routes/manages.js
const express = require('express');
const router = express.Router();
const managesController = require('../controllers/managesController');

// Assign an employee to a supervisor
router.post('/assign', managesController.assignEmployee); // <<< ADD THIS

// Get all employees assigned to a supervisor
router.get('/:supervisorId', managesController.getAssignedEmployees);

// Unassign an employee from a supervisor
router.delete('/unassign', managesController.unassignEmployee);

module.exports = router;
