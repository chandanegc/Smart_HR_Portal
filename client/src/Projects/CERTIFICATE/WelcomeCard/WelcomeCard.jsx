import React, { useState, useRef } from "react";
import { toJpeg } from "html-to-image";
import { Wrapper } from "./welcomeCardStyle";
import  FormRow from "../../../components/FormRow";
import { toast } from "react-toastify";

const WelcomeCard = () => {
  const [formData, setFormData] = useState({
    cardStyle: "Celebration",
    employeeName: "John Smith",
    position: "Software Engineer",
    department: "Engineering Team",
    startDate: "May 4th, 2025",
    message:
      "Welcome aboard! We're thrilled to have you join our team. Looking forward to creating amazing things together!",
    employeePhoto: null,
    companyLogo: null,
    previewEmployeePhoto: null,
    previewCompanyLogo: null,
  });

  const cardRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [type]: file,
          [`preview${type.charAt(0).toUpperCase() + type.slice(1)}`]:
            reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const exportAsJpeg = () => {
    if (cardRef.current === null) {
      return;
    }

    toJpeg(cardRef.current, {
      quality: 0.95,
      pixelRatio: 2,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `welcome-card-${formData.employeeName}.jpeg`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error exporting card:", err);
        toast.error("Error exporting card. Please try again.");
      });
  };

  return (
    <Wrapper>
      <div className="welcome-card-generator">
        <h3>Welcome Card Generator</h3>

        <div className="card-container">
          <div className="form-section">
            <h3>Card Details</h3> <br/>

            <div className="form-group">
              <h3>Card Style</h3>
              <select
                name="cardStyle"
                value={formData.cardStyle}
                onChange={handleChange}
              >
                <option value="Celebration">Celebration</option>
                <option value="Formal">Formal</option>
                <option value="Modern">Modern</option>
              </select>
            </div>

            <div className="form-group">
              <FormRow
                type="text"
                labelText="Employee Name"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                placeholder="Employee Name"
              />
            </div>

            <div className="form-group">
              <FormRow
                type="text"
                name="position"
                labelText={"Role / Position"}
                value={formData.position}
                onChange={handleChange}
                placeholder="Position"
              />
              <FormRow
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Team/Department (Optional)"
                className="optional-field"
              />
            </div>

            <div className="form-group">
              <FormRow
                type="text"
                name="startDate"
                labelText={"Start Date"}
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Start Date"
              />
            </div>

            <div className="form-group">
              <h3>Welcome Message</h3>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Custom welcome message"
                rows="4"
              />
            </div>

            <div className="form-group">
              <h3>Employee Photo (Optional)</h3>
              <label className="upload-btn">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "employeePhoto")}
                  hidden
                />
              </label>
            </div>

            <div className="form-group">
              <h3>Company Logo (Optional)</h3>
              <label className="upload-btn">
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "companyLogo")}
                  hidden
                />
              </label>
            </div>

            <button className="export-btn" onClick={exportAsJpeg}>
              Export as JPEG
            </button>
          </div>

          <div className="preview-section">
            <h3>Preview</h3> <br/><br/>
            <div className="card-preview">
              <div
                className={`welcome-card ${formData.cardStyle.toLowerCase()}`}
                ref={cardRef}
              >
                <div className="card-style-label">{formData.cardStyle}</div>

                <div className="card-content">
                  <div className="card-header">
                    {formData.previewCompanyLogo && (
                      <img
                        src={formData.previewCompanyLogo}
                        alt="Company Logo"
                        className="company-logo"
                      />
                    )}
                    <h2>Welcome to the team!</h2>
                  </div>

                  <div className="employee-info">
                    {formData.previewEmployeePhoto && (
                      <img
                        src={formData.previewEmployeePhoto}
                        alt="Employee"
                        className="employee-photo"
                      />
                    )}
                    <div className="employee-details">
                      <h3>{formData.employeeName}</h3>
                      <p>
                        {formData.position}
                        {formData.department && ` - ${formData.department}`}
                      </p>
                      <p>Starting {formData.startDate}</p>
                    </div>
                  </div>

                  <div className="welcome-message">
                    <p>{formData.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WelcomeCard;
