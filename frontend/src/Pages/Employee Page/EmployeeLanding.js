import React, { useState } from "react";
import "./EmployeeLanding.css";
import logo from "../../Components/Images/CashPilot.png";

function EmployeeLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [manualEntry, setManualEntry] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload a receipt image.");
      return;
    }

    const formData = new FormData();
    formData.append("receiptImage", selectedFile);

    try {
      const response = await fetch("/api/upload-receipt", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = "/autofilled-form"; // Redirect to autofilled form
      } else {
        alert("Failed to upload receipt.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the receipt.");
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    window.location.href = "/manual-entry-form";

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
    window.location.href = "/supervisor-landing";
  };

  return (
    <body>
      <nav
        id="main_nav"
        className="navbar navbar-expand-lg navbar-dark bg-white"
      >
        <div className="container d-flex justify-content-between align-items-center">
          <button
            className="navbar-toggler ml-auto custom-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsingNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="align-self-center navbar-collapse collapse flex-fill d-lg-flex justify-content-lg-between"
            id="collapsingNavbar"
          >
            <div className="flex-fill mx-xl-5 mb-2">
              <ul className="navbar-nav d-flex justify-content-between mx-xl-5 text-center text-dark">
                <li className="nav-item active">
                  <a
                    className="nav-link btn-outline-primary rounded-pill px-3"
                    href="/employee-landing"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link btn-outline-primary rounded-pill px-3"
                    href="/employee-landing/expenses"
                  >
                    Expense History
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link btn-outline-primary rounded-pill px-3"
                    href="/employee-landing/settings"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </body>
  );
}

export default EmployeeLanding;
