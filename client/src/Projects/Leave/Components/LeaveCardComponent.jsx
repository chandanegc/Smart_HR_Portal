import React, { useState } from "react";
import styled from "styled-components";
import customFetch from "../../DOCUMENT/utils/customFetch";
import { toast } from "react-toastify";

const Card = styled.div`
  background: #fff;
  border-left: 6px solid
    ${(props) =>
      props.status === "Approved"
        ? "#4CAF50"
        : props.status === "Rejected"
        ? "#f44336"
        : "#ff9800"};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  margin: 16px 0;
  padding: 20px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.01);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "Approved"
      ? "#4CAF50"
      : props.status === "Rejected"
      ? "#f44336"
      : "#ff9800"};
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
`;

const Label = styled.span`
  font-weight: 600;
`;

const leaveTypeColors = {
  "Casual Leave": "#149B80",
  "Sick Leave": "#E67E22",
  "Earned Leave": "#2980B9",
  "Maternity Leave": "#9B59B6",
  "Paternity Leave": "#E74C3C",
};

const CDLeaveCard = ({ leave, isHr }) => {
  const [selectedStatus, setSelectedStatus] = useState(leave.status);

  const handleStatusChange = async (e) => {
    const updatedStatus = e.target.value;
    console.log(leave._id);
    try {
      const res = await customFetch.put(`/leave/status/${leave._id}`, {
        status: updatedStatus,
      });
      setSelectedStatus(updatedStatus);
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error updating status");
    }
  };
  return (
    <Card status={selectedStatus}>
      <Header>
        <p style={{ color: leaveTypeColors[leave.leaveType] || "#149B80" }}>
          {leave.leaveType}
        </p>
        <Status status={selectedStatus}>{selectedStatus}</Status>
      </Header>

      <p>
        <Label>Reason:</Label> {leave.leaveReason}
      </p>
      <p>
        <Label>Applied On:</Label>{" "}
        {new Date(leave.createdAt).toLocaleDateString()}
      </p>
      <p>
        <Label>From:</Label> {new Date(leave.startDate).toLocaleDateString()} →{" "}
        <Label>To:</Label> {new Date(leave.endDate).toLocaleDateString()}
      </p>
      <p>
        <Label>Total Days:</Label> {leave.totalDays}
      </p>

      {isHr && (
        <div style={{ marginTop: "10px" }}>
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      )}
    </Card>
  );
};

export default CDLeaveCard;
