"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import HeroBackground from "./HeroBackground";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial animations for hero elements
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
    })
      .from(
        paragraphRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      )
      .from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      )
      .from(
        socialsRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

    // Create the scroll-triggered parallax effect
    gsap.to(headingRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: -100,
      opacity: 0.5,
    });

    gsap.to(paragraphRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: -50,
      opacity: 0,
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Animated Background */}
      <HeroBackground />

      <div className="container mx-auto px-4 text-center z-10 mt-16">
        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
        >
          From{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
            Consultant
          </span>{" "}
          to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-400">
            Developer
          </span>
        </h1>
        <p
          ref={paragraphRef}
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-slate-300"
        >
          A unique journey showcasing the fusion of business acumen and
          technical expertise.
        </p>
        <div ref={ctaRef} className="mb-8">
          <Link
            href="/#contact"
            className="px-8 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors transform hover:scale-105 duration-200"
          >
            Contact Me
          </Link>
        </div>
        <div
          ref={socialsRef}
          className="flex justify-center gap-6 items-center"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-teal-400 transition-colors transform hover:scale-110 duration-200"
            aria-label="GitHub"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-teal-400 transition-colors transform hover:scale-110 duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-teal-400 transition-colors transform hover:scale-110 duration-200"
            aria-label="Twitter/X"
          >
            <FaTwitter size={28} />
          </a>
        </div>
      </div>

      {/* Arrow indicator for scrolling */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-teal-400"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
