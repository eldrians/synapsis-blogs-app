import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  DribbbleIcon,
  GithubIcon,
  LinkedInIcon,
  MoonIcon,
  PinterestIcon,
  SunIcon,
  TwitterIcon,
} from "./Icons";
import useThemeSwitcher from "./hooks/useThemeSwitcher";

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  // console.log(router);
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block bg-dark
            absolute left-0 -bottom-0.5 group-hover:w-full
            transition-[width] ease duration-300
            ${router.asPath === href ? "w-full" : "w-0"}
            dark:bg-light
            `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();
  // console.log(router);
  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <buttom
      href={href}
      className={`${className} relative group text-light dark:text-dark`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block bg-dark
            absolute left-0 -bottom-0.5 group-hover:w-full
            transition-[width] ease duration-300
            ${router.asPath === href ? "w-full" : "w-0"}
            dark:bg-light
            `}
      >
        {/* &nbsp; */}
      </span>
    </buttom>
  );
};

// const CustomLinkLogo =({href, title, className=""}) => {
//     return(
//         <motion.a href={href} target={"_blank"}
//         whileHover={{
//             y:-2
//         }}
//         className='w-6 mr-3'>
//             {title}
//         </motion.a>
//     )
// }

const NavBar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header
      className="w-full px-32 py-8 font-medium flex items-center justify-between
    dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8"
    >
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>
      <div className="w-full flex justify-between items-center lg:hidden">
        <nav className="space-x-8">
          <CustomLink href="/" title="Home" />
          {/* <CustomLink href="/about" title="About" /> */}
          <CustomLink href="/projects" title="Projects" />
          {/* <CustomLink href="/articles" title="Articles" /> */}
        </nav>
        <nav
          className="flex items-center justify-center flex-wrap
      space-x-6"
        >
          {/* <motion.a
            href="/"
            target={"_blank"}
            whileHover={{
              y: -2,
            }}
            className="w-6"
          >
            <TwitterIcon />
          </motion.a> */}
          <motion.a
            href="https://github.com/eldrians"
            target={"_blank"}
            whileHover={{
              y: -2,
            }}
            className="w-6"
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/axeleldrian/"
            target={"_blank"}
            whileHover={{
              y: -2,
            }}
            className="w-6"
          >
            <LinkedInIcon />
          </motion.a>
          {/* <motion.a
            href="/"
            target={"_blank"}
            whileHover={{
              y: -2,
            }}
            className="w-6"
          >
            <PinterestIcon />
          </motion.a>
          <motion.a
            href="/"
            target={"_blank"}
            whileHover={{
              y: -2,
            }}
            className="w-6"
          >
            <DribbbleIcon />
          </motion.a> */}
        </nav>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
        >
          <nav className="space-y-4 flex items-center flex-col justify-center">
            <CustomMobileLink href="/" title="Home" toggle={handleClick} />
            {/* <CustomMobileLink
              href="/about"
              title="About"
              toggle={handleClick}
            /> */}
            <CustomMobileLink
              href="/projects"
              title="Projects"
              toggle={handleClick}
            />
            {/* <CustomLink href="/articles" title="Articles" /> */}
          </nav>
          <nav
            className="flex items-center justify-center flex-wrap mt-12
      space-x-6 sm:space-x-2"
          >
            {/* <motion.a
              href="/"
              target={"_blank"}
              whileHover={{
                y: -2,
              }}
              className="w-6"
            >
              <TwitterIcon />
            </motion.a> */}
            <motion.a
              href="https://github.com/eldrians"
              target={"_blank"}
              whileHover={{
                y: -2,
              }}
              className="w-6 bg-light rounded-full dark:bg-dark"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/axeleldrian/"
              target={"_blank"}
              whileHover={{
                y: -2,
              }}
              className="w-6"
            >
              <LinkedInIcon />
            </motion.a>
            {/* <motion.a
              href="/"
              target={"_blank"}
              whileHover={{
                y: -2,
              }}
              className="w-6 bg-light rounded-full"
            >
              <PinterestIcon />
            </motion.a>
            <motion.a
              href="/"
              target={"_blank"}
              whileHover={{
                y: -2,
              }}
              className="w-6"
            >
              <DribbbleIcon />
            </motion.a> */}
          </nav>
        </motion.div>
      ) : null}

      <div className="absolute translate-x-[-50%] left-[50%] py-32">
        <button
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
          className={`ml-3 flex items-center justify-center rounded-full p-1
          ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}
          `}
        >
          {mode === "dark" ? (
            <div className="w-6">
              <SunIcon className={"fill-dark"} />
            </div>
          ) : (
            <div className="w-6">
              <MoonIcon className={"fill-dark"} />
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default NavBar;
