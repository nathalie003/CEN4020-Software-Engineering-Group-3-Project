import React, { useState, useRef } from "react";
import "./ReceiptUploadForm.css";

export default function ReceiptUploadForm({ onFileSelect }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    if (typeof onFileSelect === "function") onFileSelect(file);
  };

  return (
    <div className="ReceiptUploadForm">
      <div className="imgContainer">
        {previewUrl ? (
          <img src={previewUrl} alt="Receipt preview" />
        ) : (
          <div className="placeholder">No image selected</div>
        )}
      </div>

      <button
        className="uploadReceiptButton"
        onClick={() => fileInputRef.current.click()}>
        Upload Image
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}