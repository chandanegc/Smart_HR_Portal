import React, { use } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";

const ChooseProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <>
      <div  style={{height:"100vh"}}>
      <div className="form" style={style} onClick={()=> navigate("/bulk-sms/create-template")}>
        <FaPlus style={{ fontSize: "90px", color:"#00908A" }} />
        <h3>Create Template</h3>
      </div>
      <div className="form" style={style} onClick={(()=>navigate("/bulk-sms/all-template", { state: { data } }))}>
        <MdOutlinePhotoSizeSelectActual style={{ fontSize: "90px" , color:"#E1306C"}} />
        <h3>Choose Template</h3>
      </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default ChooseProject;


const style = {
  display: "flex",
  cursor: "pointer",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
};
