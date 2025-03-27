// RegisterLanding.js file
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterLanding.css';

function RegisterLanding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    terms: false,
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
  });

  // Check if password and confirmPassword match
  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setErrors({ passwordMismatch: true });
    } else {
      setErrors({ passwordMismatch: false });
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final check before submitting
    if (formData.password !== formData.confirmPassword) {
      setErrors({ passwordMismatch: true });
      return;
    }

    // Prepare data to send (omit confirmPassword)
    const { username, email, password, role } = formData;
    const payload = { username, email, password, role };

    try {
      const response = await fetch('https://cen4020-software-engineering-group-3.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Handle error responses
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        return;
      }

      const data = await response.json();
      console.log('User created successfully:', data);

      // After a successful registration, navigate to the Sign In page
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div className="form-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="form-container">
              <h3 className="title">Register</h3>
              <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>User Name</label>
                  <input 
                    type="text"
                    name="username" 
                    className="form-control" 
                    placeholder="User Name" 
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input 
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.passwordMismatch && (
                    <p className="error-message">Passwords do not match.</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <div className="select-wrapper">
                    <select
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Select Your Role</option>
                      <option value="employee">Employee</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="system-administrator">System Administrator</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                  </div>
                </div>
                <div className="check-terms">
                  <input 
                    type="checkbox"
                    name="terms"
                    className="checkbox"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="check-label">I agree to the terms</span>
                </div>
                <span className="signin-link">
                  Already have an account? Click here to <a href="/LogIn">Log In</a>
                </span>
                <button type="submit" className="btn signup">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default registerLanding;