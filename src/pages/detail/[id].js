import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import exampleImage from "/public/images/articles/example.jpg";
import exampleProfilePicture from "/public/images/profile/exampleProfilePicture.png";
import Link from "next/link";
import DetailComment from "@/components/Details/DetailComment";
import AnimatedText from "@/components/AnimatedText";
import { PrevIcon } from "@/components/Icons";
import { GetCommentPost, GetPosts, GetPostsById } from "@/libs/postsAPI";

const index = ({ data, dataComment, dataUser }) => {
  console.log(dataComment);
  return (
    <div className="w-full flex justify-center items-center">
      <Layout
        className="w-4/6
      sm:w-full
      lg:w-5/6"
      >
        <Link
          href="/"
          className="flex flex-row items-center text-base text-dark/80 dark:text-light/80 pb-6 lg:text-sm"
        >
          <PrevIcon className={`w-[25px]`} />
          Back
        </Link>
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src={exampleImage}
            alt={data.title}
            className="w-full shadow-md shadow-dark dark:shadow-light dark:shadow-sm mb-12
            sm:mb-6
            lg:mb-10"
          />
          <div
            className="pb-8 flex flex-row w-full space-x-4
          lg:pb-4
          sm:space-x-2"
          >
            <div className="">
              <Image
                src={exampleProfilePicture}
                alt="photo profile users"
                className="rounded-full w-[50px] 
                lg:w-[30px]
                sm:w-[20px]"
              />
            </div>
            <div className="flex justify-center items-center">
              <Link
                href={`/profile/${dataUser.id}`}
                className="hover:underline-offset-2 hover:underline"
              >
                <p
                  className="font-base text-md text-primary dark:text-primaryDark
                lg:text-sm
                sm:text-xs"
                >
                  {dataUser.name}
                </p>
              </Link>
            </div>
          </div>
          <AnimatedText
            text={data.title}
            className="mb-8 text-4xl text-left 
            sm:mb-4 sm:text-2xl
            lg:mb-6 lg:text-3xl"
          />

          <div
            className="w-full text-base text-dark/80 text-justify dark:text-light/80
            sm:text-xs"
          >
            {data.body}
          </div>
        </div>
        <div
          className="flex flex-col space-y-6 justify-center items-center my-12 border bg-light dark:bg-dark rounded-sm shadow py-12
        lg:py-6"
        >
          <div className="w-5/6">
            <h1
              className="text-start mt-4 text-2xl font-semibold text-dark dark:text-light
            lg:text-xl
            sm:text-lg sm:mt-2"
            >
              Comments
            </h1>
          </div>
          {dataComment.map((comment) => (
            <DetailComment key={comment.id} data={comment} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default index;

async function fetchPaths() {
  const fetchedPosts = await GetPosts();
  const paths = fetchedPosts.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });
  return paths;
}

export const getStaticPaths = async () => {
  const paths = await fetchPaths();
  return {
    paths,
    fallback: false,
  };
};

// get detail blog
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await GetPostsById({ id });
  const dataComment = await GetCommentPost({ id });

  console.log(data);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const resUser = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${data.user_id}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const dataUser = await resUser.json();

  return {
    props: {
      data,
      dataComment,
      dataUser,
    },
  };
};
