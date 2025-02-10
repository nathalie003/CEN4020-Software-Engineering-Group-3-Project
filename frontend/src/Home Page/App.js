import React, { useState } from 'react';
import './App.css';
import logo from '../expense logo image.png'; // Assuming you have a logo.png in the src folder

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // Track which modal is open

  const toggleModal = (type = '') => {
    setModalType(type);
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>MoneyCat: Expenses Made Easy</h1>
        <p className="subtitle">Simplify your financial life.</p>
        <div className="buttons">
          <button className="btn create-account-btn" onClick={() => toggleModal('createAccount')}>
            Get Started
          </button>
          <button className="btn login-btn" onClick={() => toggleModal('logIn')}>
            Sign In
          </button>
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
    </div>
  );
}

export default App;
