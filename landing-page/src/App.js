import React, { useState } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Our Website</h1>
        <div className="buttons">
          <button className="btn create-account-btn">Create Account</button>
          <button className="btn login-btn" onClick={toggleModal}>
            Log In
          </button>
        </div>
      </header>

      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Log In</h2>
            <form className="login-form">
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="login-btn-submit">Log In</button>
            </form>
            <button className="close-btn" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
