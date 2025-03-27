<<<<<<< HEAD
/*App.js FILE*/
import React, {useState} from 'react';
//import './App.css';
import HomeLanding from './Pages/HomePage/HomeLanding';
import logo from './Components/Images/CashPilot.png';
=======
import React, {useState} from 'react';
//import './App.css';
import HomeLanding from './Pages/Home Page/HomeLanding';
import logo from './Components/Images/CashPilot.png';


>>>>>>> 1b62c15d7c9c3c585d686a69d1d5391c6fc2b1cc

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">         
          <div className="navbar-logo-container">
<<<<<<< HEAD
            <img src={logo} className="navbar-logo" alt="navbar logo" />
=======
            <img src={logo} className="navbar-logo" alt="logo" />
>>>>>>> 1b62c15d7c9c3c585d686a69d1d5391c6fc2b1cc
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


