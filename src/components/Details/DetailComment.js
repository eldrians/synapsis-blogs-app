import Link from "next/link";
import React from "react";

const DetailComment = ({ data }) => {
  return (
    <div className="w-5/6 bg-light/80 p-8 cursor pointer text-dark dark:text-light dark:bg-dark dark:border shadow-xl">
      <h1 className="text-xs uppercase font-bold ">{data.name} <span className="font-thin text-[10px]">says...</span></h1>
      <h5 className="text-xs my-1 hover:underline hover:underline-offset-2">{data.email}</h5>
      <p className="text-sm text-justify mt-4 mb-2">{data.body} 
      </p>
      <Link
      href="/"
      className="text-xs text-red-500">
        | reply
      </Link>
    </div>
  );
};

export default DetailComment;
