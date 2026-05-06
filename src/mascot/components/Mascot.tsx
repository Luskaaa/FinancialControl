"use client";

import dynamic from "next/dynamic";
import { useContext } from "react";
import { MascotContext } from "@/src/mascot/engine/MascotProvider";

const MascotRenderer = dynamic(
  () => import("@/src/mascot/components/MascotRenderer").then((m) => m.MascotRenderer),
  { ssr: false }
);

interface MascotProps {
  size?: number;
  interactive?: boolean;
  onClick?: () => void;
}

export function Mascot({ size = 144, interactive = false, onClick }: MascotProps) {
  const ctx = useContext(MascotContext);
  if (!ctx || !ctx.visible) return null;
  if (ctx.state === "loading") return null;

  return (
    <div
      aria-hidden={!interactive}
      className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      style={{
        width: size,
        height: size,
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      <MascotRenderer
        state={ctx.state}
        size={size}
        interactive={interactive}
        onClick={onClick}
      />
    </div>
  );
}
