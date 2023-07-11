import React, { useState, useEffect } from "react";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import BlogItem from "@/components/Blogs/BlogItem";

export default function Home({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [pageNumberLimit, setPageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          className={`p-1 border border-dark ${
            currentPage == number ? "text-pink-800" : "text-dark"
          } cursor-pointer`}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > setMaxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
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
            {currentItems.map((item) => (
              <BlogItem key={item.id} data={item} />
            ))}
          </ul>
          <div className="w-full flex items-center justify-center mt-12">
            <ul className="flex flex-row">
              <li onClick={handlePrevbtn} className="cursor-pointer">
                prev
              </li>
              {renderPageNumbers}
              <li onClick={handleNextbtn} className="cursor-pointer">
                next
              </li>
            </ul>
          </div>
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
