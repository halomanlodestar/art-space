import React from "react";
import { mockPosts } from "@/mock/posts";
import PostCard from "@/components/PostCard";

const Posts = async () => {
  return (
    <div className={"h-page flex flex-col justify-center space-y-2"}>
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
