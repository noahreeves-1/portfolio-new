"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const companies = [
  { name: "Accenture", logo: "/companies/accenture.webp" },
  { name: "Korn Ferry", logo: "/companies/kornferry.webp" },
  { name: "SMU", logo: "/companies/smu.webp" },
  { name: "Glass Doctor", logo: "/companies/glassdoctor.webp" },
  { name: "RNL", logo: "/companies/RNL_logo.webp" },
  { name: "Muffin", logo: "/companies/muffin.svg" },
  {
    name: "Business Expo Center",
    logo: "/companies/business-expo-center-logo.webp",
  },
];

const highlights = [
  // {
  //   prefix: "Leading a",
  //   highlight: "Startup",
  //   suffix: "with 3 engineers (Muffin)",
  // },
  {
    prefix: "Advising",
    highlight: "Fortune 500",
    suffix: "companies (Accenture)",
  },
  {
    prefix: "Winning 2015",
    highlight: "Franchisee of the Year",
    suffix: "(Glass Doctor)",
  },
  {
    prefix: "Promoted to",
    highlight: "Marketing Lead",
    suffix: "from Unpaid Intern (Business Expo Center)",
  },
];

export default function CompanyCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerCarouselRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const carousel = carouselRef.current;
    const innerCarousel = innerCarouselRef.current;
    const highlightsSection = highlightsRef.current;

    if (!carousel || !innerCarousel) return;

    // Clone the items for seamless looping
    const originalItems = Array.from(innerCarousel.children);
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      innerCarousel.appendChild(clone);
    });

    // Get the width of a single set of items
    const itemSetWidth = innerCarousel.scrollWidth / 2;

    // Create a seamless loop animation
    const createAnimation = () => {
      return gsap.to(innerCarousel, {
        x: -itemSetWidth,
        duration: 30,
        ease: "none",
        onComplete: () => {
          // Instantly reset position to start without animation
          gsap.set(innerCarousel, { x: 0 });
          // Create a new animation
          createAnimation();
        },
      });
    };

    // Start the animation
    const animation = createAnimation();

    // Animate the highlights with parallax effect
    if (highlightsSection) {
      const highlights = highlightsSection.querySelectorAll(".highlight-item");

      highlights.forEach((highlight, index) => {
        const direction = index % 2 === 0 ? -200 : 200; // Alternate left and right with larger offset

        gsap.fromTo(
          highlight,
          {
            x: direction,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: highlight,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      // Clean up animation on component unmount
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full bg-slate-100 py-8">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-semibold text-slate-700 md:text-2xl">
          Formerly At
        </h3>
      </div>
      <div className="overflow-hidden">
        <div ref={carouselRef} className="relative overflow-hidden">
          <div
            ref={innerCarouselRef}
            className="flex items-center space-x-16 px-8"
          >
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex h-20 w-[180px] items-center justify-center"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={120}
                  height={60}
                  className={`object-contain transition-all duration-300 ${
                    company.name === "Accenture" ||
                    company.name === "Korn Ferry"
                      ? "max-h-24 max-w-[200px] scale-125 hover:scale-[1.56]"
                      : "max-h-16 max-w-[150px] hover:scale-125"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Achievements Section */}
      <div
        ref={highlightsRef}
        className="py-8 mx-auto max-w-3xl px-4 lg:max-w-5xl"
      >
        <div className="space-y-8">
          {highlights.map((item, index) => (
            <div key={index} className="highlight-item overflow-hidden">
              <p className="text-xl md:text-2xl text-center">
                <span className="text-slate-400">{item.prefix} </span>
                <span className="text-blue-500 font-semibold">
                  {item.highlight}
                </span>
                <span className="text-slate-400"> {item.suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
