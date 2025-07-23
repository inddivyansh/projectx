import { useEffect, useState } from "react";
import { useSection } from "context/section";

const SocialLinks: React.FC<{ page?: string }> = ({ page }) => {
  const { currentSection } = useSection();
  const [activeSection, setActiveSection] = useState<string>("");

  // Helper: map hash to nav text for robust matching
  const hashToSection = (hash: string) => {
    const map: Record<string, string> = {
      home: "home",
      whoami: "about me",
      skills: "skills",
      experiences: "experiences",
      achievements: "achievements",
      projects: "projects",
      blog: "blog",
      contact: "contact",
    };
    return map[hash] || hash;
  };

  useEffect(() => {
    const onHashOrScroll = () => {
      let hash = window.location.hash.replace(/^#/, "").replace(/\/$/, "").toLowerCase();
      setActiveSection(hashToSection(hash));
    };
    onHashOrScroll();
    window.addEventListener("hashchange", onHashOrScroll);
    window.addEventListener("scroll", onHashOrScroll);
    return () => {
      window.removeEventListener("hashchange", onHashOrScroll);
      window.removeEventListener("scroll", onHashOrScroll);
    };
  }, []);

  return (
    <>
      {page === "index" || !page ? (
        <div className="hidden fixed left-10 bottom-1/3 md:flex flex-col w-6 h-52 items-center justify-between">
          {navLinks.map((nav) => {
            const navText = nav.text.toLowerCase();
            const navHash = nav.url.replace(/^#/, "").replace(/\/$/, "").toLowerCase();

            // Highlight if: currentSection, or hash, or mapped hash matches navText
            const isActive =
              currentSection === navText ||
              activeSection === navText ||
              activeSection === navHash;

            return (
              <a
                title={nav.text}
                href={nav.url}
                key={nav.url}
                className={`
                  w-3 h-3 border-2 border-marrsgreen dark:border-carrigreen
                  transition-all duration-300 ease-in-out outline-marrsdark dark:outline-textlight
                  ${isActive
                    ? "bg-marrsgreen dark:bg-carrigreen opacity-100 rotate-0 scale-110 shadow-[0_0_8px_2px_rgba(56,189,248,0.25)]"
                    : "opacity-50 rotate-45 hover:opacity-80 hover:scale-105 hover:rotate-12"
                  }
                `}
              ></a>
            );
          })}
        </div>
      ) : (
        <div className="hidden fixed left-10 bottom-0 md:flex flex-col w-6 h-56 items-center justify-between">
          <div className="-rotate-90 text-lg tracking-widest">
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="link-outline hover:text-marrsgreen dark:hover:text-carrigreen"
            >
              {process.env.NEXT_PUBLIC_EMAIL}
            </a>
          </div>
          <div className="w-40 h-1 bg-bgdark dark:bg-bglight rotate-90"></div>
        </div>
      )}
    </>
  );
};

const navLinks = [
  {
    url: "#home",
    text: "Home",
  },
  {
    url: "#whoami",
    text: "About Me",
  },
  {
    url: "#skills",
    text: "Skills",
  },
  {
    url: "#experiences",
    text: "Experiences",
  },
  {
    url: "#achievements",
    text: "Achievements",
  },
  {
    url: "#projects",
    text: "Projects",
  },
  {
    url: "#blog",
    text: "Blog",
  },
  {
    url: "#contact",
    text: "Contact",
  },
];

export default SocialLinks;
