export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
  descrioptions: string[];
}

export interface AwardCertificate {
  title: string;
  issuer: string;
  date: string;
}

export interface Project {
  name: string;
  role: string;
  description: string[];
  keyFeatures: string[];
  technologies: string[];
}

export interface ResumeInfo {
  jobTitle: string;
  gender: string;
  email: string;
  phone: string;
  name: string;
  englishName: string;
  generalInformations: string[];
  workExperiences: WorkExperience[];
  educations: Education[];
  awardsAndcertificates: AwardCertificate[];
  projects: Project[];
}
