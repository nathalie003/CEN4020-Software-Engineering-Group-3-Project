import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import registerLanding from './Pages/Home Page/registerLanding.js';
import loginLanding from './Pages/Home Page/loginLanding.js';
import ServicesLanding from './Pages/Home Page/ServicesLanding.js';
import AdminLanding from './Pages/Admin Page/AdminLanding.js';
import EmployeeLanding from './Pages/Employee Page/EmployeeLanding.js';
import SupervisorLanding from './Pages/Supervisor Page/SupervisorLanding.js';
import AutoFilledForm from './Pages/Employee Page/AutoFilledForm.js';
import ManualEntryForm from './Pages/Employee Page/ManualEntryForm.js';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<App />} />
                <Route path="/" element={<App />} />
                <Route path="/register" element = {<registerLanding />} />
                <Route path="/login" element = {<loginLanding />} />
                <Route path="/services" element={<ServicesLanding />} /> 
                <Route path="/admin-landing" element={<AdminLanding />} />
                <Route path="/employee-landing" element={<EmployeeLanding />} />     
                <Route path="/autofilled-form" element={<AutoFilledForm />} /> {/* Autofilled form route */}
                <Route path="/manual-entry-form" element={<ManualEntryForm />} /> {/* Manual entry form route */}
                <Route path="/supervisor-landing" element={<SupervisorLanding />} /></Routes>
        </Router>
    );
}

export default Main;
