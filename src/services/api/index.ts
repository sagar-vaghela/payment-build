import { loginUrl, userCurrentUrl } from "src/lib/constants";
import { createAxiosFor } from "../axios";

const ACCESS_TOKEN_KEY = "access_token";

export const loginApi = (payload: any) => {
  return createAxiosFor.post(`${loginUrl}`, payload);
};

export const userCurrentAPi = () => {
  let access_token: string | null = "";

  if (typeof window !== "undefined") {
    access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return createAxiosFor.get(`${userCurrentUrl}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
