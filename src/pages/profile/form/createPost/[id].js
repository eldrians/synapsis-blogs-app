import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Link from "next/link";
import { PrevIcon } from "@/components/Icons";
import { GetUsers } from "@/libs/usersAPI";

const CreateBlog = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await GetUsers();
      setUsers(fetchedPosts);
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    user_id: id == 1 ? "" : id,
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

      console.log(postData);

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
      id == 1 ? router.push(`/`) : router.push(`/profile/${id}`);
    } catch (error) {
      console.error(error);
      console.log("gagal");
    }
  };

  return (
    <>
      <AnimatedText
        text={`${id == 1 ? "" : "hai,"} ${id}  Create Your Own Blog!"`}
        className="text-center text-6xl mt-16
      sm:text-2xl sm:mt-8
      lg:text-5xl lg:mt-12"
      />
      <Layout>
        <div className="w-full flex justify-center mb-4">
          <div className="w-5/6">
            <button
              onClick={() => {
                router.back();
              }}
              className="flex flex-row items-center text-base text-dark/80 dark:text-light/80 lg:text-sm"
            >
              <PrevIcon className={`w-[25px]`} />
              Back
            </button>
          </div>
        </div>
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
              <div className={`mb-2`}>
                <label
                  htmlFor="users"
                  className="text-xl text-dark dark:text-light font-semibold ml-1"
                >
                  User
                </label>
              </div>
              <div className={`w-full rounded-md`}>
                <select
                  id="user_id"
                  onChange={handleChange}
                  value={formData.user_id}
                  name="user_id"
                  autoComplete="user_id"
                  required
                  className="bg-light border border-dark text-dark text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-light dark:dark dark:placeholder-dark dark:text-dark"
                >
                  <option value={3614604}>Choose a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
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
            className="w-fit mt-4 py-2 px-4 bg-dark dark:bg-light rounded-lg text-light dark:text-dark font-base text-sm"
          >
            Tambah
          </button>
        </form>
      </Layout>
    </>
  );
};

export default CreateBlog;
