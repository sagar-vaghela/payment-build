import { loginUrl, userCurrentUrl } from "src/lib/constants";
import { createAxiosFor } from "../axios";

export const loginApi = (payload: any) => {
  return createAxiosFor.post(`${loginUrl}`, payload);
};

export const userCurrentAPi = () => {
  return createAxiosFor.get(`${userCurrentUrl}`);
};
