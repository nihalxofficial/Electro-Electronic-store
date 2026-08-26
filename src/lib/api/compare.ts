import { serverFetch, serverMutation } from "../core/server";

export const getCompare = async () => {
  return serverFetch("/compare", true);
};

export const addToCompare = async (productId: string) => {
  return serverMutation("/compare", { productId }, "POST");
};

export const removeFromCompare = async (productId: string) => {
  return serverMutation(`/compare/${productId}`, undefined, "DELETE");
};
