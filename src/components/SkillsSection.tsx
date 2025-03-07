"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Define the Skill type to include the hoverColor property
type Skill = {
  name: string;
  icon: string;
  color: string;
  hoverColor?: string;
  ringShadow?: string;
};

// Define all skills by category
const skillsData: Record<string, Skill[]> = {
  languages: [
    { name: "HTML", icon: "/skills/html5.svg", color: "bg-orange-500" },
    { name: "CSS", icon: "/skills/css3.svg", color: "bg-blue-500" },
    {
      name: "JavaScript",
      icon: "/skills/javascript.svg",
      color: "bg-yellow-400",
    },
    {
      name: "TypeScript",
      icon: "/skills/typescript.svg",
      color: "bg-blue-600",
    },
    { name: "SQL", icon: "/skills/sql.svg", color: "bg-blue-400" },
  ],
  frontend: [
    { name: "React", icon: "/skills/react.svg", color: "bg-blue-400" },
    { name: "React Native", icon: "/skills/react.svg", color: "bg-blue-500" },
    { name: "Next.js", icon: "/skills/nextjs.svg", color: "bg-slate-800" },
    { name: "Redux", icon: "/skills/redux.svg", color: "bg-purple-600" },
    {
      name: "Tailwind CSS",
      icon: "/skills/tailwind.svg",
      color: "bg-teal-500",
    },
    { name: "Expo", icon: "/skills/expo.svg", color: "bg-slate-900" },
  ],
  backend: [
    { name: "Node.js", icon: "/skills/nodejs.svg", color: "bg-green-600" },
    { name: "Express", icon: "/skills/express.svg", color: "bg-gray-800" },
    { name: "NestJS", icon: "/skills/nestjs.svg", color: "bg-red-600" },
    { name: "AdonisJS", icon: "/skills/adonis.svg", color: "bg-purple-700" },
    { name: "Firebase", icon: "/skills/firebase.svg", color: "bg-yellow-600" },
    { name: "Wasp", icon: "/skills/wasp.svg", color: "bg-yellow-500" },
    { name: "OpenSaaS", icon: "/skills/opensaas.svg", color: "bg-blue-700" },
  ],
  databases: [
    {
      name: "PostgreSQL",
      icon: "/skills/postgresql.svg",
      color: "bg-blue-700",
    },
    { name: "MySQL", icon: "/skills/mysql.svg", color: "bg-blue-800" },
    { name: "MongoDB", icon: "/skills/mongodb.svg", color: "bg-green-700" },
    { name: "Redis", icon: "/skills/redis.svg", color: "bg-red-600" },
    {
      name: "ElasticSearch",
      icon: "/skills/elasticsearch.svg",
      color: "bg-yellow-500",
    },
    { name: "Pinecone", icon: "/skills/pinecone.svg", color: "bg-blue-600" },
    { name: "SQL Server", icon: "/skills/sqlserver.svg", color: "bg-red-700" },
  ],
  devops: [
    { name: "Docker", icon: "/skills/docker.svg", color: "bg-blue-600" },
    { name: "Vercel", icon: "/skills/vercel.svg", color: "bg-slate-900" },
    {
      name: "Digital Ocean",
      icon: "/skills/digitalocean.svg",
      color: "bg-blue-500",
    },
    { name: "Railway", icon: "/skills/railway.svg", color: "bg-purple-700" },
    { name: "Fly.io", icon: "/skills/flyio.svg", color: "bg-purple-600" },
  ],
  tools: [
    { name: "Prisma", icon: "/skills/prisma.svg", color: "bg-slate-800" },
    { name: "Turbo", icon: "/skills/turbo.svg", color: "bg-red-500" },
    { name: "Nx", icon: "/skills/nx.svg", color: "bg-blue-700" },
    { name: "OpenAI", icon: "/skills/openai.svg", color: "bg-green-600" },
  ],
};

// Create hover/active color versions for each skill
const createHoverActiveColors = (skills: Skill[]): Skill[] => {
  return skills.map((skill) => {
    // Extract the color class without the bg- prefix
    const colorClass = skill.color.replace("bg-", "");
    return {
      ...skill,
      hoverColor: `hover:bg-${colorClass} active:bg-${colorClass}`,
      ringShadow: `hover:ring-${colorClass}/40 active:ring-${colorClass}/40`,
    };
  });
};

// Transform all skill categories to include hover colors
Object.keys(skillsData).forEach((category) => {
  const categoryKey = category as keyof typeof skillsData;
  skillsData[categoryKey] = createHoverActiveColors(skillsData[categoryKey]);
});

