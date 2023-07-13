import AboutUser from "@/components/Profile/AboutUser";
import UserPosts from "@/components/Profile/UserPosts";
import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

const profile = ({ data }) => {
  return (
    <>
      <Layout>
        <Link
          href="/"
          className="py-2 px-4 bg-dark dark:bg-light text-light dark:text-dark rounded-sm"
        >
          Go Home
        </Link>
        <AboutUser data={data} />

        <div className="flex flex-col space-y-6 justify-center items-center my-12 border bg-dark/10 rounded-sm shadow py-16">
          <div className="w-5/6">
            <h1 className="text-start mt-4 mb-4 text-3xl font-semibold text-dark">
              User Blog Post
            </h1>
            <div className="my-6">
              <Link
                href={`/profile/form/createPost/${data.id}`}
                className="py-2 px-4 bg-dark dark:bg-light dark:text-dark rounded-lg text-light font-base text-sm"
              >
                Make Post
              </Link>
            </div>
            <UserPosts idUser={data.id} />
          </div>
        </div>
        <div></div>
      </Layout>
    </>
  );
};

export default profile;

export const getStaticPaths = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
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

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`, {
    method: "GET",
    headers: headers,
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
