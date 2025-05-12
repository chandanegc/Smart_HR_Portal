import React, { useEffect, useState } from "react";
import customFetch from "../document/utils/customFetch";
import {
  Container,
  Title,
  FileInput,
  UploadButton,
  PdfLink,
  PdfIframe,
} from "./calendarStyle";
import { toast } from "react-toastify";
import LoaderComponent from "../../components/LoaderComponent";

const CalendarUploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const { role } = JSON.parse(localStorage.getItem("credential") ?? "{}");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setLoading(true);
        const res = await customFetch.get("/calendar/pdf");
        setPdfUrl(res.data.data.pdfUrl);
      } catch (err) {
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
    fetchPdf();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);
      const res = await customFetch.post("/calendar/upload", formData);
      setPdfUrl(res.data.data.pdfUrl);
      toast.success("PDF uploaded successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Error uploading PDF");
    }
    setLoading(false);
  };

  return (
    <>
      {role === "hr" && (
        <Container>
          <Title>Upload PDF</Title>
          <FileInput
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <UploadButton onClick={handleUpload}>
            {loading ? "Uploading.." : "Upload"}
          </UploadButton>
        </Container>
      )}
      {
        <div
          style={{
            marginTop: role !== "hr" ? "100px" : "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {pdfUrl ? (
            <PdfLink href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Click to see Fullscreen
            </PdfLink>
          ) : (
            <h4>No Holiday Calendar found!</h4>
          )}
          <PdfIframe src={pdfUrl} title="PDF Preview" />
        </div>
      }
    </>
  );
};

export default CalendarUploadPage;
