import Image from "next/image";
import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";
import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import terminalPortfolio from "public/projects/terminal-portfolio.webp";
import physicsSimulator from "public/projects/astro-paper.webp";
import monumentDamageDetection from "public/projects/next-bookstore.webp";
import finhub from "public/projects/shadcn-admin.webp";

const ProjectSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for project section
  const projectSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    projectSection && onSectionChange!("projects");
  }, [onSectionChange, projectSection]);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="project-title text-center">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">Featured Projects</h2>
        </RoughNotation>
      </div>
      <span className="project-desc text-center block mb-4" ref={elementRef}>
        “Talk is cheap. Show me the code”? I got you. <br />
        Here are some of my projects you shouldn't misss
      </span>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
      <div className="others text-center mb-16">
        Also checkout other projects on {" "}
        <a
          href="https://github.com/inddivyansh"
          className="font-medium underline link-outline text-marrsgreen dark:text-carrigreen whitespace-nowrap"
        >
          my github profile
        </a>
      </div>
    </section>
  );
};

const projects = [
  {
    title: "FinHub",
    type: "Frontend + MCP Server + API",
    image: (
      <Image
        src={finhub}
        sizes="100vw"
        fill
        alt="FinHub"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "A minimal, accessible and user-friendly UI for Stock Price Predictor Webapp. One of the most personalized stock market analysis tools using zerodha kite MCP Server and Gemini API.",
    tags: ["AI", "JavaScript", "React", "MCP Server", "Gemini API","Python"],
    liveUrl: "https://github.com/inddivyansh/AIpredictor",
    codeUrl: "https://github.com/inddivyansh/AIpredictor",
    bgColor: "bg-[#9FD0E3]",
    githubApi: "https://api.github.com/repos/inddivyansh/AIpredictor",
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.15)]",
  },
  {
    title: "Physics Simulator",
    type: "Physics + Machine Learning",
    image: (
      <Image
        src={physicsSimulator}
        sizes="100vw"
        fill
        alt="Emergent Physics Simulator"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "An Basic to advanced physics simulation tool leveraging machine learning, that uses fundamental concepts like navier stokes equation etc to help make sense of chaos theory, diffusion eqautions. This may help us discove the unknown with thee help of neural networks.",
    tags: ["AI", "Physics", "Machine Learning", "Gray-Scott Model", "Navier-Stokes", "Diffusion", "Neural Networks", "Chaos Theory", "Python"],
    liveUrl: "https://github.com/inddivyansh/physics-simulator",
    codeUrl: "https://github.com/inddivyansh/physics-simulator",
    bgColor: "bg-[#EBF4F4]",
    githubApi: "https://api.github.com/repos/inddivyansh/physics-simulator",
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.15)]",
  },
  {
    title: "CNN- Based Monument Damage Detection",
    type: "History + Machine Learning",
    image: (
      <Image
        src={monumentDamageDetection}
        sizes="100vw"
        fill
        alt="CNN- Based Monument Damage Detection"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "A deep learning model for detecting damage in historical monuments using CNNs. The model is trained on a dataset of images of monuments with varying degrees of damage.",
    tags: ["AI", "History", "Machine Learning", "CNN", "Image Processing", "Python"],
    liveUrl: "https://github.com/inddivyansh/",
    codeUrl: "https://github.com/inddivyansh/",
    bgColor: "bg-[#EBF4F4]",
    githubApi: "https://api.github.com/repos/inddivyansh/",
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.15)]",
  },
  {
    title: "Terminal Portfolio",
    type: "Frontend",
    image: (
      <Image
        src={terminalPortfolio}
        sizes="100vw"
        fill
        alt="Terminal Portfolio"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "My portfolio website in terminal version developed with React and TypeScript. ",
    tags: ["React", "TypeScript", "Styled-Components"],
    liveUrl: "https://terminal.satnaing.dev/",
    codeUrl: "https://github.com/inddivyansh/",
    bgColor: "bg-[#B4BEE0]",
    githubApi: "https://api.github.com/repos/satnaing/terminal-portfolio",
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.15)]",
  },
];

export default ProjectSection;
