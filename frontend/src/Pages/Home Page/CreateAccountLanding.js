import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccountLanding.css'; // Import the necessary CSS file

function CreateAccountLanding() {

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
    
    const handleSignUp = (e) => {
        e.preventDefault();

        navigate("/signIn");
    };


    useEffect(() => {
        // Check if the password and confirmPassword match
        if (formData.password !== formData.confirmPassword) {
            setErrors({ passwordMismatch: true });
        } else {
            setErrors({ passwordMismatch: false });
        }
    }, [formData.password, formData.confirmPassword]); // Trigger this effect when either password field changes

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final check before submitting (password mismatch validation)
        if (formData.password !== formData.confirmPassword) {
            setErrors({ passwordMismatch: true });
            return;
        }

        // Form is valid, submit data (here you can add your form submission logic)
        console.log('Form data:', formData);
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
                        name= "username" 
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
                    <div className='select-wrapper'>
                        <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                            defaultValue="">
                                <option value="" disabled>Select Your Role</option>
                                <option value="employee">Employee</option>
                                <option value="supervisor">Supervisor</option>
                                <option value="system-administrator">System Administrator</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
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
                <button className="btn signup" onClick={handleSignUp}>Create Account</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}

export default CreateAccountLanding;