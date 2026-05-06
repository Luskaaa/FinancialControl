"use client";

import { memo, useMemo } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  STATE_VISUALS,
  type MascotBaseAsset,
  type MascotState,
} from "@/src/mascot/states/mascotStates";
import { MOTION_VARIANTS } from "@/src/mascot/animations";
import { EmotionLayer } from "@/src/mascot/layers/EmotionLayer";
import { AccessoryLayer } from "@/src/mascot/layers/AccessoryLayer";
import catConsulting from "@/src/mascot/assets/cat-consulting.png";
import catLoading from "@/src/mascot/assets/cat-loading.png";
import catPoor from "@/src/mascot/assets/cat-poor.png";
import catRich from "@/src/mascot/assets/cat-rich.png";

const BASE_ASSETS: Record<MascotBaseAsset, StaticImageData> = {
  "cat-consulting": catConsulting,
  "cat-loading": catLoading,
  "cat-poor": catPoor,
  "cat-rich": catRich,
};

interface MascotRendererProps {
  state: MascotState;
  size?: number;
  onClick?: () => void;
  interactive?: boolean;
}

function MascotRendererInner({
  state,
  size = 144,
  onClick,
  interactive = false,
}: MascotRendererProps) {
  const visual = useMemo(() => STATE_VISUALS[state], [state]);
  const motionVariants = MOTION_VARIANTS[visual.motion];
  const baseSrc = BASE_ASSETS[visual.base];

  return (
    <motion.div
      key={visual.base}
      style={{ width: size, height: size, transformOrigin: "50% 65%" }}
      className="relative select-none"
      variants={motionVariants}
      animate="animate"
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : -1}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`base-${visual.base}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={baseSrc}
            alt=""
            fill
            sizes={`${size}px`}
            priority={false}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      <EmotionLayer emotion={visual.emotion} />
      <AccessoryLayer accessory={visual.accessory} />
    </motion.div>
  );
}

export const MascotRenderer = memo(MascotRendererInner);
