import React, { useEffect, useState } from "react";
import { GetPosts } from "@/libs/userAPI";

const index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await GetPosts();
      setPosts(fetchedPosts);
    };
    fetchData();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default index;
