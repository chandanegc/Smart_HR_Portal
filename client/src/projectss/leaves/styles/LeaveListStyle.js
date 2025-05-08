import styled from "styled-components";
import { DOCUMENT_STATUS } from "../../../utils/constants";

const { APPROVED, REJECTED, PENDING } = DOCUMENT_STATUS;

const statusColors = {
  [APPROVED]: "#4CAF50",
  [REJECTED]: "#f44336",
  [PENDING]: "#ff9800",
};

const Wrapper = styled.div`
  .wrapper {
    .card {
      background: #fff;
      border-left: 6px solid ${({ status }) => statusColors[status] || "#ccc"};
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
      border-radius: 12px;
      margin: 16px 0;
      padding: 20px;
      transition: 0.3s;

      &:hover {
        transform: scale(1.01);
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .status {
        background-color: ${({ status }) => statusColors[status] || "#ccc"};
        color: #fff;
        padding: 6px 14px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.85rem;
        text-transform: uppercase;
      }

      .label {
        font-weight: 600;
      }

      .select-wrapper {
        margin-top: 10px;
      }
    }
  }
`;

export default Wrapper;
