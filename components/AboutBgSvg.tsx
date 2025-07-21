import Image from "next/image";

import arrow from "../public/extra/arrow.svg";

const AboutBgSvg: React.FC = () => {
  return (
    <>
    
      <span
        aria-hidden="true"
        className="bg-svg hidden lg:inline-block absolute bottom-24 right-44"
      >
        <Image src={arrow} width={19} height={60} alt="up arrow" />
      </span>
    </>
  );
};

export default AboutBgSvg;
