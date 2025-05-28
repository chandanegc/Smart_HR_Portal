import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/src/pdf.worker.js"; // your local file path

const PdfParser = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  useEffect(() => {
    if (!pdfFile) return;

    const extractText = async () => {
      const reader = new FileReader();

      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);

        try {
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let fullText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map((item) => item.str);
            fullText += strings.join(" ") + "\n\n";
          }

          setText(fullText);
        } catch (error) {
          console.error("Error parsing PDF:", error);
        }
      };

      reader.readAsArrayBuffer(pdfFile);
    };

    extractText();
  }, [pdfFile]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>PDF Text Extractor</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {text && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default PdfParser;
