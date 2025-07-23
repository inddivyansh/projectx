// project/sections/SkillsSection.tsx

import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

// Skill blocks data
const skillBlocks = [
	{
		icon: (
			// Languages: Book/Code Symbol
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
				<rect x="3" y="5" width="18" height="14" rx="3" stroke="#f472b6" strokeWidth="2"/>
				<path d="M8 9h8M8 13h5" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/>
			</svg>
		),
		title: "Languages",
		subtitle: "9 Skills",
		description:
			"From low-level to web, proficient in modern programming.",
		skills: [
			{ name: "C", link: process.env.NEXT_PUBLIC_C_LINK },
			{ name: "C++", link: process.env.NEXT_PUBLIC_CPP_LINK },
			{ name: "Java", link: process.env.NEXT_PUBLIC_JAVA_LINK },
			{ name: "Kotlin", link: process.env.NEXT_PUBLIC_KOTLIN_LINK },
			{ name: "Python", link: process.env.NEXT_PUBLIC_PYTHON_LINK },
			{ name: "HTML", link: "https://html.spec.whatwg.org/" }, // w3.org/whatwg allowed
			{ name: "CSS", link: "https://www.w3.org/TR/css/#css" }, // w3.org allowed
			{ name: "JavaScript", link: process.env.NEXT_PUBLIC_JS_LINK },
			{ name: "TypeScript", link: process.env.NEXT_PUBLIC_TS_LINK },
		],
		color: "bg-pink-500",
		glow: "shadow-[0_0_24px_2px_rgba(236,72,153,0.4)]",
	},
	{
		icon: (
			// Frameworks: Layers Symbol
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
				<polygon points="12,3 22,8 12,13 2,8" stroke="#38bdf8" strokeWidth="2" fill="#38bdf8" fillOpacity="0.2"/>
				<polygon points="12,13 22,18 12,23 2,18" stroke="#38bdf8" strokeWidth="2" fill="#38bdf8" fillOpacity="0.2"/>
			</svg>
		),
		title: "Development Frameworks",
		subtitle: "8 Skills",
		description:
			"Used frameworks to build scalable apps, services, and tools.",
		skills: [
			{ name: "Tailwind CSS", link: process.env.NEXT_PUBLIC_TAILWIND_LINK },
			{ name: "React.js", link: process.env.NEXT_PUBLIC_REACT_LINK },
			{ name: "Next.js", link: process.env.NEXT_PUBLIC_NEXTJS_LINK },
			{ name: "Express.js", link: process.env.NEXT_PUBLIC_EXPRESS_LINK },
			{ name: "Node.js", link: process.env.NEXT_PUBLIC_NODE_LINK },
			{ name: "Flask", link: process.env.NEXT_PUBLIC_FLASK_LINK },
			{ name: "Django", link: process.env.NEXT_PUBLIC_DJANGO_LINK },
			{ name: "FastAPI", link: process.env.NEXT_PUBLIC_FASTAPI_LINK },
		],
		color: "bg-sky-500",
		glow: "shadow-[0_0_24px_2px_rgba(56,189,248,0.4)]",
	},
	{
		icon: (
			// Databases: Cylinder/DB Symbol
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
				<ellipse cx="12" cy="7" rx="9" ry="4" stroke="#34d399" strokeWidth="2" fill="#34d399" fillOpacity="0.15"/>
				<rect x="3" y="7" width="18" height="10" rx="5" stroke="#34d399" strokeWidth="2" fill="#34d399" fillOpacity="0.08"/>
				<ellipse cx="12" cy="17" rx="9" ry="4" stroke="#34d399" strokeWidth="2" fill="#34d399" fillOpacity="0.15"/>
			</svg>
		),
		title: "Databases",
		subtitle: "5 Skills",
		description:
			"Essenstial for reliable data storage, management, and retrieval.",
		skills: [
			{ name: "MongoDB", link: process.env.NEXT_PUBLIC_MONGODB_LINK },
			{ name: "SQLite", link: process.env.NEXT_PUBLIC_SQLITE_LINK },
			{ name: "PostgreSQL", link: process.env.NEXT_PUBLIC_POSTGRES_LINK },
			{ name: "MySQL", link: process.env.NEXT_PUBLIC_MYSQL_LINK },
			{ name: "Elasticsearch", link: process.env.NEXT_PUBLIC_ELASTIC_LINK },
		],
		color: "bg-green-500",
		glow: "shadow-[0_0_24px_2px_rgba(34,197,94,0.4)]",
	},
	{
		icon: (
			// Tools: Gear Symbol
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="5" stroke="#fbbf24" strokeWidth="2" fill="#fbbf24" fillOpacity="0.15"/>
				<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
			</svg>
		),
		title: " Collaboration & Deployment",
		subtitle: "8 Skills",
		description:
			"Comfortable with dev tools, cloud & collaboration platforms.",
		skills: [
			{ name: "Git", link: process.env.NEXT_PUBLIC_GIT_LINK },
			{ name: "Linux/Unix", link: process.env.NEXT_PUBLIC_LINUX_LINK },
			{ name: "Google Colab", link: process.env.NEXT_PUBLIC_COLAB_LINK },
			{ name: "Jupyter Notebook", link: process.env.NEXT_PUBLIC_JUPYTER_LINK },
			{ name: "AWS", link: process.env.NEXT_PUBLIC_AWS_LINK },
			{ name: "Azure", link: process.env.NEXT_PUBLIC_AZURE_LINK },
			{ name: "Google Cloud", link: process.env.NEXT_PUBLIC_GCLOUD_LINK },
			{ name: "Vercel", link: process.env.NEXT_PUBLIC_VERCEL_LINK }
		],
		color: "bg-yellow-500",
		glow: "shadow-[0_0_24px_2px_rgba(251,191,36,0.4)]",
	},
	{
		icon: (
			// AI/ML Libraries: Neural Network Symbol
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
				<circle cx="6" cy="12" r="2.5" stroke="#06b6d4" strokeWidth="2" fill="#06b6d4" fillOpacity="0.15"/>
				<circle cx="18" cy="12" r="2.5" stroke="#06b6d4" strokeWidth="2" fill="#06b6d4" fillOpacity="0.15"/>
				<circle cx="12" cy="6" r="2.5" stroke="#06b6d4" strokeWidth="2" fill="#06b6d4" fillOpacity="0.15"/>
				<circle cx="12" cy="18" r="2.5" stroke="#06b6d4" strokeWidth="2" fill="#06b6d4" fillOpacity="0.15"/>
				<path d="M8.5 12A3.5 3.5 0 0 1 12 8.5M15.5 12A3.5 3.5 0 0 0 12 15.5M12 8.5V6M12 15.5V18M8.5 12H6M15.5 12H18" stroke="#06b6d4" strokeWidth="1.5" />
			</svg>
		),
		title: "AI / ML Libraries",
		subtitle: "7 Skills",
		description: "Technologies used for Deep learning, NLP, Transformers, RAG, and more.",
		skills: [
			{ name: "TensorFlow", link: process.env.NEXT_PUBLIC_TENSORFLOW_LINK },
			{ name: "PyTorch", link: process.env.NEXT_PUBLIC_PYTORCH_LINK },
			{ name: "Keras", link: process.env.NEXT_PUBLIC_KERAS_LINK },
			{ name: "Scikit-learn", link: process.env.NEXT_PUBLIC_SKLEARN_LINK },
			{ name: "XGBoost", link: process.env.NEXT_PUBLIC_XGBOOST_LINK },
			{ name: "Transformers", link: process.env.NEXT_PUBLIC_TRANSFORMERS_LINK },
			{ name: "OpenCV", link: process.env.NEXT_PUBLIC_OPENCV_LINK },
		],
		color: "bg-cyan-500",
		glow: "shadow-[0_0_24px_2px_rgba(6,182,212,0.4)]",
	},
	{
		icon: (
			// Cybersecurity: Shield Symbol
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
				<path d="M12 3L4 6v6c0 5.25 4.5 8.25 8 9 3.5-.75 8-3.75 8-9V6l-8-3z" stroke="#f43f5e" strokeWidth="2" fill="#f43f5e" fillOpacity="0.12"/>
				<path d="M12 11v4" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round"/>
				<circle cx="12" cy="9" r="1" fill="#f43f5e"/>
			</svg>
		),
		title: "Security Toolkits",
		subtitle: "5 Skills",
		description: "Security tools, analysis, and best practices.",
		skills: [
			{ name: "Nmap", link: process.env.NEXT_PUBLIC_NMAP_LINK },
			{ name: "Kali Linux", link: process.env.NEXT_PUBLIC_KALI_LINK },
			{ name: "Hashcat", link: process.env.NEXT_PUBLIC_HASHCAT_LINK },
			{ name: "Cisco Packet Tracer", link: process.env.NEXT_PUBLIC_CISCO_PT_LINK },
			{ name: "Cisco Certifications", link: process.env.NEXT_PUBLIC_CISCO_CERT_LINK }
		],
		color: "bg-rose-500",
		glow: "shadow-[0_0_24px_2px_rgba(244,63,94,0.4)]",
	},
];

