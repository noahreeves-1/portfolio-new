"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPortal } from "react-dom";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  liveUrl: string;
  longDescription: string;
  timeRange: string;
  categorizedTechnologies?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    mobile?: string[];
    devops?: string[];
    ai?: string[];
    tools?: string[];
  };
};

// Define the type for skills
type Skill = {
  name: string;
  icon: string;
  color: string;
  category: string;
};

// Skills that weren't used in the main projects
const otherSkills: Skill[] = [
  // Programming Languages
  {
    name: "HTML",
    icon: "/skills/html5.svg",
    color: "bg-orange-500",
    category: "Programming Languages",
  },
  {
    name: "JavaScript",
    icon: "/skills/javascript.svg",
    color: "bg-yellow-400",
    category: "Programming Languages",
  },
  {
    name: "Python",
    icon: "/skills/python.svg",
    color: "bg-blue-600",
    category: "Programming Languages",
  },

  // Databases
  {
    name: "SQL",
    icon: "/skills/sql.svg",
    color: "bg-blue-400",
    category: "Databases",
  },
  {
    name: "MySQL",
    icon: "/skills/mysql.svg",
    color: "bg-blue-800",
    category: "Databases",
  },
  // {
  //   name: "MongoDB",
  //   icon: "/skills/mongodb.svg",
  //   color: "bg-green-700",
  //   category: "Databases",
  // },
  {
    name: "SQL Server",
    icon: "/skills/sqlserver.svg",
    color: "bg-red-700",
    category: "Databases",
  },
  {
    name: "Pinecone",
    icon: "/skills/pinecone.webp",
    color: "bg-teal-500",
    category: "Databases",
  },

  // Backend & Server
  {
    name: "Node.js",
    icon: "/skills/nodejs.svg",
    color: "bg-green-600",
    category: "Backend & Server",
  },
  {
    name: "Express",
    icon: "/skills/express.svg",
    color: "bg-gray-800",
    category: "Backend & Server",
  },
  {
    name: "AdonisJS",
    icon: "/skills/adonis.svg",
    color: "bg-purple-700",
    category: "Backend & Server",
  },

  // DevOps & Deployment
  {
    name: "Vercel",
    icon: "/skills/vercel.svg",
    color: "bg-slate-900",
    category: "DevOps & Deployment",
  },
  {
    name: "Railway",
    icon: "/skills/railway.svg",
    color: "bg-purple-700",
    category: "DevOps & Deployment",
  },
  {
    name: "Turbo",
    icon: "/skills/turbo.svg",
    color: "bg-red-500",
    category: "DevOps & Deployment",
  },
  {
    name: "Nx",
    icon: "/skills/nx.svg",
    color: "bg-blue-700",
    category: "DevOps & Deployment",
  },
  {
    name: "Hadoop",
    icon: "/skills/hadoop.svg",
    color: "bg-yellow-500",
    category: "DevOps & Deployment",
  },

  // Data & Analytics
  {
    name: "Tableau",
    icon: "/skills/tableau.svg",
    color: "bg-blue-500",
    category: "Data & Analytics",
  },
  {
    name: "Power BI",
    icon: "/skills/powerbi.svg",
    color: "bg-yellow-600",
    category: "Data & Analytics",
  },
  {
    name: "R",
    icon: "/skills/r.svg",
    color: "bg-blue-600",
    category: "Data & Analytics",
  },

  // Automation
  {
    name: "Blue Prism",
    icon: "/skills/blueprism.svg",
    color: "bg-blue-800",
    category: "Automation",
  },

  // Office Tools
  {
    name: "PowerPoint",
    icon: "/skills/powerpoint.svg",
    color: "bg-orange-600",
    category: "Office Tools",
  },
  {
    name: "Excel",
    icon: "/skills/excel.svg",
    color: "bg-green-500",
    category: "Office Tools",
  },
  {
    name: "SharePoint",
    icon: "/skills/sharepoint.svg",
    color: "bg-blue-700",
    category: "Office Tools",
  },
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
  Python: "hover:bg-blue-600 active:bg-blue-600",

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
  Twilio: "hover:bg-red-600 active:bg-red-600",

  // Data Visualization & Office Tools
  Tableau: "hover:bg-blue-500 active:bg-blue-500",
  "Power BI": "hover:bg-yellow-600 active:bg-yellow-600",
  "Blue Prism": "hover:bg-blue-800 active:bg-blue-800",
  PowerPoint: "hover:bg-orange-600 active:bg-orange-600",
  Excel: "hover:bg-green-500 active:bg-green-500",
  SharePoint: "hover:bg-blue-700 active:bg-blue-700",
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
  Python: "hover:ring-blue-600/40 active:ring-blue-600/40",

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
  Twilio: "hover:ring-red-600/40 active:ring-red-600/40",

  // Data Visualization & Office Tools
  Tableau: "hover:ring-blue-500/40 active:ring-blue-500/40",
  "Power BI": "hover:ring-yellow-600/40 active:ring-yellow-600/40",
  "Blue Prism": "hover:ring-blue-800/40 active:ring-blue-800/40",
  PowerPoint: "hover:ring-orange-600/40 active:ring-orange-600/40",
  Excel: "hover:ring-green-500/40 active:ring-green-500/40",
  SharePoint: "hover:ring-blue-700/40 active:ring-blue-700/40",
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

// Define skill priority within each category (higher number = higher priority)
const skillPriority: Record<string, number> = {
  // Programming Languages
  JavaScript: 100,
  Python: 90,
  HTML: 80,

  // Databases
  SQL: 100,
  MongoDB: 90,
  MySQL: 85,
  "SQL Server": 80,

  // Backend & Server
  "Node.js": 100,
  Express: 90,
  AdonisJS: 80,

  // DevOps & Deployment
  Vercel: 100,
  Railway: 90,
  Turbo: 85,
  Nx: 80,
  Hadoop: 85,

  // Data & Analytics
  Tableau: 90,
  "Power BI": 85,
  R: 95,

  // Automation
  "Blue Prism": 80,

  // Office Tools
  Excel: 90,
  PowerPoint: 85,
  SharePoint: 80,
};

// Map technologies to their icon paths
const technologyIcons: Record<string, string> = {
  // Frontend
  React: "/skills/react.svg",
  "React Native": "/skills/reactnative.svg",
  "Next.js": "/skills/nextjs.svg",
  TypeScript: "/skills/typescript.svg",
  JavaScript: "/skills/javascript.svg",
  HTML: "/skills/html5.svg",
  CSS: "/skills/css3.svg",
  "Tailwind CSS": "/skills/tailwind.svg",
  Redux: "/skills/redux.svg",
  "React Query": "/skills/reactquery.svg",

  // Backend
  "Node.js": "/skills/nodejs.svg",
  Express: "/skills/express.svg",
  NestJS: "/skills/nestjs.svg",
  AdonisJS: "/skills/adonis.svg",
  Wasp: "/skills/opensaas.webp",
  // OpenSaaS: "/skills/opensaas.webp",

  // Databases
  PostgreSQL: "/skills/postgresql.svg",
  MongoDB: "/skills/mongodb.svg",
  MySQL: "/skills/mysql.svg",
  "SQL Server": "/skills/sqlserver.svg",
  SQL: "/skills/sql.svg",
  Prisma: "/skills/prisma.svg",
  Supabase: "/skills/supabase.svg",
  Redis: "/skills/redis.svg",
  ElasticSearch: "/skills/elasticsearch.svg",
  Pinecone: "/skills/pinecone.webp",

  // DevOps/Hosting
  Docker: "/skills/docker.svg",
  "Digital Ocean": "/skills/digitalocean.svg",
  "Fly.io": "/skills/flyio.svg",
  Firebase: "/skills/firebase.svg",
  Vercel: "/skills/vercel.svg",
  Railway: "/skills/railway.svg",
  Turbo: "/skills/turbo.svg",
  Nx: "/skills/nx.svg",

  // AI/ML
  OpenAI: "/skills/openai.webp",

  // Tools
  Stripe: "/skills/stripe.svg",
  Apify: "/skills/apify.svg",
  Twilio: "/skills/twilio.svg",

  // Mobile
  Expo: "/skills/expo.svg",

  // Other
  Python: "/skills/python.svg",
  Tableau: "/skills/tableau.svg",
  "Power BI": "/skills/powerbi.svg",
  "Blue Prism": "/skills/blueprism.svg",
  PowerPoint: "/skills/powerpoint.svg",
  Excel: "/skills/excel.svg",
  SharePoint: "/skills/sharepoint.svg",
  R: "/skills/r.svg",
  Hadoop: "/skills/hadoop.svg",
};

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

// Function to categorize technologies
const categorizeTechnologies = (technologies: string[]) => {
  const categories = {
    frontend: [
      "React",
      "React Native",
      "Expo",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "Redux",
      "React Query",
    ],
    backend: ["Node.js", "Express", "NestJS", "AdonisJS", "Wasp"],
    database: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "SQL Server",
      "SQL",
      "Prisma",
      "Supabase",
      "Redis",
      "ElasticSearch",
      "Pinecone",
    ],
    devops: [
      "Docker",
      "Digital Ocean",
      "Fly.io",
      "Firebase",
      "Vercel",
      "Railway",
      "Turbo",
      "Nx",
    ],
    ai: ["OpenAI"],
    tools: ["Stripe", "Apify", "Twilio"],
    other: [
      "Python",
      "Tableau",
      "Power BI",
      "Blue Prism",
      "PowerPoint",
      "Excel",
      "SharePoint",
    ],
  };

  const categorized: Record<string, string[]> = {};

  technologies.forEach((tech) => {
    for (const [category, techs] of Object.entries(categories)) {
      if (techs.includes(tech)) {
        if (!categorized[category]) {
          categorized[category] = [];
        }
        categorized[category].push(tech);
        break;
      }
    }
  });

  return categorized;
};

