import { useMemo } from "react";
import type { Variants } from "motion/react";

export const idleVariants: Variants = {
  animate: {
    scale: [1, 1.025, 1],
    y: [0, -2, 0],
    transition: {
      duration: 3.2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const floatVariants: Variants = {
  animate: {
    y: [0, -6, 0],
    rotate: [0, 1.5, 0, -1.5, 0],
    transition: {
      duration: 4.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const blinkVariants: Variants = {
  animate: {
    scaleY: [1, 1, 0.05, 1, 1],
    transition: {
      duration: 4,
      times: [0, 0.45, 0.5, 0.55, 1],
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function useIdleAnimation() {
  return useMemo(() => ({ idle: idleVariants, float: floatVariants, blink: blinkVariants }), []);
}
