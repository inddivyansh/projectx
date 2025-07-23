import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import AboutBgSvg from "@/components/AboutBgSvg";

// Achievement cards data
const achievementCards = [
  {
    // Trophy for JEE
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="20" rx="6" ry="2" fill="#60a5fa" fillOpacity="0.15"/>
        <path d="M8 17h8M12 17v-2M7 6V8a5 5 0 0 0 10 0V6" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
        <rect x="4" y="3" width="16" height="5" rx="2.5" stroke="#60a5fa" strokeWidth="2" fill="#60a5fa" fillOpacity="0.15"/>
      </svg>
    ),
    title: "JEE",
    subtitle: "Top 2.2%ile of Students",
    description: "Secured 97.81 %ile (All India Rank 25290, 6475 OBC) in JEE Mains and Qualified in JEE Advance with (8368 OBC Rank).",
    button: {
      text: "View Scorecard",
      href: process.env.NEXT_PUBLIC_JEE_SCORECARD_LINK,
      color: "bg-sky-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.4)]",
  },
  {
    // Star for LeetCode
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="18" rx="7" ry="2.5" fill="#22c55e" fillOpacity="0.15"/>
        <path d="M6 10a6 6 0 0 1 12 0c0 2-2 4-6 4s-6-2-6-4z" stroke="#22c55e" strokeWidth="2" fill="#22c55e" fillOpacity="0.15"/>
        <rect x="8" y="14" width="8" height="5" rx="1.5" stroke="#22c55e" strokeWidth="2" fill="#22c55e" fillOpacity="0.15"/>
      </svg>
    ),
    title: "LeetCode",
    subtitle: "1,500 Rating",
    description: "Achieved a max rating of 1500 on LeetCode – Top 50% globally.",
    button: {
      text: "View Profile",
      href: process.env.NEXT_PUBLIC_LEETCODE_URL,
      color: "bg-green-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(34,197,94,0.4)]",
  },
  {
    // Chef hat for CodeChef
    icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <polygon points="12,3 15,10 22,10 17,14 19,21 12,17 5,21 7,14 2,10 9,10" stroke="#a855f7" strokeWidth="2" fill="#a855f7" fillOpacity="0.15"/>
      </svg>
    ),
    title: "CodeChef",
    subtitle: "1388 Rating",
    description: "Achieved a max rating of 1388 (Div 4) on CodeChef – Top 35% globally.",
    button: {
      text: "View Profile",
      href: process.env.NEXT_PUBLIC_CODECHEF_URL,
      color: "bg-purple-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(168,85,247,0.4)]",
  },
  {
    // Medal for Codeforces
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="16" r="6" stroke="#ec4899" strokeWidth="2" fill="#ec4899" fillOpacity="0.15"/>
        <rect x="9" y="1" width="6" height="9" rx="3" stroke="#ec4899" strokeWidth="2" fill="#ec4899" fillOpacity="0.15"/>
      </svg>
    ),
    title: "Codeforces",
    subtitle: "881 Rating",
    description: "Achieved a max rating of 881 on Codeforces – Top 75% in the world.",
    button: {
      text: "View Profile",
      href: process.env.NEXT_PUBLIC_CODEFORCES_URL,
      color: "bg-pink-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(236,72,153,0.4)]",
  },
  {
    // Certificate for Contest
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="12" rx="2" stroke="#facc15" strokeWidth="2" fill="#facc15" fillOpacity="0.15"/>
        <circle cx="12" cy="10" r="2" stroke="#facc15" strokeWidth="2" fill="#facc15" fillOpacity="0.3"/>
        <path d="M8 16l2-2 2 2 2-2" stroke="#facc15" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Contest_Name",
    subtitle: "Your_Rank",
    description: "Secured th rank in contest_name, the contest_name coding contest hosted by org_name.",
    button: {
      text: "View Certificate",
      href: process.env.NEXT_PUBLIC_CONTEST_CERT_LINK,
      color: "bg-yellow-500 text-gray-900",
    },
    glow: "shadow-[0_0_24px_2px_rgba(253,224,71,0.4)]",
  },
  {
    // Badge for Challenge
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" stroke="#fb923c" strokeWidth="2" fill="#fb923c" fillOpacity="0.15"/>
        <circle cx="12" cy="13" r="2" fill="#fb923c" fillOpacity="0.4"/>
      </svg>
    ),
    title: "Challenge_Name",
    subtitle: "Top your_position",
    description: "Shortlisted among the top your_position teams in the org_name, Challenge_Name.",
    button: {
      text: "View Badge",
      href: process.env.NEXT_PUBLIC_CHALLENGE_BADGE_LINK,
      color: "bg-orange-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(251,146,60,0.4)]",
  },
];

const AchievementsSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  const achievementsSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();

  useEffect(() => {
    if (achievementsSection && onSectionChange) {
      onSectionChange("achievements");
    }
  }, [achievementsSection, onSectionChange]);

  return (
    <div
      ref={sectionRef}
      className="achievements-panel bg-white dark:bg-[#1B2731] relative"
    >
      <section
        id="achievements"
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
            <h2 className="text-4xl inline-block my-6 font-medium">Badges & Certificates</h2>
          </RoughNotation>
        </div>
        <div className="mt-8 mb-20">
          <h3 className="font-medium text-lg mb-2 md:text-3xl">
          </h3>
          <p className="mb-6 mx-auto max-w-lg md:mb-10 lg:leading-loose">
            Highlights of key accomplishments & milestones from my technical journey.
          </p>
        </div>
        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0">
          {achievementCards.map((card, idx) => (
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
                {card.subtitle}
              </span>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{card.description}</p>
              <a
                href={card.button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 rounded font-bold text-sm ${card.button.color} hover:scale-105 transition mt-auto`}
              >
                {card.button.text}
                <svg className="ml-2" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
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

export default AchievementsSection;