import { createClient } from "@art-space/openapi/client";
import React from "react";
import { notFound } from "next/navigation";
import { AxiosError } from "axios";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PostPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const client = createClient();

  let post;

  try {
    post = await client.posts.getPostBySlug(slug);
    console.log(post.data);
  } catch (e) {
    if (e) {
      const axiosError = e as AxiosError;
      if (axiosError.status === 404) notFound();
    }
  }

  return <div></div>;
};

export default PostPage;
