import config from "config/config.json";
import { createDodamAxios, REQUEST_TOKEN_KEY } from "@mfa/dds";
import errorResponseHandler from "./errorResponseHandler";
import requestHandler from "./requestHandler";

export const dodamAxios = createDodamAxios(config.DODAM_SERVER);

export const dodamAxiosSetAccessToken = (accessToken: string) => {
  dodamAxios.defaults.headers.common[REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`;
};

dodamAxios.interceptors.request.use(requestHandler, (res) => res);

dodamAxios.interceptors.response.use((res) => res, errorResponseHandler);
