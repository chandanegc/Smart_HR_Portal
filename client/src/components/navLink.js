import React from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { SiWelcometothejungle } from "react-icons/si";
import { MdHolidayVillage } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import { FaWpforms, FaMailBulk, FaAward } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import { GrDocumentImage } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";

import { GiMagicHat } from "react-icons/gi";

const credential = JSON.parse(localStorage.getItem("credential") || "{}");
console.log( credential.role === "hr")
export const socialLinks = [
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
