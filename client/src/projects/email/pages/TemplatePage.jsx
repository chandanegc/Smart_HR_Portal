import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ConfirmationDialog from "../components/DialogBox";
import { toast } from "react-toastify";

const EmailTemplate = () => {
  const location = useLocation();
  const { data, template } = location.state || {};
  const [subject, setSubject] = useState(`${template[1]}`);
  const [emailContent, setEmailContent] = useState(`${template[0]}`);

  const [finalMessageArray, setFinalMessageArray] = useState([]);
  useEffect(() => {
    if (data && data.length > 0) {
      const messages = data.map((user) => {
        let content = emailContent;
        let subjectLine = subject;

        Object.keys(user).forEach((key) => {
          content = content.replaceAll(`{${key}}`, user[key]);
          subjectLine = subjectLine.replaceAll(`{${key}}`, user[key]);
        });

        return {
          name: user.name,
          email: user.email,
          subject: subjectLine,
          msg: content,
          company: user.company,
          position: user.position,
          startDate: user.startDate,
          var1: user.var1,
          var2: user.var2,
          var3: user.var3,
          var4: user.var4,
          var5: user.var5,
          var6: user.var6,
          var7: user.var7,
          var8: user.var8,
          var9: user.var9,
          var10: user.var10,
        };
      });
      setFinalMessageArray(messages);
    }
  }, [data, emailContent, subject]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const confirmationData = {
    title: "Send Bulk-Emails",
    message: "Are you sure you want to send bulk emails?",
  };

  const handleSendEmail = async () => {
    setIsLoader(true);
    try {
      const res = await axios.post("/api/v1/mail/send-bulk-email", {
        emailData: finalMessageArray,
      });
      setIsLoader(false);
      setIsDialogOpen(false);
      toast.success(res.data.msg);
    } catch (error) {
      setIsLoader(false);
      setIsDialogOpen(false);
      console.error("Error sending emails:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  return (
    <form className="form" style={{ maxWidth: "90vw" }} onSubmit={handleSubmit}>
      <h3>Email Template</h3>
      <br />
      <ConfirmationDialog
        open={isDialogOpen}
        close={isDialogOpen}
        confirmationData={confirmationData}
        isLoader={isLoader}
        setIsDialogOpen={setIsDialogOpen}
        handleSendEmail={handleSendEmail}
      />

      <Input
        type="text"
        name="subject"
        labelText={"Email Subject:"}
        value={subject}
        onChange={handleSubjectChange}
      />
      <label>Email Content:</label>
      <br />
      <textarea
        className="form-textarea"
        rows="10"
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
      />
      <br />
      <br />
      <p>Preview for Email:</p>
      <br />
      {finalMessageArray.length > 0 ? (
        <div
          className="form-textarea"
          style={{
            maxWidth: "90vw",
            whiteSpace: "pre-wrap",
            overflowX: "scroll",
            minHeight: "350px",
          }}
          dangerouslySetInnerHTML={{ __html: finalMessageArray[0].msg }}
        ></div>
      ) : (
        <p>No messages generated yet!</p>
      )}
      <br />
      <button type="submit" className="btn btn-block form-btn">
        Next
      </button>
    </form>
  );
};

export default EmailTemplate;
