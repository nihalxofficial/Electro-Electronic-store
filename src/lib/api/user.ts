import { serverFetch } from "../core/server";

export const getUserById = async (userId: string) => {
  return serverFetch(`/users/${userId}`, true);
};

export const getUsers = async (params?: Record<string, any>) => {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") query.set(key, String(val));
    });
  }
  const qs = query.toString();
  return serverFetch(`/users${qs ? `?${qs}` : ""}`, true);
};