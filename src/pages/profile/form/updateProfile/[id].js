import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PrevIcon } from "@/components/Icons";
import Link from "next/link";

const UpdateBlog = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    status: "",
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
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`,
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
        id: formData.id,
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        status: formData.status,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(postData),
        }
      );
      console.log(res);
      router.push(`/profile/${id}`);
    } catch (error) {
      console.error(error);
      console.log("gagal");
    }
  };

  return (
    <>
      <AnimatedText
        text="Update Your Profile!"
        className="text-center text-6xl mt-16
      sm:text-2xl sm:mt-8
      lg:text-5xl lg:mt-12"
      />
      <Layout>
        <div className="w-full flex justify-center mb-4">
          <div className="w-5/6">
            <Link
              href={`/profile/${id}`}
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
                  Name
                </label>
              </div>
              <div className="w-full rounded-md bg-light border border-dark py-2 px-4">
                <input
                  className="h-full w-full outline-none text-md text-dark bg-light"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  placeholder="update your name..."
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <label className="text-xl text-dark dark:text-light font-semibold ml-1">
                  Email
                </label>
              </div>
              <div className="w-full rounded-md bg-light border border-dark py-2 px-4">
                <input
                  className="h-full w-full outline-none text-md text-dark bg-light"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  placeholder="update your email..."
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <label className="text-xl text-dark dark:text-light font-semibold ml-1">
                  Gender
                </label>
              </div>
              <div className="w-full rounded-md bg-light border border-dark py-2 px-4">
                <input
                  className="h-full w-full outline-none text-md text-dark bg-light"
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  autoComplete="gender"
                  required
                  placeholder="update your gender..."
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <label className="text-xl text-dark dark:text-light font-semibold ml-1">
                  Status
                </label>
              </div>
              <div className="w-full rounded-md bg-light border border-dark py-2 px-4">
                <input
                  className="h-full w-full outline-none text-md text-dark bg-light"
                  type="text"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  autoComplete="status"
                  required
                  placeholder="update your status..."
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