// Define the consistent order of categories
const categoryOrder = [
  "ai",
  "frontend",
  "backend",
  "database",
  "devops",
  "tools",
  "other",
];

// Function to render categories in consistent order
const renderCategorizedTechnologies = (
  categorizedTech: Record<string, string[]>,
  isModal: boolean = false
) => {
  // For project cards (non-modal view), just show a flat list of technologies
  if (!isModal) {
    // Flatten all technologies into a single array while preserving category order
    const allTechs: string[] = [];
    categoryOrder.forEach((category) => {
      if (categorizedTech[category]) {
        allTechs.push(...categorizedTech[category]);
      }
    });

    return (
      <div className="flex flex-wrap gap-1">
        {allTechs.map((tech) => {
          // Get icon path from the mapping
          const iconPath = technologyIcons[tech] || null;

          return (
            <div
              key={tech}
              className={`
                tech-badge group flex items-center mb-0.5 mr-1
                ${getSkillColor(tech)} ${getSkillShadow(tech)} 
                rounded-md border border-slate-600/80 hover:border-slate-400 
                transition-all duration-300 bg-slate-800/90 backdrop-blur-sm 
                hover:shadow-md hover:-translate-y-0.5 px-2 py-1.5
              `}
            >
              {iconPath && (
                <div className="relative w-4 h-4 mr-1.5 opacity-90 group-hover:opacity-100">
                  <Image
                    src={iconPath}
                    alt={tech}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                {tech}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // For modal view, keep the categorized display
  return categoryOrder.map((category) => {
    const techs = categorizedTech[category];
    if (!techs || techs.length === 0) return null;

    return (
      <div key={category} className={isModal ? "mb-5" : "mb-3"}>
        <h4
          className={`${
            isModal
              ? "text-sm font-semibold mb-3 text-teal-400"
              : "text-xs font-medium mb-2 text-teal-400/90"
          } capitalize flex items-center`}
        >
          {/* Category icon based on category name */}
          <span className="mr-1.5">
            {category === "frontend" && "🎨"}
            {category === "backend" && "⚙️"}
            {category === "database" && "💾"}
            {category === "ai" && "🧠"}
            {category === "devops" && "🚀"}
            {category === "tools" && "🔧"}
            {category === "other" && "✨"}
          </span>
          {category}
        </h4>
        <div className={`flex flex-wrap ${isModal ? "gap-2.5" : "gap-1.5"}`}>
          {techs.map((tech) => {
            // Get icon path from the mapping
            const iconPath = technologyIcons[tech] || null;

            return (
              <div
                key={tech}
                className={`
                  tech-badge group flex items-center ${
                    isModal ? "mb-1.5 mr-1.5" : "mr-1"
                  } ${getSkillColor(tech)} ${getSkillShadow(tech)} 
                  rounded-md border border-slate-600/80 hover:border-slate-400 
                  transition-all duration-300 bg-slate-800/90 backdrop-blur-sm 
                  hover:shadow-md hover:-translate-y-0.5
                  ${isModal ? "px-3 py-2" : "px-2 py-1.5"}
                `}
              >
                {iconPath && (
                  <div
                    className={`relative ${
                      isModal ? "w-5 h-5" : "w-4 h-4"
                    } mr-1.5 opacity-90 group-hover:opacity-100`}
                  >
                    <Image
                      src={iconPath}
                      alt={tech}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span
                  className={`
                  ${isModal ? "text-sm" : "text-xs"} 
                  font-medium text-slate-300 group-hover:text-white
                `}
                >
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
};

const projects: Project[] = [
  {
    id: 1,
    title: "Muffin: Food App",
    description: "A comprehensive food delivery and discovery platform",
    image: "/project1.jpg",
    technologies: [
      "Expo",
      "React Native",
      "TypeScript",
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
    github: "https://github.com/noahreeves-1",
    liveUrl: "https://muffin-app.com",
    timeRange: "May 2023 - Oct 2024",
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
    github: "https://github.com/noahreeves-1",
    liveUrl: "https://storydiscount.com",
    timeRange: "November 2024 - February 2025",
    longDescription:
      "StoryDiscount is a QR-based marketing tool designed specifically for local small businesses. Built with React and Wasp, it leverages the OpenSaaS framework for rapid development. The user interface is crafted with Tailwind CSS for a responsive and modern look. The application is deployed on Fly.io, includes Stripe integration for payments, and uses Prisma ORM with PostgreSQL for efficient data management. The entire application is built with TypeScript and containerized with Docker for consistent development and deployment environments. StoryDiscount helps small businesses create engaging marketing campaigns through QR codes that customers can scan to access exclusive discounts and offers.",
  },
  {
    id: 3,
    title: "Lexcalibur AI (building)",
    description:
      "Citizen text alert using AI to analyze new laws and regulations",
    image: "/project3.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      // "Pinecone",
      "OpenAI",
      "Apify",
      "MongoDB",
      "NestJS",
      "Docker",
      "Twilio",
      "Stripe",
    ],
    github: "https://github.com/noahreeves-1",
    liveUrl: "https://lexcalibur.app",
    timeRange: "February 2025 - Present",
    longDescription:
      "Lexcalibur is an innovative citizen alert system that uses AI to analyze new laws and regulations, determining their relevance for individual users. Built with Next.js and styled with Tailwind CSS, it leverages Pinecone for vector database functionality and OpenAI for advanced text analysis. The platform uses Apify for web scraping to gather information about new legislation, and Supabase for backend database and authentication. The backend services are built with NestJS, and the entire system is containerized with Docker for seamless deployment. Lexcalibur helps citizens stay informed about the laws that matter most to them, providing personalized alerts based on their specific interests and circumstances.",
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const otherSkillsRef = useRef<HTMLDivElement>(null);

  // Check if we're in the browser environment for portal rendering
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

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
      // Main section fade in
      gsap.fromTo(
        otherSkillsRef.current.querySelector("h2"),
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: otherSkillsRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        otherSkillsRef.current.querySelector("p"),
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: otherSkillsRef.current,
            start: "top 85%",
          },
        }
      );

      // Staggered animation for skill category cards
      const categoryCards =
        otherSkillsRef.current.querySelectorAll(".grid > div");
      gsap.fromTo(
        categoryCards,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: otherSkillsRef.current,
            start: "top 80%",
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
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );

      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Function to close modal with animation
  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
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

  // Render modal using portal to ensure it's not affected by parent stacking contexts
  const renderModal = () => {
    if (!selectedProject || !isMounted) return null;

    // Categorize technologies for the selected project
    const categorizedTech = categorizeTechnologies(
      selectedProject.technologies
    );

    return createPortal(
      <div
        className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center p-4"
        style={{ position: "fixed" }}
        onClick={(e) => {
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
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white hover:rotate-90 transition-transform duration-300"
                aria-label="Close modal"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <p className="text-teal-400 font-medium mb-4">
              {selectedProject.timeRange}
            </p>

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

            {/* Technologies section with improved styling */}
            <div className="bg-slate-800/70 rounded-lg p-4 border border-slate-700/80 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-teal-400 border-b border-slate-700 pb-2">
                Technologies Used
              </h3>
              <div className="space-y-2">
                {renderCategorizedTechnologies(categorizedTech, true)}
              </div>
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
      </div>,
      document.body
    );
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
          {projects.map((project, index) => {
            // Categorize technologies for each project card
            const categorizedTech = categorizeTechnologies(
              project.technologies
            );

            return (
              <div
                key={project.id}
                ref={(el) => addToRefs(el, index)}
                className="bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.03] cursor-pointer project-card"
                onClick={() => setSelectedProject(project)}
                onMouseEnter={(e) => {
                  // Animate tech badges on hover
                  const techBadges =
                    e.currentTarget.querySelectorAll(".tech-badge");
                  gsap.to(techBadges, {
                    scale: 1.05,
                    stagger: 0.02,
                    duration: 0.2,
                    ease: "power1.out",
                  });
                }}
                onMouseLeave={(e) => {
                  // Reset tech badges on mouse leave
                  const techBadges =
                    e.currentTarget.querySelectorAll(".tech-badge");
                  gsap.to(techBadges, {
                    scale: 1,
                    stagger: 0.01,
                    duration: 0.15,
                    ease: "power1.in",
                  });
                }}
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
                  <p className="text-slate-300 mb-2">{project.description}</p>
                  <p className="text-teal-400 text-sm mb-4">
                    {project.timeRange}
                  </p>

                  {/* Technologies section with improved styling */}
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/80">
                    {renderCategorizedTechnologies(categorizedTech)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Skills Section */}
        <div ref={otherSkillsRef} className="mt-20">
          <h2 className="text-3xl font-bold mb-4 text-center">Other Skills</h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto">
            Additional technologies I&apos;ve worked with in various projects.
          </p>

          {/* Group skills by category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Define category order by importance for software engineering */}
            {[
              "Programming Languages",
              "Backend & Server",
              "Databases",
              "DevOps & Deployment",
              "Data & Analytics",
              "Automation",
              "Office Tools",
            ].map((category) => (
              <div
                key={category}
                className="bg-slate-700/60 backdrop-blur-sm rounded-lg p-5 shadow-lg border border-slate-600 hover:border-teal-500/50 transition-all duration-300 hover:shadow-teal-900/20 hover:shadow-xl transform hover:-translate-y-1"
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  const skills = target.querySelectorAll(".skill-item");
                  gsap.to(skills, {
                    scale: 1.05,
                    stagger: 0.03,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  const skills = target.querySelectorAll(".skill-item");
                  gsap.to(skills, {
                    scale: 1,
                    stagger: 0.02,
                    duration: 0.2,
                    ease: "power2.in",
                  });
                }}
              >
                <h3 className="text-xl font-semibold mb-4 text-teal-400 border-b border-slate-600 pb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherSkills
                    .filter((skill) => skill.category === category)
                    .sort((a, b) => {
                      // Sort by priority (higher number first)
                      const priorityA = skillPriority[a.name] || 0;
                      const priorityB = skillPriority[b.name] || 0;
                      return priorityB - priorityA;
                    })
                    .map((skill) => (
                      <div
                        key={skill.name}
                        className={`skill-item px-3 py-1.5 rounded-full ${getSkillColor(
                          skill.name
                        )} ${getSkillShadow(
                          skill.name
                        )} flex items-center gap-2 transform hover:scale-105 transition-all duration-300 bg-slate-700/90 border border-slate-600 hover:border-slate-500 backdrop-blur-sm ring-0 hover:ring-2 cursor-pointer`}
                      >
                        <div className="w-5 h-5 relative">
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-white text-sm">{skill.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Render modal with portal */}
        {renderModal()}
      </div>
    </section>
  );
}
