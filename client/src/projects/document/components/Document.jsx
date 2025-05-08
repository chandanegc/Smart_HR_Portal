import { Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import day from "dayjs";
import { FormRowSelect } from ".";
import { DOCUMENT_STATUS } from "../../../utils/constants";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useState } from "react";

day.extend(advancedFormat);

const Document = ({
  _id,
  documentName,
  documentID,
  avatar,
  status: initialStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const credential =
    JSON.parse(localStorage.getItem("credential") || "{}") || null;
  const isAdmin = credential.role === "hr";
  const actionFun = async (newStatus) => {
    try {
      await customFetch.put(`/jobs/${_id}`, { jobStatus: newStatus });
      setCurrentStatus(newStatus);
      toast.success("Document status updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to update job status");
    }
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{documentName.charAt(0)}</div>
        <div className="info">
          <h5>{documentName}</h5>
          <p>{documentID}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <img
            src={avatar}
            alt={documentName}
            height="250px"
            style={{
              display: "block",
              margin: "0 auto",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <footer className="actions">
          <p className={`btn edit-btn ${currentStatus}`}>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </p>
          <Form method="post" action={`../delete-job/${_id}`}>
            {!isAdmin ? null : (
              <a href={avatar} download className="btn delete-btn">
                Download
              </a>
            )}
          </Form>
          &nbsp;&nbsp;
          {isAdmin && (
            <FormRowSelect
              name="jobStatus"
              labelText="Job Status"
              defaultValue={currentStatus}
              onChange={(value) => actionFun(value)}
              list={Object.values(DOCUMENT_STATUS)}
            />
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Document;
