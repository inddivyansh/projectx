import React, { useRef } from "react";

type FooterProps = {
  noPadding?: boolean;
};

const Footer: React.FC<FooterProps> = ({ noPadding = false }) => {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <footer
      ref={footerRef}
      className={`w-full bg-bglight dark:bg-[#181f27] text-[#232f3e] dark:text-gray-300 ${
        noPadding ? "" : "pt-10 pb-6"
      } left-0 right-0 z-50 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left: Connect With Me */}
        <div className="flex flex-col items-start">
          <div className="text-xl font-bold text-orange-500 mb-4">
            Connect With Me
          </div>
          <div className="grid grid-cols-3 gap-3 mb-2">
            {/* Row 1 */}
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              className="flex items-center justify-center rounded-full border border-marrsgreen dark:border-carrigreen w-12 h-12 bg-white dark:bg-[#202c39] shadow transition hover:scale-105"
            >
              <svg width="18" height="18" className="fill-gray-500 dark:fill-gray-400" viewBox="0 0 24 24">
                <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" />
              </svg>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="flex items-center justify-center rounded-full border border-marrsgreen dark:border-carrigreen w-12 h-12 bg-white dark:bg-[#202c39] shadow transition hover:scale-105"
            >
              <svg width="18" height="18" className="fill-gray-500 dark:fill-gray-400" viewBox="0 0 24 24">
                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
              </svg>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_UNSTOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Unstop"
              className="flex items-center justify-center rounded-full border border-marrsgreen dark:border-carrigreen w-12 h-12 bg-white dark:bg-[#202c39] shadow transition hover:scale-105"
            >
              <span className="text-xs font-bold text-white bg-[#1A73E8] rounded-full px-2 py-1">U</span>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_KAGGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Kaggle"
              className="flex items-center justify-center rounded-full border border-marrsgreen dark:border-carrigreen w-12 h-12 bg-white dark:bg-[#202c39] shadow transition hover:scale-105"
            >
              <span className="text-xs font-bold text-white bg-[#20BEFF] rounded-full px-2 py-1">K</span>
            </a>
            {/* Row 2 */}
            <a
              href={process.env.NEXT_PUBLIC_DEVTO_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Dev.to"
              className="flex items-center justify-center rounded-full border border-marrsgreen dark:border-carrigreen w-12 h-12 bg-white dark:bg-[#202c39] shadow transition hover:scale-105"
            >
              {/* Real Dev.to SVG */}
              <svg width="18" height="18" viewBox="0 0 50 50" fill="none">
                <rect x="2" y="2" width="46" height="46" rx="10" fill="#333" stroke="gray" strokeWidth="2"/>
                <text x="25" y="32" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold" fontFamily="Arial">DEV</text>
              </svg>
            </a>
          </div>
          <div className="flex items-center mt-4 ml-1">
            <span className="w-3 h-3 rounded-full bg-marrsgreen mr-2"></span>
            <span className="text-lg font-medium text-[#232f3e] dark:text-gray-100">Currently Open for work</span>
          </div>
        </div>
        {/* Center: Sitemap */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-orange-500 mb-2 tracking-wide">Sitemap</div>
          <div className="grid grid-cols-2 gap-x-8">
            <div className="flex justify-center col-span-2">
              <ul className="mb-4 space-y-1 mr-8">
                <li>
                  <a
                    href="#home"
                    className="text-[#232f3e] dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition font-mono"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#whoami"
                    className="text-[#232f3e] dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition font-mono"
                  >
                    About Me
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-[#232f3e] dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition font-mono"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#experiences"
                    className="text-[#232f3e] dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition font-mono"
                  >
                    Experiences
                  </a>
                </li>
              </ul>
              <ul className="mb-4 space-y-1">
                <li>
                  <a
                    href="#achievements"
                    className="text-[#232f3e] dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition font-mono"
                  >
                    Achievements
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-[#232f3e] dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition font-mono"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-[#232f3e] dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition font-mono"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-[#232f3e] dark:text-gray-300 hover:text-marrsgreen dark:hover:text-carrigreen transition font-mono"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Right: Name & Email */}
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-2">
            <span className="text-3xl font-bold text-marrsgreen dark:text-carrigreen mr-3">
              DN
            </span>
            <span className="text-2xl font-mono font-semibold text-[#232f3e] dark:text-white">
              Divyansh Nagar
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Student Programmer
          </div>
          <div className="bg-white dark:bg-[#202c39] rounded-lg px-4 py-2 mb-2 flex flex-col items-end border border-marrsgreen dark:border-carrigreen">
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="text-marrsgreen dark:text-carrigreen font-mono text-base"
            >
              <span className="flex items-center">
                {process.env.NEXT_PUBLIC_EMAIL}
              </span>
            </a>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Available for exciting opportunities
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-sm text-gray-500 dark:text-gray-400 px-4 mt-6">
        <span>
          © 2025 Divyansh Nagar.
        </span>
        <span>
          Made possible with help of{" "}
          <a
            href="https://github.com/satnaing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-marrsgreen dark:text-carrigreen"
          >
            SatNaing
          </a>
          <span className="sr-only">love</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-1 inline-block mb-1 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </span>
      </div>
      {/* Fixed floating button bottom left */}
      <div
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center
          bg-white dark:bg-[#202c39] border-4 border-white dark:border-[#202c39]
          text-[#232f3e] dark:text-gray-200 shadow-lg transition-colors"
      >
        <span className="font-bold text-lg">N</span>
      </div>
    </footer>
  );
};

export default Footer;