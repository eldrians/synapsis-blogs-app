import React, { useState, useEffect } from "react";

const TestAPI = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setUsersData(data);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl mb-3">Data Comments</h1>
      <div className="text-xs">
        {usersData.map((item, index) => (
          <div key={item.id}>
            <div>
              {item.id} | {item.post_id} | {item.name} | {item.email} |{" "}
              {item.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestAPI;
