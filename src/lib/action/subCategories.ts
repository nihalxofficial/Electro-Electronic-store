"use server";

import { SubCategory } from "@/types";
import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const addSubCategory = async (data: Partial<SubCategory>) => {
  const user = await getUserSession();

  return serverMutation(`/subcategories`, { ...data, ownerId: user?.id });
};