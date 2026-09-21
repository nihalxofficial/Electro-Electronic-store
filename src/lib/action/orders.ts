"use server";

import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";
import { CreateOrderPayload } from "@/types";

export const createOrder = async (data: Omit<CreateOrderPayload, "userId">) => {
  const user = await getUserSession();
  if (!user?.id) return null;
  return serverMutation("/orders", { ...data, userId: user.id });
};
