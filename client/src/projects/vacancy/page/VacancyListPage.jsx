import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import customFetch from '../../document/utils/customFetch';
import { getRelativeTime } from '../../document/utils/helper';
import LoaderComponent from '../../../components/LoaderComponent';

// Mock data - replace with API calls in a real application
// const mockVacancies = [
//   {
//     id: 1,
//     title: "Senior Software Engineer",
//     company: "Tech Innovations Inc.",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     description: "We're looking for an experienced software engineer to join our team...",
//     posted: "2 days ago"
//   },
//   {
//     id: 2,
//     title: "UX Designer",
//     company: "Digital Creations",
//     location: "Remote",
//     type: "Contract",
//     description: "Join our design team to create beautiful user experiences...",
//     posted: "1 week ago"
//   },
//   {
//     id: 3,
//     title: "Product Manager",
//     company: "Global Solutions",
//     location: "New York, NY",
//     type: "Full-time",
//     description: "Lead our product development team to success...",
//     posted: "3 days ago"
//   }
// ];

const VacancyList = () => {
  const [vacancies, setVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading , setLoading] = useState(false);
  useEffect(() => {
    const ApiCall = async()=>{
      setLoading(true);
        try {
            const res = await customFetch.get("/vacancy");
            setVacancies(res.data);
        } catch (error) {
            console.log(error);
        }finally{
          setLoading(false);
        }
    }
    ApiCall()
    // setVacancies(mockVacancies);
  }, []);

  const filteredVacancies = vacancies.filter(vacancy =>
    vacancy?.jobTitle?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    vacancy?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vacancy?.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if(loading) return <LoaderComponent/>
  return (
    <ListContainer>
      <Header>
        <h1>Current Job Vacancies</h1>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
      </Header>

      <VacanciesGrid>
        {filteredVacancies.map(vacancy => (
          <VacancyCard key={vacancy._id}>
            <VacancyLink to={`/vacancies/${vacancy._id}`}>
              <CardHeader>
                <h2>{vacancy.jobTitle}</h2>
                <CompanyName>{vacancy.companyName}</CompanyName>
              </CardHeader>
              <CardDetails>
                <DetailItem>
                  <FaMapMarkerAlt />
                  <span>{vacancy.location}</span>
                </DetailItem>
                <DetailItem>
                  <FaClock />
                  <span>{vacancy.jobType}</span>
                </DetailItem>
              </CardDetails>
              <Description>{vacancy.description.substring(0, 100)}...</Description>
              <PostedDate>{getRelativeTime(vacancy.updatedAt)}</PostedDate>
            </VacancyLink>
          </VacancyCard>
        ))}
      </VacanciesGrid>
    </ListContainer>
  );
};

// Styled Components
const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  h1 {
    color: #149B80;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  width: 300px;

  svg {
    color: #7f8c8d;
    margin-right: 0.5rem;
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const VacanciesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const VacancyCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const VacancyLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;

  h2 {
    color: #149B80;
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
  }
`;

const CompanyName = styled.p`
  color: #149B80;
  font-weight: 500;
  margin: 0;
`;

const CardDetails = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;

  svg {
    color: #149B80;
  }
`;

const Description = styled.p`
  color: #34495e;
  line-height: 1.5;
  margin: 1rem 0;
`;

const PostedDate = styled.small`
  color: #149B80;
  font-size: 0.8rem;
`;

export default VacancyList;