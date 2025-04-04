import React from "react";
import { Post as IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostCardProps {
  post: IPost;
}

const PostCard = ({ post: { author, ...post } }: PostCardProps) => {
  return (
    <div className={"flex flex-col justify-center"}>
      <Link href={`/users/${author.username}`} className={"flex space-x-4 p-4"}>
        <Image
          src={author.image}
          alt={author.name}
          className={"rounded-full"}
          width={36}
          height={36}
        />
        <div className={"flex flex-col justify-center"}>
          <span className={"text-gray-500 text-sm"}>{author.name}</span>
          <span className={"text-gray-400 text-xs"}>@{author.username}</span>
        </div>
      </Link>

      <div className={"flex flex-col justify-center mt-2"}>
        <Image width={500} height={500} src={post.media[0]} alt={post.title} />
      </div>
      <div className={"flex flex-col justify-center p-4"}>
        <p className={"text-gray-600"}>{post.content}</p>
        <Link
          href={`/posts/${post.id}`}
          className={"text-sm font-semibold hover:underline"}
        >
          Read more
        </Link>
      </div>
      <div className={"actions px-4"}>
        <div className={"grid grid-cols-3 gap-1"}>
          <Button variant={"ghost"} size={"icon"} className={"w-full"}>
            <Heart />
            {post.likes}
          </Button>
          <Button variant={"ghost"} size={"icon"} className={"w-full"}>
            <MessageCircle />
          </Button>
          <Button variant={"ghost"} size={"icon"} className={"w-full"}>
            <Share2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
