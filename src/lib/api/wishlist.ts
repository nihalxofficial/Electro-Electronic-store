import { serverFetch } from "../core/server";

export const getWishlistByUserId = async (userId: string) => {
  return serverFetch(`/wishlist/user/${userId}`);
};

export const getWishlist = getWishlistByUserId;



