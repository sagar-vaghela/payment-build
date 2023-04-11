import { loginUrl, userCurrentUrl } from "src/lib/constants";
import { createAxiosFor } from "../axios";
import { getTokens } from "src/utils/getToken";

export const loginApi = (payload: any) => {
  return createAxiosFor.post(`${loginUrl}`, payload);
};

export const userCurrentAPi = () => {
  return createAxiosFor.get(`${userCurrentUrl}`, getTokens());
};
