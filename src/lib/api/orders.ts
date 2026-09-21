import { serverFetch } from "../core/server";

export const getOrdersByUserId = async (userId: string) => {
  return serverFetch(`/orders?userId=${userId}`);
};

export const getOrderById = async (id: string) => {
  return serverFetch(`/orders/${id}`);
};
