import { ReactNode } from "react";
import { useThemes } from "hooks/Theme/useTheme";
import { DodamGlobalStyles, DodamThemeProvider } from "@mfa/dds";

interface Props {
  children: ReactNode;
}

const ThemeProviderContainer = ({ children }: Props) => {
  const { themeColor } = useThemes();

  return (
    <DodamThemeProvider theme={themeColor}>
      <DodamGlobalStyles />
      {children}
    </DodamThemeProvider>
  );
};

export default ThemeProviderContainer;
