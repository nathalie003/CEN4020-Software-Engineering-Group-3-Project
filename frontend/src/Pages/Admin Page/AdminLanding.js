import React, {useState} from 'react';
import './AdminLanding.css';
import logo from '../../Components/Images/CashPilot.png';

function AdminLanding() {
    const [menuOpen, setMenuOpen] = useState(false);

    const traveltoEmp = (e) => {
        e.preventDefault();
        window.location.href = '/employee-landing'; 
      };
    return (
        <div className="AdminLanding">
            <header className="Admin-header">
            <nav className="navbar">
                      <div className="navbar-logo-container">
                        <img src={logo} className="navbar-logo" alt="logo" />
                      </div>
                      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                      </div>
                      <div className={`navbar-dropdowns ${menuOpen ? "show" : ""}`}>
                        <div className="menuDrop">
                          <button className="Buttonoption">User Permissions</button>
                        </div>
                        <div className="menuDrop">
                          <button className="Buttonoption">Settings</button>
                          
                        </div>
                        <div className="menuDrop">
                            <button className='Buttonoption' onClick={traveltoEmp}>Employee Page</button>
                        </div>
                        <div className="menuDrop">
                          <button className="Buttonoption">TBA</button>
                          
                      </div>
                      </div>
                      
                    </nav>
            </header>
            <h1 className="headline">Welcome to the Admin Landing Page</h1>            
    </div>
 );
}

export default AdminLanding;