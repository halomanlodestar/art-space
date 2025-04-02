import React from "react";
import { mockPosts } from "@/mock/posts";
import Post from "@/components/Post";

const Posts = async () => {
  return (
    <div className={"h-page flex flex-col justify-center space-y-2"}>
      {mockPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
