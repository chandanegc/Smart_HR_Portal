import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/App";
import "./index.css";
console.log(import.meta.env.VITE_API_KEY)

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App /> 
    </GoogleOAuthProvider>
    <ToastContainer position="top-center" />
  </React.StrictMode>
);
