import React, { useRef, useEffect } from "react";
import profilePic from "public/images/profile/gaya-2.jpeg";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import { useMotionValue, useInView, useSpring } from "framer-motion";

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      // console.log(latest);
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

const AboutUser = ({ data }) => {
  return (
    <>
      <AnimatedText
        text="User Profile"
        className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8 text-6xl"
      />
      <div className="flex flex-row justify-center items-center w-full gap-16 sm:gap-8">
        <div className="w-1/3 flex flex-col items-start justify-start xl:col-span-4 md:order-1 md:col-span-8">
          <h5 className="mb-4 sm:text-lg lg:text-2xl text-2xl sm:mt-4 font-bold uppercase text-dark dark:text-light/75">
            Profile
          </h5>
          <h5 className="sm:text-lg lg:text-lg text-lg sm:mt-4 font-bold uppercase text-dark/75 dark:text-light/75">
            Name
          </h5>
          <div className="mb-4 sm:text-sm lg:text-base">
            <p className="font-medium">{data.name}</p>
          </div>
          <h5 className="sm:text-lg lg:text-lg text-lg sm:mt-4 font-bold uppercase text-dark/75 dark:text-light/75">
            Email
          </h5>
          <div className="mb-4 sm:text-sm lg:text-base">
            <p className="font-medium">{data.email}</p>
          </div>
          <h5 className="sm:text-lg lg:text-lg text-lg sm:mt-4 font-bold uppercase text-dark/75 dark:text-light/75">
            Gender
          </h5>
          <div className="mb-4 sm:text-sm lg:text-base">
            <p className="font-medium">{data.gender}</p>
          </div>
          <h5 className="sm:text-lg lg:text-lg text-lg sm:mt-4 font-bold uppercase text-dark/75 dark:text-light/75">
            Status
          </h5>
          <div className="mb-4 sm:text-sm lg:text-base">
            <p className="font-medium">{data.status}</p>
          </div>
        </div>
        <div
          className="w-1/3 relative h-max rounded-2xl border-2 border-solid border-dark
              bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8 sm:mb-6 lg:mb-8 "
        >
          <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light"></div>
          <Image
            src={profilePic}
            alt="Axel Eldrian Hadiwibowo"
            className="w-full h-auto rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </>
  );
};

export default AboutUser;
