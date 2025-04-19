import React, { useEffect, useState } from 'react';
import './UserExpenseReportList.css';
import EditableReport from "./ReportDisplays/EditableReport"
import StaticReport from "./ReportDisplays/StaticReport"


function UserExpenseReportList ({ user }) {

    const [expenseReports, setExpenseReports] = useState([]);

    useEffect(() => {
        if (user && user.user_id) {
        fetch(`http://localhost:5000/api/reports/getAllUserReports/${user.user_id}`)
            .then((res) => res.json())
            .then((data) => {
              console.log("Fetched data:", data);
              setExpenseReports(data.reports || []);
            })
            .catch((err) => console.error("Error fetching expense reports:", err));
        }
    }, [user]);

    function formatDate(timestamp) {
      if (!timestamp ||  timestamp === '') return '';
      const [year, month, day] = timestamp.slice(0, 10).split('-');
      console.log(`${month}-${day}-${year}`)
      return `${month}-${day}-${year}`;
    }

    const groupedReports = expenseReports.reduce((acc, report) => {
      const status = report.status || "Unknown";
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(report);
      return acc;
    }, {});

      const handleEditSubmit = async (formData) => {
        try {
          console.log("payload", formData);
          console.log("items:", formData.items[0]);
          const res = await fetch("http://localhost:5000/api/reports/updateReceipt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData), // directly send formData
          });
          const json = await res.json();
          if (res.ok) {
            showSuccessToast("Receipt saved!");
            setView("reportsList");
          } else {
            alert("DB errors: " + json.message);
          }
        } catch (err) {
          console.error(err);
          alert("Network / server error.");
        }
      };

      const [toastMessage, setToastMessage] = useState("");
      const [showToast, setShowToast] = useState(false);
      const showSuccessToast = (message) => {
        console.log("Triggering toast with message:", message);
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 6000); // hide after 3s
      };

    const [view, setView] = useState("reportsList");
    const [selectedReport, setSelectedReport] = useState(null);
    const handleViewReport = (report) => {
      const newID = report.receipt_id;
      setSelectedReport(newID);
      console.log("Report status:", report.status);
      console.log("Setting report ID to:", newID);
      if (report.status === "Pending") {
        setView("editableReport");
      } else {
        setView("staticReport");
      }
    };
    return (
        <div>
          {showToast && (
            <div id="toast">
              {toastMessage}
            </div>
          )}
          {view === "reportsList" && (
            <div className="UserExpenseReportContainer">
              <h2>Your Expense Reports</h2>
              {Object.entries(groupedReports).map(([status, reports]) => (
                <div key={status} className="ReportGroup">
                  <h3>{status} Reports</h3>
                  {reports.map((report) => (
                    <div key={report.report_id} className="ExpenseReportCard">
                      <div className="CardInfo">
                        <h4>Report #{report.report_id}</h4>
                        <p>Date Submitted: {formatDate(report.date_generated)}</p>
                        <p>Status: {report.status}</p>

                      </div>
                      <div className="CardActions">
                        {report.flag === 1 && (
                          <p id="flag">Flagged 🚩</p>
                        )}
                        <button
                          className="ViewReportButton"
                          onClick={() => handleViewReport(report)}
                        >
                          View Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
      
        {view === "editableReport" && selectedReport && (
          <>
            {console.log("Rendering EditableReport with selectedReceiptID:", selectedReport)}

            <EditableReport selectedReceiptID={selectedReport} goBack={() => setView("reportsList")} onSubmit={handleEditSubmit} />
          </>
        )}
        {view === "staticReport" && selectedReport && (
          <StaticReport selectedReceiptID={selectedReport} goBack={() => setView("reportsList")} />
        )}
        </div>
      );
}

export default UserExpenseReportList;