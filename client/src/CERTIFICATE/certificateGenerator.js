import styled from "styled-components";

export const Wrapper = styled.article`
.certificate-generator {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .free-tag {
    color: #666;
    margin-right: 30px;
  }
  
  .nav {
    display: flex;
    gap: 20px;
  }
  
  .nav-item {
    cursor: pointer;
  }
  
  .nav-item:hover {
    color: #0E8666;
  }
  
  .content {
    display: flex;
    gap: 40px;
  }
  
  .form-section {
    flex: 1;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
  }
  
  .form-section h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .form-group input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .form-group input[type="file"] {
    width: 100%;
  }
  
  .template-select {
    padding: 10px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #555;
  }
  
  .export-btn {
    background: #4a6baf;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }
  
  .export-btn:hover {
    background: #3a5a9f;
  }
  
  .preview-section {
    flex: 1;
  }
  
  .preview-section h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .certificate-preview {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .certificate {
    border: 2px solid #0E8666;
    padding: 40px;
    text-align: center;
    min-height: 500px;
    position: relative;
    background: #fff;
  }
  
  .certificate-header h3 {
    font-size: 28px;
    color: #0E8666;
    margin-bottom: 10px;
  }
  
  .certificate-header p {
    font-size: 16px;
    color: #666;
    margin-bottom: 40px;
  }
  
  .recipient-info {
    margin: 30px 0;
  }
  
  .recipient-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 20px;
    border: 3px solidrgb(14, 169, 128);
  }
  
  .recipient-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .recipient-name {
    font-size: 32px;
    color: #333;
    margin: 10px 0;
  }
  
  .award-details {
    margin: 40px 0;
  }
  
  .award-details p {
    margin: 10px 0;
    font-size: 18px;
  }
  
  .award-type {
    font-size: 24px;
    font-weight: bold;
    color:#0E8666;
  }
  
  .stars {
    font-size: 24px;
    color: gold;
    margin: 15px 0;
  }
  
  .certificate-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }
  
  .date, .issuer {
    font-size: 16px;
    color: #666;
  }
  
  .company-logo {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 100px;
  }
  
  .company-logo img {
    width: 100%;
    height: auto;
  }
  
  
  @media (max-width: 768px) {
    .content {
      flex-direction: column;
    }
    
    .header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .nav {
      margin-top: 15px;
      flex-wrap: wrap;
    }
  }
`;