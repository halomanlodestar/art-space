import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { getSession } from "@/actions/session";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CreatePost = async () => {
  const { user } = await getSession();

  if (!user) {
    return (
      <Dialog>
        <DialogTrigger>
          <PlusCircle size={32} className={"cursor-pointer"} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You need to login</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (!user.communityId) {
    return (
      <Dialog>
        <DialogTrigger>
          {user.role === "USER" && (
            <PlusCircle size={32} className={"cursor-pointer"} />
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You need to join a community</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        {user.role === "USER" && (
          <PlusCircle size={32} className={"cursor-pointer"} />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <div className={"flex flex-col gap-5"}>
          <div className={"flex gap-2"}>
            <Image
              src={user.image}
              alt={user.name}
              width={48}
              height={48}
              className={"rounded-full"}
            />
            <div className={"flex flex-col"}>
              <p className={"text-sm font-semibold"}>{user.name}</p>
              <p className={"text-sm text-gray-500"}>@{user.username}</p>
            </div>
          </div>
          <textarea
            className="border p-2 rounded"
            placeholder="What's on your mind?"
          ></textarea>
        </div>
        <Button type="submit">Post</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
