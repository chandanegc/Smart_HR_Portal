import React, { useState } from "react";
import customFetch from "../../document/utils/customFetch";
import { toast } from "react-toastify";
import { DOCUMENT_STATUS } from "../../../utils/constants";
import SelectTagComponent from "../../../components/SelectTagComponent";
import Wrapper from "../styles/LeaveListStyle";

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
    const status = e.target.value;
    try {
      const res = await customFetch.put(`/leave/status/${leave._id}`, {
        status,
      });
      setSelectedStatus(status);
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error updating status");
    }
  };

  return (
    <Wrapper status={selectedStatus}>
      <div className="wrapper">
        <div className="card">
          <div className="header">
            <p style={{ color: leaveTypeColors[leave.leaveType] || "#149B80" }}>
              {leave.leaveType}
            </p>
            <span className="status">{selectedStatus}</span>
          </div>

          {isHr && leave.createdBy && (
            <div className="candidate-info">
              <p style={{ color: "rgb(207, 7, 7)" }}>
                <span className="label">Name:</span> {leave.createdBy.name}
              </p>
              <p style={{ color: "rgb(207, 7, 7)" }}>
                <span className="label">Employee ID:</span>{" "}
                {leave.createdBy.employeeId}
              </p>
            </div>
          )}
<br/>
          <p>
            <span className="label">Reason:</span> {leave.leaveReason}
          </p>
          <p>
            <span className="label">Applied On:</span>{" "}
            {new Date(leave.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="label">From:</span>{" "}
            {new Date(leave.startDate).toLocaleDateString()} →{" "}
            <span className="label">To:</span>{" "}
            {new Date(leave.endDate).toLocaleDateString()}
          </p>
          <p>
            <span className="label">Total Days:</span> {leave.totalDays}
          </p>

          {isHr && (
            <SelectTagComponent
              list={DOCUMENT_STATUS}
              onChange={handleStatusChange}
              value={selectedStatus}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default CDLeaveCard;
