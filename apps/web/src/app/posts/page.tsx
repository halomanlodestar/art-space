import React from "react";
import { createClient } from "@art-space/openapi/client";

const Posts = async () => {
  const client = createClient();

  const posts = await client.posts.getAllPosts();

  console.log(posts.data);

  return <div></div>;
};

export default Posts;
