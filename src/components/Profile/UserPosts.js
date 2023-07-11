import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import BlogItem from "../Blogs/BlogItem";

const UserPosts = ({ idUser }) => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${idUser}/posts`,
        {
          method: "GET",
          headers: headers,
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
    <div>
      <ul className="grid grid-cols-2 gap-8 ">
        {postsData.map((post) => (
          <BlogItem key={post.id} data={post} inProfile={true} />
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
