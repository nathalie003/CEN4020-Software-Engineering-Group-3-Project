//EmployeeLanding.js
import React, { useState, useEffect } from 'react';
import ReceiptConfirmation from './ReceiptConfirmation.js';
import './EmployeeLanding.css';
import logo from '../../Components/Images/CashPilot.png';
import ManualEntryForm from './ManualEntryForm.js';
import ReceiptUploadForm from './ReceiptUploadForm.js';
import UserExpenseReportList from './UserExpenseReportList.js';

function EmployeeLanding() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [manualEntry, setManualEntry] = useState('');
    const [receiptSummary, setReceiptSummary] = useState(null);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    useEffect(() => {
      if (user) {
        setUserId(user.user_id);
        console.log("User ID:", user.user_id);
      }
    }, [user]);


    const [manualData, setManualData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [notifications, setNotifications] = useState([]);

      // fetch categories once
  useEffect(() => {
      fetch("http://localhost:5000/api/category")
        .then(r => r.json())
        .then(data => setCategories(data))
        .catch(console.error);
   }, []);
   useEffect(() => {
    if (!userId || user) return; // Skip fetch if userId is missing or user is already set
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
    }, [user]);


  const handleFileSubmit = async (file) => {
    if (!file) {
      alert('Please upload a receipt PDF file.');
      return;
    }
    const formData = new FormData();
    formData.append('receiptImage', file);
    try {
      const response = await fetch('http://localhost:5000/api/receipts/upload-receipt', {
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
      const payload = {userId: sessionStorage.getItem("userId"), ...formData};
      const res = await fetch("http://localhost:5000/api/receipts/confirm-receipt", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(payload),
        });
      const json = await res.json();
      if (res.ok) {
        alert("Receipt was successfully uploaded, Receipt ID " + json.receiptId);
        setManualData(null);      // clear the form / reset state
        setNotifications(n => [
          {
            id:    Date.now(),
            message: `Receipt #${json.receiptId} uploaded → report created.`,
            time:    new Date()
          },
          ...n
        ]);
      } else {
        alert("DB errors: " + json.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network / server error.");
    }
  };

  const [view, setView] = useState("expenseReportList");
  const [viewKey, setViewKey] = useState(0);

  const handleViewChange = (newView) => {
    setView(newView);
    setViewKey(prev => prev + 1);
  };

  return (
    <div className="EmployeeLanding">
      <div className="Employee-sidebar">
        <div className="contentHolder">
          <div className="navbar-logo-container">
            <img src={logo} className="navbar-logo" alt="logo" />
          </div>
          <nav className="navbar">
            <button className="Buttonoption" onClick={() => handleViewChange("notifications")}>Notifications</button>
            <button className="Buttonoption" onClick={() => handleViewChange("uploadReceipt")}>Upload Receipt</button>
            <button className="Buttonoption" onClick={() => handleViewChange("expenseReportList")}>View Reports</button>
          </nav>
        </div>
      </div>
      <div className="Employee-main">
          {view === "notifications" && (
          <div className="notifications-view">
            <h3>Notifications</h3>
            {notifications.length === 0
              ? <p>No new notifications</p>
              : notifications.map(n => (
                  <div key={n.id} className="notification">
                    <p>{n.message}</p>
                    <small>{n.time.toLocaleString()}</small>
                  </div>
                ))
            }
          </div>
        )}
        {view === "expenseReportList" && (
          <div className="expenseReportListContainer">
            <UserExpenseReportList key={viewKey} user={user} />
         </div>
        )}
        {view === "uploadReceipt" && (
          <div className="uploadReceipt">
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
            <ManualEntryForm 
                 initialData={manualData}
                 categories={categories}
                 onSubmit={handleSaveToDb} 
            />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeLanding;
