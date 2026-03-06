import 'styled-components';
import { DodamTheme } from '@mfa/dds';

declare module 'styled-components' {
  export interface DefaultTheme extends DodamTheme {}
}
