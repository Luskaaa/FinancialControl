import type { Variants } from "motion/react";
import { idleVariants, floatVariants } from "./idleAnimation";
import { celebrationVariants } from "./successAnimation";
import { thinkingVariants } from "./thinkingAnimation";
import { sleepVariants } from "./sleepAnimation";
import type { MascotVisualConfig } from "@/src/mascot/states/mascotStates";

const SPIN_VARIANTS: Variants = {
  animate: {
    y: [0, -3, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

export const MOTION_VARIANTS: Record<MascotVisualConfig["motion"], Variants> = {
  breathe: idleVariants,
  float: floatVariants,
  bounce: celebrationVariants,
  thinking: thinkingVariants,
  sleep: sleepVariants,
  spin: SPIN_VARIANTS,
};

export { idleVariants, floatVariants, blinkVariants } from "./idleAnimation";
export { celebrationVariants, sparkleVariants } from "./successAnimation";
export { thinkingVariants, thoughtBubbleVariants } from "./thinkingAnimation";
export { sleepVariants, zzzVariants } from "./sleepAnimation";
export { useIdleAnimation } from "./idleAnimation";
export { useSuccessAnimation } from "./successAnimation";
export { useThinkingAnimation } from "./thinkingAnimation";
export { useSleepAnimation } from "./sleepAnimation";
