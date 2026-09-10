import { serverMutation, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const addReview = async (data: { productId: string; rating: number; comment: string }) => {
  const user = await getUserSession();
  return serverMutation(`/reviews`, { ...data, userId: user?.id });
};

export const getReviews = async (productId: string) => {
  return serverFetch(`/reviews?productId=${productId}`);
};