import React, { useState, useEffect } from "react";

const TestAPI = () => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setPostsData(data);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl mb-3">Data Posts</h1>
      <div className="text-xs">
        {postsData.map((item, index) => (
          <div key={item.id}>
            <div>
              {item.id} | {item.user_id} | {item.title} | {item.body} |{" "}
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestAPI;
