"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/#projects" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className={`text-xl font-bold text-slate-900 ${
            !scrolled ? "text-shadow" : "text-white"
          }`}
          onClick={(e) => {
            // Only dispatch event if already on homepage
            if (window.location.pathname === "/") {
              e.preventDefault(); // Prevent default Link behavior if on homepage
              // Dispatch custom event to reset slides
              window.dispatchEvent(new Event("resetSlides"));
            }
          }}
        >
          Noah Kim
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? "text-teal-400"
                  : scrolled
                  ? "text-white hover:text-teal-400 font-semibold"
                  : "text-slate-900 font-black hover:text-teal-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact Button - Desktop */}
        <Link
          href="/#contact"
          className={`hidden md:block py-2 px-4 rounded-lg font-bold transition-colors ${
            scrolled
              ? "text-white hover:bg-teal-600"
              : "text-slate-900 hover:bg-white"
          }`}
        >
          Contact Me
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${scrolled ? "text-white" : "text-slate-900"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800 p-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`hover:text-teal-400 transition-colors ${
                    pathname === link.href ? "text-teal-400" : "text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
