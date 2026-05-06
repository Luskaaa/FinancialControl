"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { blinkVariants } from "@/src/mascot/animations/idleAnimation";
import type { MascotEmotion } from "@/src/mascot/states/mascotStates";

interface EmotionLayerProps {
  emotion: MascotEmotion;
}

const EYE_LEFT = { cx: 200, cy: 290 };
const EYE_RIGHT = { cx: 312, cy: 290 };

function Eyes({ emotion }: { emotion: MascotEmotion }) {
  if (emotion === "sleepy") {
    return (
      <g stroke="#1a2230" strokeWidth={8} strokeLinecap="round" fill="none">
        <path d={`M${EYE_LEFT.cx - 22} ${EYE_LEFT.cy} q22 14 44 0`} />
        <path d={`M${EYE_RIGHT.cx - 22} ${EYE_RIGHT.cy} q22 14 44 0`} />
      </g>
    );
  }

  if (emotion === "starry") {
    return (
      <g fill="#ffd166" stroke="#7a5a10" strokeWidth={2}>
        {[EYE_LEFT, EYE_RIGHT].map((p) => (
          <polygon
            key={`${p.cx}-${p.cy}`}
            points={`
              ${p.cx},${p.cy - 22}
              ${p.cx + 6},${p.cy - 6}
              ${p.cx + 22},${p.cy}
              ${p.cx + 6},${p.cy + 6}
              ${p.cx},${p.cy + 22}
              ${p.cx - 6},${p.cy + 6}
              ${p.cx - 22},${p.cy}
              ${p.cx - 6},${p.cy - 6}
            `}
          />
        ))}
      </g>
    );
  }

  if (emotion === "happy") {
    return (
      <g stroke="#1a2230" strokeWidth={8} strokeLinecap="round" fill="none">
        <path d={`M${EYE_LEFT.cx - 18} ${EYE_LEFT.cy + 4} q18 -22 36 0`} />
        <path d={`M${EYE_RIGHT.cx - 18} ${EYE_RIGHT.cy + 4} q18 -22 36 0`} />
      </g>
    );
  }

  if (emotion === "shock") {
    return (
      <g fill="#1a2230">
        <circle cx={EYE_LEFT.cx} cy={EYE_LEFT.cy} r={28} />
        <circle cx={EYE_RIGHT.cx} cy={EYE_RIGHT.cy} r={28} />
        <circle cx={EYE_LEFT.cx + 8} cy={EYE_LEFT.cy - 6} r={6} fill="#fff" />
        <circle cx={EYE_RIGHT.cx + 8} cy={EYE_RIGHT.cy - 6} r={6} fill="#fff" />
      </g>
    );
  }

  if (emotion === "sad") {
    return (
      <g fill="#1a2230">
        <ellipse cx={EYE_LEFT.cx} cy={EYE_LEFT.cy + 4} rx={18} ry={20} />
        <ellipse cx={EYE_RIGHT.cx} cy={EYE_RIGHT.cy + 4} rx={18} ry={20} />
      </g>
    );
  }

  if (emotion === "wink") {
    return (
      <g stroke="#1a2230" strokeWidth={8} strokeLinecap="round" fill="#1a2230">
        <circle cx={EYE_LEFT.cx} cy={EYE_LEFT.cy} r={20} />
        <path d={`M${EYE_RIGHT.cx - 18} ${EYE_RIGHT.cy} q18 -14 36 0`} fill="none" />
      </g>
    );
  }

  return (
    <motion.g
      fill="#1a2230"
      style={{ transformOrigin: "256px 290px" }}
      variants={blinkVariants}
      animate="animate"
    >
      <circle cx={EYE_LEFT.cx} cy={EYE_LEFT.cy} r={22} />
      <circle cx={EYE_RIGHT.cx} cy={EYE_RIGHT.cy} r={22} />
      <circle cx={EYE_LEFT.cx + 7} cy={EYE_LEFT.cy - 7} r={5} fill="#fff" />
      <circle cx={EYE_RIGHT.cx + 7} cy={EYE_RIGHT.cy - 7} r={5} fill="#fff" />
    </motion.g>
  );
}

function Mouth({ emotion }: { emotion: MascotEmotion }) {
  switch (emotion) {
    case "happy":
    case "starry":
      return (
        <path
          d="M210 350 Q256 388 302 350"
          stroke="#1a2230"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />
      );
    case "sad":
      return (
        <path
          d="M210 360 Q256 332 302 360"
          stroke="#1a2230"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />
      );
    case "shock":
      return <ellipse cx={256} cy={358} rx={14} ry={20} fill="#1a2230" />;
    case "sleepy":
      return (
        <path
          d="M236 358 Q256 366 276 358"
          stroke="#1a2230"
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
      );
    case "wink":
      return (
        <path
          d="M222 350 Q256 372 290 350"
          stroke="#1a2230"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />
      );
    default:
      return (
        <path
          d="M232 354 Q256 366 280 354"
          stroke="#1a2230"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
        />
      );
  }
}

function EmotionLayerInner({ emotion }: EmotionLayerProps) {
  if (emotion === "none") return null;
  return (
    <svg
      viewBox="0 0 512 512"
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden
    >
      <Eyes emotion={emotion} />
      <Mouth emotion={emotion} />
    </svg>
  );
}

export const EmotionLayer = memo(EmotionLayerInner);
