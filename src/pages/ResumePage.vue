<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-200 px-2 py-16">
    <div class="container max-w-6xl rounded-md bg-white bg-opacity-90 p-8 shadow-md">
      <div class="mb-2 flex justify-between border-b py-1">
        <p>{{ info.jobTitle }}</p>
        <div class="hidden gap-3 md:flex">
          <p class="text-sm">{{ info.gender }}</p>
          <p class="text-sm">&#9900;</p>
          <a :href="`mailto:${info.email}`" class="text-sm text-blue-700 underline">
            {{ info.email }}
          </a>
          <p class="text-sm">&#9900;</p>
          <a :href="`tel:${info.phone}`" class="text-sm text-blue-700 underline">
            {{ info.phone }}</a
          >
        </div>
      </div>
      <div class="pb-6">
        <p class="pr-2 text-3xl font-bold uppercase">{{ info.name }}</p>
        <p class="text-md">({{ info.englishName }})</p>
      </div>
      <div class="pb-6">
        <p class="mb-2 border-b-2 font-bold uppercase">General Information</p>
        <ul class="list-disc pl-8">
          <li v-for="(value, index) in info.generalInformations" :key="index">
            {{ value }}
          </li>
        </ul>
      </div>
      <div class="pb-6">
        <p class="mb-2 border-b-2 font-bold uppercase">Work Experiences</p>
        <table class="w-full border-collapse border">
          <thead>
            <tr>
              <td class="w-[30%] border-collapse border p-1 font-semibold">Company</td>
              <td class="w-[30%] border-collapse border p-1 font-semibold">Duration</td>
              <td class="w-[40%] border-collapse border p-1 font-semibold">Position</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(experience, index) in info.workExperiences" :key="index">
              <td class="border-collapse border p-1">{{ experience.company }}</td>
              <td class="border-collapse border p-1">{{ experience.duration }}</td>
              <td class="border-collapse border p-1">{{ experience.position }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pb-6">
        <p class="mb-2 border-b-2 font-bold uppercase">Education</p>
        <table class="w-full border-collapse border">
          <thead>
            <tr>
              <td class="w-[30%] border-collapse border p-1 font-semibold">School</td>
              <td class="w-[30%] border-collapse border p-1 font-semibold">Degree</td>
              <td class="w-[40%] border-collapse border p-1 font-semibold">Descriptions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(education, index) in info.educations" :key="index">
              <td class="border-collapse border p-1">
                {{ education.school }}
                <br />
                <small>({{ education.duration }})</small>
              </td>
              <td class="border-collapse border p-1">{{ education.degree }}</td>
              <td class="border-collapse border p-1">
                <ul class="list-disc pl-5">
                  <li v-for="(desc, descIndex) in education.descrioptions" :key="descIndex">
                    {{ desc }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pb-6">
        <p class="mb-2 border-b-2 font-bold uppercase">Awards and Certificates</p>
        <table class="w-full border-collapse border">
          <thead>
            <tr>
              <td class="w-[50%] border-collapse border p-1 font-semibold">Title</td>
              <td class="w-[30%] border-collapse border p-1 font-semibold">Issuer</td>
              <td class="w-[20%] border-collapse border p-1 font-semibold">Date</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(award, index) in info.awardsAndcertificates" :key="index">
              <td class="border-collapse border p-1">{{ award.title }}</td>
              <td class="border-collapse border p-1">{{ award.issuer }}</td>
              <td class="border-collapse border p-1">{{ award.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pb-6">
        <p class="mb-2 border-b-2 font-bold uppercase">Recent Projects</p>
        <div v-for="(project, index) in info.projects" :key="index">
          <p class="text-lg font-semibold">{{ project.name }}</p>
          <p class="mb-2 italic">{{ project.role }}</p>
          <div class="mb-2">
            <p class="font-semibold">Description:</p>
            <ul class="list-disc pl-8">
              <li v-for="(desc, descIndex) in project.description" :key="descIndex">
                {{ desc }}
              </li>
            </ul>
          </div>
          <div class="mb-2">
            <p class="font-semibold">Key Features:</p>
            <ul class="list-disc pl-8">
              <li v-for="(feature, featureIndex) in project.keyFeatures" :key="featureIndex">
                {{ feature }}
              </li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">
              Technologies Used:
              <span class="font-normal">{{ project.technologies.join(", ") }}.</span>
            </p>
          </div>
          <p>---------------------------------</p>
          <br v-if="index < info.projects.length - 1" />
        </div>
      </div>
      <div class="pb-6">
        <p class="mb-2 border-b-2 font-bold uppercase">Contact Me</p>
        <ul>
          <li><strong>Name:</strong> {{ info.name }}</li>
          <li><strong>English Name:</strong> {{ info.englishName }}</li>
          <li>
            <strong>Email:</strong>{{ " " }}
            <a :href="`mailto:${info.email}`" class="text-blue-700 underline">{{ info.email }}</a>
          </li>
          <li>
            <strong>Phone:</strong>{{ " " }}
            <a :href="`tel:${info.phone}`" class="text-blue-700 underline">{{ info.phone }}</a>
          </li>
          <li><strong>Gender:</strong> {{ info.gender }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const info = reactive({
  jobTitle: "Software Engineer",
  gender: "Male",
  email: "ngmthaq.20@gmail.com",
  phone: "0389884507",
  name: "Nguyen Manh Thang",
  englishName: "Victor Nguyen",
  generalInformations: [
    "Passionate about learning new technologies and improving coding skills.",
    "Experienced Software Engineer with a strong background in developing scalable applications and working across the full stack.",
    "Proficient in JavaScript, TypeScript, Vue.js and React.js.",
    "Familiar with UI fameworks such as MUI, Tailwind CSS and Bootstrap.",
    "Have experience working with PHP, Laravel, Node.js, Express.js and Nest.js for backend development.",
    "Have knowledge of database systems such as MySQL, PostgreSQL and SQLite.",
    "Skilled in using version control systems like Git and platforms like GitHub, GitLab and BitBucket.",
    "Strong problem-solving skills and ability to work effectively with Agile methodology.",
    "Other skills: PWA, Docker, Microservices, Cloud Platforms, CI/CD pipelines, unit testing,...",
  ],
  workExperiences: [
    {
      company: "CMC Global",
      position: "Software Engineer",
      duration: "Apr 2024 - Now",
    },
    {
      company: "bGlobal",
      position: "Fullstack Developer",
      duration: "Feb 2022 - Apr 2024",
    },
    {
      company: "Confidential",
      position: "Frontend Developer",
      duration: "Apr 2021 - Dec 2021",
    },
  ],
  educations: [
    {
      school: "Thuong Mai University",
      degree: "Bachelor's Degree in Management Information Systems",
      duration: "Sep 2018 - Jun 2022",
      descrioptions: ["Graduated with a GPA of 3.56 / 4.0", "Ranking in the top 50 of the faculty"],
    },
  ],
  awardsAndcertificates: [
    {
      title: "Best Developer Award",
      issuer: "CMC Global",
      date: "2025",
    },
    {
      title: "Raising Star Award",
      issuer: "bGlobal",
      date: "2024",
    },
    {
      title: "Certificate in website design and development",
      issuer: "ITPlus Academy",
      date: "2022",
    },
    {
      title: "TOEIC Certificate 745",
      issuer: "IIG Vietnam",
      date: "2021",
    },
    {
      title: "MOS Certificate",
      issuer: "Thuong Mai University",
      date: "2018",
    },
  ],
  projects: [
    {
      name: "AI-powered Building Security Control Application",
      role: "Fullstack Developer - Team Leader",
      description: [
        "The AI-Powered Building Security Control Application is an integrated security management platform designed to enhance building safety, automate surveillance, and streamline access control through advanced artificial intelligence.",
        "This system provides real-time monitoring, intelligent threat detection, and centralized control for building administrators, ensuring a safer and more efficient environment for occupants.",
        "Leveraging computer vision, machine learning, and IoT integration, the application can analyze live video feeds, detect suspicious activities, identify authorized personnel, and automate security responses with high accuracy.",
        "It supports various hardware devices—CCTV cameras, smart locks, sensors, alarms—and unifies them into a single, user-friendly interface accessible via desktop and mobile.",
      ],
      keyFeatures: [
        "Smart Access Control: Facial recognition, ID verification, and AI-driven authentication for secure entry and exit points.",
        "Real-Time Surveillance Monitoring: AI-powered video analytics capable of detecting intrusions, abnormal behavior, unattended objects, and crowd anomalies.",
        "Incident Alerts & Automation: Automatic notifications, event logging, and configurable response workflows that trigger alarms, lock doors, or notify security teams.",
        "Comprehensive Dashboard: Centralized control panel displaying live camera streams, analytics insights, access logs, and system health status.",
        "Scalable System Integration: Supports seamless integration with existing security infrastructure and third-party management systems.",
        "Data Analytics & Reporting: Insights into building traffic, security incidents, and access patterns for improved planning and compliance.",
      ],
      technologies: [
        "TypeScript",
        "React.js",
        "MUI",
        "Axios",
        "Tanstack Query",
        "Tanstack Router",
        "I18next",
        "Jotai",
        "Nest.js",
        "Prisma",
        "PostgreSQL",
        "Redis",
        "Docker",
        "AWS",
        "Python",
        "TensorFlow",
        "OpenCV",
      ],
    },
    {
      name: "AI-powered Multilingual Translation Platform for Vietnamese-Thai-Lao-Khmer",
      role: "Fullstack Developer - Team Leader",
      description: [
        "The AI-powered Multilingual Translation Platform is a specialized NLP system designed to translate Vietnamese content into Thai, Lao, and Khmer with high contextual accuracy.",
        "The application supports both direct text input and file-based translation, enabling users to upload TXT, DOCX, and PDF documents and receive translated results instantly.",
        "AI translation is powered by transformer-based NLP models running as scalable Python microservices, allowing high-performance translation for Southeast Asian languages.",
        "The system includes a Vue-based web interface for document upload, translation management, previewing results, batch processing, and accessing translation history.",
      ],
      keyFeatures: [
        "Multilingual NLP Translation: High-quality translation between Vietnamese ↔ Thai, Lao, Khmer using transformer-based deep learning models.",
        "File Translation Support: Upload TXT, DOCX, and PDF files with preserved formatting in translated outputs.",
        "Batch Processing: Translate multiple documents or paragraphs within a single workflow.",
        "Document Preview & Export: Side-by-side translation preview and export options (TXT, DOCX, PDF).",
        "Translation Memory: Automatically stores translated phrases for improved consistency and faster future translations.",
        "User Workspace & History: Save, organize, and re-download previous translated documents.",
      ],
      technologies: [
        "Vue 3",
        "Pinia",
        "Vue Router",
        "Pinia",
        "Axios",
        "BootstrapVue",
        "PHP",
        "Laravel",
        "MySQL",
        "LibreOffice SDK",
        "Redis",
        "Python",
        "PyTorch",
        "Hugging Face Transformers",
        "Docker",
        "AWS",
      ],
    },
    {
      name: "Maritime Ship Tracking & Monitoring System",
      role: "Fullstack Developer",
      description: [
        "The Maritime Ship Tracking & Fleet Monitoring System is a real-time platform designed to help shipping companies and port authorities track vessel locations, manage fleet operations, and ensure navigational safety across global waters.",
        "The system collects AIS signals, satellite data, and onboard sensor information to display accurate ship positions, statuses, and travel histories on an interactive map.",
        "It enables operators to monitor routes, detect geofence violations, manage port arrivals, and optimize fleet movements using reliable maritime data sources.",
        "The platform integrates seamlessly with maritime communication networks, weather services, and port scheduling systems, providing a unified, user-friendly interface accessible via web and mobile.",
      ],
      keyFeatures: [
        "Real-Time Ship Tracking: AIS- and satellite-based vessel position updates displayed on an interactive global map.",
        "Route Monitoring: Historical route playback, distance measurement, and deviation alerts based on predefined routes.",
        "Geofencing: Customizable geographic zones with automatic alerts for entry, exit, or restricted-area violations.",
        "Fleet Management Dashboard: Overview of all vessels including current status, speed, destination, and estimated arrival.",
        "Port Arrival & Scheduling: Tools to manage docking schedules, queue statuses, and port traffic information.",
        "Reporting & Logs: Exportable logs of vessel movements, geofence events, and maritime activity summaries.",
      ],
      technologies: [
        "TypeScript",
        "React.js",
        "Leaflet.js",
        "MUI",
        "Axios",
        "Tanstack Query",
        "React Router",
        "I18next",
        "Zustand",
        "Nest.js",
        "Prisma",
        "MySQL",
        "Redis",
        "Docker",
        "AWS",
      ],
    },
    {
      name: "End-to-End Encrypted Cross-Platform Chat Application",
      role: "Frontend Developer",
      description: [
        "The End-to-End Encrypted Chat Application is a secure, cross-platform messaging platform built using Electron.js and React.js, designed to provide private communication without relying on external cloud services.",
        "All messages and attachments are encrypted using AES before transmission and storage, ensuring confidentiality during peer-to-peer communication and within the local database.",
        "The application delivers real-time messaging, file sharing, contact management, and group chats with a modern, responsive UI optimized for desktop environments.",
        "As a Frontend Developer, I implemented the chat interface, message workflows, AES-based encryption/decryption on the client-side, and integrated frontend logic with Electron IPC channels and the SQLite local database.",
      ],
      keyFeatures: [
        "AES-Based End-to-End Encryption: Messages and attachments are encrypted using AES-256 before sending and decrypted only on the receiving device.",
        "Local-First Architecture: All chat data, attachments, and metadata stored securely in a local SQLite database.",
        "Real-Time Chat Experience: Smooth message rendering, virtualized message lists, and seamless conversation handling.",
        "Encrypted File Sharing: AES-encrypted attachments with preview and download capabilities.",
        "Cross-Platform Electron App: Runs on macOS, Windows, and Linux from a unified React/Electron codebase.",
        "User & Group Management: UI for handling contacts, groups, and device session settings within the encrypted environment.",
      ],
      technologies: [
        "Electron.js",
        "React.js",
        "TypeScript",
        "MUI",
        "Redux Toolkit",
        "SQLite",
        "AES-256 Encryption (Crypto API / Crypto-JS)",
        "WebRTC",
      ],
    },
    {
      name: "Admin Portal for Encrypted Cross-Platform Chat Application",
      role: "Frontend Developer",
      description: [
        "The Admin Portal is a management dashboard designed to support the encrypted chat application by providing tools for monitoring system activity, managing users, and configuring application settings.",
        "The platform offers real-time visibility into user sessions, device registrations, message synchronization status, and system health, helping administrators maintain a secure and stable communication environment.",
        "The portal features a modern, responsive UI built with React.js, optimized for desktop browsers, and communicates securely with the backend using authenticated API endpoints.",
        "As a Frontend Developer, I implemented the admin dashboard UI, data visualization components, role-based access control flows, and integration with API endpoints powering user analytics, logs, and system metrics.",
      ],
      keyFeatures: [
        "User Management: Tools for viewing, editing, activating/deactivating users and devices.",
        "Session Monitoring: Real-time overview of active sessions and device connections.",
        "System Dashboard: Analytics on message volume, system load, and synchronization status.",
        "Audit Logs: Detailed logs of user actions, message events, and administrative operations.",
        "Role-Based Access Control (RBAC): UI for managing admin roles, permissions, and security policies.",
        "Chat App Configuration: Admin screens for managing app settings, encryption configurations, and update versions.",
      ],
      technologies: [
        "React.js",
        "Vite",
        "TypeScript",
        "MUI",
        "Redux Toolkit",
        "Chart.js",
        "Axios",
        "JWT Authentication",
      ],
    },
  ],
});
</script>

<style scoped></style>
