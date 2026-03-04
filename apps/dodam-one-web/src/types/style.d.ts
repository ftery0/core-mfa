import { DodamTheme } from "@mfa/dds-web";

declare module "styled-components" {
  export interface DefaultTheme extends DodamTheme {}
}
