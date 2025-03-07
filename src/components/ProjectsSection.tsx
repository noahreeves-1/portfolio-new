"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  liveUrl: string;
  longDescription: string;
};

// Skills that weren't used in the main projects
const otherSkills = [
  { name: "HTML", icon: "/skills/html5.svg", color: "bg-orange-500" },
  {
    name: "JavaScript",
    icon: "/skills/javascript.svg",
    color: "bg-yellow-400",
  },
  { name: "SQL", icon: "/skills/sql.svg", color: "bg-blue-400" },
  { name: "Node.js", icon: "/skills/nodejs.svg", color: "bg-green-600" },
  { name: "Express", icon: "/skills/express.svg", color: "bg-gray-800" },
  { name: "AdonisJS", icon: "/skills/adonis.svg", color: "bg-purple-700" },
  { name: "MySQL", icon: "/skills/mysql.svg", color: "bg-blue-800" },
  { name: "MongoDB", icon: "/skills/mongodb.svg", color: "bg-green-700" },
  { name: "SQL Server", icon: "/skills/sqlserver.svg", color: "bg-red-700" },
  { name: "Vercel", icon: "/skills/vercel.svg", color: "bg-slate-900" },
  { name: "Railway", icon: "/skills/railway.svg", color: "bg-purple-700" },
  { name: "Turbo", icon: "/skills/turbo.svg", color: "bg-red-500" },
  { name: "Nx", icon: "/skills/nx.svg", color: "bg-blue-700" },
];

// Map of all technologies and their colors for consistent display
const skillsColorMap: Record<string, string> = {
  // React ecosystem
  React: "hover:bg-sky-800 active:bg-sky-800",
  "React Native": "hover:bg-sky-900 active:bg-sky-900",
  "Next.js": "hover:bg-slate-800 active:bg-slate-800",

  // Languages
  TypeScript: "hover:bg-blue-800 active:bg-blue-800",
  JavaScript: "hover:bg-amber-700 active:bg-amber-700",
  HTML: "hover:bg-orange-700 active:bg-orange-700",
  CSS: "hover:bg-blue-700 active:bg-blue-700",

  // UI/CSS
  "Tailwind CSS": "hover:bg-sky-700 active:bg-sky-700",

  // Mobile
  Expo: "hover:bg-violet-800 active:bg-violet-800",

  // Databases
  PostgreSQL: "hover:bg-indigo-900 active:bg-indigo-900",
  MongoDB: "hover:bg-emerald-800 active:bg-emerald-800",
  Prisma: "hover:bg-purple-900 active:bg-purple-900",
  Supabase: "hover:bg-emerald-800 active:bg-emerald-800",
  Redis: "hover:bg-rose-800 active:bg-rose-800",
  MySQL: "hover:bg-blue-900 active:bg-blue-900",
  "SQL Server": "hover:bg-rose-900 active:bg-rose-900",
  SQL: "hover:bg-blue-700 active:bg-blue-700",
  ElasticSearch: "hover:bg-amber-800 active:bg-amber-800",
  Pinecone: "hover:bg-teal-800 active:bg-teal-800",

  // State Management
  Redux: "hover:bg-purple-800 active:bg-purple-800",
  "React Query": "hover:bg-rose-700 active:bg-rose-700",

  // Backend
  NestJS: "hover:bg-rose-800 active:bg-rose-800",
  "Node.js": "hover:bg-emerald-700 active:bg-emerald-700",
  Express: "hover:bg-gray-800 active:bg-gray-800",
  AdonisJS: "hover:bg-purple-800 active:bg-purple-800",
  Wasp: "hover:bg-amber-800 active:bg-amber-800",

  // AI/ML
  OpenAI: "hover:bg-emerald-900 active:bg-emerald-900",

  // DevOps/Hosting
  Docker: "hover:bg-blue-800 active:bg-blue-800",
  "Digital Ocean": "hover:bg-blue-700 active:bg-blue-700",
  "Fly.io": "hover:bg-indigo-800 active:bg-indigo-800",
  Firebase: "hover:bg-orange-800 active:bg-orange-800",
  Vercel: "hover:bg-slate-900 active:bg-slate-900",
  Railway: "hover:bg-violet-800 active:bg-violet-800",

  // Tools
  Stripe: "hover:bg-indigo-800 active:bg-indigo-800",
  Apify: "hover:bg-teal-800 active:bg-teal-800",
  Turbo: "hover:bg-rose-700 active:bg-rose-700",
  Nx: "hover:bg-blue-800 active:bg-blue-800",
  OpenSaaS: "hover:bg-fuchsia-800 active:bg-fuchsia-800",
};

