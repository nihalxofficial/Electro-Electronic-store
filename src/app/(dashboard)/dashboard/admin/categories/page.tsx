import React from "react";
import { getCategories } from "@/lib/api/categories";
import { getSubCategories } from "@/lib/api/subCategories";
import CategoriesClient from "./CategoriesClient";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const [categoriesRes, subCategoriesRes] = await Promise.all([
    getCategories(),
    getSubCategories(),
  ]);

  const categories = Array.isArray(categoriesRes)
    ? categoriesRes
    : categoriesRes?.data || [];

  const subCategories = Array.isArray(subCategoriesRes)
    ? subCategoriesRes
    : subCategoriesRes?.data || [];

  return (
    <CategoriesClient
      initialCategories={categories}
      initialSubCategories={subCategories}
    />
  );
}
