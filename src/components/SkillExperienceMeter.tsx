"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SkillExperienceMeterProps {
  level: "beginner" | "intermediate" | "advanced" | "expert";
  animated?: boolean;
}

export default function SkillExperienceMeter({
  level,
  animated = true,
}: SkillExperienceMeterProps) {
  const meterRef = useRef<HTMLDivElement>(null);

  const levelPercentage = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 95,
  };

  const levelColors = {
    beginner: "bg-blue-400",
    intermediate: "bg-teal-400",
    advanced: "bg-green-400",
    expert: "bg-purple-400",
  };

  useEffect(() => {
    if (meterRef.current && animated) {
      gsap.fromTo(
        meterRef.current,
        { width: "0%" },
        {
          width: `${levelPercentage[level]}%`,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }
  }, [level, animated]);

  return (
    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
      <div
        ref={meterRef}
        style={{ width: animated ? "0%" : `${levelPercentage[level]}%` }}
        className={`h-full ${levelColors[level]}`}
      ></div>
    </div>
  );
}
