import Link from "next/link";
import { FaDownload } from "react-icons/fa";

export default function ResumePage() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">Resume</h1>
            <Link
              href="/resume.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload /> Download PDF
            </Link>
          </div>

          <div className="space-y-12">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Noah Kim</h2>
              <p className="text-slate-300">
                Location: Your City, Country
                <br />
                Email: your.email@example.com
                <br />
                LinkedIn: linkedin.com/in/yourname
                <br />
                GitHub: github.com/noahreeves-1
              </p>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-teal-400">
                Professional Summary
              </h2>
              <p className="text-slate-300">
                Former management consultant turned software developer with a
                unique blend of business acumen and technical expertise.
                Passionate about creating efficient, user-friendly applications
                that solve real-world problems. Self-taught developer with a
                proven track record of delivering high-quality projects.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-teal-400">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Languages & Frameworks</h3>
                  <p className="text-slate-300">
                    JavaScript, TypeScript, React, Next.js, Node.js, Express,
                    HTML, CSS, Tailwind CSS
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tools & Technologies</h3>
                  <p className="text-slate-300">
                    Git, GitHub, VS Code, MongoDB, PostgreSQL, REST APIs, Jest,
                    React Testing Library
                  </p>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-teal-400">
                Work Experience
              </h2>

              <div className="mb-8 border-l-2 border-teal-400 pl-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-semibold">Software Developer</h3>
                  <p className="text-slate-400">Jan 2022 - Present</p>
                </div>
                <p className="text-slate-300 mb-2">Company Name, Location</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>
                    Developed and maintained web applications using React,
                    Next.js, and Node.js
                  </li>
                  <li>
                    Collaborated with design and product teams to implement new
                    features
                  </li>
                  <li>
                    Improved application performance by optimizing database
                    queries and frontend rendering
                  </li>
                  <li>
                    Participated in code reviews and mentored junior developers
                  </li>
                </ul>
              </div>

              <div className="mb-8 border-l-2 border-slate-700 pl-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-semibold">
                    Management Consultant
                  </h3>
                  <p className="text-slate-400">Jun 2018 - Dec 2021</p>
                </div>
                <p className="text-slate-300 mb-2">Consulting Firm, Location</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>
                    Advised clients on business strategy and operational
                    improvements
                  </li>
                  <li>
                    Led cross-functional teams to implement organizational
                    changes
                  </li>
                  <li>
                    Conducted data analysis to identify business opportunities
                  </li>
                  <li>
                    Presented findings and recommendations to executive
                    stakeholders
                  </li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-teal-400">
                Education
              </h2>

              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h3 className="text-xl font-semibold">
                    Bachelor of Business Administration
                  </h3>
                  <p className="text-slate-400">2014 - 2018</p>
                </div>
                <p className="text-slate-300">University Name, Location</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Relevant Certifications
                </h3>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Full Stack Web Development (Online Course), 2021</li>
                  <li>Advanced React and Redux (Online Course), 2022</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-teal-400">
                Key Projects
              </h2>
              <p className="text-slate-300 mb-4">
                For a detailed view of my projects, please visit the{" "}
                <Link
                  href="/#projects"
                  className="text-teal-400 hover:underline"
                >
                  Projects
                </Link>{" "}
                section of my portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
