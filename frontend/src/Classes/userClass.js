// src/models/userClass.js

// Base User class
class User {
    constructor(user_id, username, email, role) {
      this.user_id = user_id;
      this.username = username;
      this.email = email;
      this.role = role;
    }
  }
  
  // Employee class extending User
  class Employee extends User {
    constructor(user_id, username, employee_id) {
      super(user_id, username);
      this.employee_id = employee_id;
    }
  
    // Example method you can use later
    viewExpenseReports() {
      console.log(`Fetching expense reports for employee ID ${this.employee_id}`);
    }
  }
  
  // Supervisor class extending User
  class Supervisor extends User {
    constructor(user_id, username,supervisor_id) {
      super(user_id, username);
      this.supervisor_id = supervisor_id;
    }
  
    // Example method you can use later
    manageEmployees() {
      console.log(`Managing employees as supervisor ID ${this.supervisor_id}`);
    }
  }
  
  // Export the classes
  export { User, Employee, Supervisor };
  