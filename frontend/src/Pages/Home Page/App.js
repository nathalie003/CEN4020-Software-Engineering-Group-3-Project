import React, { useState, useEffect } from 'react';
import './App.css';
import logo from '../../Components/Images/CashPilot.png';
import firstPic from '../../Components/Images/test.jpg';
import Main from './main';
//import { useNavigate } from 'react-router-dom';

function App() {
  //const navigate = useNavigate()
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); 
  // Track mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);
  // Track the scaling of the green box
  const [scale, setScale] = useState(1);
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [loginError, setLoginError] = useState(false); // State for login error


  // Fetch data from the backend endpoint
  
  // useEffect(() => {
  //   fetch('http://localhost:3000/')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       setData(data);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  const toggleModal = (type = '') => {
    setModalType(type);
    setShowModal(!showModal);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href ='/admin-landing';
    // // Validate email and password
    // const user = data.find(
    //   (user) => user.email === email && user.password === password
    // );
    // if (user) {
    //   window.location.href = '/admin-landing'; // Redirect to landing page on successful login
    // } else {
    //   setLoginError(true); // Show error message on unsuccessful login
    // }
  };

  return (
    <>
    <Main/> {/**Handling in main */}
    {/* Table to display database data
    <div style={{ padding: '50px' }}>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((d, i) => (
              <tr key={i}>
                <td>{d.userid}</td>
                <td>{d.username}</td>
                <td>{d.password}</td>
                <td>{d.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              
            </tr>
          )}
        </tbody>
      </table>
    </div> */}

    
    <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="navbar-logo-container">
              <img src={logo} className="navbar-logo" alt="logo" />
            </div>
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
            <div className={`navbar-dropdowns ${menuOpen ? "show" : ""}`}>
              {/* Dropdowns */}
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

          <div className="green-box">
            <img src={firstPic} alt="Green Box Image" className="green-box-img" />
          </div>
        </header>

        {showModal && (
          <div className="modal-overlay" onClick={() => toggleModal()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              {modalType === 'logIn' ? (
                <>
                  <h2>Welcome Back!</h2>
                  <form className="login-form" onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="submit" className="login-btn-submit">Sign In</button>
                    {loginError && (
                      <div className="error-message">
                        Log in unsuccessful, please try again.
                      </div>
                    )}
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
      </div>
    </>
  );
}

export default App;