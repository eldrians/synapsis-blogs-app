import React, { useState, useEffect } from "react";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import BlogItem from "@/components/Blogs/BlogItem";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Synapsis Blog App</title>
        <meta name="description" content="Blogs App" />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden text-dark dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Find Blog!" className="mb-16" />
          <ul className="grid grid-cols-2 gap-16">
            {data.map((item) => (
              <BlogItem
                key={item.id}
                id={item.id}
                title={item.title}
                userId={item.user_id}
                body={item.body}
              />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
      method: "GET",
      headers: headers,
    });
    if (res.ok) {
      const data = await res.json();
      return {
        props: { data },
      };
    } else {
      console.error("Error:", res.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return {
    props: {
      data: [],
    },
  };
};
