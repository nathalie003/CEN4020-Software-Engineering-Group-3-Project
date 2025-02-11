import React, { useState, useEffect } from 'react';
import './App.css';
import logo from '../../Components/Images/CashPilot.png';
import firstPic from '../../Components/Images/test.jpg';
function App() {
   //need for mysql server
   const [data, setData] = useState([])
   useEffect(()=> {
      fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
   }, [])


  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); 
  // Track mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);
  // Track scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  // Track the scaling of the green box
  const [scale, setScale] = useState(1);

  const toggleModal = (type = '') => {
    setModalType(type);
    setShowModal(!showModal);
  };

  // Update scroll position and scaling on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      
      // Adjust the scale value based on scroll position
      const newScale = Math.min(1 + scrollY / 500, 3);
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    //need this for mysql
      <><div style={{ padding: "50px" }}>
      <table>
        <thead>
          <tr>
            <th>USERID</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.userid}</td>
              <td>{d.username}</td>
              <td>{d.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="navbar-logo-container">
              <img src={logo} className="navbar-logo" alt="logo" />
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>

            {/* Dropdowns - Show/Hide Based on Menu State */}
            <div className={`navbar-dropdowns ${menuOpen ? "show" : ""}`}>
              <div className="dropdown">
                <button className="dropbtn">Features</button>
                <div className="dropdown-content">
                  <a href="#">Expense Capture</a>
                  <a href="#">Reporting and Analytics</a>
                  <a href="#">Role Based Access</a>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">About</button>
                <div className="dropdown-content">
                  <a href="#">Mission</a>
                  <a href="#">Team</a>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">Roles</button>
                <div className="dropdown-content">
                  <a href="#">User Roles</a>
                  <a href="#">Admin Roles</a>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="buttons">
              <button className="btn create-account-btn" onClick={() => toggleModal('createAccount')}>
                Get Started
              </button>
              <button className="btn login-btn" onClick={() => toggleModal('logIn')}>
                Sign In
              </button>
            </div>
          </nav>

          <h1 className="headline">Expense Tracking Made Easy</h1>

          {/* Green box with zoom-in effect on scroll */}
          <div
            className="green-box"
            style={{
              transform: `scale(${scale})`, // Apply the zoom-in effect
              transition: 'transform 0.2s ease-out' // Smooth zoom transition
            }}
          >
            <img src={firstPic} alt="Green Box Image" class="green-box-img" />
            <div id="square"></div>
            <div id="stretcher"></div>
          </div>
        </header>

        {showModal && (
          <div className="modal-overlay" onClick={() => toggleModal()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              {modalType === 'logIn' ? (
                <>
                  <h2>Welcome Back!</h2>
                  <form className="login-form">
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit" className="login-btn-submit">Sign In</button>
                  </form>
                </>
              ) : (
                <>
                  <h2>Create New Account</h2>
                  <form className="create-account-form">
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit" className="create-account-btn-submit">Sign Up</button>
                  </form>
                </>
              )}
              <button className="close-btn" onClick={() => toggleModal()}>Close</button>
            </div>
          </div>
        )}
      </div></>
  );
}

export default App;
