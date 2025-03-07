import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// We'll import these components after we create them
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio - From Consultant to Developer",
  description:
    "A unique journey showcasing the fusion of business acumen and technical expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-slate-900 text-white antialiased`}>
        <Navbar />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