// Shadow color mapping based on technology color
const skillsShadowMap: Record<string, string> = {
  // React ecosystem
  React: "hover:ring-sky-800/40 active:ring-sky-800/40",
  "React Native": "hover:ring-sky-900/40 active:ring-sky-900/40",
  "Next.js": "hover:ring-slate-800/40 active:ring-slate-800/40",

  // Languages
  TypeScript: "hover:ring-blue-800/40 active:ring-blue-800/40",
  JavaScript: "hover:ring-amber-700/40 active:ring-amber-700/40",
  HTML: "hover:ring-orange-700/40 active:ring-orange-700/40",
  CSS: "hover:ring-blue-700/40 active:ring-blue-700/40",

  // UI/CSS
  "Tailwind CSS": "hover:ring-sky-700/40 active:ring-sky-700/40",

  // Mobile
  Expo: "hover:ring-violet-800/40 active:ring-violet-800/40",

  // Databases
  PostgreSQL: "hover:ring-indigo-900/40 active:ring-indigo-900/40",
  MongoDB: "hover:ring-emerald-800/40 active:ring-emerald-800/40",
  Prisma: "hover:ring-purple-900/40 active:ring-purple-900/40",
  Supabase: "hover:ring-emerald-800/40 active:ring-emerald-800/40",
  Redis: "hover:ring-rose-800/40 active:ring-rose-800/40",
  MySQL: "hover:ring-blue-900/40 active:ring-blue-900/40",
  "SQL Server": "hover:ring-rose-900/40 active:ring-rose-900/40",
  SQL: "hover:ring-blue-700/40 active:ring-blue-700/40",
  ElasticSearch: "hover:ring-amber-800/40 active:ring-amber-800/40",
  Pinecone: "hover:ring-teal-800/40 active:ring-teal-800/40",

  // State Management
  Redux: "hover:ring-purple-800/40 active:ring-purple-800/40",
  "React Query": "hover:ring-rose-700/40 active:ring-rose-700/40",

  // Backend
  NestJS: "hover:ring-rose-800/40 active:ring-rose-800/40",
  "Node.js": "hover:ring-emerald-700/40 active:ring-emerald-700/40",
  Express: "hover:ring-gray-800/40 active:ring-gray-800/40",
  AdonisJS: "hover:ring-purple-800/40 active:ring-purple-800/40",
  Wasp: "hover:ring-amber-800/40 active:ring-amber-800/40",

  // AI/ML
  OpenAI: "hover:ring-emerald-900/40 active:ring-emerald-900/40",

  // DevOps/Hosting
  Docker: "hover:ring-blue-800/40 active:ring-blue-800/40",
  "Digital Ocean": "hover:ring-blue-700/40 active:ring-blue-700/40",
  "Fly.io": "hover:ring-indigo-800/40 active:ring-indigo-800/40",
  Firebase: "hover:ring-orange-800/40 active:ring-orange-800/40",
  Vercel: "hover:ring-slate-900/40 active:ring-slate-900/40",
  Railway: "hover:ring-violet-800/40 active:ring-violet-800/40",

  // Tools
  Stripe: "hover:ring-indigo-800/40 active:ring-indigo-800/40",
  Apify: "hover:ring-teal-800/40 active:ring-teal-800/40",
  Turbo: "hover:ring-rose-700/40 active:ring-rose-700/40",
  Nx: "hover:ring-blue-800/40 active:ring-blue-800/40",
  OpenSaaS: "hover:ring-fuchsia-800/40 active:ring-fuchsia-800/40",
};

// Ensure all otherSkills have their colors in the map
otherSkills.forEach((skill) => {
  if (!skillsColorMap[skill.name]) {
    const colorClass = skill.color.replace("bg-", "");
    skillsColorMap[
      skill.name
    ] = `hover:bg-${colorClass} active:bg-${colorClass}`;
    skillsShadowMap[
      skill.name
    ] = `hover:ring-${colorClass}/40 active:ring-${colorClass}/40`;
  }
});

// Default color for any technologies not in the map
const getSkillColor = (skill: string): string => {
  return skillsColorMap[skill] || "hover:bg-slate-600 active:bg-slate-600";
};

// Get matching shadow for a skill
const getSkillShadow = (skill: string): string => {
  return (
    skillsShadowMap[skill] || "hover:ring-slate-600/40 active:ring-slate-600/40"
  );
};

