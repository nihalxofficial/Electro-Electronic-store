import React from "react";
import AddProductClient from "./AddProductClient";
import { getCategories } from "@/lib/api/categories";
import { getSubCategories } from "@/lib/api/subCategories";
import { Category, SubCategory } from "@/types";

export const dynamic = "force-dynamic";

export default async function AddProductPage() {
  let categories: Category[] = [];
  let subcategories: SubCategory[] = [];

  try {
    const [categoriesRes, subCategoriesRes] = await Promise.allSettled([
      getCategories(),
      getSubCategories(),
    ]);

    if (categoriesRes.status === "fulfilled") {
      const res = categoriesRes.value;
      if (res?.success && Array.isArray(res.data)) {
        categories = res.data;
      } else if (Array.isArray(res)) {
        categories = res;
      }
    }

    if (subCategoriesRes.status === "fulfilled") {
      const res = subCategoriesRes.value;
      if (res?.success && Array.isArray(res.data)) {
        subcategories = res.data;
      } else if (Array.isArray(res)) {
        subcategories = res;
      }
    }
  } catch (error) {
    console.error("Failed to fetch product metadata on server:", error);
  }

  return (
    <AddProductClient
      categories={categories}
      subcategories={subcategories}
    />
  );
}