const SkillsSection: React.FC = () => {
	const { theme } = useTheme();
	const sectionRef = useRef<HTMLDivElement>(null);
	const isOnScreen = useOnScreen(sectionRef);
	const isScrollActive = useScrollActive(sectionRef);
	const { onSectionChange } = useSection();

	useEffect(() => {
		if (isScrollActive) onSectionChange?.("skills");
	}, [isScrollActive, onSectionChange]);

	return (
		<section
			ref={sectionRef}
			id="skills"
			className="section min-h-[700px] text-center"
		>
      <div className="text-center">
        <RoughNotation
          type="underline"
          color={
            theme === "light"
              ? "rgb(0, 122, 122)"
              : "rgb(5, 206, 145)"
          }
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="text-3xl md:text-4xl inline-block my-5 font-bold transition-all duration-500">
            Skills
          </h2>
				</RoughNotation>
			</div>
			<div className="mt-8 mb-20">
				<h3 className="font-medium text-lg mb-2 md:text-3xl">
				</h3>
				<p className="mb-6 mx-auto max-w-lg md:mb-10 lg:leading-loose">
					Languages, frameworks, databases, and tools I use for building and
					deploying projects.
				</p>
			</div>
			{/* Skill Cards Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0">
				{skillBlocks.map((block) => (
					<div
						key={block.title}
						className={`relative rounded-xl 
    bg-white dark:bg-[#232f3e] 
    border border-marrsgreen dark:border-transparent 
    p-6 flex flex-col items-start justify-between min-h-[220px] shadow-lg 
    ${block.glow} transition-all duration-300`}
					>
						<div className="flex items-center mb-2">
							<div className="rounded-full bg-opacity-20 p-2 mr-3">
								{block.icon}
							</div>
							<span className="text-lg font-bold text-[#232f3e] dark:text-gray-100">
								{block.title}
							</span>
						</div>
						<div className="flex items-center mb-4">
							<span
								className="font-mono text-base font-semibold mr-3"
								style={{
									color: block.color.includes("yellow")
										? "#fbbf24"
										: block.color.includes("pink")
										? "#f472b6"
										: block.color.includes("green")
										? "#34d399"
										: block.color.includes("sky")
										? "#38bdf8"
										: "#60a5fa",
								}}
							>
								{block.subtitle}
							</span>
							<span className="text-gray-500 dark:text-gray-400 text-sm">
								{block.description}
							</span>
						</div>
						<div className="flex flex-wrap gap-2 mt-auto">
							{block.skills.map((skill) => (
								<a
									key={skill.name}
									href={skill.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center px-3 py-1 rounded font-medium text-xs 
          bg-[#f3f4f6] dark:bg-[#202c39] 
          text-[#232f3e] dark:text-gray-200 
          border border-gray-300 dark:border-gray-700 hover:scale-105 transition"
								>
									{skill.name}
								</a>
							))}
						</div>
						<span className="absolute bottom-4 right-4 w-5 h-5 rounded-full border-2 border-gray-700 opacity-30"></span>
					</div>
				))}
			</div>
		</section>
	);
};

export default SkillsSection;
