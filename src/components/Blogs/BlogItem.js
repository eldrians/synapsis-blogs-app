import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import image1 from "/public/images/articles/pagination component in reactjs.jpg";

const FramerImage = motion(Image);

const BlogItem = ({ title, userId, body }) => {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark" />
      <Link
        href="/"
        target="_blank"
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={image1}
          alt={title}
          className="w-full h-auto"
          whileHover={{
            scale: 1.05,
          }}
          transition={{ duration: 0.2 }}
        />
      </Link>
      <Link href="/" target="_blank">
        <h2 className="capitalize text-2xl font-bold my-2 hover:underline">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{body}</p>
      <span className="text-primary font-semibold">{userId}</span>
    </li>
  );
};

export default BlogItem;
