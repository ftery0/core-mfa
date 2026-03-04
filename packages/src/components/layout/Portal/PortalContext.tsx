import { createContext, useContext } from "react";

interface PortalContextType {
  portalRef: HTMLDivElement | null;
}

export const PortalContext = createContext<PortalContextType | null>(null);

export const usePortal = () => {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error(
      "usePortal must be used within a DodamProvider. Please wrap your app with <DodamProvider>."
    );
  }

  return context;
};
