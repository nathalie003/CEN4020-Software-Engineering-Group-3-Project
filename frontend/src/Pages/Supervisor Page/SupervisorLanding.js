import React, {useState, useEffect} from 'react';
import './SupervisorLanding.css';
import logo from '../../Components/Images/CashPilot.png';
import ReceiptUploadForm from '../Employee Page/ReceiptUploadForm.js';
import ManualEntryForm from '../Employee Page/ManualEntryForm.js';
import ReceiptConfirmation from '../Employee Page/ReceiptConfirmation.js';

function SupervisorLanding() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [view, setView] = useState("expenseReportList"); // default view
    const [selectedFile, setSelectedFile] = useState(null);
    const [manualEntry, setManualEntry] = useState('');
    const [receiptSummary, setReceiptSummary] = useState(null);
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
      const response = await fetch('http://localhost:5000/api/receipts/confirm-receipt', {
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

    return (
      <div className="SupervisorLanding">
      <div className="Supervisor-sidebar">
        <div className="contentHolder">
          <div className="navbar-logo-container">
            <img src={logo} className="navbar-logo" alt="logo" />
          </div>
          <nav className="navbar">
            <button className="Buttonoption" onClick={() => setView("uploadReceipt")}>Upload Receipt</button>
            <button className="Buttonoption" onClick={() => setView("expenseReportList")}>View Reports</button>
            <button className="Buttonoption" onClick={() => setView("employeeExpenses")}>Employee Reports</button>
          </nav>
        </div>
      </div>
      <div className="Supervisor-main">
        {view === "expenseReportList" && (
          <div className="expenseReportList">
            <h2>Expense Report List</h2>
            {/* Placeholder for the expense report list */}
            <p>Here you can view your expense reports.</p>
          </div>
        )}
        {view === "uploadReceipt" && (
          <div className="uploadReceipt">
            <div className="uploadReceiptHeader">
              <h2>Upload Receipt</h2>
            </div>
            <div className="uploadReceiptContent">
                <ReceiptUploadForm onFileChange={handleFileChange} onFileSubmit={handleFileSubmit} />
                <ManualEntryForm/>
            </div>
          </div>
        )}
        {view === "employeeExpenses" && (
          <div className="employeeExpenses">
            <h2>Employee Expense Reports</h2>
            {/* Placeholder for employee expense reports */}
            <p>Here you can view employee expense reports.</p>
          </div>
        )}
        {receiptSummary && (
          <ReceiptConfirmation receiptData={receiptSummary} onConfirm={handleConfirm} />
        )}
      </div>
    </div>
 );
}

export default SupervisorLanding;