"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse" | "pingpong";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const vertex = /* glsl */ `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `#version 300 es
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uScale;
uniform float uSpeedMult;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 uv = (vUv - 0.5) * uScale + 0.5;
  uv += (uMouse - 0.5) * 0.1;
  vec2 p = uv * 10.0 - 5.0;
  float t = uTime * uSpeedMult;

  float v = 0.0;
  v += sin((p.x + t));
  v += sin((p.y + t) * 0.5);
  v += sin((p.x + p.y + t) * 0.5);
  vec2 c = p + t * 0.2;
  v += sin(sqrt(c.x * c.x + c.y * c.y) + t);
  v *= 0.25;
  v += 0.5;

  vec3 col = uColor * (1.0 + v * 0.5);
  float alpha = uOpacity * (0.5 + v * 0.3);

  fragColor = vec4(col, alpha);
}
`;

export default function Plasma({
  color = "#00a8e8",
  speed = 0.6,
  direction = "forward",
  scale = 1.1,
  opacity = 0.8,
  mouseInteractive = true,
}: PlasmaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
    container.appendChild(canvas);

    const renderer = new Renderer({
      canvas,
      width: container.offsetWidth,
      height: container.offsetHeight,
      dpr: Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1),
      alpha: true,
      depth: false,
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;

    const speedMult = direction === "reverse" ? -speed : speed;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: hexToRgb(color) },
        uOpacity: { value: opacity },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        uMouse: { value: [0.5, 0.5] },
        uScale: { value: scale },
        uSpeedMult: { value: direction === "pingpong" ? Math.abs(Math.sin(0) * speed) : speedMult },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    meshRef.current = mesh;

    let animationId: number;
    let startTime = performance.now();

    const resize = () => {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / (typeof window !== "undefined" ? window.innerWidth : 1),
        y: 1 - e.clientY / (typeof window !== "undefined" ? window.innerHeight : 1),
      };
    };

    if (mouseInteractive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      const t = (performance.now() - startTime) * 0.001;
      program.uniforms.uTime.value = t;
      program.uniforms.uOpacity.value = opacity;
      program.uniforms.uColor.value = hexToRgb(color);
      program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
      program.uniforms.uScale.value = scale;

      if (direction === "pingpong") {
        program.uniforms.uSpeedMult.value = Math.sin(t) * speed;
      }

      renderer.render({ scene: mesh });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (mouseInteractive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      container?.removeChild(canvas);
      rendererRef.current = null;
      meshRef.current = null;
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ width: "100%", height: "100%", position: "relative" }}
      aria-hidden
    />
  );
}
