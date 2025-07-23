import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import LinkButton from "@/components/LinkButton"; 
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ContactSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);
  const isSecOnScreen = useOnScreen(sectionRef);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for contact section
  const contactSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    contactSection && onSectionChange!("contact");
  }, [contactSection]);

  // Add background text effect (parallax) like HeroSection
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(sectionRef);
    gsap.to(q(".bg-text"), {
      scrollTrigger: {
        trigger: q(".bg-text"),
        scrub: true,
      },
      y: 350,
    });
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section min-h-[700px] text-center relative"
    >
      {/* Background Text Effect */}
      <span
        aria-hidden="true"
        className="bg-text absolute -top-36 left-0 right-0 mx-auto rotate-12 text-gray-100 dark:text-[#212f3c] text-7xl md:text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none text-center z-0"
      >
        CREATE. CONNECT. INSPIRE.
      </span>
      <div className="text-center relative z-10">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="text-4xl inline-block my-6 font-medium">Contact</h2>
        </RoughNotation>
      </div>
      <div className="mt-8 mb-20 relative z-10">
        <h3 className="font-medium text-lg mb-2 md:text-3xl" ref={elementRef}>
          Let's be awesome together!
        </h3>
        <p className="mb-6 mx-auto max-w-lg md:mb-10 lg:leading-loose">
          I am driven by my love for coding and my desire for new
          challenges. If you have opportunities for collaboration, don't hesitate to contact me!
        </p>
        <LinkButton href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          Get in touch!
        </LinkButton>
      </div>
    </section>
  );
};

export default ContactSection;
