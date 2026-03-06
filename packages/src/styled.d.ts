import { DodamTheme } from "./styles/DodamTheme/type";

declare module "styled-components" {
  export interface DefaultTheme extends DodamTheme {}
}
