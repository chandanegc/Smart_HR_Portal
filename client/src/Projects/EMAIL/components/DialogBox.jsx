import React from "react";

const ConfirmationDialog = ({
  open,
  handleSendEmail,
  confirmationData,
  setIsDialogOpen,
  isLoader,
}) => {
  if (!open) return null;

  const handleNo = () => {
    setIsDialogOpen(false);
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <h6>{confirmationData.title || "Confirm Action"}</h6>
        <p>{confirmationData.message || "Are you sure you want to proceed?"}</p>
        <div style={buttonContainerStyle}>
          {isLoader ? (
            <div>Processing....</div>
          ) : (
            <div>
              <button onClick={handleSendEmail} style={yesButtonStyle}>
                Yes
              </button> &nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={handleNo} style={noButtonStyle}>
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const dialogStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const yesButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#149B80",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const noButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#ff4d4f",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ConfirmationDialog;
