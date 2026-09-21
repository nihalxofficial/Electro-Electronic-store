"use server";

import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const addProduct = async (data: Record<string, unknown>) => {
  const user = await getUserSession();
  return serverMutation(`/products`, { ...data, ownerId: user?.id });
};

export const updateProduct = async (id: string, data: Record<string, unknown>) => {
  return serverMutation(`/products/${id}`, data, "PATCH");
};

export const deleteProduct = async (id: string) => {
  return serverMutation(`/products/${id}`, {}, "DELETE");
};

