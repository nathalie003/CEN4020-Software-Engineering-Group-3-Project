// DashboardLanding.js
import React, { useState, useEffect } from "react";
import "../../Design Functionality/jquery.min.js";
import $ from "jquery";

import "../Home Page/templatemo.css";
import "../../Design Functionality/boxicon.min.css";
import "../../Design Functionality/bootstrap.min.css";
import "../../Design Functionality/fslightbox.js";
import { useNavigate } from "react-router-dom";
// import "./ViewDashboard.css";
import "./dash.css";

window.$ = $;
window.jQuery = $;
function ViewDashboard() {
  const [view, setView] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]); // New available employees
  const [selectedEmployees, setSelectedEmployees] = useState([]); // Selected employee IDs

  const [searchTerm, setSearchTerm] = useState("");
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});
  const [supervisorId, setSupervisorId] = useState(null);

  const navigate = useNavigate();
  var $ = require("jquery");
  var jQueryBridget = require("jquery-bridget");
  var Isotope = require("isotope-layout");
  jQueryBridget("isotope", Isotope, $);

  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    console.log("User from sessionStorage:", userString);

    if (userString) {
      const user = JSON.parse(userString); // must parse JSON
      const userId = user.user_id; // match your DB fields!
      const supervisorId = user.supervisor_id; // match your DB fields!
      setSupervisorId(supervisorId); // Set the supervisor ID in state

      console.log("User ID:", userId);
      console.log("Supervisor ID:", supervisorId);
    }
  }, []);

  const fetchAvailableEmployees = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employee/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch employees.");
      }
      const data = await response.json();
      console.log("🔵 All employees in 'employee' table:", data);
      setAvailableEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAssignedEmployees = async () => {
    if (!supervisorId) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/manages/${supervisorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch assigned employees.");
      }
      const data = await response.json();
      console.log("🟡 Employees already assigned to this supervisor (manages table):", data);
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching assigned employees:", error);
      setEmployees([]); // fallback to empty
    }
  };
  

  const handleAssignEmployees = async () => {
    if (selectedEmployees.length === 0 || !supervisorId) {
      alert("Please select employees to assign.");
      return;
    }

    try {
      for (const employeeId of selectedEmployees) {
        await fetch(`http://localhost:5000/api/manages/assign`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ supervisorId, employeeId }),
        });
      }
      alert("Employees assigned successfully!");
      setSelectedEmployees([]);
      setView("viewAssignedEmployees"); // Go back to view assigned
      fetchAssignedEmployees(); // Refresh
    } catch (error) {
      console.error("Error assigning employees:", error);
      alert("Error assigning employees.");
    }
  };

  return (
    <div id="page-top">
      {/*Page wrapper*/}
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Supervisor</div>
          </a>

          {/* Divider */}
          <hr className="sidebar-divider my-0" />

          {/* Dashboard Link */}
          <li className="nav-item">
            <a
              className="nav-link"
              href="#!"
              onClick={() => setView("dashboard")}
            >
              <i className="bx bxs-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          {/* Employees Dropdown */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#!"
              data-toggle="collapse"
              data-target="#collapseEmployees"
              aria-expanded="true"
              aria-controls="collapseEmployees"
            >
              <i className="bx bxs-user"></i>
              <span>Employees</span>
            </a>
            <div
              id="collapseEmployees"
              className="collapse"
              aria-labelledby="headingEmployees"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Manage Employees:</h6>
                <a
                  className="collapse-item"
                  href="#!"
                  onClick={() => {
                    fetchAssignedEmployees();
                    setView("viewAssignedEmployees");
                  }}
                >
                  View Assigned Employees
                </a>
                <a
                  className="collapse-item"
                  href="#!"
                  onClick={() => {
                    fetchAvailableEmployees();
                    console.log("🟣 Available employees for assignment:", availableEmployees);
                    setView("addAssignedEmployees");
                  }}
                >
                  Add Assigned Employees
                </a>
              </div>
            </div>
          </li>

          {/* Divider */}
          <hr className="sidebar-divider" />

          {/* Reports Dropdown */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#!"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <i className="bx bxs-file"></i>
              <span>Reports</span>
            </a>
            <div
              id="collapseUtilities"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Reports:</h6>
                <a className="collapse-item" href="#!">
                  View My Reports
                </a>
                <a className="collapse-item" href="#!">
                  View Employee Reports
                </a>
                <a className="collapse-item" href="#!">
                  Generate Report
                </a>
              </div>
            </div>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />
          {/* <!-- Heading --> */}

          {/* <!-- Sidebar Toggler (Sidebar) --> */}
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
            ></button>
          </div>
        </ul>
        {/* <!-- End of Sidebar --> */}

        {/* Content */}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>

              {/* Search Bar */}
              <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>

              {/* Topbar Navbar */}
              <ul className="navbar-nav ml-auto">
                {/* Alerts */}
                <li className="nav-item dropdown no-arrow mx-1">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#!"
                    id="alertsDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bx bxs-bell"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                  </a>
                  <div
                    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown"
                  >
                    <h6 className="dropdown-header">Alerts Center</h6>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      <div className="mr-3">
                        <div className="icon-circle bg-primary">
                          <i className="fas fa-file-alt text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">
                          December 12, 2019
                        </div>
                        <span className="font-weight-bold">
                          A new monthly report is ready to download!
                        </span>
                      </div>
                    </a>
                  </div>
                </li>

                {/* User Information */}
                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#!"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      Supervisor
                    </span>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <a className="dropdown-item" href="#!">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </a>
                    <a className="dropdown-item" href="#!">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      Settings
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="#!"
                      data-toggle="modal"
                      data-target="#logoutModal"
                    >
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>

            {/* Page Content */}
            <div className="container-fluid">
              {view === "dashboard" && (
                <>
                  <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
                  <p>
                    Welcome to the Supervisor Dashboard. Here you can view
                    employee reports and statistics.
                  </p>
                </>
              )}

              {view === "viewAssignedEmployees" && (
                <>
                  <h1 className="h3 mb-2 text-gray-800">Assigned Employees</h1>
                  {employees.length === 0 ? (
                    <p>You must assign an employee to continue.</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th>Username</th>
                            <th>Employee ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((emp) => (
                            <tr key={emp.employee_id}>
                              <td>{emp.username}</td>
                              <td>{emp.employee_id}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {view === "addAssignedEmployees" && (
                <>
                  <h1 className="h3 mb-2 text-gray-800">Assign Employees</h1>
                  <p>Select one or more employees to assign to yourself:</p>

                  <div className="form-group">
                    <select
                      multiple
                      className="form-control"
                      value={selectedEmployees}
                      onChange={(e) => {
                        const options = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        setSelectedEmployees(options);
                      }}
                    >
                      {availableEmployees.map((emp) => (
                        <option key={emp.employee_id} value={emp.employee_id}>
                          {emp.username} (Employee ID: {emp.employee_id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleAssignEmployees}
                  >
                    Assign Selected Employees
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Scroll to Top */}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>

          {/* Logout Modal */}
          <div
            className="modal fade"
            id="logoutModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ready to Leave?
                  </h5>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  Select "Logout" below if you are ready to end your current
                  session.
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  {/* <button className="btn btn-primary" onClick={handleLogout}>Logout</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDashboard;
