import { createClient } from "@art-space/openapi/client";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PostPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const client = createClient();

  client.posts.getPostBySlug();

  return <div></div>;
};

export default PostPage;