type CategoryKey = keyof typeof skillsData;

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">(
    "all"
  );
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Reset refs array for categories
    categoriesRef.current = categoriesRef.current.slice(
      0,
      Object.keys(skillsData).length
    );

    if (sectionRef.current && categoriesRef.current.length) {
      // Animate the section title
      gsap.fromTo(
        ".skills-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate each category with staggered effect
      categoriesRef.current.forEach((category, index) => {
        if (category) {
          gsap.fromTo(
            category,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: category,
                start: "top 85%",
              },
            }
          );

          // Animate skill items within category
          const skillItems = category.querySelectorAll(".skill-item");
          gsap.fromTo(
            skillItems,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: category,
                start: "top 85%",
              },
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Effect for handling category changes
  useEffect(() => {
    if (skillsContainerRef.current) {
      // Animate the transition when category changes
      const container = skillsContainerRef.current;

      gsap.fromTo(
        container,
        { opacity: 0.5, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );

      // Animate individual skill items with stagger
      const skillItems = container.querySelectorAll(".skill-item");
      gsap.fromTo(
        skillItems,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.03,
          ease: "back.out(1.2)",
        }
      );
    }
  }, [activeCategory]);

  // Function to add category to refs
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !categoriesRef.current.includes(el)) {
      categoriesRef.current[index] = el;
    }
  };

  // Get all skills or filtered by category
  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      // Flatten all skills into a single array
      return Object.values(skillsData).flat();
    }
    return skillsData[activeCategory];
  };

  return (
    <section className="py-20 bg-slate-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center skills-title">
          Skills & Technologies
        </h2>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === "all"
                ? "bg-teal-500 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All Skills
          </button>
          {(Object.keys(skillsData) as CategoryKey[]).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full capitalize transition-colors ${
                activeCategory === category
                  ? "bg-teal-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div
          ref={skillsContainerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          {getFilteredSkills().map((skill) => (
            <div
              key={`${skill.name}-${activeCategory}`}
              className="skill-item flex flex-col items-center bg-slate-800 rounded-lg p-4 transition-transform hover:transform hover:translate-y-[-5px] hover:shadow-lg"
            >
              <div
                className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-slate-700/90 border border-slate-600 ${skill.hoverColor} ${skill.ringShadow} transition-all duration-300 ring-0 hover:ring-2 hover:border-slate-500`}
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <span className="font-medium text-center">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Conditional rendering of category sections when viewing "All" */}
        {activeCategory === "all" && (
          <div className="grid gap-16 mt-20">
            {/* Languages Section */}
            <div ref={(el) => addToRefs(el, 0)} className="skill-category">
              <h3 className="text-2xl font-bold mb-6 text-teal-400 border-b border-slate-700 pb-2">
                Languages & Runtime
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {skillsData.languages.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item flex flex-col items-center bg-slate-800 rounded-lg p-4 transition-transform hover:transform hover:translate-y-[-5px] hover:shadow-lg"
                  >
                    <div
                      className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-slate-700/90 border border-slate-600 ${skill.hoverColor} ${skill.ringShadow} transition-all duration-300 ring-0 hover:ring-2 hover:border-slate-500`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend Section */}
            <div ref={(el) => addToRefs(el, 1)} className="skill-category">
              <h3 className="text-2xl font-bold mb-6 text-teal-400 border-b border-slate-700 pb-2">
                Frontend & UI
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {skillsData.frontend.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item flex flex-col items-center bg-slate-800 rounded-lg p-4 transition-transform hover:transform hover:translate-y-[-5px] hover:shadow-lg"
                  >
                    <div
                      className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-slate-700/90 border border-slate-600 ${skill.hoverColor} ${skill.ringShadow} transition-all duration-300 ring-0 hover:ring-2 hover:border-slate-500`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Section */}
            <div ref={(el) => addToRefs(el, 2)} className="skill-category">
              <h3 className="text-2xl font-bold mb-6 text-teal-400 border-b border-slate-700 pb-2">
                Backend & API
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {skillsData.backend.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item flex flex-col items-center bg-slate-800 rounded-lg p-4 transition-transform hover:transform hover:translate-y-[-5px] hover:shadow-lg"
                  >
                    <div
                      className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-slate-700/90 border border-slate-600 ${skill.hoverColor} ${skill.ringShadow} transition-all duration-300 ring-0 hover:ring-2 hover:border-slate-500`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases Section */}
            <div ref={(el) => addToRefs(el, 3)} className="skill-category">
              <h3 className="text-2xl font-bold mb-6 text-teal-400 border-b border-slate-700 pb-2">
                Databases & Storage
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {skillsData.databases.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item flex flex-col items-center bg-slate-800 rounded-lg p-4 transition-transform hover:transform hover:translate-y-[-5px] hover:shadow-lg"
                  >
                    <div
                      className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-slate-700/90 border border-slate-600 ${skill.hoverColor} ${skill.ringShadow} transition-all duration-300 ring-0 hover:ring-2 hover:border-slate-500`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DevOps Section */}
            <div ref={(el) => addToRefs(el, 4)} className="skill-category">
              <h3 className="text-2xl font-bold mb-6 text-teal-400 border-b border-slate-700 pb-2">
                DevOps & Deployment
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {skillsData.devops.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item flex flex-col items-center bg-slate-800 rounded-lg p-4 transition-transform hover:transform hover:translate-y-[-5px] hover:shadow-lg"
                  >
                    <div
                      className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-slate-700/90 border border-slate-600 ${skill.hoverColor} ${skill.ringShadow} transition-all duration-300 ring-0 hover:ring-2 hover:border-slate-500`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Section */}
            <div ref={(el) => addToRefs(el, 5)} className="skill-category">
              <h3 className="text-2xl font-bold mb-6 text-teal-400 border-b border-slate-700 pb-2">
                Tools & Frameworks
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {skillsData.tools.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item flex flex-col items-center bg-slate-800 rounded-lg p-4 transition-transform hover:transform hover:translate-y-[-5px] hover:shadow-lg"
                  >
                    <div
                      className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-slate-700/90 border border-slate-600 ${skill.hoverColor} ${skill.ringShadow} transition-all duration-300 ring-0 hover:ring-2 hover:border-slate-500`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
