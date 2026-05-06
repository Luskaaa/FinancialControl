"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type {
  MascotContextValue,
  MascotState,
} from "@/src/mascot/states/mascotStates";
import {
  initialMascotState,
  mascotReducer,
} from "@/src/mascot/engine/mascotReducer";

export const MascotContext = createContext<MascotContextValue | null>(null);

interface MascotProviderProps {
  children: ReactNode;
  idleTimeoutMs?: number;
  sleepTimeoutMs?: number;
}

const TRANSIENT_RESET_MS = 2400;

export function MascotProvider({
  children,
  idleTimeoutMs = 15_000,
  sleepTimeoutMs = 60_000,
}: MascotProviderProps) {
  const [internal, dispatch] = useReducer(mascotReducer, initialMascotState);
  const lastActivityRef = useRef<number>(0);
  const manualHoldUntilRef = useRef<number>(0);
  const transientTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MANUAL_HOLD_MS = 8_000;

  const dispatchManual = useCallback((next: MascotState) => {
    manualHoldUntilRef.current = Date.now() + MANUAL_HOLD_MS;
    dispatch({ type: "SET_STATE", payload: next });
  }, []);

  const setMascotState = useCallback(
    (next: MascotState) => dispatchManual(next),
    [dispatchManual]
  );

  const clearTransient = useCallback(() => {
    if (transientTimerRef.current) {
      clearTimeout(transientTimerRef.current);
      transientTimerRef.current = null;
    }
  }, []);

  const setLoading = useCallback(
    (loading: boolean) => {
      clearTransient();
      dispatchManual(loading ? "loading" : "idle");
    },
    [clearTransient, dispatchManual]
  );

  const queueTransient = useCallback(
    (s: MascotState) => {
      clearTransient();
      dispatchManual(s);
      transientTimerRef.current = setTimeout(() => {
        dispatch({ type: "SET_STATE", payload: "idle" });
        transientTimerRef.current = null;
      }, TRANSIENT_RESET_MS);
    },
    [clearTransient, dispatchManual]
  );

  const setSuccess = useCallback(() => queueTransient("success"), [queueTransient]);
  const setWarning = useCallback(() => queueTransient("warning"), [queueTransient]);

  const setFinancialState = useCallback(
    (balance: number) => {
      if (!Number.isFinite(balance)) return;
      if (balance > 1000) dispatchManual("rich");
      else if (balance < 0) dispatchManual("poor");
      else dispatchManual("idle");
    },
    [dispatchManual]
  );

  const show = useCallback(() => dispatch({ type: "SHOW" }), []);
  const hide = useCallback(() => dispatch({ type: "HIDE" }), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastActivityRef.current = Date.now();

    const markActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];
    events.forEach((e) => window.addEventListener(e, markActivity, { passive: true }));

    const AUTO_STATES = new Set(["idle", "thinking", "sleep"]);
    const WAKE_THRESHOLD_MS = 1_500;

    const interval = window.setInterval(() => {
      if (Date.now() < manualHoldUntilRef.current) return;
      const inactiveFor = Date.now() - lastActivityRef.current;
      const s = internal.state;
      if (!AUTO_STATES.has(s)) return;
      if (s === "idle" && inactiveFor >= idleTimeoutMs) {
        dispatch({ type: "SET_STATE", payload: "thinking" });
      } else if (s === "thinking" && inactiveFor >= sleepTimeoutMs) {
        dispatch({ type: "SET_STATE", payload: "sleep" });
      } else if (
        (s === "thinking" || s === "sleep") &&
        inactiveFor < WAKE_THRESHOLD_MS
      ) {
        dispatch({ type: "SET_STATE", payload: "idle" });
      }
    }, 2_000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, markActivity));
      window.clearInterval(interval);
    };
  }, [idleTimeoutMs, sleepTimeoutMs, internal.state]);

  useEffect(() => () => clearTransient(), [clearTransient]);

  const value = useMemo<MascotContextValue>(
    () => ({
      state: internal.state,
      visible: internal.visible,
      lastChange: internal.lastChange,
      setMascotState,
      setLoading,
      setSuccess,
      setWarning,
      setFinancialState,
      show,
      hide,
    }),
    [
      internal.state,
      internal.visible,
      internal.lastChange,
      setMascotState,
      setLoading,
      setSuccess,
      setWarning,
      setFinancialState,
      show,
      hide,
    ]
  );

  return <MascotContext.Provider value={value}>{children}</MascotContext.Provider>;
}
