import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useRouter } from "next/router";

import useScrollListener from "hooks/useScrollListener";
import { useSection } from "context/section";

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

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { currentSection } = useSection();
  const [navClassList, setNavClassList] = useState<any>([]);
  const scroll = useScrollListener();
  const router = useRouter();

  const mainRef = useRef(null);
  const themeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { top: -120 },
      { top: 0, duration: 0.7, delay: 1, ease: "Power0.easeNone" }
    );
  }, []);

  // update theme button aria-label according to theme value
  useEffect(() => {
    const themeBtn = themeBtnRef.current;
    if (themeBtn) {
      themeBtn.ariaLabel = theme ?? "light";
    }
  }, [theme]);

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];

    if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
      _classList.push("!shadow-md");

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  return (
    <header className="md:flex">
      <div
        ref={mainRef}
        className={`main-nav lower-glassmorphism bg-bglight dark:bg-bgdark z-30 top-0 shadow-sm fixed duration-400 px-4 sm:px-8 h-16 w-full border-b-2 border-marrsgreen dark:border-carrigreen ${navClassList.join(
          " "
        )}`}
      >
        <div className="w-full h-full mx-auto max-w-6xl flex items-center justify-between">
          {/* DN Logo */}
          <a
            href={process.env.NEXT_PUBLIC_PORTFOLIO_LINK || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl font-bold text-marrsgreen dark:text-carrigreen mr-3 cursor-pointer flex-shrink-0"
            title="Open Portfolio"
            style={{ minWidth: "2.5rem" }}
          >
            DN
          </a>
          {/* Nav links */}
          <nav className="flex-1">
            <ul className="header-nav-scroll flex overflow-x-auto space-x-2 sm:space-x-6 px-2 sm:px-0 snap-x snap-mandatory md:overflow-x-visible md:flex-wrap items-center">
              {navLinks.map((navLink, idx) => (
                <li
                  key={navLink.url}
                  className="snap-center flex-shrink-0 w-1/4 min-w-[90px] max-w-[140px] md:w-auto"
                >
                  <a
                    href={navLink.url}
                    className={`text-sm md:text-lg flex flex-col items-center w-full dark:fill-textlight md:mr-6 md:hover:text-marrsgreen md:dark:hover:text-carrigreen link-outline`}
                  >
                    <span className="whitespace-nowrap">{navLink.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* Theme toggle ... */}
        </div>
      </div>
    </header>
  );
};

export default Header;
