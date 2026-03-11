"use client";

import React, { useEffect, useState } from "react";

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  initialActiveIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let newIndex = 0;
      for (let i = items.length - 1; i >= 0; i--) {
        const href = items[i]?.href;
        if (!href || href === "#") {
          if (i > 0) continue;
          newIndex = 0;
          break;
        }
        const el = document.querySelector(href) as HTMLElement | null;
        if (el && el.offsetTop <= scrollY) {
          newIndex = i;
          break;
        }
      }
      setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <nav className="relative flex">
      <ul className="m-0 flex list-none items-center gap-1 px-0 py-0 md:gap-1">
        {items.map((item, index) => (
          <li key={item.href} className="relative">
            <a
              href={item.href}
              onClick={() => setActiveIndex(index)}
              className={`relative inline-block px-4 py-2.5 text-[13px] font-medium tracking-wide outline-none transition-colors ${
                activeIndex === index
                  ? "text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {item.label}
              {activeIndex === index && (
                <span
                  className="absolute inset-0 -z-10 rounded-md bg-white/15"
                  aria-hidden
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GooeyNav;
