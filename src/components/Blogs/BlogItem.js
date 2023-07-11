import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import image1 from "/public/images/articles/example.jpg";
import { useRouter } from "next/router";

const FramerImage = motion(Image);

const BlogItem = ({ data, inProfile = false }) => {
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json()
        router.push(`/profile/${data.user_id}`);
      } else {
        // Handle error or show appropriate message
      }
    } catch (error) {
      // Handle error or show appropriate message
    }
  };
  return (
    <li className="relative col-span-1 w-full h-full p-4 bg-light dark:bg-dark border border-solid border-dark dark:border-light rounded-2xl">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
      <Link
        href="/"
        target="_blank"
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={image1}
          alt={data.title}
          className="w-full h-auto"
          whileHover={{
            scale: 1.05,
          }}
          transition={{ duration: 0.2 }}
        />
      </Link>
      <Link href={`/detail/${data.id}`}>
        <h2 className="capitalize text-2xl font-bold my-2 hover:underline dark:text-light">
          {data.title}
        </h2>
      </Link>
      <p className="text-sm mb-2 dark:text-light">{data.body}</p>
      <span className="text-primary dark:text-primaryDark font-semibold">
        {data.user_id}
      </span>
      {inProfile ? (
        <div className="w-full flex flex-row space-x-2">
          <Link
            href={`/profile/form/update/${data.id}`}
            className="py-2 px-4 bg-dark rounded-lg text-light font-base text-sm"
          >
            update Post
          </Link>
          <button
            onClick={() => handleDelete(data.id)}
            className="text-slate-100 py-1 px-3 rounded-md text-slate-70 text-xs bg-red-600
                      flex flex-row justify-center items-center gap-1"
          >
            Delete
          </button>
        </div>
      ) : (
        <div>no in profile</div>
      )}
    </li>
  );
};

export default BlogItem;
