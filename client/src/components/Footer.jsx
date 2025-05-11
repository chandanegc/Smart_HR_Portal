import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
         
      <MainFooter>
        <FooterSection>
          <FooterHeading>Smart HR Portal</FooterHeading>
          <FooterText>
            Streamlining HR processes with modern technology to empower your workforce and simplify human resource management.
          </FooterText>
          <SocialIcons>
            <SocialLink href="#" aria-label="LinkedIn"><FaLinkedin /></SocialLink>
            <SocialLink href="#" aria-label="Twitter"><FaTwitter /></SocialLink>
            <SocialLink href="#" aria-label="GitHub"><FaGithub /></SocialLink>
          </SocialIcons>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterList>
            <FooterListItem><FooterLink href="#">Home</FooterLink></FooterListItem>
            <FooterListItem><FooterLink href="#">Dashboard</FooterLink></FooterListItem>
            <FooterListItem><FooterLink href="#">Leave Management</FooterLink></FooterListItem>
            <FooterListItem><FooterLink href="#">Employee Directory</FooterLink></FooterListItem>
            <FooterListItem><FooterLink href="#">Payroll</FooterLink></FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Resources</FooterHeading>
          <FooterList>
            <FooterListItem><FooterLink href="#">Help Center</FooterLink></FooterListItem>
            <FooterListItem><FooterLink href="#">HR Policies</FooterLink></FooterListItem>
            <FooterListItem><FooterLink href="#">Training Materials</FooterLink></FooterListItem>
            <FooterListItem><FooterLink href="#">API Documentation</FooterLink></FooterListItem>
            <FooterListItem><FooterLink href="#">System Status</FooterLink></FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Contact Us</FooterHeading>
          <ContactInfo>
            <ContactItem><FaMapMarkerAlt /> 123 HR Street, Tech City, India</ContactItem>
            <ContactItem><FaPhone /> +91 999999999</ContactItem>
            <ContactItem><FaEnvelope /> support@smarthrportal.com</ContactItem>
          </ContactInfo>
        </FooterSection>
      </MainFooter>

      <FooterBottom>
        <Copyright>&copy; {new Date().getFullYear()} Smart HR Portal. All rights reserved.</Copyright>
        <LegalLinks>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Cookie Policy</FooterLink>
        </LegalLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

// Styled Components
const FooterContainer = styled.footer`
  background:rgb(6, 103, 100);
  color:white;
  padding-top: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const MainFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background: #4a6baf;
  }
`;

const FooterText = styled.p`
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 1.5rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #ffffff;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  opacity: 0.8;

  &:hover {
    color: #4a6baf;
    opacity: 1;
    transform: translateY(-3px);
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.8rem;
`;

const FooterLink = styled.a`
  color: #ffffff;
  opacity: 0.8;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #4a6baf;
    opacity: 1;
    padding-left: 5px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const FooterBottom = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem;
  }
`;

const Copyright = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export default Footer;