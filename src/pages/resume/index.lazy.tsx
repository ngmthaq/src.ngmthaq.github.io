import { createLazyFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';

interface WorkExperience {
  company: string;
  duration: string;
  position: string;
}

interface Award {
  title: string;
  issuer: string;
  date: string;
}

interface Education {
  school: string;
  duration: string;
  degree: string;
  descrioptions: string[];
}

interface Project {
  name: string;
  role: string;
  description: string[];
  keyFeatures: string[];
  technologies: string[];
}

interface ResumeInfo {
  jobTitle: string;
  gender: string;
  email: string;
  phone: string;
  name: string;
  englishName: string;
  generalInformations: string[];
  workExperiences: WorkExperience[];
  awardsAndcertificates: Award[];
  educations: Education[];
  projects: Project[];
}

export const Route = createLazyFileRoute('/resume/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [info, setInfo] = useState<ResumeInfo | null>(null);

  const handleExport = () => {
    window.print();
  };

  useEffect(() => {
    console.log('Fetching info data..');
    fetch(import.meta.env.VITE_GG_SHEET_PROFILE_URL as string)
      .then(response => {
        console.log('Converting response to json');
        return response.json();
      })
      .then(data => {
        console.log('Fetched info data:', data);
        setInfo(data);
      })
      .catch(error => {
        console.error('Error fetching info data:', error);
      });
  }, []);

  useEffect(() => {
    document.title = 'Nguyen_Manh_Thang (Victor Nguyen) Software Engineer Resume';
  }, []);

  if (!info) {
    return (
      <div className='d-flex min-vh-100 align-items-center justify-content-center px-2 py-16'>
        <div className='text-center'>
          <Spinner animation='border' variant='primary' className='mb-3' />
          <p className='lead'>Loading Resume...</p>
        </div>
      </div>
    );
  }

  return (
    <Container fluid='xl' className='mx-auto py-4 px-4' style={{ maxWidth: '72rem' }}>
      <div className='mb-2 d-flex justify-content-between border-bottom py-1'>
        <p>{info.jobTitle}</p>
        <div className='d-none d-md-flex gap-3'>
          <p className='small'>{info.gender}</p>
          <p className='small'>|</p>
          <a href={`mailto:${info.email}`} className='small text-primary text-decoration-underline'>
            {info.email}
          </a>
          <p className='small'>|</p>
          <a href={`tel:${info.phone}`} className='small text-primary text-decoration-underline'>
            {info.phone}
          </a>
          <p className='small'>|</p>
          <span
            className='small text-primary text-decoration-underline cursor-pointer'
            onClick={handleExport}
          >
            Export
          </span>
        </div>
      </div>
      <div className='pb-4'>
        <p className='h2 fw-bold text-uppercase'>{info.name}</p>
        <p>({info.englishName})</p>
      </div>
      <div className='pb-4'>
        <p className='mb-2 border-bottom border-2 fw-bold text-uppercase'>General Information</p>
        <ul className='list-disc ps-4'>
          {info.generalInformations.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
      <div className='pb-4'>
        <p className='mb-2 border-bottom border-2 fw-bold text-uppercase'>Work Experiences</p>
        <div className='table-responsive'>
          <Table bordered>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Company</th>
                <th style={{ width: '30%' }}>Duration</th>
                <th style={{ width: '40%' }}>Position</th>
              </tr>
            </thead>
            <tbody>
              {info.workExperiences.map((experience, index) => (
                <tr key={index}>
                  <td>{experience.company}</td>
                  <td>{experience.duration}</td>
                  <td>{experience.position}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className='pb-4'>
        <p className='mb-2 border-bottom border-2 fw-bold text-uppercase'>
          Awards and Certificates
        </p>
        <div className='table-responsive'>
          <Table bordered>
            <thead>
              <tr>
                <th style={{ width: '50%' }}>Title</th>
                <th style={{ width: '30%' }}>Issuer</th>
                <th style={{ width: '20%' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {info.awardsAndcertificates.map((award, index) => (
                <tr key={index}>
                  <td>{award.title}</td>
                  <td>{award.issuer}</td>
                  <td>{award.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className='pb-4'>
        <p className='mb-2 border-bottom border-2 fw-bold text-uppercase'>Education</p>
        <div className='table-responsive'>
          <Table bordered>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>School</th>
                <th style={{ width: '30%' }}>Degree</th>
                <th style={{ width: '40%' }}>Descriptions</th>
              </tr>
            </thead>
            <tbody>
              {info.educations.map((education, index) => (
                <tr key={index}>
                  <td>
                    {education.school}
                    <br />
                    <small>({education.duration})</small>
                  </td>
                  <td>{education.degree}</td>
                  <td>
                    <ul className='list-disc ps-4'>
                      {education.descrioptions.map((desc, descIndex) => (
                        <li key={descIndex}>{desc}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className='pb-4'>
        <p className='mb-2 border-bottom border-2 fw-bold text-uppercase'>Recent Projects</p>
        {info.projects.map((project, index) => (
          <div key={index}>
            <p className='h5 fw-semibold'>{project.name}</p>
            <p className='mb-2 fst-italic'>{project.role}</p>
            <div className='mb-2'>
              <p className='fw-semibold'>Description:</p>
              <ul className='list-disc ps-4'>
                {project.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>
            <div className='mb-2'>
              <p className='fw-semibold'>Key Features:</p>
              <ul className='list-disc ps-4'>
                {project.keyFeatures.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className='fw-semibold'>
                Technologies Used:{' '}
                <span className='fw-normal'>{project.technologies.join(', ')}.</span>
              </p>
            </div>
            <hr />
            {index < info.projects.length - 1 && <br />}
          </div>
        ))}
      </div>
      <div>
        <p className='mb-2 border-bottom border-2 fw-bold text-uppercase'>Contact Me</p>
        <ul className='list-unstyled'>
          <li>
            <strong>Name:</strong> {info.name}
          </li>
          <li>
            <strong>English Name:</strong> {info.englishName}
          </li>
          <li>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${info.email}`} className='text-primary text-decoration-underline'>
              {info.email}
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{' '}
            <a href={`tel:${info.phone}`} className='text-primary text-decoration-underline'>
              {info.phone}
            </a>
          </li>
          <li>
            <strong>Gender:</strong> {info.gender}
          </li>
        </ul>
      </div>
    </Container>
  );
}
