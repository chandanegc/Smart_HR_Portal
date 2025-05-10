import nodemailer from "nodemailer";

export const generateEmail = ({
  employeeName,
  employeeID,
  password,
  companyName,
  loginLink,
  hrName,
  hrEmail,
  hrContact,
}) => {
  return `
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        
        <p>Dear <strong>${employeeName}</strong>,</p>

        <p>Welcome to <strong>${companyName}</strong>! We are delighted to have you join our team.</p>

        <p>As part of the onboarding process, please submit your documents for verification through our <strong>TrueDocs</strong> portal. Below are your login credentials:</p>

        <table style="border-collapse: collapse; width: 100%; max-width: 500px; margin: 10px 0;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Company Name:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${companyName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Employee ID:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${employeeID}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Password:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${password}</td>
          </tr>
        </table>

        <p><strong>Login here:</strong> <a href="${loginLink}" target="_blank">${loginLink}</a></p>

        <h3>Next Steps:</h3>
        <ul>
          <li>✅ Click the login link and enter your Employee ID and Password.</li>
          <li>✅ Upload all required documents for verification.</li>
          <li>✅ Ensure all files are clear and valid to avoid any delays.</li>
        </ul>

        <p>If you need any assistance, please contact <strong>${hrName}</strong> at <a href="mailto:${hrEmail}">${hrEmail}</a> or call <strong>${hrContact}</strong>.</p>

        <p>We look forward to working with you and wish you a successful journey with us.</p>

        <p><strong>Best Regards,</strong><br>
        ${hrName}<br>
        HR Team, ${companyName}</p>

        </body>
        </html> 
    `;
};

export const otpMsg = (otp) => {
  return `
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        
        <p><strong>Your TrueDocs OTP:</strong></p>
        <h2 style="background-color: #f4f4f4; padding: 10px; display: inline-block; border-radius: 5px;">${otp}</h2>

        <p>Please use this OTP to complete your verification. This OTP is valid for 5 minutes only.</p>

        <p>If you did not request this, please ignore this email.</p>

        <p><strong>Best Regards,</strong><br>
        TrueDocs Team</p>

        </body>
        </html> 
    `;
};

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendEmailToEmployee(senderEmail, receiverEmail, emailSubject, emailContent) {
  try {
    if (!process.env.NODEMAILER_USER || !process.env.NODEMAILER_PASS) {
      throw new Error("Missing Nodemailer credentials. Please set NODEMAILER_USER and NODEMAILER_PASS.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: receiverEmail,
      subject: emailSubject,
      html: emailContent, // Using HTML format
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
}
