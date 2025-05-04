import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Wrapper } from "../styles/header";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const role = localStorage.getItem("role");
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);
  const navigate = useNavigate();
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
          <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            {role && (
              <button
                className="member-btn btn"
                style={{ padding: "10px" }}
                onClick={() => {
                  localStorage.removeItem("credential");
                  localStorage.removeItem("role");
                  navigate("/home");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
    </Wrapper>
  );
};

export default Header;
