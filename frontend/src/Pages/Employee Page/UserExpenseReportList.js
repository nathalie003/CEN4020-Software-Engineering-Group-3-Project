import React, { useEffect, useState } from 'react';
import './UserExpenseReportList.css';
import EditableReport from "./ReportDisplays/EditableReport"
import StaticReport from "./ReportDisplays/StaticReport"

const tempReports = [
    { id: 1, dateSubmitted: '2023-10-01', status: 'Pending' },
    { id: 2, dateSubmitted: '2023-09-15', status: 'Approved' },
    { id: 3, dateSubmitted: '2023-08-20', status: 'Rejected' },
    { id: 5, dateSubmitted: '2023-06-05', status: 'Pending' },

]

function UserExpenseReportList ({ user }) {

    const [expenseReports, setExpenseReports] = useState([]);

    useEffect(() => {
        if (user && user.id) {
        fetch(`http://localhost:5000/api/employee/${user.id}/expense-reports`)
            .then((res) => res.json())
            .then((data) => setExpenseReports(data))
            .catch((err) => console.error("Error fetching expense reports:", err));
        }
    }, [user]);

    const groupedReports = tempReports.reduce((acc, report) => {
        const status = report.status || "Unknown";
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(report);
        return acc;
      }, {});
    
    const [view, setView] = useState("reportsList");
    const [selectedReport, setSelectedReport] = useState(null);
    return (
        <div>
          {view === "reportsList" && (
            <div className="UserExpenseReportContainer">
              <h2>Your Expense Reports</h2>
              {Object.entries(groupedReports).map(([status, reports]) => (
                <div key={status} className="ReportGroup">
                  <h3>{status} Reports</h3>
                  {reports.map((report) => (
                    <div key={report.id} className="ExpenseReportCard">
                      <div className="CardInfo">
                        <h4>Report ID: {report.id}</h4>
                        <p>Date Submitted: {new Date(report.dateSubmitted).toLocaleDateString()}</p>
                        <p>Status: {report.status}</p>
                      </div>
                      <div className="CardActions">
                        <button
                          className="ViewReportButton"
                          onClick={() => {
                            setSelectedReport(report);
                            setView(report.status === "pending" ? "editableReport" : "staticReport");
                          }}
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
            <EditableReport report={selectedReport} goBack={() => setView("reportsList")} />
          )}
      
          {view === "staticReport" && selectedReport && (
            <StaticReport report={selectedReport} goBack={() => setView("reportsList")} />
          )}
        </div>
      );
}

export default UserExpenseReportList;