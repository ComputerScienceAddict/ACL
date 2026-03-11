"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#5227FF",
  glowColor,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(separator).filter(Boolean);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const effectiveGlowColor = glowColor ?? borderColor;

  useEffect(() => {
    if (manualMode || words.length <= 1) return;
    const totalDuration = (animationDuration + pauseBetweenAnimations) * 1000;
    const interval = setInterval(
      () => setFocusedIndex((prev) => (prev + 1) % words.length),
      totalDuration
    );
    return () => clearInterval(interval);
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="relative inline-block cursor-pointer rounded px-1"
          style={{
            display: "inline-block",
          }}
          onClick={() => manualMode && setFocusedIndex(index)}
          animate={{
            filter: `blur(${index === focusedIndex ? 0 : blurAmount}px)`,
            scale: index === focusedIndex ? 1.02 : 1,
            boxShadow:
              index === focusedIndex
                ? `0 0 0 2px ${borderColor}, 0 0 16px ${effectiveGlowColor}50`
                : "0 0 0 0 transparent",
          }}
          transition={{
            duration: animationDuration,
            ease: "easeInOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default TrueFocus;
