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
      <AnimatedText text="Create Your Own Blog!" className="text-6xl" />
      <Layout>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
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
          <div>
            <label>User ID</label>
            <input
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
          <div>
            <label>body</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              autoComplete="body"
              required
              className="w-full my-3 py-2 px-3 border border-slate-900 placeholder-black/30
                    text-slate-900 rounded sm focus:outline-none focus:ring-light-purple focus:border-light-purple text-md
                    shadow-md"
              placeholder="insert content"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 text-sm text-dark rounded-md bg-light-purple
                    flex flex-row justify-center items-center gap-2 uppercase font-semibold"
          >
            Tambah
          </button>
        </form>
      </Layout>
    </>
  );
};

export default CreateBlog;
