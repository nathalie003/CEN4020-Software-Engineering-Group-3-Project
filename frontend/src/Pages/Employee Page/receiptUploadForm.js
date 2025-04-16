//ReceiptUploadForm.js
import React, { useState } from 'react';

function ReceiptUploadForm () {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please upload a receipt PDF file.');
            return;
        }
    };

    return (
        <div className="ReceiptUploadForm">
            <button className="uploadReceiptButton" onClick={() => document.getElementById('fileInput').click()}>
                Click to upload
            </button>
            <input
            id="fileInput"
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}/>
            <button className="submitReceiptButton" onClick={handleSubmit}>
                Load Receipt
            </button>
        </div>
    )
}

export default ReceiptUploadForm;