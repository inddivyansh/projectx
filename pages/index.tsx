import type { GetStaticProps, NextPage } from "next";

import AppHead from "@/components/AppHead";
import Loader from "@/components/Loader";
import SkipToMain from "@/components/SkipToMain";
import Header from "@/components/Header";
import SocialLinks from "@/components/SocialLinks";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import SkillsSection from "@/sections/SkillsSection";
import ExperiencesSection from "@/sections/ExperiencesSection";
import AchievementsSection from "@/sections/AchievementsSection";
import ProjectSection from "@/sections/ProjectSection";
import BlogSection from "@/sections/BlogSection";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import GeminiChatbot from "@/components/GeminiChatbot";
import { useRef, useState } from "react";

import { getAllPosts } from "utils/api";
import { MdxMeta } from "../pages/blog/posts/[slug]";

type Props = {
  blogPosts: MdxMeta[];
};

export const meta = {
  description:
    "Divyansh Nagar is a prefinal year B.Tech Computer Science student at IIIT Pune, passionate about Cybersecurity, AI, and full-stack web development. Actively building projects and open to tech internships.",
  author: "Divyansh Nagar",
  type: "website",
  ogImage: `${process.env.NEXT_PUBLIC_URL}/divyansh-nagar-dev-og-new.png`,
  siteName: "Divyansh Nagar",
  imageAlt: "Portfolio website of Divyansh Nagar",
};

const Home: NextPage<Props> = ({ blogPosts }) => {
  const footerRef = useRef<HTMLElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <AppHead
        title="Divyansh Nagar - A Student Programmer"
        url={`${process.env.NEXT_PUBLIC_URL}`}
        meta={meta}
      />
      <Loader>Welcome !</Loader>
      <div className="bg-bglight dark:bg-bgdark overflow-hidden">
        <div className="selection:bg-marrsgreen selection:text-bglight dark:selection:bg-carrigreen dark:selection:text-bgdark pb-0">
          <SkipToMain />
          <Header />
          <main id="main">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperiencesSection />
            <AchievementsSection />
            <ProjectSection />
            <BlogSection posts={blogPosts} />
            <ContactSection />
          </main>
          <SocialLinks page="index" />
          <FloatingButtons
            footerRef={footerRef}
            onChatbotClick={() => setIsChatOpen(true)}
          />
          {isChatOpen && (
            <GeminiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogPosts = getAllPosts([
    "coverImage",
    "coverImageAlt",
    "slug",
    "title",
    "excerpt",
    "datetime",
    "featured",
  ]);

  return {
    props: {
      blogPosts,
    },
  };
};

export default Home;
