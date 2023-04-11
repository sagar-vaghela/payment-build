import axios from "axios";

export const createAxiosFor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});