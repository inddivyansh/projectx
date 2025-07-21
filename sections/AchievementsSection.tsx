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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="8" rx="2" stroke="#38bdf8" strokeWidth="2" />
        <text x="12" y="16" textAnchor="middle" fontSize="8" fill="#38bdf8" fontWeight="bold" fontFamily="Arial">JEE</text>
      </svg>
    ),
    title: "JEE",
    subtitle: " Top 2.2%ile of Students",
    description: "Secured 97.81 %ile (All India Rank 25290, 6475 OBC) in JEE Mains and Qualified in JEE Advance with (8368 OBC Rank).",
    button: {
      text: "View Scorecard",
      href: process.env.NEXT_PUBLIC_JEE_SCORECARD_LINK,
      color: "bg-sky-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.4)]",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15 8H9L12 2Z" fill="#22c55e" />
        <circle cx="12" cy="14" r="6" stroke="#22c55e" strokeWidth="2" />
        <text x="12" y="18" textAnchor="middle" fontSize="8" fill="#22c55e" fontWeight="bold" fontFamily="Arial">LC</text>
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" stroke="#a855f7" strokeWidth="2" fill="#a855f7" />
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#38bdf8" strokeWidth="2" />
        <path d="M8 15l2-6 2 6" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="#38bdf8" />
      </svg>
    ),
    title: "Codeforces",
    subtitle: "881 Rating",
    description: "Achieved a max rating of 881 on Codeforces – Top 75% in the world.",
    button: {
      text: "View Profile",
      href: process.env.NEXT_PUBLIC_CODEFORCES_URL,
      color: "bg-blue-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.4)]",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#facc15" strokeWidth="2" />
        <path d="M12 7v5l4 2" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="#fb923c" strokeWidth="2" />
        <circle cx="12" cy="12" r="5" stroke="#fb923c" strokeWidth="2" />
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
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 14,10 22,10 16,14 18,22 12,18 6,22 8,14 2,10 10,10" fill="#ec4899" />
      </svg>
    ),
    title: "Hackathon_Name",
    subtitle: "Position_Name",
    description: "Finalist of Contest_Name Hackathon (top rank_name out of total_teams teams).",
    button: {
      text: "View Certificate",
      href: process.env.NEXT_PUBLIC_HACKATHON_CERT_LINK,
      color: "bg-pink-500",
    },
    glow: "shadow-[0_0_24px_2px_rgba(236,72,153,0.4)]",
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
            <h2 className="text-4xl inline-block my-6 font-medium">Achievements</h2>
          </RoughNotation>
        </div>
        <div className="mt-8 mb-20">
          <h3 className="font-medium text-lg mb-2 md:text-3xl">
            Badges & Certificates
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