"use client";

import React from "react";
import { api } from "@/lib/api";
import { mockPosts } from "@/mock/posts";
import Post from "@/components/Post";

const Posts = () => {
  const user = api.auth.getCurrentUser();

  return (
    <div>
      {mockPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
