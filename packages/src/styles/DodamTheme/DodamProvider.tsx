import React, { ReactNode, useRef, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { DodamLightTheme, DodamDarkTheme } from "./DodamTheme";
import { PortalContext } from "../../components/layout/Portal/PortalContext";

export interface DodamProviderProps {
  children: ReactNode;
  theme: "LIGHT" | "DARK";
}

/**
 * DodamProvider - Main provider component for Dodam Design System
 *
 * Combines theme management and portal container for modals/dialogs.
 * Wrap your entire app with this provider at the root level.
 *
 * @example
 * ```tsx
 * function App() {
 *   const [isDark, setIsDark] = useState(false);
 *
 *   return (
 *     <DodamProvider theme={isDark ? "DARK" : "LIGHT"}>
 *       <YourApp />
 *     </DodamProvider>
 *   );
 * }
 * ```
 */
export const DodamProvider = ({ children, theme }: DodamProviderProps) => {
  const portalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider theme={theme === "LIGHT" ? DodamLightTheme : DodamDarkTheme}>
      <PortalContext.Provider value={{ portalRef: mounted ? portalRef.current : null }}>
        {children}
        {/* Portal container for modals, dialogs, and other overlays */}
        <div
          ref={portalRef}
          id="dodam-portal-root"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        />
      </PortalContext.Provider>
    </ThemeProvider>
  );
};
