import React, { useState } from 'react';
import './App.css';
import logo from '../Cash Pilot New.png'; // Assuming you have a logo.png in the src folder

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); 
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu state

  const toggleModal = (type = '') => {
    setModalType(type);
    setShowModal(!showModal);
  };



  return (
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
                <a href="#">Feature 1</a>
                <a href="#">Feature 2</a>
                <a href="#">Feature 3</a>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">About</button>
              <div className="dropdown-content">
                <a href="#">Our Story</a>
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

          {/* Buttons (Always Stay on the Right) */}
          <div className="buttons">
            <button className="btn create-account-btn" onClick={() => toggleModal('createAccount')}>
              Get Started
            </button>
            <button className="btn login-btn" onClick={() => toggleModal('logIn')}>
              Sign In
            </button>
          </div>
        </nav>

        <h1>MoneyCat: Expenses Made Easy</h1>
        <p className="subtitle">Simplify your financial life.</p>
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
    </div>
  );
}   

export default App;