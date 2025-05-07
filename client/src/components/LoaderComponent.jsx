import React from "react";
import { HashLoader } from "react-spinners";
import Header from "./Header";

const LoaderComponent = () => {
  return (
    <>
    <Header/>
      <div style={style}>
        <HashLoader color="#0E8666" />
      </div>
    </>
  );
};

export default LoaderComponent;

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  zIndex: "-9999",
};
