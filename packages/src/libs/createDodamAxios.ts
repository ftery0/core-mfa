import axios from "axios";
import { ACCESS_TOKEN_KEY, REQUEST_TOKEN_KEY, token } from "./token";

export const createDodamAxios = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      [REQUEST_TOKEN_KEY]: `Bearer ${token.getToken(ACCESS_TOKEN_KEY)}`,
    },
  });
};
