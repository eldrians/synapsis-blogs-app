import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
    } catch (error) {
      console.error(error);
      console.log("gagal");
    }
  };

  return (
    <>
      <AnimatedText text="Update Your Own Blog!" className="text-6xl" />
      <Layout>
        <div>{id}</div>
        <form onSubmit={handleUpdate}>
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
            update
          </button>
        </form>
      </Layout>
    </>
  );
};

export default UpdateBlog;
