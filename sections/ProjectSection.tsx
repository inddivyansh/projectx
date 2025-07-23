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
      <div className="project-title text-center pt-8">
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
      <span className="project-desc text-center block mb-4 mt-4" ref={elementRef}>
        “Transforming imagination into impactful solutions” <br />
        Explore some of my featured projects below.
      </span>
      <div
        className="
          grid gap-8 pb-8 px-2 md:px-0
          grid-cols-[repeat(auto-fit,minmax(340px,1fr))]
          justify-center
          pt-4
        "
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
      <div className="others text-center mb-16 pt-2">
        Also checkout other projects on{" "}
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
    image: "/projects/shadcn-admin.webp", // <-- fixed path
    desc: "A minimal and user-friendly UI for Stock Price Predictor Webapp. One of the most personalized stock market analysis tools using Zerodha Kite MCP Server & Gemini API. Features AI-powered news analysis to extract information and predict market sentiment, helping users make informed investment decisions.",
    tags: ["AI", "JavaScript", "React", "MCP Server", "Gemini API", "Python", "News Analysis", "Sentiment Analysis"],
    liveUrl: "https://a-ipredictor.vercel.app/",
    codeUrl: "https://github.com/inddivyansh/AIpredictor",
    bgColor: "bg-[#9FD0E3]",
    githubApi: "https://api.github.com/repos/inddivyansh/AIpredictor",
    glow: "shadow-[0_0_24px_2px_rgba(59,130,246,0.25)]",
    accent: "#3B82F6",
  },
  {
    title: "Physics Simulator",
    type: "Physics + Machine Learning",
    image: "/projects/astro-paper.webp", // <-- fixed path
    desc: "An Basic to advanced physics simulation tool leveraging machine learning, that uses fundamental concepts like navier stokes equation etc to help make sense of chaos theory, diffusion eqautions. This may help us discove the unknown with thee help of neural networks.",
    tags: ["AI", "Physics", "Machine Learning", "Gray-Scott Model", "Navier-Stokes", "Python"],
    liveUrl: "https://physicsworldsimulator.streamlit.app/",
    codeUrl: "https://github.com/inddivyansh/physics-simulator",
    bgColor: "bg-[#EBF4F4]",
    githubApi: "https://api.github.com/repos/inddivyansh/physics-simulator",
    glow: "shadow-[0_0_24px_2px_rgba(251,191,36,0.25)]",
    accent: "#FBBF24",
  },
  {
    title: "CNN- Based Monument Damage Detection",
    type: "History + Machine Learning",
    image: "/projects/next-bookstore.webp",
    desc: "A deep learning model for detecting damage in historical monuments using CNNs. The model is trained on a dataset of images of monuments with varying degrees of damage.",
    tags: [
      "AI",
      "History",
      "Machine Learning",
      "CNN",
      "Python",
    ],
    liveUrl: "https://strucinspect.com/en/technologies/damage-detection/",
    codeUrl: "https://github.com/inddivyansh/",
    bgColor: "bg-[#EBF4F4]",
    githubApi: "https://api.github.com/repos/inddivyansh/",
    glow: "shadow-[0_0_24px_2px_rgba(236,72,153,0.25)]",
    accent: "#EC4899",
  },
  {
    title: "My Portfolio",
    type: "Frontend",
    image: "/projects/terminal-portfolio.webp", // <-- fixed path
    desc: "A minimal and responsive portfolio website showcasing my projects, skills, and experiences. Built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and a user-friendly interface.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "GSAP", "Rough Notation"],
    liveUrl: "https://diivyportfolio.vercel.app/",
    codeUrl: "https://github.com/inddivyansh/projectx",
    bgColor: "bg-[#B4BEE0]",
    githubApi: "https://api.github.com/repos/inddivyansh/projectx",
    glow: "shadow-[0_0_24px_2px_rgba(34,197,94,0.25)]",
    accent: "#22C55E",
  },
];

export default ProjectSection;
