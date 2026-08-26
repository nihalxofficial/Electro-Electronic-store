import { serverFetch, serverMutation } from "../core/server";

export const getWishlist = async () => {
  return serverFetch("/wishlist", true);
};

export const addToWishlist = async (productId: string) => {
  return serverMutation("/wishlist", { productId }, "POST");
};

export const removeFromWishlist = async (productId: string) => {
  return serverMutation(`/wishlist/${productId}`, undefined, "DELETE");
};
