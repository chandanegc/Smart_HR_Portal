import styled from "styled-components";

export const Wrapper = styled.article`
  margin-top: 60px;
  .bg-circle {
    position: fixed;
    border-radius: 50%;
    filter: blur(60px);
    z-index: -1;
    opacity: 0.8;
    background: var(--bg-circle-color);
  }

  .circle-1 {
    width: 300px;
    height: 300px;
    top: -50px;
    left: -50px;
  }

  .circle-2 {
    width: 500px;
    height: 500px;
    bottom: -100px;
    right: -100px;
  }

  .circle-3 {
    width: 200px;
    height: 200px;
    top: 50%;
    left: 30%;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--header-bg);
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }

  .logo span {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  /* Theme Toggle */
  .theme-toggle {
    background: transparent;
    border: none;
    color: var(--text-color);
    font-size: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  .right-logo {
    display: none;
  }

  .theme-toggle:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  /* Mobile Menu */
  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 101;
  }

  .menu-toggle span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--text-color);
    transition: all 0.3s ease;
  }

  .menu-toggle.open span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .menu-toggle.open span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.open span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    position: relative;
  }

  .nav-link svg {
    font-size: 1.2rem;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--link-color);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    padding: 7rem 2rem 4rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 4rem;
  }

  .hero-section h1 {
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #7e22ce, #4f46e5);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .dark .hero-section h1 {
    background: linear-gradient(to right, #a855f7, #6366f1);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-section p {
    font-size: 1.25rem;
    opacity: 0.8;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .header-content {
      padding: 1rem;
    }
    .right-logo {
      display: block;
    }
    .menu-toggle {
      display: flex;
    }

    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      width: 60px;
      height: 100vh;
      background-color: var(--header-bg);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
      gap: 2rem;
      background-color: var(--header-bg);
      backdrop-filter: blur(8px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease;
      z-index: -100;
    }

    .nav-links.open {
      right: 0;
    }

    .main-content {
      padding: 6rem 1rem 3rem;
    }
  }

  @media (max-width: 480px) {
    .hero-section h1 {
      font-size: 2rem;
    }

    .hero-section p {
      font-size: 1.1rem;
    }

    .social-grid {
      grid-template-columns: 1fr;
    }
  }
`;
