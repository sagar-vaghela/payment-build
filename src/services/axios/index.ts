import axios from "axios";
const { NEXT_PUBLIC_API_URL } = process.env;

export const createAxiosFor = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
});