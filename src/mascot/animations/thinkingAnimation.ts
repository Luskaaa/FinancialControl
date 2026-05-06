import { useMemo } from "react";
import type { Variants } from "motion/react";

export const thinkingVariants: Variants = {
  animate: {
    rotate: [0, 4, -4, 2, 0],
    y: [0, -1, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const thoughtBubbleVariants: Variants = {
  animate: {
    opacity: [0, 1, 1, 0],
    y: [4, -2, -4, -8],
    scale: [0.85, 1, 1, 0.9],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function useThinkingAnimation() {
  return useMemo(
    () => ({ thinking: thinkingVariants, bubble: thoughtBubbleVariants }),
    []
  );
}
