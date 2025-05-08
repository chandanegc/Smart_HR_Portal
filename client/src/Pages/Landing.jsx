import main from '../projects/document/assets/images/main.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SmallLogo, VerySmallLogo } from '../components/Logo';
const Landing = () => {
  return (
    <StyledWrapper>
      <nav>
        <VerySmallLogo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            Smart <span>HR</span> Portal
          </h1>
          <p>
          The application provides separate interfaces for candidates and HR personnel, enhancing usability with role-specific functionalities. It ensures secure user authentication and management, including registration, login, and logout, while safeguarding data integrity. Candidates can create and update profiles, upload documents, and track their verification status, fostering transparency and efficiency. HR personnel can view, verify, and manage candidate documents, update their status, and download them as needed. 
          Additionally, the system automates credential creation by enabling HR to generate employee IDs and passwords for new hires, streamlining the onboarding process.
          </p>
          <Link to='/hr-register' className='btn register-link'>
            HR Registration
          </Link>
          <Link to='/hr-login' className='btn'>
            HR Login
          </Link>
          <Link to='/candidate-login' className='btn'>
            Candidate Login
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    margin: 10px;
    padding: 0.75rem 1rem;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;