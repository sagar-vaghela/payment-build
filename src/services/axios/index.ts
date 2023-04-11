import axios from "axios";

const ACCESS_TOKEN_KEY = 'access_token';

let access_token;
if (typeof window !== "undefined") {
  access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
}
console.log("access_token", access_token);

export const createAxiosFor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { Authorization: `Bearer ${access_token}`},
});
