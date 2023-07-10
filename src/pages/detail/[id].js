import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import exampleImage from "/public/images/articles/example.jpg";
import Link from "next/link";
import DetailComment from "@/components/Details/DetailComment";

const index = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <div>id:{router.query.id}</div>
        <div>{data.title}</div>
        <div>{data.body}</div>
      </Layout>
    </>
  );
};

export default index;

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`);
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
