import React from "react";
import { Background } from "./style";
import { CSSObject } from "styled-components";
import { DodamPortal } from "../../layout";

export interface ModalProps {
  isOpen: boolean;
  close?: () => void;
  children: React.ReactNode;
  customStyle?: CSSObject;
  $background?: boolean;
}

/**
 * DodamModal - Modal component using DodamPortal
 *
 * Renders modal content into the portal container provided by DodamProvider.
 * No need to manually manage DOM elements - everything is handled by the provider.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <DodamModal isOpen={isOpen} close={() => setIsOpen(false)}>
 *   <YourModalContent />
 * </DodamModal>
 * ```
 */
export const DodamModal = ({ isOpen, close, children, customStyle, $background }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <DodamPortal>
      <Background onClick={close} customStyle={customStyle} $background={$background}>
        {children}
      </Background>
    </DodamPortal>
  );
};