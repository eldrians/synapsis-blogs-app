import React, { useState } from "react";
import { useRouter } from "next/router";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";

const CreateBlog = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    user_id: "",
    body: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    console.log("hai ini handleSubmit");
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(postData),
      });
      console.log(res);
      router.push(`/profile/${postData.user_id}`);
    } catch (error) {
      console.error(error);
      console.log("gagal");
    }
  };

  return (
    <>
      <AnimatedText
        text="Create Your Own Blog!"
        className="text-center text-6xl mt-16
      sm:text-2xl sm:mt-8
      lg:text-5xl lg:mt-12"
      />
      <Layout>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div
            className="w-5/6 flex flex-col space-y-4
          sm:space-y-2
          lg:w-5/6"
          >
            <div>
              <div className="mb-2">
                <label className="text-xl font-semibold ml-1">Title</label>
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
                <label className="text-xl font-semibold ml-1">User</label>
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
                <label className="text-xl font-semibold ml-1">Body</label>
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
                      text-dark/30 rounded-md bg-light focus:outline-none focus:ring-light-purple focus:border-light-purple text-md
                      shadow-md"
                  placeholder="insert content"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-fit mt-4 py-2 px-4 bg-dark rounded-lg text-light font-base text-sm"
          >
            Tambah
          </button>
        </form>
      </Layout>
    </>
  );
};

export default CreateBlog;
