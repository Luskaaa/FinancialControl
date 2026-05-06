import { useMemo } from "react";
import type { Variants } from "motion/react";

export const celebrationVariants: Variants = {
  animate: {
    y: [0, -12, 0, -6, 0],
    rotate: [0, -4, 4, -2, 0],
    scale: [1, 1.06, 1, 1.03, 1],
    transition: {
      duration: 1.4,
      ease: "easeOut",
      repeat: Infinity,
      repeatDelay: 0.4,
    },
  },
};

export const sparkleVariants: Variants = {
  animate: {
    opacity: [0, 1, 0],
    scale: [0.6, 1.2, 0.6],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function useSuccessAnimation() {
  return useMemo(
    () => ({ celebration: celebrationVariants, sparkle: sparkleVariants }),
    []
  );
}
