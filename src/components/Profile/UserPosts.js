import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import BlogItem from "../Blogs/BlogItem";
import { GetUsersPost } from "@/libs/usersAPI";

const UserPosts = ({ idUser }) => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await GetUsersPost({ id: idUser });
      setPostsData(fetchedPosts);
    };
    fetchData();
  }, [idUser]);

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
