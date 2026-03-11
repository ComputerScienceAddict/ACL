"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  {
    id: 3,
    title: "Garage Conversion",
    location: "Fresno, CA",
    images: [
      "/project3-1.png",
      "/project3-2.png",
      "/project3-3.png",
      "/project3-4.png",
      "/project3-5.png",
      "/project3-6.png",
      "/project3-7.png",
    ],
  },
  {
    id: 4,
    title: "Sink & Tub Refinishing",
    location: "Madera, CA",
    images: [
      "/project4-1.jpg",
      "/project4-2.jpg",
      "/project4-3.jpg",
      "/project4-4.jpg",
      "/project4-5.jpg",
      "/project4-6.jpg",
      "/project4-7.jpg",
      "/project4-8.jpg",
      "/project4-9.jpg",
    ],
  },
  {
    id: 1,
    title: "Bathroom Renovation",
    location: "Fresno, CA",
    images: [
      "/project-1.png",
      "/project-2.png",
      "/project-3.png",
      "/project-4.png",
    ],
  },
  {
    id: 2,
    title: "Stucco & Column Repair",
    location: "Clovis, CA",
    images: [
      "/project2-1.png",
      "/project2-2.png",
      "/project2-3.png",
      "/project2-4.png",
      "/project2-5.png",
    ],
  },
];

export default function ProjectGallery() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const project = projects[activeProject];
  const images = project.images;

  const next = useCallback(() => {
    if (activeImage < images.length - 1) {
      setActiveImage(activeImage + 1);
    } else if (activeProject < projects.length - 1) {
      setActiveProject(activeProject + 1);
      setActiveImage(0);
    }
  }, [activeImage, activeProject, images.length]);

  const prev = useCallback(() => {
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    } else if (activeProject > 0) {
      setActiveProject(activeProject - 1);
      setActiveImage(projects[activeProject - 1].images.length - 1);
    }
  }, [activeImage, activeProject]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-12 sm:py-16 md:py-24">
      {/* Accent glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-full -translate-x-1/2 bg-gradient-to-b from-[#00a8e8]/10 to-transparent blur-3xl" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header row */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[#00a8e8]/50 to-transparent" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00a8e8]">
                {String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl">
                  {project.title}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  {project.location}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveProject(i); setActiveImage(0); }}
                  className={`h-1.5 min-h-[12px] min-w-[12px] rounded-full transition-all duration-500 ${
                    i === activeProject ? "w-8 bg-[#00a8e8]" : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={prev}
                disabled={activeProject === 0 && activeImage === 0}
                className="flex size-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-500 transition-all hover:bg-[#00a8e8] hover:text-white disabled:opacity-30"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={activeProject === projects.length - 1 && activeImage === images.length - 1}
                className="flex size-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-500 transition-all hover:bg-[#00a8e8] hover:text-white disabled:opacity-30"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main image */}
        <div
          className="group relative cursor-pointer overflow-hidden bg-zinc-900"
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProject}-${activeImage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] md:aspect-[16/9]"
            >
              <img
                src={images[activeImage]}
                alt={project.title}
                className="absolute inset-0 size-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Image number */}
          <div className="absolute bottom-4 right-4 font-mono text-sm text-white/60">
            {activeImage + 1}/{images.length}
          </div>

          {/* Mobile nav */}
          <div className="absolute inset-y-0 left-0 flex w-1/3 items-center md:hidden" onClick={(e) => { e.stopPropagation(); prev(); }} />
          <div className="absolute inset-y-0 right-0 flex w-1/3 items-center justify-end md:hidden" onClick={(e) => { e.stopPropagation(); next(); }} />
        </div>

        {/* Thumbnail strip */}
        <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveImage(i)}
              className={`relative flex-shrink-0 overflow-hidden transition-opacity ${
                i === activeImage ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <img
                src={img}
                alt=""
                className="aspect-[4/3] h-14 w-auto object-cover md:h-16"
              />
              {i === activeImage && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#00a8e8]" />
              )}
            </button>
          ))}
        </div>

        {/* Project selector */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4 border-t border-zinc-800 pt-6 sm:justify-start sm:pt-8 md:gap-x-8">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveProject(i);
                setActiveImage(0);
              }}
              className={`min-h-[44px] px-1 text-sm transition-colors ${
                i === activeProject
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {p.title}
              {i === activeProject && (
                <span className="ml-2 text-[#00a8e8]">•</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black p-2 sm:p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-2 top-2 z-50 flex min-h-[48px] min-w-[48px] items-center justify-center p-2 text-zinc-500 hover:text-white sm:right-4 sm:top-4"
            >
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 z-50 flex min-h-[48px] min-w-[48px] -translate-y-1/2 items-center justify-center p-2 text-zinc-500 hover:text-white sm:left-4"
            >
              <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <motion.div
              key={`lb-${activeProject}-${activeImage}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[activeImage]}
                alt={project.title}
                className="max-h-[90vh] w-auto object-contain"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 z-50 flex min-h-[48px] min-w-[48px] -translate-y-1/2 items-center justify-center p-2 text-zinc-500 hover:text-white sm:right-4"
            >
              <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-zinc-500">
              {project.title} — {activeImage + 1}/{images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
