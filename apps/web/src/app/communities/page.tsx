"use client";

import React, { FC, use } from "react";
import { api } from "@/lib/api";
import SearchCommunity from "@/components/SearchCommunity";
import { Community } from "@/types";

interface CommunitiesPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

const CommunitiesPage: FC<CommunitiesPageProps> = ({ searchParams }) => {
  const { search } = use(searchParams);
  const communities = api.communities
    .searchCommunities(search || "0")
    .then((d) => {
      console.log(d.data);
    });

  return (
    <div className={"container-x container-y h-page"}>
      <SearchCommunity defaultValue={search} />
      <div className="flex flex-col gap-4">
        {/*{communities.map((community) => (*/}
        {/*  <div key={community.id} className="p-4 border rounded-md">*/}
        {/*    <h2 className="text-lg font-bold">{community.name}</h2>*/}
        {/*    <p>{community.description}</p>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    </div>
  );
};

export default CommunitiesPage;
