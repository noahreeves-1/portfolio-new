"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillExperienceMeter from "./SkillExperienceMeter";

// Define skill proficiency data
const skillProficiencyData = {
  technical: [
    { name: "Frontend Development", level: "expert" as const },
    { name: "Backend Development", level: "advanced" as const },
    { name: "React Ecosystem", level: "expert" as const },
    { name: "UI/UX Design", level: "intermediate" as const },
    { name: "Database Design", level: "advanced" as const },
    { name: "API Development", level: "expert" as const },
    { name: "Responsive Design", level: "expert" as const },
    { name: "DevOps", level: "intermediate" as const },
  ],
  soft: [
    { name: "Project Management", level: "expert" as const },
    { name: "Client Communication", level: "expert" as const },
    { name: "Team Leadership", level: "advanced" as const },
    { name: "Problem Solving", level: "expert" as const },
    { name: "Strategic Thinking", level: "expert" as const },
    { name: "Mentoring", level: "advanced" as const },
  ],
};

export default function SkillProficiency() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Animate section title
      gsap.fromTo(
        ".proficiency-title",
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

      // Animate skill items
      gsap.fromTo(
        ".skill-proficiency-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="py-16 bg-slate-800 rounded-xl" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-white proficiency-title">
          Skill Proficiency
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-teal-400 border-b border-slate-700 pb-2">
              Technical Skills
            </h3>
            <div className="space-y-6">
              {skillProficiencyData.technical.map((skill) => (
                <div key={skill.name} className="skill-proficiency-item">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-slate-400">
                      {skill.level.charAt(0).toUpperCase() +
                        skill.level.slice(1)}
                    </span>
                  </div>
                  <SkillExperienceMeter level={skill.level} />
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-teal-400 border-b border-slate-700 pb-2">
              Business & Soft Skills
            </h3>
            <div className="space-y-6">
              {skillProficiencyData.soft.map((skill) => (
                <div key={skill.name} className="skill-proficiency-item">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-slate-400">
                      {skill.level.charAt(0).toUpperCase() +
                        skill.level.slice(1)}
                    </span>
                  </div>
                  <SkillExperienceMeter level={skill.level} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
