import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  padding: 1rem;

  @media (max-width: 576px) {
    width: 90vw;
  }

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    align-items: center;
  }

  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 1.5rem;
  }

  .info {
    h5 {
      margin: 0;
      font-size: 1.2rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }

  .content {
    padding: 1rem 1.5rem;
    text-align: center;
  }

  .content-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-center img {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .content-center img {
      max-width: 250px;
    }
  }

  @media (max-width: 576px) {
    .content-center img {
      max-width: 200px;
    }
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }

  .status {
    text-transform: capitalize;
    text-align: center;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
  }

  .pending {
    background: #fef3c7;
    color: #f59e0b;
  }

  .approved {
    background: #e0e8f9;
    color: #647acb;
  }

  .rejected {
    background: #ffeeee;
    color: #d66a6a;
  }
`;

export default Wrapper;
