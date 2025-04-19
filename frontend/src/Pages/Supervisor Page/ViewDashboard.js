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

window.$ = $; // <<<<<< ADD THIS
window.jQuery = $;
function ViewDashboard() {
  const [employees, setEmployees] = useState([]);
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
    const userString = sessionStorage.getItem("user"); // <<<<<<<< correct key
    console.log("User from sessionStorage:", userString);

    if (userString) {
      const user = JSON.parse(userString); // must parse JSON
      const userId = user.user_id; // match your DB fields!
      const supervisorId = user.supervisor_id; // match your DB fields!

      console.log("User ID:", userId);
      console.log("Supervisor ID:", supervisorId);

      setSupervisorId(supervisorId); // Set the supervisor ID in state
    }
  }, []);

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

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />
          {/* <!-- Nav Item - Dashboard --> */}
          <li className="nav-item">
            <a className="nav-link" href="#!">
              <i id="sidenav-headicon" className="bx bxs-dashboard"></i>
              <span id="dash-name">Dashboard</span>
            </a>
          </li>
          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item active">
            <a
              className="nav-link"
              href="#!"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i id="sidenav-headicon" className="bx bxs-user"></i>
              <span id="dash-name">Employees</span>
            </a>
            <div
              id="collapseTwo"
              className="collapse show"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Components:</h6>
                <a className="collapse-item" href="#!">
                  View Employees
                </a>
                <a className="collapse-item" href="#!">
                  Add Employee
                </a>
              </div>
            </div>
          </li>
          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />
          {/* <!-- Nav Item - Utilities Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#!"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <i id="sidenav-headicon" className="bx bxs-file"></i>
              <span id="dash-name">Reports</span>
            </a>
            <div
              id="collapseUtilities"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
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
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* <!-- Sidebar Toggle (Topbar) --> */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>
              {/* <!-- Topbar Navbar --> */}
              <ul className="navbar-nav ml-auto">
                {/* <!-- Nav Item - User Information --> */}
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
                  {/* <!-- Dropdown - Alerts --> */}
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
                    {/* More alerts... */}
                  </div>
                </li>
                {/* <!-- Nav Item - User Information --> */}

                {/*Topbar Search */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
                {/* Nav Item - User Information */}
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
                      Valerie Luna
                    </span>
                  </a>
                  {/* <!-- Dropdown - User Information --> */}
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
            {/* <!-- End of Topbar --> */}
            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/* <!-- Page Heading --> */}
              <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
              <p className="mb-4">
                Welcome to the Supervisor Dashboard. Here you can view employee
                reports and statistics.
              </p>

              {/* <!-- Pending Requests Card Example --> */}
              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Pending Requests
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                          18
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-comments fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End of Main Content --> */}
          </div>
          {/* <!-- End of Content Wrapper --> */}
          {/* <!-- Scroll to Top Button--> */}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
          {/* <!-- Logout Modal--> */}
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
                  <a className="btn btn-primary" href="#!">
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End of Page Wrapper --> */}
        {/* <!-- Bootstrap core JavaScript--> */}
      </div>
    </div>
  );
}

export default ViewDashboard;
