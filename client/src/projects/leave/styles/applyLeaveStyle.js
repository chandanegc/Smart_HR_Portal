import styled from "styled-components";

export const Wrapper = styled.div`
  .leave-application {
    min-height: calc(100vh - 80px);
    max-width: 600px;
    margin: 0 auto;
    padding-bottom: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  h3 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 10px;
  }

  .form-section {
    margin-bottom: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    p{
      padding: 10px;
    }
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 18px;
  }

  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .date-selector {
    width: 100%;
    padding: 10px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: left;
    cursor: pointer;
  }

  .calendar {
    margin-top: 10px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .calendar-header {
    text-align: center;
    margin-bottom: 15px;
  }

  .calendar-header h3 {
    margin: 0;
    color: #2c3e50;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  .day-header {
    text-align: center;
    font-weight: bold;
    padding: 5px;
    color: #149b80;
  }

  .calendar-day {
    text-align: center;
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
  }

  .calendar-day:hover {
    background: #e6f0ff;
  }

  .calendar-day.selected {
    background: #149b80;
    color: white;
  }

  .calendar-day.in-range {
    background: #e6f0ff;
  }

  .calendar-day.other-month {
    color: #aaa;
    cursor: default;
  }

  .leave-details {
    padding: 15px;
    max-height: 230px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #ddd;
    overflow-x: scroll;
  }

  .leave-details ul {
    list-style: none;
    padding: 0;
  }

  .leave-details li {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
  }

  .total-leave {
    padding-top: 10px;
    font-size: 16px;
  }

  .apply-button {
    width: 100%;
    padding: 12px;
    background: #149b80;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    transition: background 0.3s;
  }

  .apply-button:hover {
    background: rgb(13, 105, 87);
  }
`;
