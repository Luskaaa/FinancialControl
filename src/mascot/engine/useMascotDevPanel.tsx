"use client";

import { useEffect, useState } from "react";
import { useMascot } from "@/src/mascot/engine/useMascot";
import type { MascotState } from "@/src/mascot/states/mascotStates";

const STATES: MascotState[] = [
  "idle",
  "loading",
  "thinking",
  "success",
  "warning",
  "poor",
  "rich",
  "sleep",
];

export function useMascotDevPanel(enabled: boolean = process.env.NODE_ENV === "development") {
  const { state, setMascotState } = useMascot();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === "M" || e.key === "m")) {
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);

  return { open, setOpen, state, setMascotState, states: STATES, enabled };
}

export function MascotDevPanel() {
  const { open, setOpen, state, setMascotState, states, enabled } = useMascotDevPanel();

  if (!enabled || !open) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] rounded-lg border border-line bg-surface/95 p-3 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-ink">
        <span>Mascot · {state}</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-ink-soft hover:text-ink"
          aria-label="Close mascot dev panel"
        >
          ×
        </button>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {states.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setMascotState(s)}
            className={`rounded-md px-2 py-1 text-xs transition ${
              state === s
                ? "bg-brand text-white"
                : "bg-canvas text-ink-soft hover:bg-brand-tint hover:text-brand"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-ink-soft">Alt+Shift+M to toggle</p>
    </div>
  );
}
