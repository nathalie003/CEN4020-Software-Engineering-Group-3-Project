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
                                <h3 className="login-title">Welcome Back</h3>
                                <span className="login-description">Log in below</span>
                                
                                <div className="login-form-group">
                                    
                                    <input class="form-control" type="email" placeholder="Enter your Email"></input>
                                </div>
                                <div className="login-form-group">
                                
                                <input class="form-control" type="password" placeholder="Enter your Password"/>
                                </div>
                                <button className="login-btn">Login</button>
                                <span className="login-signup-link">
                                     Not a user? Create an account <a className= "route-to-signUp" href="/signUp"> here</a>
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