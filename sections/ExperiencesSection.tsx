import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import AboutBgSvg from "@/components/AboutBgSvg";

// Demo experience cards data
const experienceCards = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="10" rx="2" stroke="#38bdf8" strokeWidth="2" />
        <path d="M7 7V5a5 5 0 0 1 10 0v2" stroke="#38bdf8" strokeWidth="2" />
      </svg>
    ),
    title: "Software Engineer Intern",
    subtitle: "TechCorp Pvt Ltd",
    duration: "May 2024 – July 2024",
    description: "Worked on building scalable backend APIs and contributed to frontend features using React and Node.js.",
    button: {
      text: "View Certificate",
      href: process.env.NEXT_PUBLIC_TECHCORP_CERT_LINK,
      color: "bg-sky-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.4)]",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#facc15" strokeWidth="2" />
        <path d="M8 15l4-8 4 8" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "AI Research Intern",
    subtitle: "AI Labs, University",
    duration: "Jan 2024 – Apr 2024",
    description: "Researched and implemented deep learning models for NLP tasks, focusing on transformers and RAG pipelines.",
    button: {
      text: "View Letter",
      href: process.env.NEXT_PUBLIC_AILABS_LETTER_LINK,
      color: "bg-yellow-500 text-gray-900",
    },
    glow: "shadow-[0_0_24px_2px_rgba(253,224,71,0.4)]",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="#fb923c" strokeWidth="2" />
        <path d="M8 16l4-8 4 8" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Cybersecurity Trainee",
    subtitle: "SecureNet Solutions",
    duration: "Aug 2023 – Dec 2023",
    description: "Participated in penetration testing, vulnerability assessment, and security automation projects.",
    button: {
      text: "View Experience",
      href: process.env.NEXT_PUBLIC_SECURNET_EXP_LINK,
      color: "bg-orange-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(251,146,60,0.4)]",
  },
];

const ExperiencesSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  const experiencesSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();

  useEffect(() => {
    if (experiencesSection && onSectionChange) {
      onSectionChange("experiences");
    }
  }, [experiencesSection, onSectionChange]);

  return (
    <div
      ref={sectionRef}
      className="experiences-panel bg-white dark:bg-[#1B2731] relative"
    >
      <section
        id="experiences"
        className="section min-h-[700px] text-center"
      >
        <div className="text-center">
          <RoughNotation
            type="underline"
            color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
            strokeWidth={2}
            order={1}
            show={isSecOnScreen}
          >
            <h2 className="text-4xl inline-block my-6 font-medium">Experiences</h2>
          </RoughNotation>
        </div>
        <div className="mt-8 mb-20">
          <h3 className="font-medium text-lg mb-2 md:text-3xl">
            Career Journey
          </h3>
          <p className="mb-6 mx-auto max-w-lg md:mb-10 lg:leading-loose">
            A timeline of my professional and internship experiences in tech.
          </p>
        </div>
        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0">
          {experienceCards.map((card, idx) => (
            <div
              key={card.title}
              className={`relative rounded-xl 
    bg-white dark:bg-[#232f3e] 
    border border-marrsgreen dark:border-transparent 
    p-6 flex flex-col items-start justify-between min-h-[220px] shadow-lg 
    ${card.glow} transition-all duration-300`}
            >
              <div className="flex items-center mb-2">
                <div className="rounded-full bg-opacity-20 p-2 mr-3">{card.icon}</div>
                <span className="text-lg font-bold text-[#232f3e] dark:text-gray-100">{card.title}</span>
              </div>
              <span className="font-mono text-base font-semibold mb-1" style={{ color: card.button.color.includes("yellow") ? "#facc15" : card.button.color.includes("pink") ? "#ec4899" : card.button.color.includes("orange") ? "#fb923c" : card.button.color.includes("green") ? "#22c55e" : card.button.color.includes("purple") ? "#a855f7" : card.button.color.includes("sky") ? "#38bdf8" : "#60a5fa" }}>
                {card.subtitle} &nbsp;|&nbsp; {card.duration}
              </span>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{card.description}</p>
              <a
                href={card.button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 rounded font-bold text-sm ${card.button.color} hover:scale-105 transition mt-auto`}
              >
                {card.button.text}
              </a>
              <span className="absolute bottom-4 right-4 w-5 h-5 rounded-full border-2 border-gray-700 opacity-30"></span>
            </div>
          ))}
        </div>
      </section>
      <AboutBgSvg />
    </div>
  );
};

export default ExperiencesSection;