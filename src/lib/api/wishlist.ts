import { serverFetch } from "../core/server";

export const getWishlistByUserId = async (userId: string) => {
  return serverFetch(`/wishlist/user/${userId}`);
};

export const getWishlist = getWishlistByUserId;

export const checkIsWishlisted = async (productId: string, userId: string) => {
  return serverFetch(`/wishlist/is-wishlisted?userId=${userId}&productId=${productId}`);
};
