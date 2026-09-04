import { serverFetch, serverMutation } from "../core/server";

export const getCart = async () => {
  return serverFetch("/cart", true);
};


