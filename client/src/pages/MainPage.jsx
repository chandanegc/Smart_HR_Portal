import React from "react";
import { motion } from "framer-motion";
import Wrapper from "./mainPageStyle";
import { socialLinks } from "../components/navLink";

const SocialLinksPage = () => {
  const credential = JSON.parse(localStorage.getItem("credential") || "{}");

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
      <div className={`social-links-page light`}>
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
            <h1 style={{ color: "#12aa82", padding: "0px", margin: "0px" }}>
              Smart HR Portal
            </h1>
            <p>Employee Management</p>
          </motion.section>

          <motion.div
            className="social-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {socialLinks.map((link) => {
              if (
                credential.role !== "hr" &&
                (link.name === "Bulk SMS" ||
                  link.name === "Create Job" ||
                  link.name === "Certificate" ||
                  link.name === "Welocome Card")
              )
                return;

              if (credential.role === "hr" && link.name === "Leave Apply")
                return;
              let Icon = link.icon;
              return (
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
                  <div className="social-icon">
                    <Icon />
                  </div>
                  <p>{link.name}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </main>
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
