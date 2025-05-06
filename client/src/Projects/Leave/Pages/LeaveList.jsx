import React, { useEffect, useState } from "react";
import LeaveCard from "./../Components/LeaveCardComponent";
import customFetch from "../../DOCUMENT/utils/customFetch";

const CDAllLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const {role} = JSON.parse(localStorage.getItem("credential") ?? "{}");
  const isHr = (role === "hr");
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await customFetch.get("/leave/all");
        setLeaves(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaves();
  }, []);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      {leaves?.length > 0 ? (
        leaves.map((leave) => (
          <LeaveCard key={leave._id} leave={leave} isHr={isHr} />
        ))
      ) : (
        <p>No leave applications found.</p>
      )}
    </div>
  );
};

export default CDAllLeave;
