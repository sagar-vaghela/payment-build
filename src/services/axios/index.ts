import axios from "axios";
const { NEXT_APP_API_URL } = process.env;

export const createAxiosFor = axios.create({
  baseURL: NEXT_APP_API_URL,
});