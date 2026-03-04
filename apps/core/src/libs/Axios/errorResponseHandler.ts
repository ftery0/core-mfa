import { AxiosError } from "axios";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from "constants/Token/token.constant";
import token from "../Token/token";
import { dodamAxios } from "./customAxios";
import authRepository from "repositories/Auth/auth.repository";

let isRefreshing = false;

let refreshSubscribers: ((accessToken: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback);
};

const errorResponseHandler = async (error: AxiosError) => {
  if (error.response) {
    const {
      config: originalRequest,
      response: { status },
    } = error;

    const usingAccessToken = token.getToken(ACCESS_TOKEN_KEY);
    const usingRefreshToken = token.getToken(REFRESH_TOKEN_KEY);

    if (
      usingAccessToken !== undefined &&
      usingRefreshToken !== undefined &&
      status === 401
    ) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data: newAccessToken } =
            await authRepository.refreshAccessToken({
              refreshToken: usingRefreshToken,
            });

          dodamAxios.defaults.headers.common[
            REQUEST_TOKEN_KEY
          ] = `Bearer ${newAccessToken}`;

          token.setToken(ACCESS_TOKEN_KEY, newAccessToken.accessToken);

          isRefreshing = false;

          onTokenRefreshed(newAccessToken.accessToken);
        } catch (error) {
          window.alert("세션이 만료되었습니다.");
          token.clearToken();
          window.location.href = "/sign";
        }
      }
      return new Promise((resolve) => {
        addRefreshSubscriber((accessToken: string) => {
          originalRequest!.headers![REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`;
          resolve(dodamAxios(originalRequest!));
        });
      });
    }
  }
};

export default errorResponseHandler;
