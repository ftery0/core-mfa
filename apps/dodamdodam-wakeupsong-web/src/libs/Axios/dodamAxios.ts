import config from "config/config.json";
import { createDodamAxios } from "@mfa/dds";
import { errorInterceptor } from "./errorInterceptor";

const dodamAxios = createDodamAxios(config.SERVER);

dodamAxios.interceptors.response.use((response) => response, errorInterceptor);

export default dodamAxios;
