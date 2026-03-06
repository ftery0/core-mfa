import { AxiosError } from "axios";
import { cookie, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@mfa/dds";
import { injectCustomAxiosAccessToken } from "./dodamAxios";
import authRepository from "repositories/Auth/auth.repository";

export const dodamAxiosErrorInterceptor = async (config: AxiosError) => {
  if (config.response) {
    const {
      response: { status },
    } = config;

    const accessToken = cookie.getCookie(ACCESS_TOKEN_KEY);
    const refreshToken = cookie.getCookie(REFRESH_TOKEN_KEY);

    if (accessToken && refreshToken && status === 401) {
      try {
        const { data } = await authRepository.getRefreshToken({ refreshToken });

        cookie.setCookie(ACCESS_TOKEN_KEY, data);
        injectCustomAxiosAccessToken(data);
      } catch (error) {
        window.alert("세션만료");
        cookie.removeCookie(ACCESS_TOKEN_KEY);
        cookie.removeCookie(REFRESH_TOKEN_KEY);
        window.location.href = "/sign";
      }
    }

    return Promise.reject(config);
  }
};
