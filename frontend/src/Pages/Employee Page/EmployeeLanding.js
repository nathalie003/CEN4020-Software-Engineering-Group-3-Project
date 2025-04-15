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
      alert('Please upload a receipt PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('receiptPDF', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/upload-receipt', {
        method: 'POST',
        body: formData,
      });
      const json = await response.json();
      if (response.ok) {
        // Instead of redirecting immediately, store the receipt summary
        setReceiptSummary(json.receiptData);
      } else {
        alert('Failed to process receipt.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the receipt.');
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/confirm-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiptData: receiptSummary }),
      });
      const json = await response.json();
      if (response.ok) {
        alert(json.message);
        // Optionally, clear the receipt summary or navigate away
        setReceiptSummary(null);
      } else {
        alert('Failed to confirm receipt: ' + json.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while confirming the receipt.');
    }
  };

  const traveltoSup = async (e) => {
    e.preventDefault();
    window.location.href = '/supervisor-landing';
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
              <button className="Buttonoption" onClick={() => document.getElementById('fileInput').click()}>
                Upload Receipt PDF
              </button>
              <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button className="Buttonoption" onClick={handleFileSubmit}>Submit file</button>
            </div>
            <div className="menuDrop">
              <button className='Buttonoption' onClick={traveltoSup}>Supervisor Page</button>
            </div>
          </div>
        </nav>
      </header>
      <h1 className="headline">Welcome to the Employee Landing Page</h1>
      {/* Display confirmation if receipt summary exists */}
      {receiptSummary && (
        <ReceiptConfirmation receiptData={receiptSummary} onConfirm={handleConfirm} />
      )}
    </div>
  );
}

export default EmployeeLanding;
