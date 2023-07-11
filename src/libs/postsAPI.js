export const GetPosts = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("failed to fetch posts");
  }

  return await res.json();
};

export const GetPostsById = async ({ id }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("failed to fetch posts by id");
  }

  return await res.json();
};

export const GetCommentPost = async ({ id }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}/comments`,
    {
      method: "GET",
      headers: headers,
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch comment posts");
  }

  return await res.json();
};
