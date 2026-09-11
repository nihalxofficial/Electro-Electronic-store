"use server";

import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const addToCart = async (productId: string, quantity = 1) => {
  const user = await getUserSession();
  if (!user?.id) return null;
  return serverMutation("/cart", { userId: user.id, productId, quantity });
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const user = await getUserSession();
  if (!user?.id) return null;
  return serverMutation(`/cart/${productId}`, { userId: user.id, quantity }, "PATCH");
};

export const removeFromCart = async (productId: string) => {
  const user = await getUserSession();
  if (!user?.id) return null;
  return serverMutation(`/cart/${productId}`, { userId: user.id }, "DELETE");
};

export const clearCart = async () => {
  const user = await getUserSession();
  if (!user?.id) return null;
  return serverMutation("/cart", { userId: user.id }, "DELETE");
};

