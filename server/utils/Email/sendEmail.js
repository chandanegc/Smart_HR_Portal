import nodemailer from "nodemailer";
import dotenv from "dotenv"; 
dotenv.config(); 

export async function sendEmailToEmployee(
  senderEmail,
  receiverEmail,
  emailSubject,
  emailContent,
  email_secret 
) {
  try {
    if (!process.env.NODEMAILER_USER || !process.env.NODEMAILER_PASS) {
      throw new Error(
        "Missing Nodemailer credentials. Please set NODEMAILER_USER and NODEMAILER_PASS."
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: email_secret || process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: senderEmail || process.env.NODEMAILER_USER, 
      to: receiverEmail,
      subject: emailSubject,
      html: emailContent, 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${receiverEmail}:`, info.response);
    return true;
  } catch (error) {
    console.error(`Error sending email to ${receiverEmail}:`, error.message);
    return false;
  }
}
