import { loginUrl } from "src/lib/constants";
import { createAxiosFor } from "../axios";

export const loginApi = (payload: any) => {
    return createAxiosFor.post(`${loginUrl}`, payload)
  };