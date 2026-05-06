"use client";

import { useContext } from "react";
import { MascotContext } from "@/src/mascot/engine/MascotProvider";
import type { MascotContextValue } from "@/src/mascot/states/mascotStates";

export function useMascot(): MascotContextValue {
  const ctx = useContext(MascotContext);
  if (!ctx) {
    throw new Error(
      "useMascot must be used within a <MascotProvider>. Mount it once in app/layout.tsx.",
    );
  }
  return ctx;
}
