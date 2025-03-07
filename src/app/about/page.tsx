import Image from "next/image";
import SkillProficiency from "@/components/SkillProficiency";

export default function AboutPage() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            About Me
          </h1>

          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-xl p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-teal-400">
                <Image
                  src="/placeholder-profile.jpg"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Noah Kim</h2>
                <p className="text-slate-300 mb-4">
                  From management consultant to self-taught developer, my
                  journey has been one of continuous learning and growth.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700 text-teal-400 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-teal-400 rounded-full text-sm">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-teal-400 rounded-full text-sm">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-teal-400 rounded-full text-sm">
                    Node.js
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-teal-400 rounded-full text-sm">
                    Tailwind
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <SkillProficiency />
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-teal-400">
                My Journey
              </h2>
              <p className="text-slate-300 mb-4">
                My path to becoming a developer has been unconventional. After
                several years working as a management consultant, I discovered
                my passion for coding and decided to make a career transition.
                This unique background gives me a different perspective on
                problem-solving and allows me to bridge the gap between business
                needs and technical solutions.
              </p>
              <p className="text-slate-300">
                I&apos;m self-taught, having learned through online resources,
                building projects, and contributing to open source. This journey
                has taught me persistence, resourcefulness, and the importance
                of continuous learning.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-teal-400">
                My Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Frontend Development</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>React & Next.js</li>
                    <li>JavaScript & TypeScript</li>
                    <li>HTML & CSS</li>
                    <li>Tailwind CSS</li>
                    <li>Responsive Design</li>
                  </ul>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Backend Development</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>REST APIs</li>
                    <li>MongoDB</li>
                    <li>PostgreSQL</li>
                  </ul>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Other Technical Skills</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Git & GitHub</li>
                    <li>Testing (Jest, React Testing Library)</li>
                    <li>CI/CD</li>
                    <li>Vercel & Netlify Deployment</li>
                  </ul>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Business & Soft Skills</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Business Analysis</li>
                    <li>Project Management</li>
                    <li>Client Communication</li>
                    <li>Problem Solving</li>
                    <li>Team Collaboration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-teal-400">
                When I&apos;m Not Coding
              </h2>
              <p className="text-slate-300">
                Outside of development, I enjoy [Your Hobbies/Interests]. I
                believe that having diverse interests helps fuel creativity and
                brings fresh perspectives to my work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
