"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PowerPointHero from "@/components/PowerPointHero";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import CodeTransition from "@/components/CodeTransition";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize any page-level animations here

    return () => {
      // Clean up any ScrollTrigger instances
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <PowerPointHero />
      <CodeTransition />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
