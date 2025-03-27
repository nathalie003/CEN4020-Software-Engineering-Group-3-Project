/*App.js FILE*/
import React, {useState} from 'react';
//import './App.css';
import HomeLanding from './Pages/HomePage/HomeLanding';
import logo from './Components/Images/CashPilot.png';
const port = process.env.PORT || 4000;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">         
          <div className="navbar-logo-container">
            <img src={logo} className="navbar-logo" alt="logo" />
          </div>
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        </nav>
      </header>

      <HomeLanding />
    </div>
  );
}

export default App;


