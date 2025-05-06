import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 90px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const FileInput = styled.input`
  display: block;
  margin: 20px auto;
`;

const UploadButton = styled.button`
  display: block;
  margin: 0 auto 20px auto;
  padding: 10px 20px;
  background-color: #149b80;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #149b80;
  }
`;

const PdfLink = styled.a`
  display: block;
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PdfIframe = styled.iframe`
  width: 98vw;
  height: 600px;
  border: none;
  border-radius: 4px;
`;
export { Container, Title, FileInput, UploadButton, PdfLink, PdfIframe };
