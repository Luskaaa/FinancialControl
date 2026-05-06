export type MascotState =
  | "idle"
  | "loading"
  | "thinking"
  | "success"
  | "warning"
  | "poor"
  | "rich"
  | "sleep";

export type MascotEmotion =
  | "none"
  | "neutral"
  | "happy"
  | "sad"
  | "wink"
  | "shock"
  | "sleepy"
  | "starry";

export type MascotAccessory =
  | "none"
  | "spinner"
  | "coins"
  | "moneybag"
  | "wallet"
  | "laptop"
  | "sparkles"
  | "thoughtBubble"
  | "exclamation"
  | "zzz";

export type MascotBaseAsset =
  | "cat-consulting"
  | "cat-loading"
  | "cat-poor"
  | "cat-rich";

export interface MascotVisualConfig {
  base: MascotBaseAsset;
  emotion: MascotEmotion;
  accessory: MascotAccessory;
  motion: "breathe" | "float" | "bounce" | "thinking" | "sleep" | "spin";
}

export const STATE_VISUALS: Record<MascotState, MascotVisualConfig> = {
  idle: {
    base: "cat-consulting",
    emotion: "none",
    accessory: "none",
    motion: "breathe",
  },
  loading: {
    base: "cat-loading",
    emotion: "none",
    accessory: "none",
    motion: "spin",
  },
  thinking: {
    base: "cat-consulting",
    emotion: "none",
    accessory: "none",
    motion: "thinking",
  },
  success: {
    base: "cat-rich",
    emotion: "none",
    accessory: "none",
    motion: "bounce",
  },
  warning: {
    base: "cat-poor",
    emotion: "none",
    accessory: "none",
    motion: "float",
  },
  poor: {
    base: "cat-poor",
    emotion: "none",
    accessory: "none",
    motion: "breathe",
  },
  rich: {
    base: "cat-rich",
    emotion: "none",
    accessory: "none",
    motion: "float",
  },
  sleep: {
    base: "cat-loading",
    emotion: "none",
    accessory: "none",
    motion: "sleep",
  },
};

export interface MascotContextValue {
  state: MascotState;
  visible: boolean;
  lastChange: number;
  setMascotState: (next: MascotState) => void;
  setLoading: (loading: boolean) => void;
  setSuccess: () => void;
  setWarning: () => void;
  setFinancialState: (balance: number) => void;
  show: () => void;
  hide: () => void;
}
