import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Wrapper } from "./certificateGenerator";

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
      pixelRatio: 2, // Higher quality
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `certificate-${formData.recipientName}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error exporting certificate:", err);
        alert("Error exporting certificate. Please try again.");
      });
  };

  return (
    <Wrapper>
      <div className="certificate-generator">
        <header className="header">
          <div className="logo">Smart HR Portal</div>
        </header>

        <div className="content">
          <div className="form-section">
            <h2>Certificate Details</h2>
            <form>
              <div className="form-group">
                <label>Recipient Name</label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Enter recipient name"
                />
              </div>

              <div className="form-group">
                <label>Award Type</label>
                <input
                  type="text"
                  name="awardType"
                  value={formData.awardType}
                  onChange={handleChange}
                  placeholder="e.g. Employee of the Month"
                />
              </div>

              <div className="form-group">
                <label>Issued By</label>
                <input
                  type="text"
                  name="issuedBy"
                  value={formData.issuedBy}
                  onChange={handleChange}
                  placeholder="e.g. Company Name or Manager's Name"
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="dd-mm-yyyy"
                />
              </div>

              <div className="form-group">
                <label>Recipient Photo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "recipientPhoto")}
                />
              </div>

              <div className="form-group">
                <label>Company Logo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "companyLogo")}
                />
              </div>

              <button
                type="button"
                className="export-btn"
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
