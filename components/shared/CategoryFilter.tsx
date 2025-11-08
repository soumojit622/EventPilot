"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadCategories = async () => {
      const list = await getAllCategories();
      list && setCategories(list as ICategory[]);
    };

    loadCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value) => onSelectCategory(value)}>
      <SelectTrigger
        className="
          w-full sm:w-48
          rounded-xl
          border border-border/60
          bg-muted/40
          px-4 py-2
          shadow-sm
          text-sm font-medium
          transition-all
          hover:border-primary/50 hover:shadow-md
          focus:ring-2 focus:ring-primary/40 focus:ring-offset-0
        "
      >
        <SelectValue placeholder="Category" />
      </SelectTrigger>

      <SelectContent className="rounded-xl border border-border/60 shadow-lg bg-popover">
        <SelectItem
          value="All"
          className="
            cursor-pointer text-sm px-3 py-2 rounded-md 
            hover:bg-primary/10 focus:bg-primary/10
          "
        >
          All
        </SelectItem>

        {categories.map((category) => (
          <SelectItem
            key={category._id}
            value={category.name}
            className="
              cursor-pointer text-sm px-3 py-2 rounded-md
              hover:bg-primary/10 focus:bg-primary/10
            "
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
