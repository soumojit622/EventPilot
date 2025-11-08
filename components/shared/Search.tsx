"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={18}
          height={18}
          className="opacity-60"
        />
      </div>

      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full rounded-xl pl-12 pr-4 py-3
          bg-muted/40 
          border border-border/50
          text-foreground placeholder:text-muted-foreground
          focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0
          transition-all duration-150
        "
      />
    </div>
  );
};

export default Search;
