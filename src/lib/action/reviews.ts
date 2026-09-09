import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const addReview = async (data: Partial<Review>) => {
  const user = await getUserSession();
  return serverMutation(`/products`, { ...data, customerId: user?.id });
};