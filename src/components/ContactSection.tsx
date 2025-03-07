"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [easterEggActive, setEasterEggActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // For konami code easter egg
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  const [konamiIndex, setKonamiIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && formRef.current) {
      // Animate the section on scroll
      gsap.fromTo(
        formRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // Setup konami code detection
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the key pressed is the expected key in the sequence
      if (e.key === konamiCode[konamiIndex]) {
        // Move to the next key in the sequence
        const nextIndex = konamiIndex + 1;
        setKonamiIndex(nextIndex);

        // If we've completed the sequence, activate the easter egg
        if (nextIndex === konamiCode.length) {
          activateEasterEgg();
          setKonamiIndex(0); // Reset for next time
        }
      } else {
        // If wrong key, reset the sequence
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [konamiIndex]);

  const activateEasterEgg = () => {
    setEasterEggActive(true);

    // Animate elements with GSAP
    if (formRef.current) {
      // Create a fun animation
      gsap.to(formRef.current, {
        rotation: 360,
        scale: 1.05,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        onComplete: () => {
          gsap.to(formRef.current, {
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });

      // Change colors and add particles or other fun effects
      const colors = ["#06b6d4", "#14b8a6", "#0ea5e9", "#6366f1", "#8b5cf6"];

      if (sectionRef.current) {
        // Create confetti-like particles
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement("div");
          particle.className = "absolute rounded-full pointer-events-none";
          particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
          particle.style.width = "10px";
          particle.style.height = "10px";
          sectionRef.current.appendChild(particle);

          // Random position
          const startX = Math.random() * window.innerWidth;
          const startY = Math.random() * window.innerHeight;

          // Animate each particle
          gsap.fromTo(
            particle,
            {
              x: startX,
              y: startY,
              scale: 0,
              opacity: 1,
            },
            {
              x: startX + (Math.random() - 0.5) * 200,
              y: startY + (Math.random() - 0.5) * 200,
              scale: Math.random() * 3,
              opacity: 0,
              duration: 1 + Math.random() * 2,
              ease: "power2.out",
              onComplete: () => {
                if (
                  sectionRef.current &&
                  particle.parentNode === sectionRef.current
                ) {
                  sectionRef.current.removeChild(particle);
                }
              },
            }
          );
        }
      }
    }

    // Reset after a delay
    setTimeout(() => {
      setEasterEggActive(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-900 relative"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center relative">
            Get In Touch
            {easterEggActive && (
              <span className="absolute top-0 right-0 text-xl text-teal-400">
                Konami Code Activated! 🎮
              </span>
            )}
          </h2>
          <p className="text-slate-300 mb-8 text-center">
            Interested in working together? Feel free to reach out using the
            form below.
          </p>

          {status === "success" ? (
            <div className="bg-green-500/20 border border-green-500 text-green-300 rounded-lg p-4 mb-8">
              <p className="font-medium">
                Thank you for your message! I&apos;ll get back to you as soon as
                possible.
              </p>
            </div>
          ) : status === "error" ? (
            <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-lg p-4 mb-8">
              <p className="font-medium">
                Something went wrong. Please try again or contact me directly.
              </p>
            </div>
          ) : null}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-300 ${
              easterEggActive
                ? "bg-gradient-to-r from-purple-500 via-teal-500 to-blue-500 p-6 rounded-lg"
                : ""
            }`}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className={`w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
                easterEggActive ? "animate-pulse" : ""
              }`}
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {easterEggActive && (
            <div className="text-center mt-4 text-teal-400 animate-bounce">
              <p>Easter egg found! 🎉</p>
              <p className="text-xs">Press ↑ ↑ ↓ ↓ ← → ← → B A for more fun!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
