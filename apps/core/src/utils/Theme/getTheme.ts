import { THEME_KEY } from "constants/Theme/theme.contant";
import { ETheme } from "enum/Theme/theme.enum";

export const getTheme = (): ETheme => {
  if (typeof window === "undefined") {
    return ETheme.LIGHT;
  }

  const themeMode = window.localStorage.getItem(THEME_KEY) as ETheme | null;

  if (!themeMode) {
    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDarkTheme ? ETheme.DARK : ETheme.LIGHT;
  }

  return themeMode === ETheme.DARK ? ETheme.DARK : ETheme.LIGHT;
};
