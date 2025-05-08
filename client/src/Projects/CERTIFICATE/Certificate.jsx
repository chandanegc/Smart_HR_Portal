import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Wrapper } from "./certificateGenerator";
import { FormRow } from "../document/components";
import { toast } from "react-toastify";

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    awardType: "Employee of the Month",
    issuedBy: "Company Name or Manager's Name",
    date: new Date().toLocaleDateString("en-GB"),
    recipientPhoto: null,
    companyLogo: null,
    previewRecipientPhoto: null,
    previewCompanyLogo: null,
  });

  const certificateRef = useRef(null);

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

  const exportAsPng = () => {
    if (certificateRef.current === null) {
      return;
    }

    toPng(certificateRef.current, {
      backgroundColor: "#ffffff",
      quality: 1.0,
      pixelRatio: 2,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `certificate-${formData.recipientName}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error exporting certificate:", err);
        toast.error("Error exporting certificate. Please try again.");
      });
  };

  return (
    <Wrapper>
      <div className="certificate-generator">
        <div className="content">
          <div className="form-section">
            <h3>Certificate Details</h3>
            <form>
              <div className="form-group">
                <FormRow
                  type="text"
                  name="recipientName"
                  defaultValue={formData.recipientName}
                  labelText={"Recipient Name"}
                  onChange={handleChange}
                  placeholder="Enter recipient name"
                />
              </div>

              <div className="form-group">
                <FormRow
                  type="text"
                  name="awardType"
                  labelText={"Award Type"}
                  onChange={handleChange}
                  placeholder="e.g. Employee of the Month"
                />
              </div>

              <div className="form-group">
                <FormRow
                  type="text"
                  name="issuedBy"
                  labelText={"Issued By"}
                  onChange={handleChange}
                  placeholder="e.g. Company Name or Manager's Name"
                />
              </div>

              <div className="form-group">
                <FormRow
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="dd-mm-yyyy"
                />
              </div>

              <div className="form-group">
                <label>Recipient Photo (Optional)</label>
                <FormRow
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "recipientPhoto")}
                />
              </div>

              <div className="form-group">
                <label>Company Logo (Optional)</label>
                <FormRow
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "companyLogo")}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={exportAsPng}
              >
                Export as PNG
              </button>
            </form>
          </div>

          <div className="preview-section">
            {/* <h2>Preview</h2> */}
            <div className="certificate-preview">
              <div className="certificate" ref={certificateRef}>
                <div className="certificate-header">
                  <h3>Certificate of Achievement</h3>
                  <p>This certificate is proudly presented to</p>
                </div>

                <div className="recipient-info">
                  {formData.previewRecipientPhoto && (
                    <div className="recipient-photo">
                      <img
                        src={formData.previewRecipientPhoto}
                        alt="Recipient"
                      />
                    </div>
                  )}
                  <h2 className="recipient-name">{formData.recipientName}</h2>
                </div>

                <div className="award-details">
                  <p>For Outstanding Achievement in</p>
                  <p className="award-type">{formData.awardType}</p>
                  <div className="stars">★★★★★</div>
                </div>

                <div className="certificate-footer">
                  <div className="date">{formData.date}</div>
                  <div className="issuer">{formData.issuedBy}</div>
                  <div className="issuer">
                    {formData.previewCompanyLogo && (
                      <div className="company-logo">
                        <img
                          style={{ marginTop: "5px", width: "70px" }}
                          src={formData.previewCompanyLogo}
                          alt="Company Logo"
                        />
                      </div>
                    )}
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

export default CertificateGenerator;
