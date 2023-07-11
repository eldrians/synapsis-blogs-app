import React from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import exampleImage from "/public/images/articles/example.jpg";
import exampleProfilePicture from "/public/images/profile/exampleProfilePicture.png";
import Link from "next/link";
import DetailComment from "@/components/Details/DetailComment";
import AnimatedText from "@/components/AnimatedText";

const index = ({ data, dataComment, dataUser }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <Layout
        className="w-4/6
      sm:w-full
      lg:w-5/6"
      >
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
            {data.body} Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Quis, eaque libero! Natus a enim cumque sequi voluptas
            adipisci ab voluptatibus ad voluptate consequuntur atque velit
            labore nam saepe ducimus qui, asperiores esse porro ut magnam
            voluptatem amet quis tempore? Rem excepturi ea odit natus ab officia
            ex facere tempore? Corporis.
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi
              culpa sunt in facilis atque, laboriosam impedit beatae voluptatem
              voluptate veniam ea ab! Est, corrupti expedita. Quam ut ullam,
              dolor doloribus minus quia nobis nostrum officia modi nisi harum
              veritatis ratione quo commodi debitis error illum rerum, voluptas
              id placeat dolore.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi
              culpa sunt in facilis atque, laboriosam impedit beatae voluptatem
              voluptate veniam ea ab! Est, corrupti expedita. Quam ut ullam,
              dolor doloribus minus quia nobis nostrum officia modi nisi harum
              veritatis ratione quo commodi debitis error illum rerum, voluptas
              id placeat dolore.
            </p>
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
          {dataComment == [] ? (
            dataComment.map((comment) => (
              <DetailComment key={comment.id} data={comment} />
            ))
          ) : (
            <div className="w-5/6">
              <p
                className="text-start text-dark/60  dark:text-light/60
              sm:text-xs"
              >
                no comment here
              </p>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default index;

export const getStaticPaths = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
    method: "GET",
    headers: headers,
  });
  const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

// get detail blog
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
    method: "GET",
    headers: headers,
  });
  const data = await res.json();

  const resComment = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}/comments`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const dataComment = await resComment.json();

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
