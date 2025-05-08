import hrModel from "../../models/document/hrModel.js";
import { sendEmailToEmployee } from "../../utils/Email/sendEmail.js";

export const getEmailData = async (req, res) => {
  
  try {
    const { emailData} = req.body;
    console.log(req.user.email);

    if (!emailData || !req.user.email) {
      return res.status(400).json({ msg: "Missing required fields!" });
    }

    if (!Array.isArray(emailData) || emailData.length === 0) {
      return res.status(400).json({ msg: "Invalid or empty userData array!" });
    }

    const sendEmailsPromise = emailData.map(async (item, index) => {
      if (!item.email) {
        console.error(`Missing email for user at index ${index}`);
        return false;
      }

      return await sendEmailToEmployee(
        req.user.email,
        item.email,
        item.subject,
        item.msg,
        req.user.emailSecret
      );
    });
    const emailResults = await Promise.all(sendEmailsPromise);

    const successCount = emailResults.filter(
      (result) => result === true
    ).length;
    const failedCount = emailResults.length - successCount;

    res.status(200).json({
      msg: `Emails sent: ${successCount} successful, ${failedCount} failed.`,
    });
  } catch (error) {
    console.error("Error in getEmailData:", error.message);
    res.status(500).json({
      msg: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};
