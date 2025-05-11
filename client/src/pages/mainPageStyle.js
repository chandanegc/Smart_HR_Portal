import styled from "styled-components";

const Wrapper = styled.div`
margin-top: -90px;
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
:root {
  /* Light Theme */
  --bg-color: #f8fafc;
  --text-color: #1e293b;
  --header-bg: rgba(255, 255, 255, 0.95);
  --card-bg: rgba(255, 255, 255, 0.9);
  --footer-bg: #1e293b;
  --footer-text: #f8fafc;
  --bg-circle-color: rgba(126, 34, 206, 0.05);
}

[data-theme="dark"] {
  --bg-color: #0f172a;
  --text-color: #f8fafc;
  --header-bg: rgba(15, 23, 42, 0.95);
  --card-bg: rgba(15, 23, 42, 0.8);
  --footer-bg: #020617;
  --bg-circle-color: rgba(124, 58, 237, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
  transition: background-color 0.3s, color 0.3s;
  
}

.social-links-page {
  min-height: calc(100vh + 30px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Animated Background Elements */
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

/* Fixed Header */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--header-bg);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.logo span {
  font-family: 'Space Grotesk', sans-serif;
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
  content: '';
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
  font-family: 'Space Grotesk', sans-serif;
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

/* Social Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.social-card {
  background-color: var(--card-bg);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: var(--text-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  will-change: transform;
  backdrop-filter: blur(8px);
}

.social-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  color: var(--card-color);
}

.social-card h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.social-card:hover .social-icon {
  transform: scale(1.2);
}

/* Footer */
.main-footer {
  background-color: var(--footer-bg);
  color: var(--footer-text);
  padding: 2rem;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--footer-text);
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer-links a:hover {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background-color: var(--header-bg);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transition: right 0.3s ease;
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

export default Wrapper;