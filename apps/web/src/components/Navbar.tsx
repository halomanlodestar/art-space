import React from "react";
import { getSession } from "@/actions/session";
import CreatePost from "@/components/CreatePost";
import Image from "next/image";

const Navbar = async () => {
  const { user } = await getSession();

  return (
    <header
      className={
        "flex justify-between items-center container-x h-16 bg-gray-800 text-white"
      }
    >
      <nav>Logo</nav>
      {user && (
        <nav className={"flex items-center gap-4"}>
          <CreatePost />
          <Image
            src={user.image}
            alt={user.username}
            width={36}
            height={36}
            className={"rounded-full"}
          />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
