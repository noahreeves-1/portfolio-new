"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

// Define slide content
const slides = [
  {
    id: 1,
    title: "My Journey",
    subtitle: "From Consultant to Developer",
    content: "A unique path combining business acumen with technical expertise",
    template: "title",
    color: "bg-white",
  },
  {
    id: 2,
    title: "Management Consultant",
    subtitle: "2018-2021",
    content:
      "• Strategic business analysis\n• Client presentations\n• Process optimization\n• Project management\n• Cross-functional team leadership",
    template: "bullet",
    color: "bg-white",
  },
  {
    id: 3,
    title: "The Transition",
    subtitle: "Why I Made The Switch",
    content:
      "• Passion for building solutions\n• Love for creative problem-solving\n• Desire to create tangible products\n• Technical challenges\n• Continuous learning",
    template: "bullet",
    color: "bg-white",
  },
  {
    id: 4,
    title: "Developer",
    subtitle: "2022-Present",
    content:
      "• Frontend: React, Next.js, TypeScript\n• Backend: Node.js, Express\n• Design: UI/UX, Tailwind\n• Tools: Git, CI/CD\n• Soft skills from consulting",
    template: "bullet",
    color: "bg-white",
  },
  {
    id: 5,
    title: "Let's Connect",
    subtitle: "View my projects or get in touch",
    content: "",
    template: "cta",
    color: "bg-white",
  },
];

export default function PowerPointHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Automatically advance slides with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!transitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide, transitioning]);

  // Handle slide transitions
  const nextSlide = () => {
    if (transitioning) return;
    setTransitioning(true);

    const nextIndex = (currentSlide + 1) % slides.length;

    // Create PowerPoint-like transition animation
    if (slideRef.current && contentRef.current) {
      // Different transitions based on slide number for variety
      if (currentSlide % 3 === 0) {
        // Fade out and slide right
        gsap.to(contentRef.current, {
          opacity: 0,
          x: 100,
          duration: 0.5,
          onComplete: () => {
            setCurrentSlide(nextIndex);
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, x: -100 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                onComplete: () => setTransitioning(false),
              }
            );
          },
        });
      } else if (currentSlide % 3 === 1) {
        // Fade out and slide up
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          onComplete: () => {
            setCurrentSlide(nextIndex);
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                onComplete: () => setTransitioning(false),
              }
            );
          },
        });
      } else {
        // Fade and zoom
        gsap.to(contentRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          onComplete: () => {
            setCurrentSlide(nextIndex);
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, scale: 1.2 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                onComplete: () => setTransitioning(false),
              }
            );
          },
        });
      }
    }
  };

  const prevSlide = () => {
    if (transitioning) return;
    setTransitioning(true);

    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;

    // Create PowerPoint-like transition animation
    if (slideRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -100,
        duration: 0.5,
        onComplete: () => {
          setCurrentSlide(prevIndex);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 100 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              onComplete: () => setTransitioning(false),
            }
          );
        },
      });
    }
  };

  const goToSlide = (index: number) => {
    if (transitioning || index === currentSlide) return;
    setTransitioning(true);

    // Fade transition for direct navigation
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentSlide(index);
          gsap.to(contentRef.current, {
            opacity: 1,
            duration: 0.3,
            onComplete: () => setTransitioning(false),
          });
        },
      });
    }
  };

  const renderSlideContent = () => {
    const slide = slides[currentSlide];

    switch (slide.template) {
      case "title":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-blue-700 tracking-tight leading-tight">
              {slide.title}
            </h1>
            <p className="text-2xl md:text-4xl mb-10 text-blue-600 font-semibold tracking-wide">
              {slide.subtitle}
            </p>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl font-light leading-relaxed">
              {slide.content}
            </p>
            {/* Professional PowerPoint design element */}
            <div className="absolute bottom-10 right-10 w-36 h-36 border-8 border-blue-200 rounded-full opacity-20"></div>
            <div className="absolute top-10 left-10 w-24 h-24 border-8 border-blue-200 rounded-full opacity-20"></div>
          </div>
        );

      case "bullet":
        return (
          <div className="flex flex-col h-full px-8 py-10 relative">
            {/* Left side accent bar - classic PowerPoint design element */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-blue-600 opacity-80"></div>

            <div className="pl-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-3 text-blue-700">
                {slide.title}
              </h2>
              <h3 className="text-xl md:text-3xl mb-10 text-blue-500 font-medium">
                {slide.subtitle}
              </h3>
              <div className="flex-1 max-w-3xl bullet-list">
                {slide.content.split("\n").map((bullet, index) => (
                  <p
                    key={index}
                    className="text-lg md:text-2xl text-gray-700 mb-6 font-light pl-4 border-l-4 border-blue-300"
                  >
                    {bullet}
                  </p>
                ))}
              </div>
            </div>

            {/* PowerPoint design element - bottom corner graphic */}
            <div className="absolute bottom-0 right-0 w-60 h-60 overflow-hidden opacity-10">
              <div className="absolute bottom-0 right-0 w-full h-full bg-blue-500 rounded-tl-full"></div>
            </div>
          </div>
        );

      case "cta":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 relative">
            <h2 className="text-4xl md:text-7xl font-bold mb-6 text-blue-700 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-xl md:text-3xl mb-12 text-blue-600 font-medium">
              {slide.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <Link
                href="/#projects"
                className="px-10 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg hover-scale shadow-md"
              >
                View Projects
              </Link>
              <Link
                href="/#contact"
                className="px-10 py-4 bg-gray-200 text-blue-700 rounded-md hover:bg-gray-300 transition-colors font-semibold text-lg hover-scale shadow-md border border-gray-300"
              >
                Contact Me
              </Link>
            </div>
            <div className="flex justify-center gap-8 mt-12">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors hover-scale"
                aria-label="GitHub"
              >
                <FaGithub size={32} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors hover-scale"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors hover-scale"
                aria-label="Twitter/X"
              >
                <FaTwitter size={32} />
              </a>
            </div>

            {/* Professional PowerPoint design elements - SmartArt-like */}
            <div className="absolute bottom-10 left-10 right-10 flex justify-between opacity-20">
              <div className="w-16 h-16 border-4 border-blue-400 rounded-md transform rotate-45"></div>
              <div className="w-16 h-16 border-4 border-blue-500 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 transform rotate-45"></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center overflow-hidden relative powerpoint-cursor">
      {/* PowerPoint-like background */}
      <div
        ref={slideRef}
        className={`absolute inset-0 w-full h-full transition-colors duration-1000 ${slides[currentSlide].color}`}
      />

      {/* PowerPoint slide content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center slide-container bg-white shadow-2xl"
      >
        {renderSlideContent()}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-colors ${
              currentSlide === index
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-blue-400"
            } shadow-sm`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 z-20 shadow-md"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 z-20 shadow-md"
        aria-label="Next slide"
      >
        <FaChevronRight size={18} />
      </button>

      {/* PowerPoint-style professional design elements */}
      <div className="absolute top-6 right-6 flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
      </div>

      {/* PowerPoint professional footer */}
      <div className="absolute bottom-2 right-4 text-gray-500 text-sm font-medium">
        Slide {currentSlide + 1}/{slides.length}
      </div>
    </section>
  );
}
