import axios from "axios";
import { getTokens } from "src/utils/getToken";

let access_token: string | null = "";

interface IAxiosConfig {
  baseURL: string;
  headers?: {
    Authorization: string;
  };
}

let config: IAxiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
};

if (typeof window !== "undefined") {
  access_token = localStorage.getItem("access_token");
}

let headers = getTokens(); 


if(access_token){
  config = {
    ...config,
    ...headers
  }
  debugger
}

export const createAxiosFor = axios.create(config);
