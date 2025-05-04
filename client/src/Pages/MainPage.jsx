import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMail } from "react-icons/fi";
import { FaMailBulk, FaAward } from "react-icons/fa";
import { BsWechat } from "react-icons/bs";
import { FcLeave } from "react-icons/fc";
import { GrDocumentImage } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { VscReferences } from "react-icons/vsc";
import Wrapper from "./mainPageStyle";
import Logo, { SmallLogo, VerySmallLogo } from "../components/Logo";

const SocialLinksPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const role = localStorage.getItem("role");
  console.log(role);
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
      url:
        role === "hr"
          ? "/truedocs/dashboard/all-users-docs"
          : "/truedocs/dashboard/all-docs",
      color: "#7e22ce",
    },
    {
      name: "Bulk SMS",
      icon: <FaMailBulk />,
      url: "/bulk-sms/login",
      color: "#1DA1F2",
    },
    {
      name: "Certificate",
      icon: <FaAward />,
      url: "/certificate",
      color: "#333",
    },
    {
      name: "Welocome Card",
      icon: <FaAward />,
      url: "/welcome-card",
      color: "#E1306C",
    },
    { name: "Leave Apply", icon: <FcLeave />, url: "#", color: "#FF0000" },
    {
      name: "Holiday Calender",
      icon: <SlCalender />,
      url: "#",
      color: "#5865F2",
    },
    { name: "Vacancy", icon: <VscReferences />, url: "#", color: "#FF0000" },
    // { name: "Group Chat", icon: <BsWechat />, url: "#", color: "#E1306C" },
    // { name: "Email", icon: <FiMail />, url: "#", color: "#D44638" },
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
{/* //Header  */}
        <main className="main-content">
          <motion.section
            className="hero-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ color: "#12aa82" }}>Smart HR Portal</h1>
            {/* <p>Employee Management</p> */}
            {/* <SmallLogo/> */}
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
          <VerySmallLogo />
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
