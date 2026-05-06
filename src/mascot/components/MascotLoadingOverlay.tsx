"use client";

import { useContext } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MascotContext } from "@/src/mascot/engine/MascotProvider";
import catLoading from "@/src/mascot/assets/cat-loading.png";

interface MascotLoadingOverlayProps {
  message?: string;
  size?: number;
}

export function MascotLoadingOverlay({
  message = "A carregar...",
  size = 240,
}: MascotLoadingOverlayProps) {
  const ctx = useContext(MascotContext);
  const visible = !!ctx && ctx.visible && ctx.state === "loading";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mascot-loading-overlay"
          role="status"
          aria-live="polite"
          aria-busy
          className="fixed inset-0 z-[100] grid place-items-center bg-canvas/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            style={{ width: size, height: size }}
            className="relative"
            animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={catLoading}
              alt=""
              fill
              sizes={`${size}px`}
              priority
              draggable={false}
            />
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-ink-soft"
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
