import React, { useState, useRef } from "react";
import "./ReceiptUploadForm.css";

export default function ReceiptUploadForm({ onFileSelect }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();
  const cameraInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    if (typeof onFileSelect === "function") onFileSelect(file);
  };

  const handleUploadClick = () => {
    // you can replace window.confirm with a nicer modal if you want
    if (window.confirm("Would you like to upload from your camera?")) {
      cameraInputRef.current.click();
    } else {
      fileInputRef.current.click();
    }
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
        type="button"
        className="uploadReceiptButton"
        onClick={handleUploadClick}>
        Upload Image
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}