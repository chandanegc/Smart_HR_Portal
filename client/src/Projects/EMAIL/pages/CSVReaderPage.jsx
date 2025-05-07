import Input from "../components/Input";
import React, { useState } from "react";
import Papa from "papaparse";
import { useLocation, useNavigate } from "react-router-dom";

const CSVReaderPage = () => {
  const [csvData, setData] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const { template } = location.state || {};
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError("Please upload a CSV file.");
      return;
    }

    if (file.type !== "text/csv") {
      setError("Invalid file format. Please upload a CSV file.");
      return;
    }
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length) {
          setError("Error parsing CSV. Please check the file format.");
        } else {
          setData(result.data);
          setError("");
        }
      },
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (csvData.length >= 1) {
      navigate("/bulk-sms/template", { state: { data: csvData, template } });
    }
  };
  return (
    <div style={{ minHeight: "100vh" }}>
      <form className="form">
        <h2>Upload and Parse CSV File</h2> <br />
        <Input type="file" accept=".csv" onChange={handleFileChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br /> <br />
        <button onClick={handleSubmit} className="btn btn-block form-btn">
          Next
        </button>
      </form>
      <br />
      <h3 style={{ textAlign: "center" }}>Parsed Data:</h3>
      <br />
      {csvData.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center" }}>No data parsed yet.</p>
      )}
    </div>
  );
};

export default CSVReaderPage;
