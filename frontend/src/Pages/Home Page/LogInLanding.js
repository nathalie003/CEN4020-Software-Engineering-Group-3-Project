import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogInLanding.css"; // Import the necessary CSS file

function LogInLanding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const role = result.role;
        if (role === 1) {
          navigate("/admin-landing");
        } else if (role === 2) {
          navigate("/supervisor-landing");
        } else if (role === 3) {
          navigate("/employee-landing");
        }
      } else {
        setErrorMessage(result.error || "Invalid login credentials");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-bg">
      <div className="login-container">
        <div className="login-row">
          <div className="login-col">
            <div className="login-form-container">
              <form className="login-form" onSubmit={handleSubmit}>
                <h3 className="login-title">Welcome Back</h3>
                <span className="login-description">Log in below</span>

                <div className="login-form-group">
                  <input
                    className="form-control"
                    name="username"
                    type="username"
                    placeholder="Enter your Username"
                    value={formData.username}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="login-form-group">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="login-btn">Login</button>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <span className="login-signup-link">
                  Not a user? Create an account{" "}
                  <a className="route-to-signUp" href="/register">
                    {" "}
                    here
                  </a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInLanding;
