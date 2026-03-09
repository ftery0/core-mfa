import config from "config/config.json";
import { createDodamAxios, REQUEST_TOKEN_KEY } from "@mfa/dds";
import { dodamAxiosErrorInterceptor } from "./interceptors";

export const dodamAxios = createDodamAxios(config.SERVER);

export const injectCustomAxiosAccessToken = (accessToken: string) => {
  dodamAxios.defaults.headers.common[REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`;
};

dodamAxios.interceptors.response.use((res) => res, dodamAxiosErrorInterceptor);
