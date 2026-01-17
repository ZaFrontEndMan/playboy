"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import type { ComponentType, ReactNode } from "react";

const LenisWrapper = ReactLenis as unknown as ComponentType<{
  children?: ReactNode;
  root?: boolean;
  options?: unknown;
}>;

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <LenisWrapper
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      {children}
    </LenisWrapper>
  );
}
