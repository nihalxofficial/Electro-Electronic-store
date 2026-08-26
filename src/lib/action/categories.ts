"use server";

import { Category } from "@/types";
import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const addCategory = async (data: Partial<Category>) => {
  const user = await getUserSession();

  return serverMutation(`/categories`, { ...data, ownerId: user?.id });
};