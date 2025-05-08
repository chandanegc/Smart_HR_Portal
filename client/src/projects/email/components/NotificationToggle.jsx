// NotificationToggle.js
import React, { useState } from "react";

const NotificationToggle = ({ onConfirm }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  // Handle Confirm Button Click
  const handleConfirm = () => {
    onConfirm(); // Call parent function to send email/message
    setShowConfirm(false); // Hide confirmation after sending
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={() => setShowConfirm(true)}
        className="btn btn-primary"
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send Message
      </button>

      {showConfirm && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          <p style={{ marginBottom: "10px" }}>Are you sure you want to send the message?</p>
          <button
            onClick={handleConfirm}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationToggle;
