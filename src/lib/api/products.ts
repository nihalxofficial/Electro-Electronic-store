import { serverFetch } from "../core/server";

// Fetch products with optional filter/sort/pagination params
export const getProducts = async (params?: Record<string, string | number | boolean | undefined>): Promise<any> => {
  const query = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, String(value));
      }
    });
  }

  return serverFetch(`/products?${query.toString()}`);
};
