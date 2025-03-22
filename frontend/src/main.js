import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import AdminLanding from './Pages/Admin Page/AdminLanding';
import EmployeeLanding from './Pages/Employee Page/EmployeeLanding';
import SupervisorLanding from './Pages/Supervisor Page/SupervisorLanding';
import AutoFilledForm from './Pages/Employee Page/AutoFilledForm';
import ManualEntryForm from './Pages/Employee Page/ManualEntryForm';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<App />} />
                <Route path="/" element={<App />} />
                <Route path="/admin-landing" element={<AdminLanding />} />
                <Route path="/employee-landing" element={<EmployeeLanding />} />     
                <Route path="/autofilled-form" element={<AutoFilledForm />} /> {/* Autofilled form route */}
                <Route path="/manual-entry-form" element={<ManualEntryForm />} /> {/* Manual entry form route */}
                <Route path="/supervisor-landing" element={<SupervisorLanding />} /></Routes>
        </Router>
    );
}

export default Main;
