import React from "react";

const DetailComment = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default DetailComment;

export const getStaticProps = async ({ name }) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${name}/comments`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (res.ok) {
      const data = await res.json();
      return {
        props: { data },
      };
    } else {
      console.error("Error:", res.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return {
    props: {
      data: [],
    },
  };
};
