import Image from "next/image";
import Plasma from "@/components/Plasma";
import TrueFocus from "@/components/TrueFocus";
import GooeyNav from "@/components/GooeyNav";
import ProjectGallery from "@/components/ProjectGallery";
import Testimonials from "@/components/Testimonials";
import { FadeIn } from "@/components/FadeIn";
import { CanvasText } from "@/components/ui/canvas-text";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const telLink = "tel:+15599054991";
  const smsLink = "sms:+15599054991";
  const email = "aclrenovationsrepair@yahoo.com";
  const mailLink = `mailto:${email}`;
  const facebookUrl = "https://www.facebook.com/aclrenovationsandrepairs";
  const instagramUrl = "https://www.instagram.com/acl_renovation_and_repairs";

  const services = [
    "Plumbing",
    "Electrical",
    "Painting",
    "HVAC",
    "Honey do lists",
    "Window screens",
    "Appliance install",
    "Gutter install & cleaning",
    "Trash haul",
    "Demos & Remodels",
    "Building maintenance",
    "Wood siding install & repairs",
    "Wood flooring install",
    "Light fixture install & replacement",
    "Dryer vent cleaning",
    "Pressure washing",
    "Stucco & exterior repairs",
    "& More",
  ];

  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      {/* Plasma background */}
      <div className="fixed inset-0 z-0">
        <Plasma
          color="#00a8e8"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={true}
        />
      </div>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:px-8">
          <a href="#" className="flex items-center gap-3 no-underline">
            <Image
              src="/logo.jpg"
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 object-cover"
            />
            <span className="text-base font-semibold tracking-tight text-white">
              ACL
            </span>
            <span className="text-zinc-500">/</span>
            <span className="text-sm text-zinc-400">
              Renovation Repairs
            </span>
          </a>

          <div className="hidden md:flex md:justify-self-center">
            <GooeyNav items={navItems} initialActiveIndex={0} />
          </div>

          <a
            href={telLink}
            className="flex justify-end font-mono text-[13px] tracking-[0.12em] text-zinc-400 hover:text-white md:justify-self-end"
          >
            559 · 905 · 4991
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero / Masthead */}
        <section className="relative overflow-hidden bg-black px-6 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="absolute inset-0" aria-hidden>
            <Plasma
              color="#00a8e8"
              speed={0.6}
              direction="forward"
              scale={1.1}
              opacity={0.8}
              mouseInteractive={true}
            />
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <FadeIn direction="up" delay={0} trigger="mount">
              <p className="mb-6 text-sm uppercase tracking-[0.2em] text-[#00a8e8]">
                When a U-Haul thinks your property is a bumper car… we fix it
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.1} trigger="mount">
            <h1 className="text-4xl font-medium leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl">
              <CanvasText
                text="Stucco cracks, dents, or damage?"
                fontSize="1em"
                fontFamily="var(--font-syne), sans-serif"
                backgroundClassName="bg-transparent"
                colors={[
                  "rgba(0, 168, 232, 1)",
                  "rgba(0, 168, 232, 0.9)",
                  "rgba(0, 168, 232, 0.8)",
                  "rgba(0, 168, 232, 0.7)",
                  "rgba(0, 168, 232, 0.6)",
                  "rgba(0, 168, 232, 0.5)",
                  "rgba(0, 168, 232, 0.4)",
                  "rgba(0, 168, 232, 0.3)",
                  "rgba(255, 255, 255, 0.9)",
                  "rgba(255, 255, 255, 0.6)",
                ]}
                lineGap={4}
                animationDuration={20}
              />
            </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} trigger="mount">
            <h2 className="mt-5 text-2xl text-[#00a8e8] md:text-3xl lg:text-4xl">
              <TrueFocus
                sentence="We make it look brand new"
                manualMode={false}
                blurAmount={3}
                borderColor="#00a8e8"
                glowColor="#00a8e8"
                animationDuration={0.5}
                pauseBetweenAnimations={1.5}
              />
            </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} trigger="mount">
            <p className="mx-auto mt-10 max-w-lg text-base leading-relaxed text-zinc-400">
              Repairs and renovations across the Central Valley.
            </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.4} trigger="mount">
            {/* CTA */}
            <div className="mt-20">
              <a
                href={telLink}
                className="group inline-block border-b-2 border-[#00a8e8]/30 pb-2 font-mono text-3xl tracking-tight text-white transition-all hover:border-[#00a8e8] md:text-4xl"
              >
                (559) 905-4991
              </a>
              <p className="mt-4 text-zinc-500">
                <a href={telLink} className="hover:text-white">Call</a>
                {" or "}
                <a href={smsLink} className="hover:text-white">text</a>
                {" for a free quote"}
              </p>
            </div>
            </FadeIn>
          </div>
        </section>

        {/* Project Gallery */}
        <FadeIn>
          <ProjectGallery />
        </FadeIn>

        {/* Services */}
        <section id="services" className="relative overflow-hidden bg-black px-6 py-28">
          {/* Background elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[#00a8e8]/5 blur-[100px]" />
            <div className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-[#00a8e8]/5 blur-[80px]" />
          </div>
          
          <div className="relative mx-auto max-w-6xl">
            <FadeIn direction="up">
              <div className="mb-20 max-w-3xl">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#00a8e8]">
                  Services
                </p>
                <h2 className="text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                  We handle repairs, renovations, and installs across the{" "}
                  <span className="text-[#00a8e8]">Central Valley</span>
                </h2>
                <p className="mt-6 max-w-xl text-lg text-zinc-400">
                  Stucco damage, bathroom remodels, garage conversions, sink refinishing—if it needs fixing or upgrading, we do it.
                </p>
              </div>
            </FadeIn>
            
            <div className="space-y-0">
              <FadeIn direction="up" delay={0.1}>
                <div className="group border-b border-zinc-800 py-8 transition-colors hover:border-zinc-600 md:py-10">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <h3 className="text-xl text-white md:text-2xl">Home Repairs</h3>
                    <p className="text-zinc-500 md:max-w-md md:text-right">
                      Leaks, drywall, doors, fences—whatever breaks, we fix it
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={0.2}>
                <div className="group border-b border-zinc-800 py-8 transition-colors hover:border-zinc-600 md:py-10">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <h3 className="text-xl text-white md:text-2xl">Renovations</h3>
                    <p className="text-zinc-500 md:max-w-md md:text-right">
                      Bathrooms, kitchens, garages—full remodels done right
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={0.3}>
                <div className="group border-b border-zinc-800 py-8 transition-colors hover:border-zinc-600 md:py-10">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <h3 className="text-xl text-white md:text-2xl">Installs</h3>
                    <p className="text-zinc-500 md:max-w-md md:text-right">
                      Flooring, fixtures, appliances, window screens
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={0.4}>
                <div className="group border-b border-zinc-800 py-8 transition-colors hover:border-[#00a8e8]/40 md:py-10">
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <h3 className="text-xl text-[#00a8e8] md:text-2xl">Stucco & Exterior</h3>
                    <p className="text-zinc-400 md:max-w-md md:text-right">
                      Cracks, dents, impact damage—texture matching experts
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.5}>
              <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  Everything else
                </p>
                <p className="max-w-4xl text-zinc-400">
                  {services.slice(0, -1).join(" · ")} · and more. If you&apos;re not sure, just ask.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Testimonials */}
        <FadeIn>
          <Testimonials />
        </FadeIn>

        {/* Contact */}
        <FadeIn>
        <section id="contact" className="border-t border-white/5 bg-zinc-950 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-zinc-400">Get in touch</p>
            <a
              href={telLink}
              className="mt-6 block font-mono text-4xl text-white hover:text-[#00a8e8] md:text-5xl"
            >
              (559) 905-4991
            </a>
            <a
              href={mailLink}
              className="mt-4 inline-block text-zinc-500 hover:text-white"
            >
              {email}
            </a>
            <div className="mt-10 flex items-center justify-center gap-8">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white" aria-label="Facebook">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white" aria-label="Instagram">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            <p className="mt-12 text-xs text-zinc-700">
              Esteban Laureno · CSLB #1120817 · Licensed & Insured
            </p>
          </div>
        </section>
        </FadeIn>

        {/* Footer */}
        <FadeIn>
        <footer className="border-t border-white/5 bg-black px-6 py-10">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.jpg"
                alt="ACL Renovation Repairs"
                width={36}
                height={36}
                className="size-9 object-cover"
              />
              <span className="text-sm text-zinc-600">ACL Renovation Repairs</span>
            </div>
            <a href={telLink} className="font-mono text-sm text-zinc-500 hover:text-white">
              559-905-4991
            </a>
          </div>
        </footer>
        </FadeIn>
      </main>
    </div>
  );
}
