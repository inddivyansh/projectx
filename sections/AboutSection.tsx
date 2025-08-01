import { useEffect, useRef } from "react";
import Image from "next/image";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import useScrollActive from "hooks/useScrollActive";
import { useSection } from "context/section";

import satNaing from "../public/satnaing.webp";
import AboutBgSvg from "@/components/AboutBgSvg";
import EduGroup from "@/components/EduGroup";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isScrollActive = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  const { theme } = useTheme();

  useEffect(() => {
    if (isScrollActive) onSectionChange?.("about me");
  }, [isScrollActive, onSectionChange]);

  const isSecOnScreen = true; // Placeholder, replace with actual on-screen logic

  return (
    <div
      ref={sectionRef}
      className="about-panel bg-white dark:bg-[#1B2731] relative"
    >
      <section id="whoami" className="section">
        <RoughNotationGroup>
          <div className="text-center">
            <RoughNotation
              type="underline"
              color={`${
                theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"
              }`}
              strokeWidth={2}
              order={1}
              show={isSecOnScreen}
            >
              <h2 className="section-heading">Who am I?</h2>
            </RoughNotation>
          </div>
          <div className="md:grid grid-cols-5 grid-rows-1 gap-8 items-center">
            {/* Profile Picture */}
            <div className="col-span-2 flex justify-center items-center py-4">
              <div className="relative w-80">
                <svg
                  width="96"
                  height="21"
                  viewBox="0 0 96 21"
                  aria-hidden="true"
                  className="img-svg hidden lg:block fill-marrsgreen dark:fill-carrigreen absolute -top-14 -left-14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M79.2202 0.959991L62.7802 17.32L46.3301 0.959991L29.8902 17.32L13.4501 0.959991L0.410156 13.94L0.400146 17.58L13.4501 4.58999L29.8902 20.95L46.3301 4.58999L62.7802 20.95L79.2202 4.58999L93.7302 19.02L95.5402 17.19L79.2202 0.959991Z" />
                </svg>

                <div className="profile-picture overflow-hidden md:overflow-visible rounded-md md:shadow-2xl">
                  <Image
                    src={satNaing}
                    width={1900} // increased from 1700
                    height={2000} // increased from 1790
                    priority
                    alt="Divyansh Nagar profile picture"
                    className="rounded-md"
                  />
                </div>

                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  aria-hidden="true"
                  className="img-svg hidden lg:block fill-marrsgreen dark:fill-carrigreen absolute bottom-8 -right-12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.68 11.51L9.23 7.05998L13.68 2.61C14.24 2.05 14.24 1.12999 13.68 0.569994C13.12 0.00999391 12.2 0.00999391 11.64 0.569994L7.19002 5.02001L2.74001 0.569994C2.18001 0.00999391 1.26003 0.00999391 0.700029 0.569994C0.140029 1.12999 0.140029 2.05 0.700029 2.61L5.15004 7.05998L0.700029 11.51C0.140029 12.07 0.140029 12.99 0.700029 13.55C1.26003 14.11 2.18001 14.11 2.74001 13.55L7.19002 9.09999L11.64 13.55C12.2 14.11 13.12 14.11 13.68 13.55C14.24 12.99 14.24 12.08 13.68 11.51Z" />
                </svg>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="img-svg hidden lg:block fill-[#FF9D00] absolute -bottom-10 right-6 scale-150"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.6799 5.68002C11.6799 8.65002 9.27994 11.05 6.30994 11.05C3.33994 11.05 0.939941 8.65002 0.939941 5.68002C0.939941 2.71002 3.33994 0.309998 6.30994 0.309998C9.27994 0.309998 11.6799 2.71002 11.6799 5.68002Z" />
                </svg>
              </div>
            </div>

            {/* Intro Text */}
            <div className="col-span-3 about-intro lg:ml-8">
              <p>
              I’ve been on a journey of continuous learning and hands-on tech exploration, 
              building a solid foundation in computer science through both theory and practice. 
              From studying core subjects to working on side projects, hackathons and certifications, 
              I’m shaping my path toward impactful and intelligent tech solutions. 
              My education has helped me think critically, code better, and grow as a future tech professional.
              </p>
              <div className="mt-6">
                <p className="edu-bg my-4">Here is my educational background.</p>
                {educationInfo.map((edu) => (
                  <EduGroup edu={edu} key={edu.id} />
                ))}
              </div>
            </div>
          </div>
        </RoughNotationGroup>
      </section>

      <AboutBgSvg />
    </div>
  );
};

const educationInfo = [
  {
    id: 1,
    title: "B.Tech in Computer Science & Engineering",
    subTitle: "Indian Institute of Information Technology, Pune | 2023 ~ 2027",
    subTitleLink: process.env.NEXT_PUBLIC_IIIT_PUNE_LINK,
    list: [
      " Studying Data Structures, Operating Systems, Computer Networks, Machine Learning, and Cybersecurity",
      "Actively working on  projects and open-source contributions",
      "Engaged in technical communities and hackathons for practical exposure",
    ],
  },
  {
    id: 2,
    title: "Education Gap",
    subTitle: "Allen Career Institute | 2022 – 2023",
    subTitleLink: process.env.NEXT_PUBLIC_ALLEN_LINK,
    list: [
      "Took a dedicated gap year to fully focus on securing admission to a top engineering college through JEE, preparing aggressively with round-the-clock study and commitment.",
    ],
  },
  {
    id: 3,
    title: "Senior Secondary Education",
    subTitle: "Nalanda Academy | 2021 – 2022",
    subTitleLink: process.env.NEXT_PUBLIC_NALANDA_LINK,
    list: [
      "Class 12 (PCM) – Scored 84.8%.",
      "Focused on problem-solving and preparation for JEE, India’s premier engineering entrance exam.",
    ],
  },
  {
    id: 4,
    title: "Secondary Education",
    subTitle: "Nalanda Academy | 2019 – 2020",
    subTitleLink: process.env.NEXT_PUBLIC_NALANDA_LINK,
    list: [
      "Class 10 – Scored 89.6%.",
      "Figuring out my interests and strengths.",
    ],
  },
];

export default AboutSection;
