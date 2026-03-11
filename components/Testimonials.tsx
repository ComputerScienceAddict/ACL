"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  {
    name: "Maria G.",
    location: "Fresno",
    body: "Esteban fixed our stucco after someone backed into the wall. You can't even tell there was damage—the texture match is perfect. Came out same week we called.",
    initials: "MG",
  },
  {
    name: "Robert T.",
    location: "Clovis",
    body: "Had him refinish our old kitchen sink instead of replacing it. Saved us a ton of money and it looks brand new. Very professional, showed up when he said he would.",
    initials: "RT",
  },
  {
    name: "Jennifer L.",
    location: "Madera",
    body: "Did our whole bathroom remodel—tile, vanity, everything. Fair pricing and the crew left the place cleaner than when they started. Would hire again.",
    initials: "JL",
  },
  {
    name: "David R.",
    location: "Fresno",
    body: "Had a column on our garage that got hit. Thought we'd need to tear the whole thing down. They patched it, matched the stucco, and you'd never know. Solid work.",
    initials: "DR",
  },
  {
    name: "Sandra M.",
    location: "Kerman",
    body: "Replaced our gutters and did some exterior painting. Clean job site, no mess left behind. Texted back fast when we had questions. Recommend.",
    initials: "SM",
  },
  {
    name: "Mike H.",
    location: "Fresno",
    body: "Sink refinishing looked amazing. Way cheaper than a full replacement. Would definitely use them again for other projects.",
    initials: "MH",
  },
];

const firstRow = reviews.slice(0, 3);
const secondRow = reviews.slice(3, 6);

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewCard({
  name,
  location,
  body,
  initials,
}: {
  name: string;
  location: string;
  body: string;
  initials: string;
}) {
  return (
    <figure
      className={cn(
        "relative h-full w-[280px] shrink-0 cursor-default overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-md sm:w-72 sm:p-5"
      )}
    >
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} className="size-5 text-[#D32323]" />
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-zinc-800">
        &ldquo;{body}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-zinc-900">{name}</p>
          <p className="text-xs text-zinc-500">{location} · 5-star review</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="border-t border-zinc-200 bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-zinc-400 sm:mb-12">
        What people are saying
      </p>
      <div className="relative flex w-full flex-col gap-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.initials} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.initials} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
