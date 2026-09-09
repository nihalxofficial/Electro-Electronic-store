import { Review } from "@/types";
import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const addReview = async (data: Partial<Review>) => {
  const user = await getUserSession();
  return serverMutation(`/reviews`, { ...data, customerId: user?.id });
};