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
        user: senderEmail,
        pass: email_secret,
      },
    });

    const formattedEmailContent = emailContent.replace(/\n/g, "<br>");

    const mailOptions = {
      from: senderEmail,
      to: receiverEmail,
      subject: emailSubject,
      html: `<div style="white-space: pre-wrap;">${formattedEmailContent}</div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(`Error sending email to ${receiverEmail}:`, error.message);
    return false;
  }
}
