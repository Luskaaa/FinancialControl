"use client";

import { motion } from "motion/react";

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  delay?: number;
}

export default function Section({
  title,
  description,
  children,
  delay = 0,
}: SectionProps) {
  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5"
      >
        <h2 className="text-ink text-xl md:text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-ink-soft text-sm mt-1 max-w-prose">
            {description}
          </p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
