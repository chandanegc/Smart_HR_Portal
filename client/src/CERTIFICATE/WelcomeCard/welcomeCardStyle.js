import styled from 'styled-components';

export const Wrapper = styled.div`
  .welcome-card-generator {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1, h2, h3 {
    color: #333;
  }

  .card-container {
    display: flex;
    gap: 30px;
    margin-top: 20px;
  }

  .form-section {
    flex: 1;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group h3 {
    margin-bottom: 8px;
    font-size: 16px;
  }

  input[type="text"],
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 10px;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  .optional-field {
    opacity: 0.8;
  }

  .upload-btn {
    display: inline-block;
    padding: 8px 16px;
    background: #149b80;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }

  .upload-btn:hover {
    background: #149b80;
  }

  .export-btn {
    background:#149b80;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    width: 100%;
    transition: background 0.3s;
  }

  .export-btn:hover {
    background: #2cbc8a;
  }

  .preview-section {
    flex: 1;
  }

  .card-preview {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .welcome-card {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 30px;
    position: relative;
    background: white;
  }

  .card-style-label {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #f5f5f5;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
  }

  .card-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .card-header h2 {
    color: #149b80;
    margin: 10px 0;
  }

  .company-logo {
    max-height: 60px;
    max-width: 200px;
    margin: 0 auto;
  }

  .employee-info {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 30px 0;
  }

  .employee-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #149b80;
  }

  .employee-details h3 {
    font-size: 24px;
    margin: 0 0 5px 0;
    color: #333;
  }

  .employee-details p {
    margin: 5px 0;
    color: #666;
  }

  .welcome-message {
    padding: 20px 0;
    border-top: 1px solid #eee;
    margin-top: 20px;
  }

  .welcome-message p {
    line-height: 1.6;
    color: #333;
  }

  /* Card Style Variations */
  .welcome-card.celebration {
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
    border: none;
  }

  .welcome-card.formal {
    background: white;
    border: 2px solid #149b80;
  }

  .welcome-card.modern {
    background: #f8f9fa;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    .card-container {
      flex-direction: column;
    }
  }
`;
