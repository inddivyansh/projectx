import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  footerRef: React.RefObject<HTMLElement>;
  onChatbotClick: () => void;
};

const FloatingButtons: React.FC<Props> = ({ footerRef, onChatbotClick }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [hide, setHide] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      setHide(rect.top < window.innerHeight && rect.bottom > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [footerRef]);

  useEffect(() => setMounted(true), []);

  // Only show buttons after theme is resolved
  if (!mounted || !theme) return null;

  const colors = {
    light: {
      bg: "bg-white/80",
      border: "border-gray-300",
      iconMain: "#444",
      iconSecondary: "#888",
      chatbotBg: "bg-gray-100/80",
      chatbotStroke: "#888",
      chatbotFace: "#444",
    },
    dark: {
      bg: "bg-gray-900/80",
      border: "border-gray-700",
      iconMain: "#ccc",
      iconSecondary: "#888",
      chatbotBg: "bg-gray-800/80",
      chatbotStroke: "#888",
      chatbotFace: "#ccc",
    },
  };

  const current = theme === "dark" ? colors.dark : colors.light;

  return (
    <div
      className={`fixed z-50 right-6 bottom-8 flex flex-col gap-4 transition-opacity duration-300 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <button
        aria-label="Toggle Dark Mode"
        className={`w-12 h-12 rounded-full ${current.bg} ${current.border} shadow-lg flex items-center justify-center hover:scale-110 transition`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="7" fill={current.iconMain} fillOpacity="0.7" />
            <path
              d="M12 3v2M12 19v2M5.22 5.22l1.42 1.42M17.36 17.36l1.42 1.42M3 12h2M19 12h2M5.22 18.78l1.42-1.42M17.36 6.64l1.42-1.42"
              stroke={current.iconSecondary}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="4" fill={current.iconSecondary} opacity="0.15"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              fill={current.iconMain}
              fillOpacity="0.7"
            />
            <circle cx="12" cy="12" r="5" fill={current.iconSecondary} opacity="0.3"/>
          </svg>
        )}
      </button>
      <button
        aria-label="Open Chatbot"
        className={`w-12 h-12 rounded-full ${current.chatbotBg} shadow-lg flex items-center justify-center hover:scale-110 transition`}
        onClick={onChatbotClick}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="6"
            fill={theme === "dark" ? "#222" : "#fff"}
            fillOpacity="0.7"
            stroke={current.chatbotStroke}
            strokeWidth="2"
          />
          <circle cx="8.5" cy="12" r="1.5" fill={current.chatbotFace} fillOpacity="0.7" />
          <circle cx="15.5" cy="12" r="1.5" fill={current.chatbotFace} fillOpacity="0.7" />
          <path
            d="M12 17c2.5 0 4.5-1.5 4.5-3.5h-9C7.5 15.5 9.5 17 12 17z"
            fill={current.chatbotFace}
            opacity="0.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingButtons;