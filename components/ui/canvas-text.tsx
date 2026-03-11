"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface CanvasTextProps {
  text: string;
  className?: string;
  backgroundClassName?: string;
  colors?: string[];
  lineGap?: number;
  animationDuration?: number;
  lineWidth?: number;
  fontSize?: string;
  fontFamily?: string;
}

const DEFAULT_FONT_SIZE = "clamp(2.25rem, 5vw, 3.75rem)";

export function CanvasText({
  text,
  className,
  backgroundClassName = "bg-[#00a8e8]",
  colors = [
    "rgba(0, 168, 232, 1)",
    "rgba(0, 168, 232, 0.9)",
    "rgba(0, 168, 232, 0.8)",
    "rgba(0, 168, 232, 0.7)",
    "rgba(0, 168, 232, 0.6)",
    "rgba(0, 168, 232, 0.5)",
    "rgba(0, 168, 232, 0.4)",
    "rgba(0, 168, 232, 0.3)",
    "rgba(0, 168, 232, 0.2)",
    "rgba(0, 168, 232, 0.1)",
  ],
  lineGap = 4,
  animationDuration = 20,
  lineWidth = 2,
  fontSize = DEFAULT_FONT_SIZE,
  fontFamily = "var(--font-dm-serif), Georgia, serif",
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [computedFontSize, setComputedFontSize] = useState("2.25rem");
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  const drawCurvedLines = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { width, height } = dimensions;
      const gap = lineGap;
      const cx = width / 2;
      const cy = height / 2;
      const t = (timeRef.current / 1000) * (600 / animationDuration);

      for (let i = -height; i < height * 2; i += gap) {
        const colorIndex = Math.abs(Math.floor((i + t * 30) / gap)) % colors.length;
        ctx.strokeStyle = colors[colorIndex];
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        const y0 = i + (Math.sin(t * 0.5) * 20);
        ctx.moveTo(0, y0);
        ctx.bezierCurveTo(
          cx * 0.5 + Math.sin(t + i * 0.02) * 40,
          cy + Math.cos(t * 0.3 + i * 0.01) * 30,
          cx * 1.5 + Math.cos(t * 0.4 + i * 0.015) * 40,
          cy + Math.sin(t * 0.35 + i * 0.02) * 30,
          width + 50,
          y0 + Math.sin(t + i * 0.03) * 15
        );
        ctx.stroke();
      }
    },
    [colors, dimensions, lineGap, lineWidth, animationDuration]
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      const computed = getComputedStyle(container);
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio ?? 1 : 1;
      const w = Math.ceil(rect.width * dpr);
      const h = Math.ceil(rect.height * dpr);
      setDimensions({ width: rect.width, height: rect.height });
      setComputedFontSize(computed.fontSize || "36px");
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const rafId = requestAnimationFrame(() => {
      measure();
    });
    const ro = new ResizeObserver(measure);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio ?? 1 : 1;
    const w = canvas.width;
    const h = canvas.height;

    const loop = () => {
      timeRef.current = performance.now();

      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      ctx.font = `500 ${computedFontSize} ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.fillText(text, dimensions.width / 2, dimensions.height / 2);

      ctx.globalCompositeOperation = "source-in";
      drawCurvedLines(ctx);
      ctx.globalCompositeOperation = "source-over";

      ctx.restore();

      animationRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, text, computedFontSize, fontFamily, drawCurvedLines]);

  const style = {
    fontSize,
    fontFamily,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  };

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block", backgroundClassName, className)}
      style={{ ...style, fontWeight: 500 }}
    >
      <span className="inline-block text-white" aria-hidden>
        {text}
      </span>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block size-full"
        aria-hidden
      />
    </span>
  );
}
