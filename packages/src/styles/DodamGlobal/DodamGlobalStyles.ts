import { CSSObject, createGlobalStyle } from "styled-components";

type CustomStlye = {
  customStyle?: CSSObject;
};

export const DodamGlobalStyles = createGlobalStyle<CustomStlye>`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      ${({ customStyle }) => customStyle}
    }
`;
