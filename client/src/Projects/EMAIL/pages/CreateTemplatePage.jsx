import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmationDialog from "../components/DialogBox";
import { toast } from "react-toastify";

const CreateTemplatePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [templateName, setTemplateName] = useState("Template");
  const [finalMessage, setFinalMessage] = useState(null);
  const navigate = useNavigate();
  const [subject, setSubject] = useState(
    "Welcome {name}, Join {company} as a {position} starting on {startDate}"
  );
  const [emailContent, setEmailContent] = useState(
    `Hello <b>{name}</b>,<br/><br/>
    Welcome to <b>{company}</b> as a <b>{position}</b>. Your email is <b>{email}</b>, and your joining date is <b>{startDate}</b>.<br/><br/>
    We look forward to working with you!<br/><br/>
    <b>Here are the additional details:</b><br/>
    Var1: <b>{var1}</b><br/>
    Var2: <b>{var2}</b><br/>
    Var3: <b>{var3}</b><br/>
    Var4: <b>{var4}</b><br/>
    Var5: <b>{var5}</b><br/>
    var6: <b>{var6}</b><br/>
    var7: <b>{var7}</b><br/>
    var8: <b>{var8}</b><br/>
    var9: <b>{var9}</b><br/>
    var10: <b>{var10}</b><br/>
    Thanks!`
  );
  const randomUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    company: "TechCorp",
    position: "Software Engineer",
    startDate: "2025-04-01",
    var1: "Value1",
    var2: "Value2",
    var3: "Value3",
    var4: "Value4",
    var5: "Value5",
    var6: "Value6",
    var7: "Value7",
    var8: "Value8",
    var9: "Value9",
    var10: "Value10",
  };

  useEffect(() => {
    const user = randomUser;
    let content = emailContent;
    let subjectLine = subject;

    Object.keys(user).forEach((key) => {
      content = content.replaceAll(`{${key}}`, user[key]);
      subjectLine = subjectLine.replaceAll(`{${key}}`, user[key]);
    });

    setFinalMessage({
      name: user.name,
      email: user.email,
      subject: subjectLine,
      msg: content,
    });
  }, [emailContent, subject]);

  const confirmationData = {
    title: "Create Template",
    message: "Are you sure?",
  };

  const handleSendEmail = async () => {
    setIsLoader(true);
    try {
      const res = await axios.post("/api/v1/template", {
        message: emailContent,
        subject: subject,
        name: templateName,
      });
      setIsLoader(false);
      setIsDialogOpen(false);
      toast.success(res.data.msg);
      navigate("/bulk-sms/all-template");
    } catch (error) {
      setIsLoader(false);
      setIsDialogOpen(false);
      console.error("Error sending email:", error);
    }
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleChangeTemplateName = (e) => {
    setTemplateName(e.target.value);
  };

  return (
    <form
      className="form"
      style={{ maxWidth: "90vw" }}
      onSubmit={(e) => {
        e.preventDefault();
        setIsDialogOpen(true);
      }}
    >
      <h3>Create Template</h3>
      <br />
      <ConfirmationDialog
        open={isDialogOpen}
        close={() => setIsDialogOpen(false)}
        confirmationData={confirmationData}
        isLoader={isLoader}
        setIsDialogOpen={setIsDialogOpen}
        handleSendEmail={handleSendEmail}
      />

      <Input
        type="text"
        name="templateName"
        labelText={"Template Name:"}
        value={templateName}
        required={true}
        onChange={handleChangeTemplateName}
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
      <h4>Subject Preview:</h4>
      <Input
        value={finalMessage?.subject || "No subject generated yet!"}
        readOnly={true}
      />
      <h4>Email Preview:</h4>
      <br />
      {finalMessage ? (
        <div
          className="form-textarea"
          style={{
            maxWidth: "90vw",
            minHeight: "350px",
            whiteSpace: "pre-wrap",
            overflowX: "scroll",
          }}
          dangerouslySetInnerHTML={{ __html: finalMessage.msg }}
        />
      ) : (
        <p>No message generated yet!</p>
      )}
      <br />
      <button type="submit" className="btn btn-block form-btn">
        Create
      </button>
    </form>
  );
};

export default CreateTemplatePage;
