import React, { useState, useEffect } from 'react';
import './EmployeeLanding.css';
import logo from '../../Components/Images/CashPilot.png';


function EmployeeLanding() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [manualEntry, setManualEntry] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        console.log("Username from sessionStorage:", username); // Debugging line
      
        if (username) {
          fetch(`http://localhost:5000/api/user/${username}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error("Error fetching user:", err));
        }
      }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please upload a receipt image.');
            return;
        }

        const formData = new FormData();
        formData.append('receiptImage', selectedFile);

        try {
            const response = await fetch('/api/upload-receipt', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.location.href ='/autofilled-form'; // Redirect to autofilled form
            } else {
                alert('Failed to upload receipt.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the receipt.');
        }
    };

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        window.location.href ='/manual-entry-form';
      
        // try {
        //     const response = await fetch('/api/upload-manual', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ receiptData: manualEntry }),
        //     });

        //     if (response.ok) {
        //         window.location.href ='/manual-entry-form'; // Redirect to manual entry form
        //     } else {
        //         alert('Failed to submit manual entry.');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('An error occurred while submitting the manual entry.');
        // }
    };

    const traveltoSup = async (e) => {
      e.preventDefault();
      window.location.href ='/supervisor-landing';
    };

    return (
        <div className="EmployeeLanding">
            <header className="Employee-header">
                <nav className="navbar">
                    <div className="navbar-logo-container">
                        <img src={logo} className="navbar-logo" alt="logo" />
                    </div>
                    <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </div>
                    <div className={`navbar-dropdowns ${menuOpen ? "show" : ""}`}>
                        <div className="menuDrop">
                            <button className="Buttonoption" onClick={() => document.getElementById('fileInput').click()}>Camera Capture</button>
                            <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                            <button className="Buttonoption" onClick={handleFileSubmit}>TBA</button>
                        </div>
                        <div className="menuDrop">
                            <form onSubmit={handleManualSubmit}>
                                
                                <button className="Buttonoption" type="submit">Submit Manual Entry</button>
                            </form>
                        </div>

                        <div className="menuDrop">
                            <button className='Buttonoption' onClick={traveltoSup}>Supervisor Page</button>
                        </div>
                    </div>
                </nav>
            </header>
            <h1 className="headline">Welcome to the Employee Landing Page</h1>
            {user ? (
                <h2>Welcome, {user.username}!</h2>
                ) : (
                <h1>Loading user info...</h1>
                )}
        </div>
    );
}

export default EmployeeLanding;
