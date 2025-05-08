import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Wrapper } from "../styles/header";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../projects/document/utils/helper";
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { LiaUserEditSolid } from "react-icons/lia";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const credential =
    JSON.parse(localStorage.getItem("credential") || "{}") || null;
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (credential && credential.role) setFlag(true);
    else setFlag(false);
  }, []);
  const navigate = useNavigate();
  const style = {
    color: "#149b80",
    fontSize: "20px",
    margin: "0px",
    padding: "0px",
    height: "30px",
    cursor: " pointer",
    width: "100%",
  };
  return (
    <Wrapper>
      <header className="fixed-header">
        <div
          className="header-content"
          style={{ marginTop: "0px", padding: "10px" }}
        >
          <motion.div
            className="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#149b80",
                }}
              >
                <img
                  src="/logoIcon.png"
                  style={{ width: "40px", margin: "0px", padding: "0px" }}
                />
                <span>Smart HR Portal</span>
              </div>
            </Link>
          </motion.div>

          <div className="header-right">
            <button
              className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          {flag && (
            <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
              <div className="right-logo">
                <img
                  src="/logoIcon.png"
                  style={{ width: "40px", margin: "0px", padding: "0px" }}
                />
              </div>
              <div onClick={() => navigate("/")} title="Home">
                <FaHome style={style} />
              </div>
              <div
                onClick={() => navigate("/bulk-sms/email-secret")}
                title="Email Secret Key"
              >
                <LiaUserEditSolid style={style} />
              </div>

              <div
                title="Logout"
                onClick={() => {
                  logoutUser();
                  navigate("/home");
                  window.location.reload();
                }}
              >
                <IoIosLogOut style={style} />
              </div>
            </nav>
          )}
        </div>
      </header>
    </Wrapper>
  );
};

export default Header;
