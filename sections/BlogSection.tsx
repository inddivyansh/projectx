import { useEffect, useRef, useMemo, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { RoughNotation } from "react-rough-notation";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import BlogImageCard from "@/components/BlogImageCard";

const glowColors = [
  "shadow-[0_0_32px_8px_rgba(59,130,246,0.25)]", // blue
  "shadow-[0_0_32px_8px_rgba(34,197,94,0.25)]",  // green
  "shadow-[0_0_32px_8px_rgba(236,72,153,0.25)]", // pink
  "shadow-[0_0_32px_8px_rgba(251,191,36,0.25)]", // yellow
  "shadow-[0_0_32px_8px_rgba(168,85,247,0.25)]", // purple
];

const accentColors = [
  "#3B82F6", // blue
  "#22C55E", // green
  "#EC4899", // pink
  "#FBBF24", // yellow
  "#A855F7", // purple
];

const BlogSection: React.FC<{ posts: any[] }> = ({ posts }) => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hooks for section tracking and animations
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);
  const { onSectionChange } = useSection();
  const isScrollActive = useScrollActive(sectionRef);

  useEffect(() => {
    if (isScrollActive) onSectionChange?.("blog");
  }, [isScrollActive, onSectionChange]);

  // Memoize posts with assigned colors
  const coloredPosts = useMemo(
    () =>
      posts.map((post, idx) => ({
        ...post,
        glow: glowColors[idx % glowColors.length],
        accent: accentColors[idx % accentColors.length],
      })),
    [posts]
  );

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const mouseEndX = useRef<number | null>(null);

  // Responsive: detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Infinite loop handlers
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + coloredPosts.length) % coloredPosts.length
    );
  };
  const handleNext = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % coloredPosts.length
    );
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) handleNext();
      else if (diff < -50) handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    mouseEndX.current = e.clientX;
    if (mouseStartX.current !== null && mouseEndX.current !== null) {
      const diff = mouseStartX.current - mouseEndX.current;
      if (diff > 50) handleNext();
      else if (diff < -50) handlePrev();
    }
    mouseStartX.current = null;
    mouseEndX.current = null;
  };

  // Get visible cards (3 for desktop, 1 for mobile)
  const getVisibleCards = () => {
    if (isMobile) {
      return [coloredPosts[currentIndex]];
    }
    // Desktop: left, center, right
    const leftIndex = (currentIndex - 1 + coloredPosts.length) % coloredPosts.length;
    const rightIndex = (currentIndex + 1) % coloredPosts.length;
    return [
      coloredPosts[leftIndex],
      coloredPosts[currentIndex],
      coloredPosts[rightIndex],
    ];
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="bg-[#F5F5F5] dark:bg-[#1B2731]">
      <section id="blog" className="py-11 md:pt-16 lg:pt-20 overflow-hidden" ref={sectionRef}>
        {/* This container constrains the text content to keep it readable */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-20">
          <div className="text-center">
            <RoughNotation
              type="underline"
              color={theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}
              strokeWidth={2}
              order={1}
              show={isOnScreen}
            >
              <h2 className="section-heading">Blog</h2>
            </RoughNotation>
          </div>
          <div className="text-center mb-8 mt-6" ref={elementRef}>
            I write blog posts about what I've done and what I'm doing{" "}
            <br className="hidden sm:block" aria-hidden="true" />
            as a documenting practice. Here are some of my recent blog posts.
          </div>
        </div>

        {/* --- Carousel Starts Here --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-8 relative">
            {/* Left Chevron */}
            <button
              onClick={handlePrev}
              className="p-2 rounded-full transition-opacity duration-300 flex-shrink-0"
              aria-label="Previous Post"
            >
              <svg width="40" height="40" stroke="#22C55E" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Carousel */}
            <div
              className="w-full overflow-hidden mx-4 flex justify-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              style={{ userSelect: "none" }}
            >
              <div className="flex items-stretch gap-x-4 md:gap-x-8 pt-8 pb-12">
                {visibleCards.map((post, idx) => {
                  // For desktop: idx 0 = left, 1 = center, 2 = right
                  // For mobile: idx 0 = center
                  const isCurrent = (!isMobile && idx === 1) || (isMobile && idx === 0);
                  return (
                    <div
                      key={post.slug || idx}
                      className={`flex-shrink-0 w-[320px] sm:w-[360px]`}
                      aria-hidden={!isCurrent}
                    >
                      <div
                        className={`h-full transform transition-all duration-500 ease-in-out cursor-pointer ${
                          isCurrent
                            ? "scale-100 opacity-100 z-10"
                            : "scale-90 opacity-70 hover:scale-95 hover:opacity-100 z-0"
                        }`}
                        onClick={() => setCurrentIndex(
                          isMobile ? currentIndex
                          : idx === 0
                            ? (currentIndex - 1 + coloredPosts.length) % coloredPosts.length
                            : idx === 2
                              ? (currentIndex + 1) % coloredPosts.length
                              : currentIndex
                        )}
                      >
                        <BlogImageCard
                          post={post}
                          className={`min-h-[420px] flex flex-col justify-between ${post.glow}`}
                          fullWH
                          accent={post.accent}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Chevron */}
            <button
              onClick={handleNext}
              className="p-2 rounded-full transition-opacity duration-300 flex-shrink-0"
              aria-label="Next Post"
            >
              <svg width="40" height="40" stroke="#22C55E" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        {/* --- Carousel Ends Here --- */}

        {/* The "Read all" link is also constrained for consistency */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-20">
          <div className="mt-4 text-center">
            <Link href="/blog" className="link">
              Read all blog posts{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
