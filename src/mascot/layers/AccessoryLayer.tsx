"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sparkleVariants } from "@/src/mascot/animations/successAnimation";
import { thoughtBubbleVariants } from "@/src/mascot/animations/thinkingAnimation";
import { zzzVariants } from "@/src/mascot/animations/sleepAnimation";
import type { MascotAccessory } from "@/src/mascot/states/mascotStates";

interface AccessoryLayerProps {
  accessory: MascotAccessory;
}

function AccessoryContent({ accessory }: AccessoryLayerProps) {
  switch (accessory) {
    case "spinner":
      return (
        <motion.g
          style={{ transformOrigin: "256px 220px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx={256}
            cy={220}
            r={170}
            stroke="#5f8df7"
            strokeWidth={14}
            fill="none"
            strokeDasharray="28 22"
            opacity={0.85}
          />
        </motion.g>
      );

    case "sparkles":
      return (
        <motion.g variants={sparkleVariants} animate="animate">
          {[
            { x: 110, y: 140 },
            { x: 400, y: 130 },
            { x: 90, y: 360 },
            { x: 420, y: 360 },
          ].map((p, i) => (
            <motion.path
              key={i}
              d={`M${p.x} ${p.y - 18} L${p.x + 4} ${p.y - 4} L${p.x + 18} ${p.y} L${p.x + 4} ${p.y + 4} L${p.x} ${p.y + 18} L${p.x - 4} ${p.y + 4} L${p.x - 18} ${p.y} L${p.x - 4} ${p.y - 4} Z`}
              fill="#ffd166"
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
              transition={{
                duration: 1.4,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>
      );

    case "moneybag":
      return (
        <g>
          <ellipse cx={420} cy={400} rx={48} ry={42} fill="#3b6de0" />
          <rect x={392} y={358} width={56} height={18} rx={4} fill="#1f3f8a" />
          <text
            x={420}
            y={412}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={36}
            fontWeight={700}
            fill="#ffd166"
          >
            $
          </text>
        </g>
      );

    case "coins":
      return (
        <g>
          {[
            { x: 110, y: 420 },
            { x: 150, y: 440 },
            { x: 380, y: 430 },
          ].map((p) => (
            <g key={`${p.x}-${p.y}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={18}
                fill="#ffd166"
                stroke="#7a5a10"
                strokeWidth={2}
              />
              <text
                x={p.x}
                y={p.y + 6}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill="#7a5a10"
              >
                €
              </text>
            </g>
          ))}
        </g>
      );

    case "wallet":
      return (
        <g>
          <rect x={360} y={380} width={90} height={56} rx={10} fill="#475569" />
          <rect x={360} y={380} width={90} height={14} rx={6} fill="#334155" />
          <circle cx={440} cy={408} r={5} fill="#ffd166" opacity={0.6} />
        </g>
      );

    case "laptop":
      return (
        <g>
          <rect x={170} y={400} width={172} height={12} rx={6} fill="#2f3b4a" />
          <rect x={180} y={332} width={152} height={70} rx={8} fill="#5f8df7" />
          <rect x={188} y={340} width={136} height={54} rx={4} fill="#dbeafe" />
        </g>
      );

    case "thoughtBubble":
      return (
        <motion.g variants={thoughtBubbleVariants} animate="animate">
          <circle
            cx={420}
            cy={140}
            r={32}
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth={3}
          />
          <circle
            cx={388}
            cy={180}
            r={10}
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth={2.5}
          />
          <circle
            cx={372}
            cy={200}
            r={5}
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth={2}
          />
          <text
            x={420}
            y={152}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={32}
            fontWeight={700}
            fill="#475569"
          >
            ?
          </text>
        </motion.g>
      );

    case "exclamation":
      return (
        <motion.g
          animate={{ y: [0, -4, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle
            cx={420}
            cy={140}
            r={32}
            fill="#fde68a"
            stroke="#b45309"
            strokeWidth={3}
          />
          <text
            x={420}
            y={156}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={42}
            fontWeight={700}
            fill="#b45309"
          >
            !
          </text>
        </motion.g>
      );

    case "zzz":
      return (
        <motion.g variants={zzzVariants} animate="animate">
          {["Z", "z", "z"].map((ch, i) => (
            <text
              key={i}
              x={400 + i * 16}
              y={150 - i * 22}
              fontFamily="Arial, sans-serif"
              fontSize={36 - i * 6}
              fontWeight={700}
              fill="#94a3b8"
            >
              {ch}
            </text>
          ))}
        </motion.g>
      );

    case "none":
    default:
      return null;
  }
}

function AccessoryLayerInner({ accessory }: AccessoryLayerProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden
    >
      <AnimatePresence mode="wait">
        <motion.g
          key={accessory}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
        >
          <AccessoryContent accessory={accessory} />
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}

export const AccessoryLayer = memo(AccessoryLayerInner);
