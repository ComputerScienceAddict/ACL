"use client";

import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "in" | "left" | "right";
  trigger?: "view" | "mount";
}

export function FadeIn({ children, className, delay = 0, direction = "up", trigger = "view" }: FadeInProps) {
  const variants = {
    up: fadeUp,
    in: fadeIn,
    left: {
      initial: { opacity: 0, x: -24 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
    right: {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const v = variants[direction];

  return (
    <motion.div
      initial={v.initial}
      {...(trigger === "mount" ? { animate: v.animate } : { whileInView: v.animate, viewport: { once: true, margin: "-60px" } })}
      transition={{ ...v.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
