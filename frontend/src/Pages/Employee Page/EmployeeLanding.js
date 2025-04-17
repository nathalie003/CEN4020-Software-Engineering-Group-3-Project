//EmployeeLanding.js
import React, { useState, useEffect } from 'react';
import ReceiptConfirmation from './ReceiptConfirmation.js';
import './EmployeeLanding.css';
import logo from '../../Components/Images/CashPilot.png';
import ManualEntryForm from './ManualEntryForm.js';
import ReceiptUploadForm from './ReceiptUploadForm.js';

function EmployeeLanding() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [manualEntry, setManualEntry] = useState('');
    const [receiptSummary, setReceiptSummary] = useState(null);
    const [user, setUser] = useState(null);
    const [manualData, setManualData] = useState(null);

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

  const handleFileSubmit = async (file) => {
    if (!file) {
      alert('Please upload a receipt PDF file.');
      return;
    }
    const formData = new FormData();
    formData.append('receiptImage', file);
    try {
      const response = await fetch('http://localhost:5000/api/upload-receipt', {
        method: 'POST',
        body: formData,
      });
      const json = await response.json();
      if (response.ok) {
        setManualData(json.receiptData);
      } else {
        alert('Failed to process receipt.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('A error occurred while processing the receipt.');
    }
  };
  // 1. handler
  const handleSaveToDb = async (formData) => {
    try {
      const res = await fetch("http://localhost:5000/api/confirm-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        alert("Saved! receipt ID " + json.receiptId);
        setManualData(null);      // clear the form / reset state
      } else {
        alert("DB error: " + json.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network / server error.");
    }
  };
  // const traveltoSup = async (e) => {
  //   e.preventDefault();
  //   window.location.href = '/supervisor-landing';
  // };

  const [view, setView] = useState("expenseReportList"); // default view

  return (
    <div className="EmployeeLanding">
      <div className="Employee-sidebar">
        <div className="contentHolder">
          <div className="navbar-logo-container">
            <img src={logo} className="navbar-logo" alt="logo" />
          </div>
          <nav className="navbar">
            <button className="Buttonoption" onClick={() => setView("uploadReceipt")}>Upload Receipt</button>
            <button className="Buttonoption" onClick={() => setView("expenseReportList")}>View Reports</button>
          </nav>
        </div>
      </div>
      <div className="Employee-main">
        {view === "expenseReportList" && (
          <div className="expenseReportListContainer">
          <UserExpenseReportList user={user} />
         </div>
        )}
        {view === "uploadReceipt" && (
          <div className="uploadReceiptContent">
            <div className="uploadReceiptHeader">
              <h2>Upload Receipt</h2>
            </div>
            <div className="uploadReceiptContent">
            <ReceiptUploadForm
              onFileSelect={(file) => {
                setSelectedFile(file);
                handleFileSubmit(file);
              }}
            />
            {/* render the manual form immediately, before any OCR result */}
            <ManualEntryForm 
                 initialData={manualData}
                 onSubmit={handleSaveToDb} 
                //  onSubmit={handleConfirm}
            />
            </div>
          </div>
        )}
        {/* {receiptSummary && 
          <ReceiptConfirmation receiptData={receiptSummary} onConfirm={handleConfirm} />
        } */}
      </div>
    </div>
  );
}

export default EmployeeLanding;
