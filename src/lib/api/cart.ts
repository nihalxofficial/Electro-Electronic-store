import { serverFetch, serverMutation } from "../core/server";

export const getCart = async () => {
  return serverFetch("/cart", true);
};

export const addToCart = async (productId: string, quantity: number = 1) => {
  return serverMutation("/cart", { productId, quantity }, "POST");
};

export const updateCartItem = async (productId: string, quantity: number) => {
  return serverMutation(`/cart/${productId}`, { quantity }, "PATCH");
};

export const removeFromCart = async (productId: string) => {
  return serverMutation(`/cart/${productId}`, undefined, "DELETE");
};

export const clearCart = async () => {
  return serverMutation("/cart/clear", undefined, "DELETE");
};
