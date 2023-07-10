import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import exampleImage from "/public/images/articles/example.jpg";
import exampleProfilePicture from "/public/images/profile/exampleProfilePicture.png";
import Link from "next/link";
import DetailComment from "@/components/Details/DetailComment";

const index = ({ data, dataComment, dataUser }) => {
  const router = useRouter();
  // const dataUser = {
  //   id: 123,
  //   name: "Axel Eldrian Hadiwibowo",
  //   email: "axel@gmail.com",
  //   gender: "male",
  //   status: "active",
  // };
  return (
    <>
      <Layout>
        <div className="w-full ">
          <h1
            className="mb-4
          text-6xl text-dark font-bold capitalize dark:text-light"
          >
            {data.title}
          </h1>

          <div className="flex flex-row w-full space-x-4 py-12">
            <div className="">
              <Image
                src={exampleProfilePicture}
                alt="photo profile users"
                className="rounded-full w-[75px] "
              />
            </div>
            <div className="flex justify-center items-center">
              <Link
                href={`/profile/${dataUser.id}`}
                className="hover:underline-offset-2 hover:underline"
              >
                <p className="font-base text-md text-dark dark:text-light">
                  {dataUser.name}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src={exampleImage}
            alt={data.title}
            className="w-5/6 rounded-xl shadow-lg shadow-dark dark:shadow-light dark:shadow-sm mb-12"
          />
          <div className="w-3/4 text-base text-dark dark:text-light">
            {data.body}
          </div>
        </div>
        {dataComment.map((comment, index) => (
          <div key={comment.id}>
            <p className="text-dark">{comment.name}</p>
            <p className="text-dark">{comment.email}</p>
            <p className="text-dark">{comment.body}</p>
          </div>
        ))}
      </Layout>
    </>
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
