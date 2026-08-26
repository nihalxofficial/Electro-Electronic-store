"use server";

import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const addProduct = async (data: Record<string, unknown>) => {
  const user = await getUserSession();
  return serverMutation(`/products`, { ...data, ownerId: user?.id });
};
