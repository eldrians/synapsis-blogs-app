import React, { useState, useEffect } from "react";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import article1 from "../../public/images/articles/pagination component in reactjs.jpg";
import ItemBlog from "@/components/Blogs/BlogItem";
import TestAPI2 from "@/components/TestAPI";

export default function Home() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPostsData(data);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            {postsData.map((item) => (
              <ItemBlog
                key={item.id}
                userId={item.user_id}
                title={item.title}
                body={item.body}
                link="/"
                img={article1}
              />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  );
}
