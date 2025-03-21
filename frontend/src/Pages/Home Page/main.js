import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Import the App component
import AdminLanding from '../Admin Page/AdminLanding';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-landing" element={<AdminLanding />} />
      </Routes>
    </Router>
  );
}

export default Main;
