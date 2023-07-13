import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PrevIcon } from "@/components/Icons";
import Link from "next/link";

const UpdateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    user_id: "",
    body: "",
  });
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFormData(data);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (event) => {
    console.log("hai ini handleUpdate");
    event.preventDefault();
    try {
      const postData = {
        title: formData.title,
        user_id: formData.user_id,
        body: formData.body,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(postData),
        }
      );
      console.log(res);
      router.back();
    } catch (error) {
      console.error(error);
      console.log("gagal");
    }
  };

  return (
    <>
      <AnimatedText
        text="Update Your Blog!"
        className="text-center text-6xl mt-16
      sm:text-2xl sm:mt-8
      lg:text-5xl lg:mt-12"
      />
      <Layout>
        <div className="w-full flex justify-center mb-4">
          <div className="w-5/6">
            <Link
              href={`/profile/${formData.user_id}`}
              className="flex flex-row items-center text-base text-dark/80 dark:text-light/80 lg:text-sm"
            >
              <PrevIcon className={`w-[25px]`} />
              Back
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleUpdate}
          className="w-full flex flex-col items-center"
        >
          <div
            className="w-5/6 flex flex-col space-y-4
          sm:space-y-2"
          >
            <div>
              <div className="mb-2">
                <label className="text-xl text-dark dark:text-light font-semibold ml-1">
                  Title
                </label>
              </div>
              <div className="w-full rounded-md bg-light border border-dark py-2 px-4">
                <input
                  className="h-full w-full outline-none text-md text-dark bg-light"
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  autoComplete="title"
                  required
                  placeholder="insert your blogs title..."
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <label className="text-xl text-dark dark:text-light font-semibold ml-1">
                  User
                </label>
              </div>
              <div className="w-full rounded-md bg-light border border-dark py-2 px-4">
                <input
                  className="h-full w-full outline-none text-md text-dark bg-light"
                  type="number"
                  id="user_id"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  autoComplete="user_id"
                  required
                  placeholder="insert your blogs User Id..."
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <label className="text-xl text-dark dark:text-light font-semibold ml-1">
                  Body
                </label>
              </div>
              <div className="w-full rounded-md bg-light">
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  autoComplete="body"
                  required
                  className="w-full py-2 px-3 border border-dark placeholder-dark
                      text-dark rounded-md bg-light focus:outline-none focus:ring-light-purple focus:border-light-purple text-md
                      shadow-md"
                  placeholder="insert content"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-fit mt-4 py-2 px-4 bg-dark rounded-lg text-light dark:text-dark dark:bg-light font-base text-sm"
          >
            Update
          </button>
        </form>
      </Layout>
    </>
  );
};

export default UpdateBlog;
