import axios, { AxiosError } from "axios";
import {
  cookie,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from "@mfa/dds";
import authRepository from "repository/Auth/auth.repository";
import dodamAxios from "./dodamAxios";

export const errorInterceptor = async (config: AxiosError) => {
  const refresh_token = cookie.getCookie(REFRESH_TOKEN_KEY);

  const STATUS = config.response?.status;
  if (config.response) {
    if (STATUS === 401) {
      const originalRequest = config.config;

      try {
        const { data: newAccessToken } = await authRepository.postRefreshToken({
          refreshToken: refresh_token!,
        });

        dodamAxios.defaults.headers.common[
          REQUEST_TOKEN_KEY
        ] = `Bearer ${newAccessToken.accessToken}`;

        cookie.setCookie(ACCESS_TOKEN_KEY, newAccessToken.accessToken);

        originalRequest.headers![
          REQUEST_TOKEN_KEY
        ] = `Bearer ${newAccessToken.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        window.location.href = "http://dodam.b1nd.com/sign";
      }
    }
  }

  return Promise.reject(config);
};
