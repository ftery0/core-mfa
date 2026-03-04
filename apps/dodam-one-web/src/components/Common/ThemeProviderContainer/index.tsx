import { PropsWithChildren } from "react";
import { DodamThemeProvider,DodamGlobalStyles } from "@mfa/dds";
import { useTheme } from "hooks/Theme/usetheme";;

const ThemeProviderContainer = ({ children }: PropsWithChildren) => {
  const { themeColor } = useTheme();
  
  return (
    <DodamThemeProvider theme={themeColor}>
      <DodamGlobalStyles />
      {children}
    </DodamThemeProvider>
  );
};

export default ThemeProviderContainer;
