"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Handle initial page load animation
  useEffect(() => {
    const content = document.querySelector(".page-content");
    if (content) {
      gsap.fromTo(
        content,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  // Handle page changes
  useEffect(() => {
    const content = document.querySelector(".page-content");
    if (content) {
      // Create a small animation when pathname changes
      gsap.fromTo(
        content,
        { y: 10, opacity: 0.8 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [pathname]);

  return <div className="page-content">{children}</div>;
}
