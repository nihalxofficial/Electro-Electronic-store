import AddCategoryClient from "./AddCategoryClient";
import { getCategories } from "@/lib/api/categories";
// import { Category } from "@/types";

export const dynamic = "force-dynamic";

export default async function AddCategoryPage() {
 const categories = await getCategories();

  return <AddCategoryClient categories={categories?.data} />;
}