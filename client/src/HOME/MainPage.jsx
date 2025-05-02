import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMail } from "react-icons/fi";
import { FaMailBulk, FaAward } from "react-icons/fa";
import { BsWechat } from "react-icons/bs";
import { FcLeave } from "react-icons/fc";
import { GrDocumentImage } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { VscReferences } from "react-icons/vsc";
import  Wrapper  from "./mainPageStyle"; 

const SocialLinksPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const socialLinks = [
    {
      name: "Document Verification",
      icon: <GrDocumentImage />,
      url: "/truedocs",
      color: "#7e22ce",
    },
    { name: "Bulk SMS", icon: <FaMailBulk />, url: "/bulk-sms", color: "#1DA1F2" },
    { name: "Group Chat", icon: <BsWechat />, url: "#", color: "#E1306C" },
    { name: "Leave Apply", icon: <FcLeave />, url: "#", color: "#0A66C2" },
    { name: "Email", icon: <FiMail />, url: "#", color: "#D44638" },
    {
      name: "Holiday Calender", 
      icon: <SlCalender />,
      url: "#",
      color: "#5865F2",
    },
    { name: "Award", icon: <FaAward />, url: "/certificate", color: "#333" },
    { name: "Vacancy", icon: <VscReferences />, url: "#", color: "#FF0000" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Background animation variants
  const bgCircleVariants = {
    animate: {
      x: [0, 100, 0],
      y: [0, 50, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 30,
          ease: "linear",
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <Wrapper>
      <div className={`social-links-page ${darkMode ? "dark" : "light"}`}>
        <motion.div
          className="bg-circle circle-1"
          variants={bgCircleVariants}
          animate="animate"
        />
        <motion.div
          className="bg-circle circle-2"
          variants={bgCircleVariants}
          animate="animate"
        />
        <motion.div
          className="bg-circle circle-3"
          variants={bgCircleVariants}
          animate="animate"
        />

        <header className="fixed-header">
          <div className="header-content">
            <motion.div
              className="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span>Smart HR Portal</span>
            </motion.div>

            <div className="header-right">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>

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

            {/* <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                className="nav-link"
                style={{ "--link-color": link.color }}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </nav> */}
          </div>
        </header>

        <main className="main-content">
          <motion.section
            className="hero-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Smart HR Portal</h1>
            {/* <p>Employee Management</p> */}
          </motion.section>

          <motion.div
            className="social-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                className="social-card"
                style={{ "--card-color": link.color }}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: `0 10px 20px ${hexToRgba(link.color, 0.3)}`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="social-icon">{link.icon}</div>
                <p>{link.name}</p>
              </motion.a>
            ))}
          </motion.div>
        </main>

        <footer className="main-footer">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

// Helper function for rgba colors
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default SocialLinksPage;
