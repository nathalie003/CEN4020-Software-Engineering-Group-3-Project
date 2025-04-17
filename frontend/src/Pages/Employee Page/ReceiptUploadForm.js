//ReceiptUploadForm.js
import React, { useState, useRef } from 'react';
import './ReceiptUploadForm.css';

function ReceiptUploadForm ({ onFileSelect }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (!file) return;
        // create a blob URL for preview
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        // notify parent
        if (typeof onFileSelect === 'function') {
            onFileSelect(file);
        }    
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!selectedFile) {
    //         alert('Please upload receipt PDF file.');
    //         return;
    //     }
    // };

    return (
        <div className="ReceiptUploadForm">
            <div className="pdfContainer">
                {previewUrl
                ? <embed
                    src={previewUrl}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    />
                : <div className="placeholder">
                    No PDF selected
                </div>
                }
            </div>

            <button
                className="uploadReceiptButton"
                onClick={() => fileInputRef.current.click()}
            >
                Upload PDF
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    )
}

export default ReceiptUploadForm;