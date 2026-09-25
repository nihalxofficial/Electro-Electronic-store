"use server";

import { serverMutation } from "../core/server";

export const updateUser = async (id: string, data: Record<string, unknown>) => {
  return serverMutation(`/users/${id}`, data, "PATCH");
};

export const deleteUser = async (id: string) => {
  return serverMutation(`/users/${id}`, {}, "DELETE");
};
