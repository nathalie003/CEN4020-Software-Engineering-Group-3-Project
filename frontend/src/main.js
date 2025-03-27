/*main.js FILE*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import CreateAccountLanding from './Pages/HomePage/CreateAccountLanding.js';
import LogInLanding from './Pages/HomePage/LogInLanding.js';
import AdminLanding from './Pages/AdminPage/AdminLanding';
import EmployeeLanding from './Pages/EmployeePage/EmployeeLanding';
import SupervisorLanding from './Pages/SupervisorPage/SupervisorLanding';
import AutoFilledForm from './Pages/EmployeePage/AutoFilledForm';
import ManualEntryForm from './Pages/EmployeePage/ManualEntryForm';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<App />} />
                <Route path="/" element={<App />} />
                <Route path = "/signUp" element = {<CreateAccountLanding />} />
                <Route path = "/logIn" element = {<LogInLanding />} />
                {/* <Route path="/services" element={<OurServices />} /> */}
                <Route path="/admin-landing" element={<AdminLanding />} />
                <Route path="/employee-landing" element={<EmployeeLanding />} />     
                <Route path="/autofilled-form" element={<AutoFilledForm />} /> {/* Autofilled form route */}
                <Route path="/manual-entry-form" element={<ManualEntryForm />} /> {/* Manual entry form route */}
                <Route path="/supervisor-landing" element={<SupervisorLanding />} /></Routes>
        </Router>
    );
}

export default Main;
