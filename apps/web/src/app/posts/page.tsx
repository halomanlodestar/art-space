import React from "react";
import { getSession } from "@/actions/session";
import { api } from "@/lib/api";

const Posts = async () => {
  const client = await api();
  const { data } = await client.posts.getAllPosts();

  console.log(data);

  return <div></div>;
};

export default Posts;
