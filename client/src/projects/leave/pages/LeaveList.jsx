import React, { useEffect, useState } from "react";
import LeaveCard from "../components/LeaveCardComponent";
import customFetch from "../../document/utils/customFetch";
import LoaderComponent from "../../../components/LoaderComponent";

const CDAllLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const { role } = JSON.parse(localStorage.getItem("credential") ?? "{}");
  const [loader, setLoader] = useState(false);
  const isHr = role === "hr";
  useEffect(() => {
    const fetchLeaves = async () => {
      setLoader(true);
      try {
        const res = await customFetch.get("/leave/all");
        setLeaves(res.data?.data);
      } catch (err) {
        console.error(err);
      }
      setLoader(false);
    };
    fetchLeaves();
  }, []);
  if (loader) return <LoaderComponent />;
  return (
    <div style={style}>
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

const style = { maxWidth: "700px", margin: "0 auto", minHeight: "100vh" };
