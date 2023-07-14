export const GetUsers = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("failed to fetch users");
  }

  return await res.json();
};

export const GetUsersById = async (id2) => {
  // console.log(id2);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id2}`, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("failed to fetch users by id");
  }

  return await res.json();
};

export const GetUsersPost = async ({ id }) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/posts`,
    {
      method: "GET",
      headers: headers,
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch posts by id");
  }

  return await res.json();
};
