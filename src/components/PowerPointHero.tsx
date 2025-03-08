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
  FaRocket,
  FaLaptopCode,
  FaPlane,
  FaMoneyBillWave,
  FaBriefcase,
  FaLaptop,
} from "react-icons/fa";
import sceneryBg from "../../public/scenary.webp";

// Define checkpoint type for journey map
type Checkpoint = {
  icon: string;
  title: string;
  description: string;
};

// Define slide content
type Slide = {
  id: number;
  title: string;
  subtitle: string;
  oneLiner: string;
  content: string | Checkpoint[];
  cities?: string; // Add optional cities property
  template: "title" | "bullet" | "journeyMap" | "cta";
  color: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "My Journey",
    subtitle: "Management Consultant to Software Engineer",
    oneLiner: "",
    content: "",
    template: "title",
    color: "bg-white",
  },
  {
    id: 2,
    title: "Management Consultant",
    subtitle: "2016-2021",
    oneLiner: "Highlights from 10 projects at 7 clients",
    content:
      "🤖 Led an RPA proof-of-concept that automated 90% of cloud testing, significantly reducing manual effort and testing time at AT&T \n 🏛️ Conducted a data governance assessment by interviewing 18 stakeholders across 5 BUs, then presented findings to Salesforce VPs \n 📊 Built 11 Tableau dashboards for cybersecurity teams, enabling leadership to make data-driven decisions, saving 400+ FTE hrs/yr",
    cities:
      "Washington, D.C., Chicago, Seattle, Philadelphia, Dallas, Pittsburgh, Raleigh, St. Paul",
    template: "bullet",
    color: "bg-white",
  },
  {
    id: 3,
    title: "Career Transition",
    subtitle: "2021-2023",
    oneLiner:
      "After 5 years of consulting, I knew I needed a change. I wanted to travel the world and build my own products.",
    content: [
      {
        icon: "money",
        title: "Financially Secure",
        description:
          "I felt like I had enough of a nest egg to take the leap of faith",
      },
      {
        icon: "travel",
        title: "Living Abroad",
        description: "I moved to Southeast Asia and traveled to 8 countries",
      },
      {
        icon: "code",
        title: "Learning to Code",
        description:
          "I took a self-paced open-source online coding bootcamp to learn how to code",
      },
      {
        icon: "rocket",
        title: "Starting a Business",
        description:
          "I started a business to build my own products with a friend",
      },
    ],
    template: "journeyMap",
    color: "bg-gradient-to-b from-blue-50 to-white",
  },
  {
    id: 4,
    title: "Software Engineer/Founder",
    subtitle: "2023-2025",
    oneLiner: "Learning to code and entrepreneurship",
    content:
      "Completed open-source full-stack coding bootcamp\n Built social media mobile app and launched in the App Store\n Built a marketing tool for 2 small business owners\n Building an AI to notify U.S. citizens of new relevant laws\n Led a team of 3 engineers\n ",
    template: "bullet",
    color: "bg-white",
  },
  {
    id: 5,
    title: "Let's Connect",
    subtitle: "View my projects or get in touch",
    oneLiner: "Ready to collaborate on exciting opportunities?",
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

  // Initialize animations for the first slide
  useEffect(() => {
    // Add active class to the initial slide after a short delay
    setTimeout(() => {
      if (slides[currentSlide].template === "journeyMap") {
        const journeyMapSlide = document.querySelector(".journey-map-slide");
        if (journeyMapSlide) {
          journeyMapSlide.classList.add("active");
        }
      } else if (slides[currentSlide].template === "bullet") {
        const bulletSlide = document.querySelector(".bullet-slide");
        if (bulletSlide) {
          bulletSlide.classList.add("active");
        }
      } else if (slides[currentSlide].template === "title") {
        const titleSlide = document.querySelector(".title-slide");
        if (titleSlide) {
          titleSlide.classList.add("active");
        }
      }
    }, 500);
  }, []);

  // Debug function to check element visibility
  const debugElementVisibility = () => {
    if (slides[currentSlide]?.template === "journeyMap") {
      const accentBar = document.querySelector(
        ".journey-map-slide .absolute.left-0.top-0.bottom-0"
      );
      console.log(
        "Accent bar:",
        accentBar,
        "Computed style:",
        accentBar ? window.getComputedStyle(accentBar).opacity : "N/A"
      );

      const timelineSegments = document.querySelectorAll(
        ".journey-checkpoint .bg-blue-500"
      );
      console.log("Timeline segments:", timelineSegments.length);
      timelineSegments.forEach((segment, i) => {
        console.log(
          `Segment ${i}:`,
          segment,
          "Computed style:",
          window.getComputedStyle(segment).opacity
        );
      });
    }
  };

  // Call debug function when slide changes
  useEffect(() => {
    if (!transitioning) {
      setTimeout(debugElementVisibility, 500);
    }
  }, [currentSlide, transitioning]);

  // Add CSS for initially hidden elements and animations
  useEffect(() => {
    // Add a style tag to the document head
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .initially-hidden {
        opacity: 0 !important;
      }
      
      /* CSS Animations for Journey Map */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* Animations for Title Slide */
      .title-slide.active h1 {
        animation: slideInDown 0.8s ease-out forwards;
      }
      
      .title-slide.active .subtitle {
        animation: fadeIn 0.8s ease-out 0.3s forwards;
      }
      
      .title-slide.active .icon-container {
        animation: fadeIn 0.8s ease-out 0.6s forwards;
      }
      
      .title-slide.active .briefcase-icon {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .title-slide.active .laptop-icon {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      /* Plane animation - Fixed direction */
      @keyframes planeArc {
        0% { left: 0; opacity: 0; }
        10% { left: 0; opacity: 1; }
        90% { left: calc(100% - 40px); opacity: 1; }
        100% { left: calc(100% - 40px); opacity: 0; }
      }
      
      .title-slide.active .plane-icon-wrapper {
        animation: planeArc 4s ease-in-out 1.5s forwards;
        animation-iteration-count: infinite;
      }
      
      /* Animations for Bullet Slide */
      .bullet-slide.active .absolute.left-0.top-0.bottom-0 {
        animation: growHorizontal 0.8s ease-in-out forwards;
        transform-origin: left;
      }
      
      .bullet-slide.active h2 {
        animation: fadeIn 0.8s ease-out forwards;
      }
      
      .bullet-slide.active h3 {
        animation: fadeIn 0.8s ease-out 0.2s forwards;
      }
      
      .bullet-slide.active p.text-blue-400 {
        animation: fadeIn 0.8s ease-out 0.4s forwards;
      }
      
      .bullet-slide.active .bullet-point:nth-child(1) {
        animation: slideInLeft 0.6s ease-out 0.6s forwards;
      }
      
      .bullet-slide.active .bullet-point:nth-child(2) {
        animation: slideInLeft 0.6s ease-out 0.8s forwards;
      }
      
      .bullet-slide.active .bullet-point:nth-child(3) {
        animation: slideInLeft 0.6s ease-out 1.0s forwards;
      }
      
      .bullet-slide.active .bullet-point:nth-child(4) {
        animation: slideInLeft 0.6s ease-out 1.2s forwards;
      }
      
      .bullet-slide.active .bullet-point:nth-child(5) {
        animation: slideInLeft 0.6s ease-out 1.4s forwards;
      }
      
      .bullet-slide.active .cities-section {
        animation: slideInUp 0.8s ease-out 1.6s forwards;
      }
      
      .bullet-slide.active .corner-graphic {
        animation: fadeIn 1s ease-out 1.5s forwards;
        opacity: 0.1 !important;
      }
      
      /* Apply animations when slide is active */
      .journey-map-slide.active .absolute.left-0.top-0.bottom-0 {
        animation: growHorizontal 0.8s ease-in-out forwards;
        transform-origin: left;
      }
      
      .journey-map-slide.active h2 {
        animation: fadeIn 0.8s ease-out forwards;
      }
      
      .journey-map-slide.active h3 {
        animation: fadeIn 0.8s ease-out 0.2s forwards;
      }
      
      .journey-map-slide.active p.text-blue-400 {
        animation: fadeIn 0.8s ease-out 0.4s forwards;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(1) .bg-blue-500 {
        animation: growVertical 0.5s ease-in-out 0.6s forwards;
        transform-origin: top;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(2) .bg-blue-500 {
        animation: growVertical 0.5s ease-in-out 0.8s forwards;
        transform-origin: top;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(3) .bg-blue-500 {
        animation: growVertical 0.5s ease-in-out 1.0s forwards;
        transform-origin: top;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(1) .rounded-full {
        animation: scaleIn 0.5s ease-out 0.7s forwards;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(2) .rounded-full {
        animation: scaleIn 0.5s ease-out 0.9s forwards;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(3) .rounded-full {
        animation: scaleIn 0.5s ease-out 1.1s forwards;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(4) .rounded-full {
        animation: scaleIn 0.5s ease-out 1.3s forwards;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(1) .left-content {
        animation: slideInLeft 0.8s ease-out 0.9s forwards;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(2) .right-content {
        animation: slideInRight 0.8s ease-out 1.1s forwards;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(3) .left-content {
        animation: slideInLeft 0.8s ease-out 1.3s forwards;
      }
      
      .journey-map-slide.active .journey-checkpoint:nth-child(4) .right-content {
        animation: slideInRight 0.8s ease-out 1.5s forwards;
      }
      
      .journey-map-slide.active .absolute.bottom-0.right-0 {
        animation: fadeIn 1s ease-out 1.5s forwards;
        opacity: 0.1 !important;
      }
    `;
    document.head.appendChild(styleTag);

    // Clean up the style tag when component unmounts
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Automatically advance slides with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!transitioning) {
        nextSlide();
      }
    }, 600000);

    return () => clearTimeout(timer);
  }, [currentSlide, transitioning]);

  // Handle journey map animations when the slide appears
  useEffect(() => {
    // Only run animations when transitioning is false (after slide transition completes)
    if (slides[currentSlide]?.template === "journeyMap" && !transitioning) {
      console.log("Animating journey map slide");

      // Force all initially-hidden elements to be visible after animations
      setTimeout(() => {
        const hiddenElements = document.querySelectorAll(".initially-hidden");
        hiddenElements.forEach((el) => {
          (el as HTMLElement).style.opacity = "1";
        });
      }, 2000); // Wait for all animations to complete

      // Animate the title, subtitle, and one-liner
      const title = document.querySelector(".journey-map-slide h2");
      const subtitle = document.querySelector(".journey-map-slide h3");
      const oneLiner = document.querySelector(
        ".journey-map-slide p.text-blue-400"
      );

      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: -15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }

      if (oneLiner) {
        gsap.fromTo(
          oneLiner,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: "power2.out",
          }
        );
      }

      // Animate the timeline segments
      const timelineSegments = document.querySelectorAll(
        ".journey-checkpoint .bg-blue-500"
      );
      console.log("Timeline segments found:", timelineSegments.length);
      timelineSegments.forEach((segment, index) => {
        // Determine if this is the last segment (connecting to the last marker)
        const isLastSegment = index === timelineSegments.length - 1;

        gsap.fromTo(
          segment,
          { scaleY: 0, transformOrigin: "top", opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: isLastSegment ? 0.6 : 0.5, // Slightly longer animation for the last segment
            delay: 0.6 + 0.2 * index, // Increased delay to start after header animations
            ease: "power2.inOut",
            transformOrigin: "top",
          }
        );
      });

      // Animate checkpoints appearing
      const checkpoints = document.querySelectorAll(".journey-checkpoint");
      checkpoints.forEach((checkpoint, index) => {
        // Animate the content
        let contentDiv;
        if (index % 2 === 0) {
          // For left side content (even indices)
          contentDiv = checkpoint.querySelector(".left-content");
        } else {
          // For right side content (odd indices)
          contentDiv = checkpoint.querySelector(".right-content");
        }

        if (contentDiv) {
          gsap.fromTo(
            contentDiv,
            { opacity: 0, x: index % 2 === 0 ? 20 : -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: 0.9 + index * 0.2, // Increased delay to start after timeline animations
              ease: "back.out(1.7)",
            }
          );
        }

        // Animate the circle
        const circle = checkpoint.querySelector(".rounded-full");
        if (circle) {
          gsap.fromTo(
            circle,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: 0.7 + index * 0.2, // Increased delay to start after header animations
              ease: "back.out(1.7)",
            }
          );
        }
      });

      // Animate the PowerPoint design element (bottom corner graphic)
      const cornerGraphic = document.querySelector(
        ".journey-map-slide .absolute.bottom-0.right-0"
      );
      if (cornerGraphic) {
        gsap.fromTo(
          cornerGraphic,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 0.1, // Match the original opacity of 0.10
            scale: 1,
            duration: 1,
            delay: 1.5,
            ease: "power2.out",
          }
        );
      }

      // Animate the left side accent bar
      const accentBar = document.querySelector(
        ".journey-map-slide .absolute.left-0.top-0.bottom-0"
      );
      if (accentBar) {
        gsap.fromTo(
          accentBar,
          { scaleX: 0, transformOrigin: "left", opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.8, // Match the original opacity-80 class
            duration: 0.8,
            ease: "power2.inOut",
          }
        );
      } else {
        console.log("Left accent bar not found");
      }
    }
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

            // Reset any active journey map animations
            const journeyMapSlide =
              document.querySelector(".journey-map-slide");
            if (journeyMapSlide) {
              journeyMapSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (journeyMapSlide as HTMLElement).offsetWidth;

              // Add active class if this is a journey map slide
              if (slides[nextIndex].template === "journeyMap") {
                setTimeout(() => {
                  journeyMapSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active bullet slide animations
            const bulletSlide = document.querySelector(".bullet-slide");
            if (bulletSlide) {
              bulletSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (bulletSlide as HTMLElement).offsetWidth;

              // Add active class if this is a bullet slide
              if (slides[nextIndex].template === "bullet") {
                setTimeout(() => {
                  bulletSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active title slide animations
            const titleSlide = document.querySelector(".title-slide");
            if (titleSlide) {
              titleSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (titleSlide as HTMLElement).offsetWidth;

              // Add active class if this is a title slide
              if (slides[nextIndex].template === "title") {
                setTimeout(() => {
                  titleSlide.classList.add("active");
                }, 100);
              }
            }

            gsap.fromTo(
              contentRef.current,
              { opacity: 0, x: -100 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                onComplete: () => {
                  setTransitioning(false);
                },
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

            // Reset any active journey map animations
            const journeyMapSlide =
              document.querySelector(".journey-map-slide");
            if (journeyMapSlide) {
              journeyMapSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (journeyMapSlide as HTMLElement).offsetWidth;

              // Add active class if this is a journey map slide
              if (slides[nextIndex].template === "journeyMap") {
                setTimeout(() => {
                  journeyMapSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active bullet slide animations
            const bulletSlide = document.querySelector(".bullet-slide");
            if (bulletSlide) {
              bulletSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (bulletSlide as HTMLElement).offsetWidth;

              // Add active class if this is a bullet slide
              if (slides[nextIndex].template === "bullet") {
                setTimeout(() => {
                  bulletSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active title slide animations
            const titleSlide = document.querySelector(".title-slide");
            if (titleSlide) {
              titleSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (titleSlide as HTMLElement).offsetWidth;

              // Add active class if this is a title slide
              if (slides[nextIndex].template === "title") {
                setTimeout(() => {
                  titleSlide.classList.add("active");
                }, 100);
              }
            }

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

            // Reset any active journey map animations
            const journeyMapSlide =
              document.querySelector(".journey-map-slide");
            if (journeyMapSlide) {
              journeyMapSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (journeyMapSlide as HTMLElement).offsetWidth;

              // Add active class if this is a journey map slide
              if (slides[nextIndex].template === "journeyMap") {
                setTimeout(() => {
                  journeyMapSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active bullet slide animations
            const bulletSlide = document.querySelector(".bullet-slide");
            if (bulletSlide) {
              bulletSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (bulletSlide as HTMLElement).offsetWidth;

              // Add active class if this is a bullet slide
              if (slides[nextIndex].template === "bullet") {
                setTimeout(() => {
                  bulletSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active title slide animations
            const titleSlide = document.querySelector(".title-slide");
            if (titleSlide) {
              titleSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (titleSlide as HTMLElement).offsetWidth;

              // Add active class if this is a title slide
              if (slides[nextIndex].template === "title") {
                setTimeout(() => {
                  titleSlide.classList.add("active");
                }, 100);
              }
            }

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
      // Different transitions based on slide number for variety
      if (currentSlide % 3 === 0) {
        // Fade out and slide left
        gsap.to(contentRef.current, {
          opacity: 0,
          x: -100,
          duration: 0.5,
          onComplete: () => {
            setCurrentSlide(prevIndex);

            // Reset any active journey map animations
            const journeyMapSlide =
              document.querySelector(".journey-map-slide");
            if (journeyMapSlide) {
              journeyMapSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (journeyMapSlide as HTMLElement).offsetWidth;

              // Add active class if this is a journey map slide
              if (slides[prevIndex].template === "journeyMap") {
                setTimeout(() => {
                  journeyMapSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active bullet slide animations
            const bulletSlide = document.querySelector(".bullet-slide");
            if (bulletSlide) {
              bulletSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (bulletSlide as HTMLElement).offsetWidth;

              // Add active class if this is a bullet slide
              if (slides[prevIndex].template === "bullet") {
                setTimeout(() => {
                  bulletSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active title slide animations
            const titleSlide = document.querySelector(".title-slide");
            if (titleSlide) {
              titleSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (titleSlide as HTMLElement).offsetWidth;

              // Add active class if this is a title slide
              if (slides[prevIndex].template === "title") {
                setTimeout(() => {
                  titleSlide.classList.add("active");
                }, 100);
              }
            }

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
      } else if (currentSlide % 3 === 1) {
        // Fade out and slide down
        gsap.to(contentRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          onComplete: () => {
            setCurrentSlide(prevIndex);

            // Reset any active journey map animations
            const journeyMapSlide =
              document.querySelector(".journey-map-slide");
            if (journeyMapSlide) {
              journeyMapSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (journeyMapSlide as HTMLElement).offsetWidth;

              // Add active class if this is a journey map slide
              if (slides[prevIndex].template === "journeyMap") {
                setTimeout(() => {
                  journeyMapSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active bullet slide animations
            const bulletSlide = document.querySelector(".bullet-slide");
            if (bulletSlide) {
              bulletSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (bulletSlide as HTMLElement).offsetWidth;

              // Add active class if this is a bullet slide
              if (slides[prevIndex].template === "bullet") {
                setTimeout(() => {
                  bulletSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active title slide animations
            const titleSlide = document.querySelector(".title-slide");
            if (titleSlide) {
              titleSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (titleSlide as HTMLElement).offsetWidth;

              // Add active class if this is a title slide
              if (slides[prevIndex].template === "title") {
                setTimeout(() => {
                  titleSlide.classList.add("active");
                }, 100);
              }
            }

            gsap.fromTo(
              contentRef.current,
              { opacity: 0, y: -50 },
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
          scale: 1.2,
          duration: 0.5,
          onComplete: () => {
            setCurrentSlide(prevIndex);

            // Reset any active journey map animations
            const journeyMapSlide =
              document.querySelector(".journey-map-slide");
            if (journeyMapSlide) {
              journeyMapSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (journeyMapSlide as HTMLElement).offsetWidth;

              // Add active class if this is a journey map slide
              if (slides[prevIndex].template === "journeyMap") {
                setTimeout(() => {
                  journeyMapSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active bullet slide animations
            const bulletSlide = document.querySelector(".bullet-slide");
            if (bulletSlide) {
              bulletSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (bulletSlide as HTMLElement).offsetWidth;

              // Add active class if this is a bullet slide
              if (slides[prevIndex].template === "bullet") {
                setTimeout(() => {
                  bulletSlide.classList.add("active");
                }, 100);
              }
            }

            // Reset any active title slide animations
            const titleSlide = document.querySelector(".title-slide");
            if (titleSlide) {
              titleSlide.classList.remove("active");

              // Force a reflow to restart animations if needed
              void (titleSlide as HTMLElement).offsetWidth;

              // Add active class if this is a title slide
              if (slides[prevIndex].template === "title") {
                setTimeout(() => {
                  titleSlide.classList.add("active");
                }, 100);
              }
            }

            gsap.fromTo(
              contentRef.current,
              { opacity: 0, scale: 0.8 },
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

  const renderJourneyMapIcon = (icon: string) => {
    switch (icon) {
      case "rocket":
        return <FaRocket className="text-blue-600" size={24} />;
      case "code":
        return <FaLaptopCode className="text-blue-600" size={24} />;
      case "travel":
        return <FaPlane className="text-blue-600" size={24} />;
      case "money":
        return <FaMoneyBillWave className="text-blue-600" size={24} />;
      default:
        return null;
    }
  };

  const renderSlideContent = () => {
    const slide = slides[currentSlide];

    switch (slide.template) {
      case "title":
        return (
          <div
            className={`flex flex-col items-center justify-center h-full text-center px-4 relative title-slide ${
              !transitioning && slides[currentSlide].template === "title"
                ? "active"
                : ""
            }`}
          >
            {/* Clean, minimal background */}
            <div className="absolute inset-0 bg-gradient-to-br">
              {/* Icons container with justify-between */}
              <div
                className="absolute top-40 w-full flex justify-between items-center px-12"
                id="icons-container"
              >
                {/* Left icon (briefcase) */}
                <div
                  className="relative journey-icon briefcase-icon"
                  style={{ opacity: 0 }}
                >
                  <FaBriefcase size={48} className="text-white" />
                </div>

                {/* Middle area for plane flight path - simplified to one parent container */}
                <div className="flex-grow relative h-12 plane-container">
                  {/* Plane positioned inside with explicit styling for vertical centering */}
                  <div
                    className="absolute plane-icon-wrapper"
                    style={{
                      left: "0",
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: 0,
                    }}
                  >
                    <FaPlane size={24} className="text-blue-500" />
                  </div>
                </div>

                {/* Right icon (laptop) */}
                <div
                  className="journey-icon laptop-icon relative"
                  style={{ opacity: 0 }}
                >
                  <FaLaptop size={48} className="text-white" />
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="z-10 relative">
              <h1
                className="text-6xl md:text-8xl font-bold mb-8 text-blue-700 tracking-tight leading-tight"
                style={{ opacity: 0 }}
              >
                {slide.title}
              </h1>
              <p
                className="text-2xl md:text-4xl mb-10 text-slate-700 font-semibold tracking-wide subtitle"
                style={{ opacity: 0 }}
              >
                {slide.subtitle}
              </p>

              {/* Social media icons */}
              <div
                className="flex justify-center space-x-8 mt-8 icon-container"
                style={{ opacity: 0 }}
              >
                <a
                  href="https://github.com/noahreeves-1"
                  className="text-gray-600 hover:text-[#333333] transform transition-transform hover:scale-110 opacity-80"
                >
                  <FaGithub size={36} />
                </a>
                <a
                  href="https://linkedin.com/in/noahh-kim"
                  className="text-gray-600 hover:text-[#0077B5] transform transition-transform hover:scale-110 opacity-80"
                >
                  <FaLinkedin size={36} />
                </a>
                <a
                  href="https://x.com/thenoahkim"
                  className="text-gray-600 hover:text-[#1DA1F2] transform transition-transform hover:scale-110 opacity-80"
                >
                  <FaTwitter size={36} />
                </a>
              </div>
            </div>
          </div>
        );

      case "bullet":
        return (
          <div
            className={`flex flex-col h-full px-8 py-10 relative bullet-slide ${
              !transitioning && slides[currentSlide].template === "bullet"
                ? "active"
                : ""
            }`}
          >
            {/* Left side accent bar - classic PowerPoint design element */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-blue-600 opacity-0"></div>

            <div className="pl-20 flex flex-col h-full">
              <h2
                className="pt-16 text-4xl md:text-6xl font-bold mb-3 text-blue-700"
                style={{ opacity: 0 }}
              >
                {slide.title}
              </h2>
              <h3
                className="text-xl md:text-3xl mb-8 text-blue-500 font-medium"
                style={{ opacity: 0 }}
              >
                {slide.subtitle}
              </h3>
              <p
                className="text-lg md:text-xl mb-4 text-blue-400 italic"
                style={{ opacity: 0 }}
              >
                {slide.oneLiner}
              </p>
              <div className="flex-1 max-w-3xl">
                {typeof slide.content === "string" &&
                  slide.content.split("\n").map((bullet, index) => (
                    <p
                      key={index}
                      className="text-lg md:text-2xl text-gray-700 mb-6 font-light pl-4 border-l-4 border-blue-300 bullet-point"
                      style={{ opacity: 0 }}
                    >
                      {bullet}
                    </p>
                  ))}
              </div>

              {/* Cities visited section */}
              {slide.cities && (
                <div
                  className="mt-auto mb-16 cities-section"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">✈️</span>
                    <h4 className="text-md font-medium text-blue-600">
                      Cities Visited:
                    </h4>
                  </div>
                  <p className="text-sm text-gray-500 italic mt-1">
                    {slide.cities}
                  </p>
                </div>
              )}
            </div>

            {/* PowerPoint design element - bottom corner graphic */}
            <div className="absolute bottom-0 right-0 w-80 h-80 overflow-hidden opacity-0 corner-graphic">
              <div className="absolute bottom-0 right-0 w-full h-full bg-blue-500 rounded-tl-full"></div>
            </div>
          </div>
        );

      case "journeyMap":
        return (
          <div
            className={`flex flex-col h-full px-8 py-10 relative font-['Montserrat',sans-serif] journey-map-slide ${
              !transitioning && slides[currentSlide].template === "journeyMap"
                ? "active"
                : ""
            }`}
          >
            {/* Left side accent bar - classic PowerPoint design element */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-blue-600 opacity-0"></div>

            <div className="pl-20 flex flex-col h-full">
              <h2
                className="pt-16 text-4xl md:text-6xl font-bold mb-3 text-blue-700"
                style={{ opacity: 0 }}
              >
                {slide.title}
              </h2>
              <h3
                className="text-xl md:text-3xl mb-8 text-blue-500 font-medium"
                style={{ opacity: 0 }}
              >
                {slide.subtitle}
              </h3>
              <p
                className="text-lg md:text-xl mb-6 text-blue-400 italic max-w-3xl"
                style={{ opacity: 0 }}
              >
                {slide.oneLiner}
              </p>

              {/* Journey Map Container */}
              <div className="flex-1 flex items-center justify-center relative w-full">
                {/* Main content with timeline */}
                <div className="w-full max-w-3xl relative flex flex-col items-center">
                  {/* Timeline items */}
                  {Array.isArray(slide.content) &&
                    slide.content.map((checkpoint, index) => {
                      const isLeft = index === 0 || index === 2;
                      const isRight = index === 1 || index === 3;
                      const isLast = index === slide.content.length - 1;

                      return (
                        <div
                          key={index}
                          className="journey-checkpoint w-full flex items-center mb-6 relative"
                        >
                          {/* Vertical line segment - only between markers */}
                          {!isLast && (
                            <div
                              className="absolute bg-blue-500 w-1 z-0"
                              style={{
                                top:
                                  index === 0
                                    ? "20px"
                                    : "5px" /* Start behind the marker for all except first */,
                                bottom:
                                  index === slide.content.length - 2
                                    ? "-36px"
                                    : "-30px" /* Even shorter line segments */,
                                left: "50%",
                                transform: "translateX(-50%)",
                                opacity: 0,
                              }}
                            ></div>
                          )}

                          {/* Circle marker in center */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center">
                            <div
                              className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-blue-500 shadow-md"
                              style={{ opacity: 0 }}
                            >
                              {renderJourneyMapIcon(checkpoint.icon)}
                            </div>
                          </div>

                          {/* Left side content */}
                          {isLeft && (
                            <>
                              <div
                                className="w-1/2 pr-12 flex flex-col items-end left-content"
                                style={{ opacity: 0 }}
                              >
                                <h4 className="text-lg font-semibold text-slate-600 mb-1 text-right">
                                  {checkpoint.title}
                                </h4>
                                <p className="text-sm text-gray-600 text-right max-w-[250px]">
                                  {checkpoint.description}
                                </p>
                              </div>
                              <div className="w-1/2 flex items-center">
                                {/* Empty space where the line was */}
                              </div>
                            </>
                          )}

                          {/* Right side content */}
                          {isRight && (
                            <>
                              <div className="w-1/2 flex items-center justify-end">
                                {/* Empty space where the line was */}
                              </div>
                              <div
                                className="w-1/2 pl-12 flex flex-col items-start right-content"
                                style={{ opacity: 0 }}
                              >
                                <h4 className="text-lg font-semibold text-slate-600 mb-1 text-left">
                                  {checkpoint.title}
                                </h4>
                                <p className="text-sm text-gray-600 text-left max-w-[250px]">
                                  {checkpoint.description}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* PowerPoint design element - bottom corner graphic */}
            <div className="absolute bottom-0 right-0 w-80 h-80 overflow-hidden opacity-0">
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
            <p className="text-lg md:text-xl mb-6 text-blue-400 italic">
              {slide.oneLiner}
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
                href="https://github.com/noahreeves-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors hover-scale"
                aria-label="GitHub"
              >
                <FaGithub size={32} />
              </a>
              <a
                href="https://linkedin.com/in/noahh-kim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors hover-scale"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="https://twitter.com/thenoahkim"
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

      {/* PowerPoint slide content - add background image directly */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center slide-container shadow-2xl"
        style={{
          ...(currentSlide === 0
            ? {
                backgroundImage: `url(${sceneryBg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}),
        }}
      >
        {renderSlideContent()}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 z-20 shadow-md arrow-cursor-left"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 z-20 shadow-md arrow-cursor-right"
        aria-label="Next slide"
      >
        <FaChevronRight size={18} />
      </button>

      {/* PowerPoint professional footer */}
      <div className="absolute bottom-2 right-4 text-gray-500 text-sm font-medium">
        Slide {currentSlide + 1}/{slides.length}
      </div>
    </section>
  );
}
