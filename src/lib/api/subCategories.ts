import { serverFetch } from "../core/server";

export const getSubCategories = async (categoryId?: string) => {
  const query = categoryId ? `?categoryId=${categoryId}` : "";
  return serverFetch(`/subcategories${query}`);
};
