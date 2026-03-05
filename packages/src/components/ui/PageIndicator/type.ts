import React from "react";
import { CSSObject } from "styled-components";
export type ButtonSize = "Small" | "Large" | "ExtraLarge";

export interface PageIndicatorProps {
  buttonSize: ButtonSize;
  caseBy :Partial<Record<string, React.ReactElement | null>>
  defaultComponent?: React.ReactElement | null;
  customStyle?: CSSObject;
}