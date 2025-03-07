"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function CodeTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    // Animate code lines appearing
    if (codeRef.current) {
      const codeLines = codeRef.current.querySelectorAll(".code-line");
      tl.fromTo(
        codeLines,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }
      );
    }

    // Animate terminal typing effect
    if (terminalRef.current) {
      const commandLine = terminalRef.current.querySelector(".command-line");
      tl.fromTo(
        commandLine,
        { width: "0%" },
        { width: "100%", duration: 1 },
        "-=0.3"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* PowerPoint/Office elements that fade out */}
      <div className="absolute top-10 left-10 opacity-30 transition-opacity duration-500 hover:opacity-10">
        <Image
          src="/transition/powerpoint-icon.png"
          alt="PowerPoint Icon"
          width={60}
          height={60}
        />
      </div>
      <div className="absolute top-20 right-20 opacity-20 transition-opacity duration-500 hover:opacity-5">
        <Image
          src="/transition/excel-icon.png"
          alt="Excel Icon"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute bottom-40 left-1/4 opacity-10 transition-opacity duration-500 hover:opacity-0">
        <Image
          src="/transition/word-icon.png"
          alt="Word Icon"
          width={55}
          height={55}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
          My Coding Journey
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-20">
          <div className="w-full md:w-1/2 bg-slate-700 rounded-lg p-6 shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-teal-300">
              From Business Professional...
            </h3>
            <p className="text-slate-300 mb-4">
              I started my career in the business world, using PowerPoint decks,
              spreadsheets, and client presentations daily. While I excelled in
              this environment, I always felt drawn to something more technical.
            </p>
            <div className="bg-white bg-opacity-80 p-4 rounded text-slate-800 font-semibold shadow-md border-l-4 border-blue-500">
              &ldquo;Team, let&apos;s leverage our core competencies to
              synergize cross-functional partnerships.&rdquo;
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-slate-800 rounded-lg p-6 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 border border-teal-900">
            <h3 className="text-2xl font-semibold mb-4 text-teal-300">
              ...To Developer
            </h3>
            <p className="text-slate-300 mb-4">
              I discovered my passion for coding, solving complex problems, and
              building software that makes a difference. The transition
              wasn&apos;t always easy, but the journey has been incredibly
              rewarding.
            </p>
            <div className="bg-slate-900 p-4 rounded text-teal-400 font-mono text-sm shadow-inner border-l-4 border-teal-500">
              <p>
                &ldquo;Let&apos;s refactor this to use async/await and implement
                proper error handling.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Code animation section */}
        <div
          ref={codeRef}
          className="max-w-2xl mx-auto bg-slate-900 rounded-lg p-6 shadow-xl mb-16 border border-slate-700 font-mono text-sm"
        >
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="flex-1 text-center text-slate-400 text-xs">
              myJourney.tsx
            </div>
          </div>
          <div className="text-slate-300">
            <div className="code-line text-blue-400">
              import React from &apos;react&apos;;
            </div>
            <div className="code-line text-blue-400">
              import {`{ useState, useEffect }`} from &apos;react&apos;;
            </div>
            <div className="code-line"></div>
            <div className="code-line text-purple-400">
              interface <span className="text-yellow-300">Experience</span>{" "}
              {`{`}
            </div>
            <div className="code-line text-teal-300 ml-4">
              id: <span className="text-yellow-300">number</span>;
            </div>
            <div className="code-line text-teal-300 ml-4">
              role: <span className="text-yellow-300">string</span>;
            </div>
            <div className="code-line text-teal-300 ml-4">
              technologies: <span className="text-yellow-300">string</span>[];
            </div>
            <div className="code-line text-teal-300 ml-4">
              year: <span className="text-yellow-300">number</span>;
            </div>
            <div className="code-line text-purple-400">{`}`}</div>
            <div className="code-line"></div>
            <div className="code-line text-blue-400">
              const <span className="text-green-400">MyJourney</span>: React.FC
              = () =&gt; {`{`}
            </div>
            <div className="code-line ml-4 text-purple-400">
              const [<span className="text-teal-300">skills, setSkills</span>] =
              useState{`<string[]>`}([]);
            </div>
            <div className="code-line ml-4 text-purple-400">
              const [
              <span className="text-teal-300">isLoading, setIsLoading</span>] =
              useState{`<boolean>`}(true);
            </div>
            <div className="code-line"></div>
            <div className="code-line ml-4 text-purple-400">
              useEffect{`(() => {`}
            </div>
            <div className="code-line ml-8 text-green-400">{`// Learning new skills and technologies`}</div>
            <div className="code-line ml-8 text-teal-300">setSkills{`([`}</div>
            <div className="code-line ml-12 text-yellow-300">
              {`&quot;React&quot;`}, {`&quot;TypeScript&quot;`},{" "}
              {`&quot;NextJS&quot;`},{" "}
            </div>
            <div className="code-line ml-12 text-yellow-300">
              {`&quot;Docker&quot;`}, {`&quot;AWS&quot;`}, {`&quot;Redux&quot;`}
            </div>
            <div className="code-line ml-8 text-yellow-300">{`]);`}</div>
            <div className="code-line ml-8 text-teal-300">
              setIsLoading{`(false);`}
            </div>
            <div className="code-line ml-4 text-purple-400">{`}, []);`}</div>
            <div className="code-line"></div>
            <div className="code-line ml-4 text-blue-400">
              return <span className="text-yellow-300">(</span>
            </div>
            <div className="code-line ml-8 text-purple-400">
              {`<`}
              <span className="text-green-400">div</span> className=
              <span className="text-yellow-300">&quot;portfolio&quot;</span>
              {`>`}
            </div>
            <div className="code-line ml-12 text-green-400">{`{/* My projects showcase */}`}</div>
            <div className="code-line ml-8 text-purple-400">
              {`</`}
              <span className="text-green-400">div</span>
              {`>`}
            </div>
            <div className="code-line ml-4 text-yellow-300">);</div>
            <div className="code-line text-blue-400">{`};`}</div>
            <div className="code-line"></div>
            <div className="code-line text-blue-400">
              export default MyJourney;
            </div>
          </div>
        </div>

        {/* Terminal section */}
        <div
          ref={terminalRef}
          className="max-w-2xl mx-auto bg-black rounded-lg p-4 shadow-xl mb-12 font-mono text-sm"
        >
          <div className="flex items-center mb-4">
            <div className="text-slate-400 text-xs">Terminal</div>
          </div>
          <div className="text-green-400">
            <p>$ cd ~/projects</p>
            <p>$ mkdir portfolio</p>
            <p>$ cd portfolio</p>
            <p>$ npm create next-app</p>
            <p className="text-white command-line whitespace-nowrap overflow-hidden">
              $ npm run dev <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-teal-500 p-px rounded-full">
            <div className="px-8 py-3 bg-slate-900 rounded-full text-lg font-semibold text-white hover:bg-slate-800 transition-colors">
              Check Out My Projects Below
            </div>
          </div>
        </div>

        {/* Floating code-related elements */}
        <div className="absolute -top-10 -right-10 text-8xl text-slate-700 opacity-20 font-mono">{`{`}</div>
        <div className="absolute -bottom-20 -left-10 text-8xl text-slate-700 opacity-20 font-mono">{`}`}</div>
        <div className="absolute bottom-40 right-20 text-5xl text-slate-700 opacity-20 font-mono">{`</>`}</div>
      </div>

      {/* Code-related icons that fade in */}
      <div className="absolute bottom-20 right-10 opacity-30 transition-opacity duration-500 hover:opacity-70">
        <Image
          src="/transition/vscode-icon.png"
          alt="VS Code Icon"
          width={60}
          height={60}
        />
      </div>
      <div className="absolute top-40 right-1/4 opacity-20 transition-opacity duration-500 hover:opacity-60">
        <Image
          src="/transition/github-icon.png"
          alt="GitHub Icon"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute bottom-1/3 left-20 opacity-10 transition-opacity duration-500 hover:opacity-50">
        <Image
          src="/transition/react-icon.png"
          alt="React Icon"
          width={55}
          height={55}
        />
      </div>
    </div>
  );
}
