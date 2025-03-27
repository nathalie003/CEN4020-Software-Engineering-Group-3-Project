import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccountLanding.css";

function CreateAccountLanding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
  });

  useEffect(() => {
    // Check if the password and confirmPassword match
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
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final check before submitting (password mismatch validation)
    if (formData.password !== formData.confirmPassword) {
      setErrors({ passwordMismatch: true });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const data = await response.json();
      console.log("Account created:", data);

      navigate("/logIn");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-bg">
      <div className="signup-container">
        <div className="signup-row">
          <div className="signup-col">
            <div className="signup-form-container">
              <form className="signup-form" onSubmit={handleSubmit}>
                <h3 className="signup-title">Create an Account</h3>

                <div className="signup-form-group">
                  <label>Username</label>
                  <input
                    className="form-control"
                    type="username"
                    name="username"
                    placeholder="Enter your Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>

                <div className="signup-form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>

                <div className="signup-form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="signup-form-group">
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

                <div className="signup-form-group">
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
                      <option value="" disabled>
                        Select Your Role
                      </option>
                      <option value="1">System Administrator</option>
                      <option value="2">Supervisor</option>
                      <option value="3">Employee</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </div>
                </div>
                <button className="signup-btn">Create Account</button>
                <span className="signin-link">
                  Already have an account? Click{" "}
                  <a className="route-to-logIn" href="/LogIn">
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

export default CreateAccountLanding;
