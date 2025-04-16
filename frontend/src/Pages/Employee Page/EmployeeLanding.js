//EmployeeLanding.js
import React, { useState } from 'react';
import ReceiptUploadForm from './ReceiptUploadForm';
import ReceiptConfirmation from './ReceiptConfirmation';
import './EmployeeLanding.css';
import logo from '../../Components/Images/CashPilot.png';

export default function EmployeeLanding() {
  const [view, setView] = useState('uploadReceipt');
  const [receiptSummary, setReceiptSummary] = useState(null);

  const handleFileSubmit = async (file) => {
    const formData = new FormData();
    formData.append('receiptPDF', file);
    try {
      const res = await fetch('http://35.225.79.158:5000/api/upload-receipt', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (res.ok) {
        setReceiptSummary(json.receiptData);
      } else {
        alert('Failed to process receipt: ' + (json.message || res.statusText));
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while processing the receipt.');
    }
  };

  const handleConfirm = async () => {
    try {
      const res = await fetch('http://35.225.79.158:5000/api/confirm-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiptData: receiptSummary }),
      });
      const json = await res.json();
      if (res.ok) {
        alert(json.message);
        setReceiptSummary(null);
      } else {
        alert('Failed to confirm receipt: ' + (json.message || res.statusText));
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while confirming the receipt.');
    }
  };

  return (
    <div className="EmployeeLanding">
      <aside className="Employee-sidebar">
        <img src={logo} className="navbar-logo" alt="logo" />
        <button onClick={() => setView('uploadReceipt')}>Upload Receipt</button>
        <button onClick={() => setView('expenseReportList')}>View Reports</button>
      </aside>

      <main className="Employee-main">
        {view === 'uploadReceipt' && !receiptSummary && (
          <section>
            <h2>Upload Receipt</h2>
            <ReceiptUploadForm onFileSubmit={handleFileSubmit} />
          </section>
        )}
        {receiptSummary && (
          <ReceiptConfirmation
            receiptData={receiptSummary}
            onConfirm={handleConfirm}
          />
        )}
        {view === 'expenseReportList' && !receiptSummary && (
          <section>
            <h2>Expense Report List</h2>
            <p>Here you can view your expense reports.</p>
          </section>
        )}
      </main>
    </div>
  );
}
