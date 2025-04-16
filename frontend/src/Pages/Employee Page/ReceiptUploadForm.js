//ReceiptUploadForm.js
import React, { useState, useRef, useEffect } from 'react';
import './ReceiptUploadForm.css';

function ReceiptUploadForm({ onFileChange, onFileSubmit }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // when “Select PDF” clicked
  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  // when user picks a PDF
  const handleFileChange = (e) => {
    const picked = e.target.files[0];
    if (!picked) return;
    setFile(picked);
    onFileChange(picked);

    const url = URL.createObjectURL(picked);
    setPreviewUrl(url);
  };

  // upload button
  const handleUploadClick = () => {
    if (!file) {
      alert('Please select a PDF first.');
      return;
    }
    onFileSubmit(file);
  };

  // cleanup blob URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="ReceiptUploadForm">
      <div className="pdfContainer">
        {previewUrl ? (
          <embed
            src={previewUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        ) : (
          <div className="placeholder">
            No PDF selected
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div className="buttonRow">
        <button className="selectBtn" onClick={handleSelectClick}>
          Select PDF
        </button>
        <button className="uploadBtn" onClick={handleUploadClick}>
          Upload PDF
        </button>
      </div>
    </div>
  );
}

export default ReceiptUploadForm;
