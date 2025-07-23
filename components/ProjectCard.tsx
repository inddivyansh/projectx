import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image, { StaticImageData } from "next/image";

type Props = {
  index: number;
  project: {
    title: string;
    type: string;
    image: string; // <-- change to string
    desc: string;
    tags: string[];
    liveUrl: string;
    codeUrl: string;
    bgColor: string;
    githubApi: string;
    glow: string;
    accent: string; // <-- Add accent color prop
  };
};

const ProjectCard: React.FC<Props> = ({ index, project }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const even = index % 2 === 0 ? true : false;

  // Animations
  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: `70% bottom`,
      },
    });

    tl.fromTo(
      q(".project-image"),
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        ease: "Power3.easeInOut",
        duration: 0.5,
        stagger: 0.2,
      }
    )
      .fromTo(q(".project-text"), { y: 100 }, { y: 0, stagger: 0.2 }, "<25%")
      .fromTo(
        q(".project-desc"),
        { opacity: 0 },
        { opacity: 1, stagger: 0.2 },
        "<10%"
      )
      .fromTo(
        q(".project-tags"),
        { y: -40 },
        { y: 0, stagger: 0.1, ease: "Elastic.easeOut" },
        "<25%"
      );
  }, []);

  const [starCount, setStarCount] = useState();
  const [starCountUrl, setStarCountUrl] = useState();

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (!project.githubApi) return; // Don't fetch if URL is missing
      try {
        const response = await fetch(project.githubApi);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const stargazersCount = data.stargazers_count;
        const stargazersUrl = data.stargazers_url;

        if (stargazersCount && stargazersUrl && !ignore) {
          setStarCount(stargazersCount);
          setStarCountUrl(stargazersUrl);
        }
      } catch (err) {
        setStarCount(undefined);
        setStarCountUrl(undefined);
        // Optionally log error: console.error(err);
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [project.githubApi]);

  return (
    <div
      ref={sectionRef}
      className={`project-card project-card-${index} 
        bg-white dark:bg-carddark 
        rounded-2xl border border-marrsgreen dark:border-transparent 
        shadow-lg ${project.glow} transition-all duration-300
        p-5 flex flex-col w-full max-w-full min-h-[340px]`}
    >
      <div className="w-full mb-3 flex items-center justify-center">
        <div
          className="rounded-xl border-2 overflow-hidden flex items-center justify-center"
          style={{
            borderColor: project.accent,
            background: project.bgColor,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={220}
            className="object-contain"
            style={{ maxHeight: 220, width: "100%", height: "auto" }}
            priority={index === 0}
          />
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="project-text flex items-center justify-between">
          <h3
            className="text-lg my-1 font-medium"
            style={{ color: project.accent }}
          >
            {project.title}
          </h3>
          {/* ...actions... */}
        </div>
      </div>
      <div className="overflow-visible">
        <p className="project-desc mb-2">{project.desc}</p>
      </div>
      <ul
        aria-label={`Tech Stack used in ${project.title}`}
        className="flex flex-wrap mt-2 mb-4 md:mt-2 md:mb-6 text-sm"
      >
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="project-tags mr-2 my-1 bg-[#E2EFEF] dark:bg-carddark border border-marrsgreen dark:border-gray-600 py-1 px-2 rounded"
            style={{ color: project.accent }}
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-2">
        {/* Place your action buttons here */}
      </div>
    </div>
  );
};

export default ProjectCard;
