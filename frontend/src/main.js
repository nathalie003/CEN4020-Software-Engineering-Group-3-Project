import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import RegisterLanding from "./Pages/Home Page/RegisterLanding";
import LoginLanding from "./Pages/Home Page/LoginLanding";
import ServicesLanding from "./Pages/Home Page/ServicesLanding";
import AdminLanding from "./Pages/Admin Page/AdminLanding";
import EmployeeLanding from "./Pages/Employee Page/EmployeeLanding";
import SupervisorLanding from "./Pages/Supervisor Page/SupervisorLanding";
import ViewDashboard from "./Pages/Supervisor Page/ViewDashboard";
import ManualEntryForm from "./Pages/Employee Page/ManualEntryForm";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterLanding />} />
        <Route path="/login" element={<LoginLanding />} />
        <Route path="/services" element={<ServicesLanding />} />
        <Route path="/admin-landing" element={<AdminLanding />} />
        <Route path="/employee-landing" element={<EmployeeLanding />} />
        <Route path="/dashboard" element={<ViewDashboard />} />
        <Route path="/manual-entry-form" element={<ManualEntryForm />} />{" "}
        {/* Manual entry form route */}
        <Route path="/supervisor-landing" element={<SupervisorLanding />} />
      </Routes>
    </Router>
  );
}

export default Main;
