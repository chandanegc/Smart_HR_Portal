import React from "react";
import { motion } from "framer-motion";
import { FaMailBulk, FaAward } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import { GrDocumentImage } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { VscReferences } from "react-icons/vsc";
import Wrapper from "./mainPageStyle";
import { LiaUserEditSolid } from "react-icons/lia";
import { SiWelcometothejungle } from "react-icons/si";
import { MdHolidayVillage } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa6";
import { GiMagicHat } from "react-icons/gi";

const SocialLinksPage = () => {
  const credential = JSON.parse(localStorage.getItem("credential") || "{}");

  const socialLinks = [
    {
      name: "Document Verification",
      icon: GrDocumentImage,
      url:
        credential.role === "hr"
          ? "/truedocs/dashboard/all-users-docs"
          : "/truedocs/dashboard/all-docs",
      color: "#6C63FF",
    },
    {
      name: "Bulk SMS",
      icon: FaMailBulk,
      url: credential.emailSecret ? "/bulk-sms/menu" : "/bulk-sms/email-secret",
      color: "#1DA1F2",
    },
    {
      name: "Certificate",
      icon: FaAward,
      url: "/certificate",
      color: "#F4B400",
    },
    {
      name: "Welocome Card",
      icon: SiWelcometothejungle,
      url: "/welcome-card",
      color: "#FF6F61",
    },
    {
      name: "Leave Apply",
      icon: FcLeave,
      url: "/leave/apply",
      color: "#34A853",
    },
    {
      name: "All Leaves",
      icon: MdHolidayVillage,
      url: "/leave",
      color: "#FF8C00",
    },
    {
      name: "Holiday Calendar",
      icon: SlCalender,
      url: "/calendar",
      color: "rgb(242, 168, 88)",
    },
    {
      name: "Create Job",
      icon: AiOutlineForm,
      url: "/upload-job",
      color: "#DB4437",
    },
    {
      name: "Vacancy",
      icon: FaWpforms,
      url: "vacancies",
      color: " rgb(246, 59, 190)",
    },
    {
      name: "Edit Profile",
      icon: LiaUserEditSolid,
      url: "/truedocs/dashboard/profile",
      color: "rgb(235, 10, 43)",
    },
    {
      name: "AI Chat",
      icon: GiMagicHat,
      url: "/ai-chat",
      color: " #0CA789",
    },
    {
      name: "Information",
      icon: BsInfoCircleFill,
      url: "/info",
      color: " #3B82F6",
    },
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
 