import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './LogInLanding.css'; // Import the necessary CSS file

function LogInLanding() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        terms: false,
    });

    const [errors, setErrors] = useState({
        passwordMismatch: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form data:', formData);
        navigate("/employee-landing")
    };

    return (
        <div className="form-bg">
            <div className="login-container">
                <div className="login-row">
                    <div className="login-col">
                        <div className="login-form-container">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <h3 className="login-title">Welcome Back!</h3>
                                <span className="login-description">Log in Below</span>
                                
                                <div className="login-form-group">
                                    
                                    <input 
                                        type="text"
                                        name="username" 
                                        className="login-form-control" 
                                        placeholder="User Name" 
                                        value={formData.username}
                                        required
                                    />
                                </div>
                                <div className="login-form-group">
                                
                                    <input 
                                        type="password"
                                        name="password"
                                        className="login-form-control"
                                        placeholder="Password"
                                        value={formData.password}
                                        required
                                    />
                                </div>
                                <button className="login-btn">Login</button>
                                <span className="login-signup-link">
                                    <strong>Or click here to </strong> <a href="/register">Register</a>
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