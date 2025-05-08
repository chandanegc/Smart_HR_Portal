import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import customFetch from "../../document/utils/customFetch";
import { getRelativeTime } from "../../document/utils/helper";

const VacancyDetails = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);

  useEffect(() => {
    const ApiCall = async () => {
      try {
        const res = await customFetch.get(`/vacancy/${id}`);
        console.log(res.data);
        setVacancy(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    ApiCall();
    const foundVacancy = mockVacancies.find((v) => v.id === parseInt(id));
    setVacancy(foundVacancy);
  }, [id]);

  if (!vacancy) return <Loading>Loading...</Loading>;

  return (
    <DetailsContainer>
      <BackButton to="/vacancies">
        <FaArrowLeft /> Back to all jobs
      </BackButton>

      <VacancyHeader>
        <h1>{vacancy.jobTitle}</h1>
        <Company>{vacancy.companyName}</Company>
        <LocationInfo>
          <DetailItem>
            <FaMapMarkerAlt />
            <span>{vacancy.location}</span>
          </DetailItem>
          <DetailItem>
            <FaClock />
            <span>{vacancy.jobType}</span>
          </DetailItem>
        </LocationInfo>
        <PostedDate>Posted: {getRelativeTime(vacancy.updatedAt)}</PostedDate>
      </VacancyHeader>

      <ContentSection>
        <MainContent>
          <Section>
            <h2>Job Description</h2>
            <Pre>{vacancy?.description}</Pre>
          </Section>

          <Section>
            <h2>Requirements</h2>
            <Pre>{vacancy?.requirements}</Pre>
          </Section>

          <Section>
            <h2>Responsibilities</h2>
            <Pre>{vacancy?.responsibilities}</Pre>
          </Section>
        </MainContent>

        <Sidebar>
          <ApplyBox>
            <p>Apply for this position</p> <br />
            <ApplyButton
              href={`mailto:hr@${vacancy.companyName
                .toLowerCase()
                .replace(/\s+/g, "")}.com`}
            >
              <FaEnvelope /> Apply via Email
            </ApplyButton>
          </ApplyBox>

          {/* <AboutCompany>
            <h3>About {vacancy.companyName}</h3>
            <p>
              We are a leading technology company specializing in innovative
              solutions for businesses worldwide.
            </p>
          </AboutCompany> */}
        </Sidebar>
      </ContentSection>
    </DetailsContainer>
  );
};

// Styled Components
const DetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a6baf;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Pre = styled.pre`
  white-space: pre-wrap;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
`;
const VacancyHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;

  h1 {
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }
`;

const Company = styled.p`
  color: #4a6baf;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 1rem 0;
`;

const LocationInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;

  svg {
    color: #4a6baf;
  }
`;

const PostedDate = styled.small`
  color: #95a5a6;
  font-size: 0.9rem;
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Section = styled.section`
  margin-bottom: 2rem;

  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  p,
  li {
    line-height: 1.6;
    color: #34495e;
  }

  ul {
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const Sidebar = styled.div`
  @media (max-width: 768px) {
    order: -1;
  }
`;

const ApplyBox = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  h3 {
    margin-top: 0;
    color: #2c3e50;
  }
`;

const ApplyButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4a6baf;
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #3a5a9f;
  }
`;

const AboutCompany = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  p {
    line-height: 1.6;
    color: #34495e;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

// Mock data (same as in VacancyList)
const mockVacancies = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "We're looking for an experienced software engineer to join our team working on cutting-edge web applications. You'll be responsible for developing new features, optimizing performance, and collaborating with our product team to deliver exceptional user experiences. The ideal candidate has 5+ years of experience with modern JavaScript frameworks and a passion for clean code.",
    posted: "2 days ago",
  },
  // ... other mock vacancies
];

export default VacancyDetails;
