import React, { useState, useEffect } from "react";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import BlogItem from "@/components/Blogs/BlogItem";
import image1 from "/public/images/articles/example.jpg";
import Image from "next/image";
import { GetPosts } from "@/libs/postsAPI";
import { GetUsersById } from "@/libs/usersAPI";
import Link from "next/link";

import { PrevIcon, NextIcon } from "../components/Icons";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // fetch API
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await GetPosts();
      setPosts(fetchedPosts);
    };
    fetchData();
  }, []);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(posts.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          className={`p-1 mx-2 text-base ${
            currentPage == number
              ? "text-primary font-bold border rounded-full border-dark/40"
              : "text-dark"
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
    console.log(currentPage + 1); // 2 when page 3
    setCurrentPage(currentPage + 1);
    console.log(maxPageNumberLimit);
    if (currentPage + 1 > maxPageNumberLimit) {
      console.log("next");
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

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
  }

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 2);
  };
  return (
    <>
      <Head>
        <title>Synapsis Blog App</title>
        <meta name="description" content="Blogs App" />
      </Head>
      <main className="w-full flex flex-col items-center justify-center overflow-hidden text-dark dark:text-light">
        <Layout className="pt-16 ">
          <AnimatedText
            text="Welcome !"
            className="mb-16 text-8xl text-left 
            sm:mb-10 sm:text-5xl
            lg:mb-8 lg:text-7xl"
            alt="image"
          />

          <Link
            href={`/detail/${posts.length >= 1 && posts[0].id}`}
            className="relative flex flex-row w-full h-auto mb-12 p-4 bg-light dark:bg-dark border border-solid border-dark dark:border-light rounded-2xl
            
            lg:flex-col"
          >
            <div className="absolute top-0 -right-4 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />

            <div
              className="w-3/5
            sm:w-full
            lg:w-full"
            >
              <Image
                src={image1}
                className="w-full h-auto rounded-lg shadow-xl"
                alt="image"
              />
            </div>
            <div
              className="w-2/5 bg-light dark:bg-dark py-20 px-12 flex flex-col space-y-4 justify-center
            sm:w-full sm:py-4 sm:px-1 sm:space-y-1
            lg:w-full lg:py-10 lg:px-4 lg:space-y-3"
            >
              {/* <p
                className="text-primary dark:text-primaryDark px-4 text-sm
              sm:px-1 sm:text-xs
              lg:px-2"
              >
                {
                // GetUsersById(posts.length >= 1 && posts[0].user_id)
                posts.length >= 1 && posts[0].user_id
                }
              </p> */}
              <h3
                className="text-7xl inline-block font-bold capitalize
              text-dark dark:text-light hover:underline hover:underline-offset-3
              sm:text-2xl
              lg:text-5xl"
              >
                {posts.length >= 1 && posts[0].title}
              </h3>
              <p
                className="text-xl font-base text-dark/60 inline-block dark:text-light/70 px-4 truncate
              sm:px-1 sm:text-sm
              lg:px-2"
              >
                {posts.length >= 1 && posts[0].body}
              </p>
            </div>
          </Link>

          <AnimatedText
            text="Our Blog!"
            className="mb-4 mt-12 text-6xl text-center
            sm:text-3xl
            lg:text-4xl"
          />

          <div className="w-2/6 sm:w-full lg:w-2/6 mb-4">
            <label className="text-sm mb-2 font-semibold ml-2 sm:ml-0 lg:ml-1">
              Search Title
            </label>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-light border border-dark overflow-hidden px-4">
              <input
                className="peer h-full w-full outline-none text-sm text-dark bg-light "
                type="text"
                id="search"
                placeholder="Search title.."
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
          </div>
          <ul
            className="grid grid-cols-2 gap-16
          sm:grid-cols-1 sm:gap-10
          lg:grid-cols-2 lg:gap-10"
          >
            {currentItems
              .filter((post) => post.title.toLowerCase().includes(query))
              .map((item) => (
                <BlogItem key={item.id} data={item} />
              ))}
          </ul>
          <div className="w-full flex flex-col space-y-5 items-center justify-center mt-20 ">
            <button
              onClick={handleLoadMore}
              className="py-2 px-6 text-base rounded-md bg-white dark:bg-light/80 font-semibold text-dark shadow-md"
            >
              Load More
            </button>
            <ul className="flex flex-row bg-white shadow-lg rounded-md px-6 dark:bg-light/80 justify-center items-center mt-12">
              <li>
                <button
                  className="cursor-pointer"
                  onClick={handlePrevbtn}
                  disabled={currentPage == pages[0] ? true : false}
                >
                  <PrevIcon className={"w-[40px]  "} />
                </button>
              </li>
              {pageDecrementBtn}
              {renderPageNumbers}
              {pageIncrementBtn}
              <li className="cursor-pointer">
                <button
                  className="cursor-pointer"
                  onClick={handleNextbtn}
                  disabled={
                    currentPage == pages[pages.length - 1] ? true : false
                  }
                >
                  <NextIcon className={"w-[40px] text-dark "} />
                </button>
              </li>
            </ul>
          </div>
        </Layout>
      </main>
    </>
  );
}
