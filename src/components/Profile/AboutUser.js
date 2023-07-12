import React, { useRef, useEffect } from "react";
import profilePic from "public/images/profile/gaya-2.jpeg";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import { useMotionValue, useInView, useSpring } from "framer-motion";
import Link from "next/link";

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
        className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8 text-6xl text-center"
      />
      <div className="flex flex-row justify-center items-center w-full  gap-16 sm:gap-8">
        <div
          className="w-5/6 flex flex-row sm:flex-col bg-gradient-to-r from-dark/30 sm:from-light/60 sm:to-light to-light shadow-xl rounded-2xl 
        lg:w-full"
        >
          <div
            className="w-1/2 sm:w-full relative h-max rounded-2xl border-4 border-solid border-dark
                bg-transparent p-8 dark:border-light sm:border-0"
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
          <div className="relative w-1/2 sm:w-full flex flex-col items-start justify-center pl-10 md:order-1">
            <Link
              href={`/profile/form/updateProfile/${data.id}`}
              className="absolute top-0 right-0 m-8 bg-blue-800 py-2 px-3 text-xs rounded-md shadow text-light"
            >
              Edit
            </Link>
            <div>
              <h5
                className="mb-4 sm:text-lg lg:text-xl text-2xl sm:mt-4 font-bold uppercase text-dark
              lg:mb-2"
              >
                Profile
              </h5>
              <h5 className="lg:text-base sm:text-sm text-lg sm:mt-4 font-bold uppercase text-dark/75">
                Name
              </h5>
              <div
                className="mb-4 sm:text-sm
              lg:text-sm lg:mb-2"
              >
                <p className="font-medium">{data.name}</p>
              </div>
              <h5 className="lg:text-base sm:text-sm text-lg sm:mt-4 font-bold uppercase text-dark/75">
                Email
              </h5>
              <div
                className="mb-4 sm:text-sm
              lg:text-sm lg:mb-2"
              >
                <p className="font-medium">{data.email}</p>
              </div>
              <h5 className="lg:text-base sm:text-sm text-lg sm:mt-4 font-bold uppercase text-dark/75">
                Gender
              </h5>
              <div
                className="mb-4 sm:text-sm
              lg:text-sm lg:mb-2"
              >
                <p className="font-medium">{data.gender}</p>
              </div>
              <h5 className="lg:text-base sm:text-sm text-lg sm:mt-4 font-bold uppercase text-dark/75">
                Status
              </h5>
              <div className="sm:text-sm lg:text-sm sm:mb-12">
                <p className="font-medium">{data.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUser;
