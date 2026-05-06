import { useMemo } from "react";
import type { Variants } from "motion/react";

export const sleepVariants: Variants = {
  animate: {
    y: [0, 1.5, 0],
    scale: [1, 1.015, 1],
    transition: {
      duration: 4.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const zzzVariants: Variants = {
  animate: {
    opacity: [0, 1, 1, 0],
    y: [0, -10, -18, -26],
    x: [0, 4, 8, 12],
    transition: {
      duration: 2.6,
      repeat: Infinity,
      ease: "easeOut",
    },
  },
};

export function useSleepAnimation() {
  return useMemo(() => ({ sleep: sleepVariants, zzz: zzzVariants }), []);
}
