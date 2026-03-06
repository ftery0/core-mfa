import { InternalAxiosRequestConfig } from "axios";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
  token,
} from "@mfa/dds";

const requestHandler = (config: InternalAxiosRequestConfig) => {
  if (
    token.getToken(REFRESH_TOKEN_KEY) === undefined
  ) {
    window.location.href = "/sign";
  } else {
    config.headers[REQUEST_TOKEN_KEY] = `Bearer ${token.getToken(ACCESS_TOKEN_KEY)}`
    }

  return config;
};

export default requestHandler;
