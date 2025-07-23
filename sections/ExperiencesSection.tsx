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
    // Office briefcase for internship/corporate
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="10" rx="2" stroke="#38bdf8" strokeWidth="2" fill="#38bdf8" fillOpacity="0.12"/>
        <rect x="8" y="4" width="8" height="4" rx="1.5" stroke="#38bdf8" strokeWidth="2" fill="#38bdf8" fillOpacity="0.12"/>
        <path d="M4 12h16" stroke="#38bdf8" strokeWidth="2" />
      </svg>
    ),
    title: "Your_Intern_Position",
    subtitle: "Company_Name",
    duration: "Month_Year – Month_Year",
    description: "Add_description_here",
    button: {
      text: "View Certificate",
      href: process.env.NEXT_PUBLIC_YOUR_COMPANY_NAME_CERT_LINK,
      color: "bg-sky-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.4)]",
  },
  {
    // Laptop for remote/tech work
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="10" rx="2" stroke="#facc15" strokeWidth="2" fill="#facc15" fillOpacity="0.12"/>
        <rect x="2" y="17" width="20" height="3" rx="1.5" stroke="#facc15" strokeWidth="2" fill="#facc15" fillOpacity="0.12"/>
        <rect x="8" y="10" width="8" height="3" rx="1" fill="#facc15" fillOpacity="0.3"/>
      </svg>
    ),
    title: "Your_Intern_Position",
    subtitle: "Company_Name",
    duration: "Month_Year – Month_Year",
    description: "Add_description_here",
    button: {
      text: "View Letter",
      href: process.env.NEXT_PUBLIC_YOUR_COMPANY_NAME_LETTER_LINK,
      color: "bg-yellow-500 text-gray-900",
    },
    glow: "shadow-[0_0_24px_2px_rgba(253,224,71,0.4)]",
  },
  {
    // Teamwork for collaborative/project work
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="10" r="3" stroke="#fb923c" strokeWidth="2" fill="#fb923c" fillOpacity="0.12"/>
        <circle cx="16" cy="10" r="3" stroke="#fb923c" strokeWidth="2" fill="#fb923c" fillOpacity="0.12"/>
        <rect x="4" y="16" width="16" height="4" rx="2" stroke="#fb923c" strokeWidth="2" fill="#fb923c" fillOpacity="0.12"/>
        <path d="M12 13v3" stroke="#fb923c" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Your_Intern_Position",
    subtitle: "Company_Name",
    duration: "Month_Year – Month_Year",
    description: "Add_description_here",
    button: {
      text: "View Experience",
      href: process.env.NEXT_PUBLIC_YOUR_COMPANY_NAME_EXPERIENCE_LINK,
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