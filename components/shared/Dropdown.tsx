"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

import { Check, Plus, X } from "lucide-react";

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        if (categoryList) setCategories(categoryList as ICategory[]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;

    try {
      const category = await createCategory({ categoryName: trimmed });
      setCategories((prev) => [...prev, category]);
      toast.success(`Category "${trimmed}" added`);
      setNewCategory("");
      setIsDialogOpen(false);
      onChangeHandler?.(category._id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  return (
    <>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="flex h-[50px] w-full rounded-xl border border-border bg-background px-4 text-sm hover:border-primary/50 focus:ring-2 focus:ring-primary bg-white">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="flex items-center gap-2 text-sm"
            >
              {category.name}
            </SelectItem>
          ))}

          {/* Add new category */}
          <div
            className="text-primary w-full py-3 pl-6 flex items-center gap-2 hover:bg-primary/10 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add new category
          </div>
        </SelectContent>
      </Select>

      {/* Alert Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-white border-border rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Add Category</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  autoFocus
                  className="pl-9 mt-3"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4" />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!newCategory.trim()}
              onClick={() => startTransition(() => handleAddCategory())}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Dropdown;
