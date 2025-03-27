import React, {useState} from 'react';
import './SupervisorLanding.css';
import logo from '../../Components/Images/CashPilot.png';




function EmployeeLanding() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="SupervisorLanding">
            <header className="Supervisor-header">
            <nav className="navbar">
                      <div className="navbar-logo-container">
                        <img src={logo} className="navbar-logo" alt="logo" />
                      </div>
                      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                      </div>
                      <div className={`navbar-dropdowns ${menuOpen ? "show" : ""}`}>
                        <div className="menuDrop">
                          <button className="Buttonoption">Pending Approvals</button>
                        </div>
                        <div className="menuDrop">
                          <button className="Buttonoption">TBA</button>
                          
                        </div>
                        <div className="menuDrop">
                          <button className="Buttonoption">My Reports</button>                       
                      </div>
                      </div>
                      
                    </nav>
            </header>
            <h1 className="headline">Welcome to the Admin Landing Page</h1>            
    </div>
 );
}

export default EmployeeLanding;