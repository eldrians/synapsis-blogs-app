import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

const profile = ({ data }) => {
  return (
    <>
      <Layout>
        <div>
          <p>{data.id}</p>
          <p>{data.name}</p>
          <p>{data.email}</p>
          <p>{data.gender}</p>
          <p>{data.status}</p>
          <Link href={`/profile/form/create/${data.id}`}
          className="py-2 px-4 bg-dark rounded-lg text-light font-base text-sm">
            Make Post
          </Link>
        </div>
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
