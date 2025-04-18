import React, { useEffect, useState } from 'react';
import './SupervisorExpenseReportList.css';

function SupervisorExpenseReportList({ supervisorId }) {
  const [reports, setReports]           = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionComment, setActionComment]   = useState('');

  // 1) load pending reports
  useEffect(() => {
    if (!supervisorId) return;
    fetch(`http://localhost:5000/api/supervisor/${supervisorId}/pending-expense-reports`)
      .then(res => res.json())
      .then(setReports)
      .catch(err => console.error(err));
  }, [supervisorId]);

  // 2) view details
  const handleView = reportId => {
    fetch(`http://localhost:5000/api/expense-reports/${reportId}`)
      .then(res => res.json())
      .then(data => {
        setSelectedReport(data);
        setActionComment('');
      })
      .catch(err => console.error(err));
  };

  // 3) approve / deny / request info
  const handleAction = actionType => {
    if (!selectedReport) return;
    const payload = {
      action: actionType,
      comment: actionType === 'request_info' ? actionComment : ''
    };
    fetch(`http://localhost:5000/api/expense-reports/${selectedReport.id}/action`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(updated => {
        setReports(r => r.filter(x => x.id !== updated.id));
        setSelectedReport(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="SupervisorExpenseReportContainer">
      <h2>Pending Employee Reports</h2>
      {reports.length === 0
        ? <p>No pending reports.</p>
        : reports.map(r => (
            <div key={r.id} className="SupervisorReportCard">
              <div className="CardInfo">
                <h4>{r.employeeName} — #{r.id}</h4>
                <p>Submitted: {new Date(r.dateSubmitted).toLocaleDateString()}</p>
              </div>
              <button onClick={() => handleView(r.id)}>Review</button>
            </div>
          ))
      }

      {selectedReport && (
        <div className="ModalOverlay">
          <div className="ModalContent">
            <h3>Report #{selectedReport.id}</h3>
            <p><strong>Employee:</strong> {selectedReport.employeeName}</p>
            <p><strong>Date:</strong> {new Date(selectedReport.dateSubmitted).toLocaleDateString()}</p>

            <h4>Items</h4>
            {selectedReport.receipts.map(item => (
              <div key={item.id} className="ReceiptItem">
                <p>{item.description} — ${item.amount.toFixed(2)}</p>
              </div>
            ))}

            <div className="ActionSection">
              <button onClick={() => handleAction('approve')}>Approve</button>
              <button onClick={() => handleAction('deny')}>Deny</button>

              <div className="RequestMoreInfo">
                <button onClick={() => handleAction('request_info')}>
                  Request More Info
                </button>
                <textarea
                  placeholder="Comments…"
                  value={actionComment}
                  onChange={e => setActionComment(e.target.value)}
                />
              </div>

              <button className="CancelBtn" onClick={() => setSelectedReport(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupervisorExpenseReportList;
