import React, { useState, useRef } from "react";
import "./ReceiptUploadForm.css";

export default function ReceiptUploadForm({ onFileSelect }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();
  const cameraInputRef = useRef();
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    if (typeof onFileSelect === "function") onFileSelect(file);
  };

  const handleUploadClick = () => {
    if (isMobile) {
      // on mobile, give camera vs file choice
      if (window.confirm("Would you like to upload your receipt using the camera?")) {
        cameraInputRef.current.click();
      } else {
        fileInputRef.current.click();
      }
    } else {
      // on desktop just open file picker
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
      <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleFileChange}
      />
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
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}