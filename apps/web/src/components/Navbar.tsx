import React from "react";
import { getSession } from "@/actions/session";
import Image from "next/image";
import CreatePost from "@/components/CreatePost";

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
            alt={user.name}
            width={32}
            height={32}
            className={"rounded-full"}
          />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
