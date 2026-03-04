import ReactDom from "react-dom";
import { ReactNode } from "react";
import { usePortal } from "./PortalContext";

interface DodamPortalProps {
  children: ReactNode;
}

/**
 * DodamPortal - Component for rendering children into the portal container
 *
 * Automatically uses the portal container provided by DodamProvider.
 * No need to specify an ID - it will use the centralized portal root.
 *
 * @example
 * ```tsx
 * <DodamPortal>
 *   <YourModalContent />
 * </DodamPortal>
 * ```
 */
export const DodamPortal = ({ children }: DodamPortalProps) => {
  const { portalRef } = usePortal();

  if (!portalRef) return null;

  return ReactDom.createPortal(children, portalRef);
};