const projects: Project[] = [
  {
    id: 1,
    title: "Muffin: Food App",
    description: "A comprehensive food delivery and discovery platform",
    image: "/project1.jpg",
    technologies: [
      "React Native",
      "TypeScript",
      "Expo",
      "CSS",
      "ElasticSearch",
      "PostgreSQL",
      "Redux",
      "React Query",
      "Firebase",
      "Digital Ocean",
      "Prisma",
      "NestJS",
      "Docker",
      "Redis",
    ],
    github: "https://github.com/yourusername/muffin",
    liveUrl: "https://muffin-app.com",
    longDescription:
      "Muffin is a comprehensive food delivery application built with React Native and Expo. It features powerful search capabilities with ElasticSearch, data management with PostgreSQL, state management with Redux, efficient data fetching with React Query, authentication with Firebase, and deployment on Digital Ocean. The app uses Prisma for database ORM and Redis for caching to ensure optimal performance. The backend is powered by NestJS and the entire application is containerized with Docker.",
  },
  {
    id: 2,
    title: "StoryDiscount",
    description: "QR based marketing tool for local small businesses",
    image: "/project2.jpg",
    technologies: [
      "React",
      "TypeScript",
      "Wasp",
      "OpenSaaS",
      "Tailwind CSS",
      "Fly.io",
      "Stripe",
      "Prisma",
      "PostgreSQL",
      "Docker",
    ],
    github: "https://github.com/yourusername/storydiscount",
    liveUrl: "https://storydiscount.com",
    longDescription:
      "StoryDiscount is a QR-based marketing tool designed specifically for local small businesses. Built with React and Wasp, it leverages the OpenSaaS framework for rapid development. The user interface is crafted with Tailwind CSS for a responsive and modern look. The application is deployed on Fly.io, includes Stripe integration for payments, and uses Prisma ORM with PostgreSQL for efficient data management. The entire application is built with TypeScript and containerized with Docker for consistent development and deployment environments. StoryDiscount helps small businesses create engaging marketing campaigns through QR codes that customers can scan to access exclusive discounts and offers.",
  },
  {
    id: 3,
    title: "Lexcalibur",
    description:
      "Citizen text alert using AI to analyze new laws and regulations",
    image: "/project3.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Pinecone",
      "OpenAI",
      "Apify",
      "Supabase",
      "NestJS",
      "Docker",
    ],
    github: "https://github.com/yourusername/lexcalibur",
    liveUrl: "https://lexcalibur.app",
    longDescription:
      "Lexcalibur is an innovative citizen alert system that uses AI to analyze new laws and regulations, determining their relevance for individual users. Built with Next.js and styled with Tailwind CSS, it leverages Pinecone for vector database functionality and OpenAI for advanced text analysis. The platform uses Apify for web scraping to gather information about new legislation, and Supabase for backend database and authentication. The backend services are built with NestJS, and the entire system is containerized with Docker for seamless deployment. Lexcalibur helps citizens stay informed about the laws that matter most to them, providing personalized alerts based on their specific interests and circumstances.",
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const otherSkillsRef = useRef<HTMLDivElement>(null);

  // Setup animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered animation for project cards
    if (projectRefs.current.length > 0 && sectionRef.current) {
      gsap.fromTo(
        projectRefs.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Animation for Other Skills section
    if (otherSkillsRef.current) {
      gsap.fromTo(
        otherSkillsRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: otherSkillsRef.current,
            start: "top 85%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle modal animations
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      // Animate modal opening
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );

      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  // Function to close modal with animation
  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setSelectedProject(null),
      });
    }
  };

  // Function to add a reference to our refs array
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current[index] = el;
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-800" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-center">Projects</h2>
        <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Click on any project to learn
          more about it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => addToRefs(el, index)}
              className="bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.03] cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 ${getSkillColor(
                        tech
                      )} ${getSkillShadow(
                        tech
                      )} text-xs font-medium text-slate-200 rounded-full border border-slate-600 hover:border-slate-500 transition-all duration-300 bg-slate-700/80 backdrop-blur-sm ring-0 hover:ring-2`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Skills Section */}
        <div ref={otherSkillsRef} className="mt-20">
          <h2 className="text-3xl font-bold mb-4 text-center">Other Skills</h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto">
            Additional technologies I&apos;ve worked with in various projects.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {otherSkills.map((skill) => (
              <div
                key={skill.name}
                className={`px-4 py-2 rounded-full ${getSkillColor(
                  skill.name
                )} ${getSkillShadow(
                  skill.name
                )} flex items-center gap-2 transform hover:scale-105 transition-all duration-300 bg-slate-700/90 border border-slate-600 hover:border-slate-500 backdrop-blur-sm ring-0 hover:ring-2`}
              >
                <div className="w-5 h-5 relative">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-white">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              // Close when clicking outside the modal
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              ref={modalRef}
              className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-slate-400 hover:text-white hover:rotate-90 transition-transform duration-300"
                    aria-label="Close modal"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <div className="relative w-full h-64 mb-6">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <p className="text-slate-300 mb-6">
                  {selectedProject.longDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 ${getSkillColor(
                        tech
                      )} ${getSkillShadow(
                        tech
                      )} text-slate-200 rounded-full border border-slate-600 hover:border-slate-500 transition-all duration-300 bg-slate-700/80 backdrop-blur-sm ring-0 hover:ring-2`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors transform hover:scale-105 duration-200"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors transform hover:scale-105 duration-200"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
