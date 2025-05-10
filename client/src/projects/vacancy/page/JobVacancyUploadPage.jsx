import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUpload, FaBriefcase, FaGraduationCap, FaListUl, FaHandshake, FaBuilding } from 'react-icons/fa';
import customFetch from '../../document/utils/customFetch';
import { toast } from "react-toastify";
const JobVacancyUpload = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: 'Full-time',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    aboutCompany: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await customFetch.post('/vacancy', formData);
      toast.success('Job vacancy posted successfully!');
    //   setFormData({
    //     jobTitle: '',
    //     companyName: '',
    //     location: '',
    //     jobType: 'Full-time',
    //     description: '',
    //     requirements: '',
    //     responsibilities: '',
    //     benefits: '',
    //     aboutCompany: '',
    //     contactEmail: ''
    //   });
    } catch (error) {
      console.error('Failed to post job:', error);
      toast.error('Failed to post job. Please try again.');
    }
  };

  return (
    <JobFormContainer>
      <FormHeader>
        <h1>Post a Job Vacancy</h1>
        <p>Fill out the form below to post your job opening</p>
      </FormHeader>

      <StyledForm onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>
            <FaBriefcase />
            <h2>Basic Information</h2>
          </SectionTitle>
          <FormGroup>
            <label>Job Title*</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Company Name*</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company name"
              required
            />
          </FormGroup>
          <FormRow>
            <FormGroup>
              <label>Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country or Remote"
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Job Type*</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </FormGroup>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <FaListUl />
            <h2>Job Details</h2>
          </SectionTitle>
          <FormGroup>
            <label>Job Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role and company"
              rows="6"
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Requirements*</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="List the requirements (one per line)"
              rows="6"
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Responsibilities*</label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="List the responsibilities (one per line)"
              rows="6"
              required
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <FaHandshake />
            <h2>Benefits & Company Info</h2>
          </SectionTitle>
          <FormGroup>
            <label>What You Offer</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="Describe the benefits and perks"
              rows="6"
            />
          </FormGroup>
          <FormGroup>
            <label>About The Company*</label>
            <textarea
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
              placeholder="Tell candidates about your company"
              rows="6"
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Contact Email*</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Where candidates should apply"
              required
            />
          </FormGroup>
        </FormSection>

        <SubmitButton type="submit">
          <FaUpload /> Post Job Vacancy
        </SubmitButton>
      </StyledForm>
    </JobFormContainer>
  );
};

// Styled Components
const JobFormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: #149B80;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #149B80;
    font-size: 1.1rem;
  }
`;

const StyledForm = styled.form`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #149B80;

  svg {
    margin-right: 10px;
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.4rem;
    margin: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #149B80;
  }

  input, select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border 0.3s;

    &:focus {
      outline: none;
      border-color: #149B80;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  background: #149B80;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  transition: all 0.3s;

  &:hover {
    background:rgb(15, 109, 90);
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export default JobVacancyUpload;