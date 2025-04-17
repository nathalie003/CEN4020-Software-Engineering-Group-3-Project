// ReceiptConfirmation.js
import React from 'react';
import './ReceiptConfirmation.css'; // Create this CSS file for styling

function ReceiptConfirmation({ receiptData, onConfirm }) {
  return (
    <div className="receipt-summary-card">
      <h2>Receipt Summary</h2>
      <div className="receipt-detail">
        <strong>Total:</strong> ${receiptData.total}
      </div>
      <div className="receipt-detail">
        <strong>Time:</strong> {receiptData.time}
      </div>
      <div className="receipt-detail">
        <strong>Date:</strong> {receiptData.date}
      </div>
      <div className="receipt-detail">
        <strong>Payment Method:</strong> {receiptData.paymentMethod}
      </div>
      <div className="receipt-detail">
        <strong>Address:</strong> {receiptData.address}
      </div>
      <div className="receipt-detail">
        <strong>Phone:</strong> {receiptData.phone}
      </div>
      {receiptData.items && receiptData.items.length > 0 && (
        <div className="items-section">
          <h3>Items Purchased</h3>
          <table className="receipt-items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>${Number(item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button className="confirm-button" onClick={onConfirm}>Confirm Receipt</button>
    </div>
  );
}

export default ReceiptConfirmation;
