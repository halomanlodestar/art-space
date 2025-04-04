"use client";

import React, { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

interface SearchCommunityProps {
  defaultValue?: string;
}

const SearchCommunity: FC<SearchCommunityProps> = ({ defaultValue }) => {
  const router = useRouter();

  const [searchText, setSearchText] = useState(defaultValue);
  const [debouncedSearchText] = useDebounce(searchText, 1000);

  React.useEffect(() => {
    if (debouncedSearchText) {
      router.push(`/communities?search=${debouncedSearchText}`);
    }
  }, [debouncedSearchText, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Input
      placeholder={"Search for community"}
      value={searchText}
      onChange={handleSearch}
    />
  );
};

export default SearchCommunity;
