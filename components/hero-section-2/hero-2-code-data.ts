import type { FileItem } from "@/components/interactive-file-tree/types";

const HERO_2_CODE = `"use client";

import * as React from "react";
import { motion } from "motion/react";
import { NavbarHero2 } from "./navbar";
import { Button } from "@/components/ui/button";
import {
  OpenAI,
  Anthropic,
  Replicate,
  GitHub,
  Vercel,
  Grok,
} from "@/components/logos/all-logos";

interface Hero2Props {
  onGetStarted?: () => void;
  onViewDemo?: () => void;
  onLogin?: () => void;
}

const logoItemVariants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Hero2({ onGetStarted, onViewDemo, onLogin }: Hero2Props) {
  return (
    <section className="w-full min-h-screen bg-white dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 font-[family-name:var(--font-jakarta-display)] select-none px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
      {/* Centered Architecture Container with continuous vertical border lines running down */}
      <div className="w-full max-w-[1240px] 2xl:max-w-[1360px] mx-auto border-x border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] flex flex-col min-h-screen">
        {/* Top Navbar - Kept steady and un-animated as requested */}
        <NavbarHero2
          onLoginClick={onLogin}
          onGetStartedClick={onGetStarted}
        />

        {/* Hero Header Section: Headline Left + Description & CTA Right */}
        <div className="w-full px-6 sm:px-8 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-6 lg:gap-8 xl:gap-12">
            {/* Left: h3 headline with micro blur-to-focus fade per line */}
            <div className="flex-1 min-w-0 flex flex-col items-start justify-between">
              <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] xl:text-[2.85rem] leading-[1.08] tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 font-[family-name:var(--font-jakarta-display)] m-0">
                <motion.span
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Create, Manage and
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Publish Content in
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  One Fast Workspace
                </motion.span>
              </h3>
            </div>

            {/* Right: Lead paragraph + side-by-side buttons with subtle micro-stagger */}
            <div className="w-full lg:w-[380px] xl:w-[430px] 2xl:w-[470px] flex-shrink-0 flex flex-col justify-between gap-4">
              <motion.p
                initial={{ opacity: 0, y: 8, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base lg:text-[0.875rem] xl:text-[0.95rem] text-zinc-600 dark:text-zinc-400 font-normal tracking-[-0.03em] leading-[1.5] m-0 font-[family-name:var(--font-jakarta-display)]"
              >
                Create, organize, collaborate and publish your content in one workspace that helps you understand more, connect workflows and ship with confidence.
              </motion.p>

              {/* Action Buttons: side by side across all screens with micro blur fade */}
              <motion.div
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-row items-center gap-2.5 sm:gap-3 w-full"
              >
                <Button
                  onClick={onGetStarted}
                  className="flex-1 sm:flex-initial rounded-none bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 font-normal tracking-[-0.03em] text-xs sm:text-sm h-9 lg:h-9.5 xl:h-10 px-3.5 sm:px-5 shadow-none inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-all duration-150 active:scale-[0.98]"
                >
                  <span>Get started</span>
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  onClick={onViewDemo}
                  className="flex-1 sm:flex-initial rounded-none border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-normal tracking-[-0.03em] text-xs sm:text-sm h-9 lg:h-9.5 xl:h-10 px-3.5 sm:px-5 shadow-none inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-all duration-150 active:scale-[0.98]"
                >
                  <span>View demo</span>
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hero Image: Framed between vertical grid lines with subtle optical reveal */}
        <div className="w-full border-t border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)", scale: 0.99 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-auto overflow-hidden"
          >
            <img
              src="/hero-img.png"
              alt="Zuris CMS Dashboard"
              className="w-full h-auto block rounded-none select-none"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        {/* Logos Ribbon: Staggered entrance when scrolled into view */}
        <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-zinc-200 dark:divide-zinc-800 items-stretch"
          >
            {/* OpenAI */}
            <motion.div
              variants={logoItemVariants}
              className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div className="w-22 sm:w-26 lg:w-28 flex items-center justify-center dark:invert dark:brightness-100 opacity-90 group-hover:opacity-100 transition-all duration-200 group-hover:scale-[1.03]">
                <OpenAI className="w-full h-auto max-h-5 sm:max-h-6" />
              </div>
            </motion.div>

            {/* Anthropic */}
            <motion.div
              variants={logoItemVariants}
              className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div className="w-28 sm:w-32 lg:w-36 flex items-center justify-center dark:invert dark:brightness-100 opacity-85 group-hover:opacity-100 transition-all duration-200 group-hover:scale-[1.03]">
                <Anthropic className="w-full h-auto max-h-6 sm:max-h-7" />
              </div>
            </motion.div>

            {/* Replicate */}
            <motion.div
              variants={logoItemVariants}
              className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div className="w-28 sm:w-32 lg:w-36 flex items-center justify-center dark:invert dark:brightness-100 opacity-85 group-hover:opacity-100 transition-all duration-200 group-hover:scale-[1.03]">
                <Replicate className="w-full h-auto max-h-6 sm:max-h-7" />
              </div>
            </motion.div>

            {/* GitHub */}
            <motion.div
              variants={logoItemVariants}
              className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div className="w-18 sm:w-20 flex items-center justify-center dark:invert dark:brightness-100 opacity-85 group-hover:opacity-100 transition-all duration-200 group-hover:scale-[1.03]">
                <GitHub className="w-full h-auto max-h-5 sm:max-h-5.5" />
              </div>
            </motion.div>

            {/* Vercel */}
            <motion.div
              variants={logoItemVariants}
              className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div className="w-22 sm:w-26 lg:w-28 flex items-center justify-center dark:invert dark:brightness-100 opacity-90 group-hover:opacity-100 transition-all duration-200 group-hover:scale-[1.03]">
                <Vercel className="w-full h-auto max-h-5 sm:max-h-6" />
              </div>
            </motion.div>

            {/* Grok */}
            <motion.div
              variants={logoItemVariants}
              className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div className="w-24 sm:w-28 lg:w-32 flex items-center justify-center dark:invert dark:brightness-100 opacity-85 group-hover:opacity-100 transition-all duration-200 group-hover:scale-[1.03]">
                <Grok className="w-full h-auto max-h-7 sm:max-h-8" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Clean extension area below logos so vertical lines continue down */}
        <div className="w-full flex-1 bg-white dark:bg-[#09090b] min-h-[4rem]" />
      </div>
    </section>
  );
}

export default Hero2;`;

const NAVBAR_CODE = `"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ZurisBlackV1 } from "@/components/ui/zuris-black-v1";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";

interface NavbarHero2Props {
  onLoginClick?: () => void;
  onGetStartedClick?: () => void;
}

export function NavbarHero2({
  onLoginClick,
  onGetStartedClick,
}: NavbarHero2Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll smoothly when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted
    ? resolvedTheme === "dark"
    : typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark")
    : false;

  return (
    <>
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md sticky top-0 z-50 font-[family-name:var(--font-jakarta-display)] select-none">
        <div className="w-full flex items-stretch justify-between h-14 sm:h-16">
          {/* Left: Square box containing Zuris Logo & Text */}
          <div
            className={\`flex items-center gap-2.5 px-6 sm:px-8 border-r border-zinc-200 dark:border-zinc-800 select-none h-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] \${
              mobileMenuOpen
                ? "-translate-x-3 sm:-translate-x-4 md:translate-x-0"
                : "translate-x-0"
            }\`}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2.5 text-zinc-950 dark:text-zinc-50 no-underline cursor-pointer"
              aria-label="Zuris Home"
            >
              <ZurisBlackV1
                className="h-5 sm:h-5.5 w-auto text-zinc-950 dark:hidden"
                aria-hidden="true"
              />
              <ZurisWhiteV1
                className="h-5 sm:h-5.5 w-auto text-zinc-50 hidden dark:block"
                aria-hidden="true"
              />
              <span className="font-semibold text-base sm:text-lg tracking-[-0.03em] leading-none">
                Zuris
              </span>
            </a>
          </div>

          {/* Center: CMS SaaS Navigation Links */}
          <nav
            className="hidden md:flex items-center justify-center gap-8 lg:gap-10 px-8 flex-1"
            aria-label="Hero Navigation"
          >
            <a
              href="#features"
              className="text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 tracking-[-0.03em] transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 tracking-[-0.03em] transition-colors"
            >
              Templates
            </a>
            <a
              href="#integrations"
              className="text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 tracking-[-0.03em] transition-colors"
            >
              Integrations
            </a>
            <a
              href="#pricing"
              className="text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 tracking-[-0.03em] transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* Right Desktop Actions: Login + Theme Switcher */}
          <div className="hidden md:flex items-stretch">
            <Button
              type="button"
              variant="ghost"
              onClick={onLoginClick}
              className="flex items-center justify-center px-6 h-full border-0 border-l border-zinc-200 dark:border-zinc-800 text-sm font-normal text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 tracking-[-0.03em] cursor-pointer transition-colors rounded-none shadow-none !translate-y-0 active:!translate-y-0 active:!transform-none"
              style={{ transform: "none" }}
            >
              Login
            </Button>

            <Button
              type="button"
              onClick={toggleTheme}
              className="w-[124px] min-w-[124px] rounded-none border-0 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 font-normal tracking-[-0.03em] text-sm h-full shadow-none cursor-pointer flex items-center justify-center transition-colors !translate-y-0 active:!translate-y-0 active:!transform-none"
              style={{ transform: "none" }}
              aria-label="Toggle theme"
            >
              <span suppressHydrationWarning className="inline-block text-center whitespace-nowrap">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            </Button>
          </div>

          {/* Mobile: In-place Morphing Hamburger/Cross Button */}
          <div className="flex md:hidden items-stretch">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={\`flex items-center justify-center px-5 border-0 border-l border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 cursor-pointer rounded-none focus:outline-none h-full shadow-none bg-transparent hover:bg-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-0 \${
                mobileMenuOpen
                  ? "translate-x-3 sm:translate-x-4 md:translate-x-0"
                  : "translate-x-0"
              }\`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
                <span
                  className={\`w-5 h-[1.8px] bg-zinc-950 dark:bg-zinc-50 rounded-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center \${
                    mobileMenuOpen
                      ? "translate-y-[7.1px] rotate-45"
                      : "translate-y-0 rotate-0"
                  }\`}
                />
                <span
                  className={\`w-5 h-[1.8px] bg-zinc-950 dark:bg-zinc-50 rounded-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] \${
                    mobileMenuOpen
                      ? "opacity-0 blur-[1px] scale-x-0"
                      : "opacity-100 blur-0 scale-x-100"
                  }\`}
                />
                <span
                  className={\`w-5 h-[1.8px] bg-zinc-950 dark:bg-zinc-50 rounded-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center \${
                    mobileMenuOpen
                      ? "-translate-y-[7.1px] -rotate-45"
                      : "translate-y-0 rotate-0"
                  }\`}
                />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={\`fixed inset-x-0 top-14 sm:top-16 bottom-0 z-40 md:hidden flex flex-col justify-between bg-white/45 dark:bg-[#09090b]/50 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden font-[family-name:var(--font-jakarta-display)] border-b border-zinc-200/60 dark:border-zinc-800/60 \${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-3 pointer-events-none invisible"
        }\`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-35 mix-blend-overlay"
          style={{
            backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\`,
          }}
        />

        <div className="relative z-10 px-8 py-10 flex-1 flex flex-col justify-center gap-6">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 tracking-[-0.03em] transition-colors"
          >
            Features
          </a>
          <a
            href="#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 tracking-[-0.03em] transition-colors"
          >
            Templates
          </a>
          <a
            href="#integrations"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 tracking-[-0.03em] transition-colors"
          >
            Integrations
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 tracking-[-0.03em] transition-colors"
          >
            Pricing
          </a>
        </div>

        <div className="relative z-10 p-6 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/30 dark:bg-[#09090b]/40 backdrop-blur-md flex flex-col gap-3">
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              onGetStartedClick?.();
            }}
            className="w-full rounded-none bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 font-normal tracking-[-0.03em] text-sm h-11 shadow-none cursor-pointer flex items-center justify-center"
          >
            Get started
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setMobileMenuOpen(false);
              onLoginClick?.();
            }}
            className="w-full rounded-none border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-white/40 dark:hover:bg-zinc-900/40 font-normal tracking-[-0.03em] text-sm h-11 cursor-pointer flex items-center justify-center transition-colors shadow-none"
          >
            Login
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={toggleTheme}
            className="w-full rounded-none border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-white/40 dark:hover:bg-zinc-900/40 font-normal tracking-[-0.03em] text-xs h-10 cursor-pointer flex items-center justify-between px-4 transition-colors shadow-none !translate-y-0 active:!translate-y-0 active:!transform-none"
            style={{ transform: "none" }}
          >
            <span>Switch Theme</span>
            <span suppressHydrationWarning className="font-normal text-zinc-950 dark:text-zinc-50">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}`;

const INDEX_CODE = `export { Hero2 } from "./hero-2";
export { NavbarHero2 } from "./navbar";
`;

const ALL_LOGOS_CODE = `import { OpenAI } from "./openai";
import { Anthropic } from "./anthropic";
import { Replicate } from "./relicate";
import { GitHub } from "./github";
import { Vercel } from "./vercel";
import { Grok } from "./grok";

export { OpenAI, Anthropic, Replicate, GitHub, Vercel, Grok };
`;

const OPENAI_CODE = `import type { SVGProps } from "react";

const OpenAI = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="203.5 150.3 953 310.2" fill="none">
    <path
      d="M305.335 203.56C361.438 203.56 407.109 249.232 407.109 305.335C407.109 361.438 361.438 407.11 305.335 407.11C249.232 407.11 203.56 361.438 203.56 305.335C203.56 249.232 249.232 203.56 305.335 203.56ZM305.898 370.459C339.729 370.459 367.64 343.395 367.64 305.335C367.64 267.275 339.729 240.21 305.898 240.21H304.771C270.94 240.21 243.029 267.275 243.029 305.335C243.029 343.395 270.94 370.459 304.771 370.459H305.898Z"
      fill="black"
    />
    <path
      d="M427.223 460.393V263.046H463.873V277.706C472.049 268.121 486.991 259.945 506.726 259.945C546.195 259.945 576.643 292.366 576.643 333.527C576.643 374.688 546.195 407.11 506.726 407.11C486.991 407.11 472.049 398.934 463.873 389.348V460.393H427.223ZM501.933 374.688C522.513 374.688 539.993 358.619 539.993 333.809C539.993 309 522.513 292.366 501.933 292.366H500.805C480.225 292.366 462.745 309 462.745 333.809C462.745 358.619 480.225 374.688 500.805 374.688H501.933Z"
      fill="black"
    />
    <path
      d="M663.877 407.11C622.152 407.11 591.704 376.944 591.704 334.091C591.704 291.239 623.843 259.945 663.877 259.945C703.91 259.945 734.922 288.701 734.922 336.347C734.922 339.448 734.922 342.549 734.64 345.932H628.354C628.918 358.9 641.323 377.508 662.467 377.508H663.595C679.101 377.508 690.941 369.05 695.734 359.746H732.948C726.464 381.454 704.192 407.11 663.877 407.11ZM697.426 319.149C696.298 304.207 683.329 289.547 663.595 289.547H662.467C644.424 289.547 631.455 303.925 628.636 319.149H697.426Z"
      fill="black"
    />
    <path
      d="M755.125 404.008V263.046H791.776V277.706C799.67 268.403 814.33 259.945 832.655 259.945C865.64 259.945 887.63 281.935 887.63 318.585V404.008H850.98V323.096C850.98 303.643 839.985 292.648 822.787 292.648H821.66C803.898 292.648 791.776 308.436 791.776 329.016V404.008H755.125Z"
      fill="black"
    />
    <path
      d="M900.385 404.008L981.297 206.661H1025.84L1104.78 404.008H1063.62L1046.7 360.874H957.334L940.136 404.008H900.385ZM970.584 327.043H1033.45L1002.16 247.54L970.584 327.043Z"
      fill="black"
    />
    <path
      d="M1117.53 404.008V206.661H1156.44V404.008H1117.53Z"
      fill="black"
    />
  </svg>
);

export { OpenAI };
`;

const ANTHROPIC_CODE = `import type { SVGProps } from "react";

const Anthropic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fillRule="evenodd"
    style={{ flex: "none", lineHeight: "1" }}
    viewBox="0 0 182 24"
  >
    <title>Anthropic</title>
    <path d="M38.247 15.874L29.553 2.338H24.86v19.337h4.002V8.139l8.694 13.536h4.693V2.338h-4.003v13.536zm7.313-9.807h6.487v15.608h4.14V6.067h6.487v-3.73H45.56v3.73zm33.686 3.978h-9.109V2.338h-4.14v19.337h4.14v-7.9h9.109v7.9h4.14V2.338h-4.14v7.707zm13.39-3.978h5.108c2.043 0 3.12.746 3.12 2.155 0 1.408-1.077 2.154-3.12 2.154h-5.107v-4.31zm12.37 2.155c0-3.647-2.679-5.884-7.068-5.884h-9.443v19.337h4.142v-7.57h4.61l4.142 7.57h4.583l-4.586-8.146c2.302-.885 3.62-2.75 3.62-5.307zm12.686 9.91c-3.257 0-5.244-2.32-5.244-6.104 0-3.84 1.987-6.16 5.244-6.16 3.23 0 5.189 2.32 5.189 6.16 0 3.784-1.96 6.105-5.189 6.105zm0-16.132c-5.575 0-9.522 4.144-9.522 10.028 0 5.828 3.947 9.972 9.522 9.972 5.547 0 9.466-4.144 9.466-9.972C127.158 6.144 123.24 2 117.692 2zm22.59 8.929h-5.109V6.067h5.11c2.043 0 3.12.829 3.12 2.43 0 1.603-1.077 2.432-3.12 2.432zm.194-8.591h-9.445v19.337h4.142v-7.017h5.303c4.39 0 7.07-2.32 7.07-6.16 0-3.84-2.68-6.16-7.07-6.16zm35.108 12.839c-.718 1.878-2.153 2.956-4.113 2.956-3.257 0-5.244-2.32-5.244-6.105 0-3.84 1.987-6.16 5.244-6.16 1.96 0 3.395 1.077 4.113 2.955h4.388C178.896 4.68 175.667 2 171.472 2c-5.576 0-9.523 4.144-9.523 10.028 0 5.828 3.947 9.972 9.522 9.972 4.223 0 7.453-2.707 8.529-6.823h-4.416zm-26.39-12.84l7.705 19.338h4.225L153.42 2.338h-4.225zM9.277 14.024l2.636-6.796 2.637 6.796H9.276zm.428-11.685L2 21.675h4.307l1.576-4.06h8.06l1.575 4.06h4.307L14.121 2.338H9.704z" />
  </svg>
);

export { Anthropic };
`;

const REPLICATE_CODE = `import type { SVGProps } from "react";

const Replicate = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 831 192">
    <path d="M197.3 64.2C220.5 64.2 240 79.6 240 108.2C240 110.1 240 111.7 239.8 114.6H170.1C171 129.1 182.7 138.7 197.4 138.7C209.8 138.7 218.1 133 222.7 125.2L237.6 135.8C229.6 148.4 215.8 156.4 197.2 156.4C170.3 156.4 150.9 137.3 150.9 110.3C151 84.2 170.4 64.2 197.3 64.2ZM171.1 100.3H220.4C218.3 87.5 208 80.6 196.6 80.6C185.2 80.6 173.7 87.2 171.1 100.3Z" />
    <path d="M259.8 65.9H279.3V77.8C284.3 70.7 295.1 64.2 307.8 64.2C332.1 64.2 350.5 84.9 350.5 110.3C350.5 135.6 332.1 156.4 307.8 156.4C295 156.4 284.2 149.8 279.3 142.7V191.6H259.8V65.9ZM304.3 81.9C288.5 81.9 277.7 94.3 277.7 110.3C277.7 126.3 288.5 138.7 304.3 138.7C319.9 138.7 330.7 126.3 330.7 110.3C330.7 94.3 319.9 81.9 304.3 81.9Z" />
    <path d="M389.9 21.6H370.4V154.5H389.9V21.6Z" />
    <path d="M425.9 46.6C418.8 46.6 412.8 40.8 412.8 33.5C412.8 26.4 418.8 20.6 425.9 20.6C433.2 20.6 438.8 26.5 438.8 33.5C438.8 40.8 433.2 46.6 425.9 46.6ZM416.2 65.9H435.7V154.5H416.2V65.9Z" />
    <path d="M502.3 156.3C475.7 156.3 455.5 136.4 455.5 110.2C455.5 84 475.7 64.1 502.3 64.1C520.6 64.1 536 73.9 543.6 88.6L526.6 97.8C522.3 88.8 513.7 82.2 502.3 82.2C486.5 82.2 475.4 94.4 475.4 110.2C475.4 126 486.6 138.2 502.3 138.2C513.6 138.2 522.3 131.6 526.6 122.6L543.6 131.8C536 146.6 520.5 156.3 502.3 156.3Z" />
    <path d="M597.8 64.2C610.6 64.2 621.2 70.8 626.2 77.8V65.9H645.7V154.5H626.2V142.6C621.2 149.7 610.6 156.3 597.8 156.3C573.5 156.3 555.1 135.6 555.1 110.2C555.1 84.9 573.5 64.2 597.8 64.2ZM601.4 81.9C585.6 81.9 575 94.3 575 110.3C575 126.3 585.6 138.7 601.4 138.7C617.2 138.7 627.8 126.3 627.8 110.3C627.8 94.3 617.1 81.9 601.4 81.9Z" />
    <path d="M679.1 154.6V83.3H660.6V65.9H679.1V41.3H698.6V65.9H732.2V83.3H698.6V137.1H732.2V154.6H679.1Z" />
    <path d="M141.8 65.9V83.4H94V154.6H74.5V65.9H141.8Z" />
    <path d="M141.8 33V50.4H57.2V154.6H37.7V33H141.8Z" />
    <path d="M141.8 0V17.4H20.4V154.6H0.899994V0H141.8Z" />
    <path d="M787.8 64.2C811 64.2 830.5 79.6 830.5 108.2C830.5 110.1 830.5 111.7 830.3 114.6H760.6C761.5 129.1 773.2 138.7 787.9 138.7C800.3 138.7 808.6 133 813.2 125.2L828.1 135.8C820.1 148.4 806.3 156.4 787.7 156.4C760.8 156.4 741.4 137.3 741.4 110.3C741.6 84.2 760.9 64.2 787.8 64.2ZM761.6 100.3H810.9C808.8 87.5 798.5 80.6 787.1 80.6C775.8 80.6 764.3 87.2 761.6 100.3Z" />
  </svg>
);

export { Replicate };
`;

const GITHUB_CODE = `import type { SVGProps } from "react";

const GitHub = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlSpace="preserve" viewBox="0 0 249.1 67.5">
    <path
      d="M103.4 55.9h-.1s0 .1.1 0m0 .1c-.5 0-1.8.3-3.2.3-4.4 0-5.9-2-5.9-4.6V34.2h8.9c.5 0 .9-.4.9-1.1v-9.5c0-.5-.4-.9-.9-.9h-8.9V10.9c0-.4-.3-.7-.8-.7h-12c-.5 0-.8.3-.8.7V23s-6.1 1.5-6.5 1.6-.7.5-.7.9v7.6c0 .6.4 1.1.9 1.1h6.2v18.3c0 13.6 9.5 15 16 15 3 0 6.5-.9 7.1-1.2.3-.1.5-.5.5-.9V57c0-.5-.4-.9-.8-1m132.1-12.3c0-10.1-4.1-11.4-8.4-11-3.3.2-6 1.9-6 1.9v19.6s2.7 1.9 6.8 2c5.8.2 7.6-1.8 7.6-12.5m13.6-.9c0 19.1-6.2 24.6-17 24.6-9.1 0-14.1-4.6-14.1-4.6s-.2 2.6-.5 2.9c-.2.3-.4.4-.8.4h-8.3c-.6 0-1.1-.4-1.1-.9l.1-62c0-.5.4-.9.9-.9h11.9c.5 0 .9.4.9.9l-.1 20.9s4.6-3 11.3-3h.1c6.8.1 16.7 2.6 16.7 21.7m-48.6-20.1h-11.7c-.6 0-.9.4-.9 1.1v30.3s-3.1 2.2-7.3 2.2-5.4-1.9-5.4-6.1V23.7c0-.5-.4-.9-.9-.9h-11.9c-.5 0-.9.4-.9.9v28.5c0 12.3 6.9 15.3 16.3 15.3 7.8 0 14.1-4.3 14.1-4.3s.3 2.2.4 2.5.5.5.9.5h7.5c.6 0 .9-.4.9-.9l.1-41.7c-.2-.5-.6-.9-1.2-.9m-132.2-.1H56.4c-.5 0-.9.5-.9 1.1v40.9c0 1.1.7 1.5 1.7 1.5h10.7c1.1 0 1.4-.5 1.4-1.5v-41c-.1-.5-.5-1-1-1M62.4 3.8c-4.3 0-7.7 3.4-7.7 7.7s3.4 7.7 7.7 7.7c4.2 0 7.6-3.4 7.6-7.7s-3.4-7.7-7.6-7.7m92-1.4h-11.8c-.5 0-.9.4-.9.9v22.8h-18.5V3.3c0-.5-.4-.9-.9-.9h-11.9c-.5 0-.9.4-.9.9v62c0 .5.5.9.9.9h11.9c.5 0 .9-.4.9-.9V38.8h18.5l-.1 26.5c0 .5.4.9.9.9h11.9c.5 0 .9-.4.9-.9v-62c0-.5-.4-.9-.9-.9M49.1 29.8v32c0 .2-.1.6-.3.7 0 0-7 5-18.5 5-13.8 0-30.3-4.3-30.3-33C0 5.9 14.4-.1 28.4 0c12.2 0 17.1 2.7 17.8 3.2.2.3.3.5.3.8l-2.3 9.9c0 .5-.5 1.1-1.1.9-2-.6-5-1.8-12.1-1.8-8.2 0-17 2.3-17 20.8s8.4 20.6 14.4 20.6c5.1 0 7-.6 7-.6V41.1h-8.2c-.6 0-1.1-.4-1.1-.9V29.8c0-.5.4-.9 1.1-.9h20.9c.6 0 1 .4 1 .9"
      style={{ fill: "#1b1f24" }}
    />
  </svg>
);

export { GitHub };
`;

const VERCEL_CODE = `import type { SVGProps } from "react";

const Vercel = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} aria-label="Vercel logotype" viewBox="0 0 262 52">
    <path
      d="M59.8019 52L29.9019 0L0.00190544 52H59.8019ZM89.9593 49.6328L114.947 2.36365H104.139L86.9018 36.6921L69.6647 2.36365H58.8564L83.8442 49.6328H89.9593ZM260.25 2.36365V49.6329H251.302V2.36365H260.25ZM210.442 31.99C210.442 28.3062 211.211 25.0661 212.749 22.2699C214.287 19.4737 216.431 17.321 219.181 15.812C221.93 14.3029 225.146 13.5484 228.828 13.5484C232.09 13.5484 235.026 14.2585 237.636 15.6788C240.245 17.0991 242.319 19.2074 243.857 22.0036C245.395 24.7998 246.187 28.2174 246.234 32.2564V34.3202H219.88C220.066 37.2496 220.928 39.5576 222.466 41.2442C224.051 42.8864 226.171 43.7075 228.828 43.7075C230.505 43.7075 232.043 43.2637 233.441 42.376C234.839 41.4883 235.888 40.2899 236.587 38.7808L245.745 39.4466C244.626 42.7754 242.529 45.4385 239.453 47.4358C236.377 49.4331 232.835 50.4317 228.828 50.4317C225.146 50.4317 221.93 49.6772 219.181 48.1681C216.431 46.6591 214.287 44.5064 212.749 41.7102C211.211 38.914 210.442 35.6739 210.442 31.99ZM237.006 28.6612C236.68 25.7762 235.771 23.668 234.28 22.3365C232.789 20.9606 230.971 20.2726 228.828 20.2726C226.358 20.2726 224.354 21.0049 222.816 22.4696C221.278 23.9343 220.322 25.9982 219.95 28.6612H237.006ZM195.347 22.3365C196.838 23.5348 197.77 25.1993 198.143 27.3297L207.371 26.8637C207.044 24.1562 206.089 21.8039 204.505 19.8066C202.92 17.8093 200.869 16.278 198.353 15.2128C195.883 14.1032 193.157 13.5484 190.174 13.5484C186.492 13.5484 183.277 14.3029 180.527 15.812C177.777 17.321 175.634 19.4737 174.096 22.2699C172.558 25.0661 171.789 28.3062 171.789 31.99C171.789 35.6739 172.558 38.914 174.096 41.7102C175.634 44.5064 177.777 46.6591 180.527 48.1681C183.277 49.6772 186.492 50.4317 190.174 50.4317C193.25 50.4317 196.046 49.8769 198.563 48.7673C201.079 47.6133 203.13 45.9933 204.714 43.9072C206.299 41.8212 207.254 39.38 207.58 36.5838L198.283 36.1844C197.957 38.5367 197.048 40.3565 195.557 41.6436C194.065 42.8864 192.271 43.5078 190.174 43.5078C187.285 43.5078 185.048 42.5091 183.463 40.5118C181.879 38.5145 181.086 35.6739 181.086 31.99C181.086 28.3062 181.879 25.4656 183.463 23.4683C185.048 21.471 187.285 20.4723 190.174 20.4723C192.178 20.4723 193.902 21.0937 195.347 22.3365ZM149.955 14.3457H158.281L158.522 21.1369C159.113 19.2146 159.935 17.7218 160.988 16.6585C162.514 15.1166 164.642 14.3457 167.371 14.3457H170.771V21.6146H167.302C165.359 21.6146 163.763 21.8789 162.514 22.4075C161.311 22.9362 160.386 23.7732 159.739 24.9186C159.137 26.064 158.837 27.5178 158.837 29.2799V49.6328H149.955V14.3457ZM111.548 22.2699C110.01 25.0661 109.241 28.3062 109.241 31.99C109.241 35.6739 110.01 38.914 111.548 41.7102C113.086 44.5064 115.229 46.6591 117.979 48.1681C120.729 49.6772 123.944 50.4317 127.626 50.4317C131.634 50.4317 135.176 49.4331 138.252 47.4358C141.327 45.4385 143.425 42.7754 144.543 39.4466L135.385 38.7808C134.686 40.2899 133.638 41.4883 132.24 42.376C130.842 43.2637 129.304 43.7075 127.626 43.7075C124.97 43.7075 122.849 42.8864 121.265 41.2442C119.727 39.5576 118.865 37.2496 118.678 34.3202H145.032V32.2564C144.986 28.2174 144.194 24.7998 142.656 22.0036C141.118 19.2074 139.044 17.0991 136.434 15.6788C133.824 14.2585 130.888 13.5484 127.626 13.5484C123.944 13.5484 120.729 14.3029 117.979 15.812C115.229 17.321 113.086 19.4737 111.548 22.2699ZM133.079 22.3365C134.57 23.668 135.479 25.7762 135.805 28.6612H118.748C119.121 25.9982 120.076 23.9343 121.614 22.4696C123.152 21.0049 125.156 20.2726 127.626 20.2726C129.77 20.2726 131.587 20.9606 133.079 22.3365Z"
      fill="black"
    />
  </svg>
);

export { Vercel };
`;

const GROK_CODE = `import type { SVGProps } from "react";

const Grok = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="18 19 987 362" fill="none">
    <path
      d="M878.447 292.85V108.548H907.572V230.18L969.173 159.399H1004.48L949.069 220.058L1005 292.85H970.204L924.902 230.304L907.572 230.18V292.85H878.447Z"
      fill="#0A0A0A"
    />
    <path
      d="M790.12 295.947C746.819 295.947 723.364 265.23 723.364 225.995C723.364 186.502 746.819 156.043 790.12 156.043C833.679 156.043 856.876 186.502 856.876 225.995C856.876 265.23 833.679 295.947 790.12 295.947ZM753.778 225.995C753.778 256.454 770.274 271.683 790.12 271.683C810.224 271.683 826.462 256.454 826.462 225.995C826.462 195.536 810.224 180.049 790.12 180.049C770.274 180.049 753.778 195.536 753.778 225.995Z"
      fill="#0A0A0A"
    />
    <path
      d="M642.304 292.85V180.565L666.789 159.399H718.854V184.179H671.429V292.85H642.304Z"
      fill="#0A0A0A"
    />
    <path
      d="M530.938 296.258C475.424 296.258 442.325 255.938 442.325 200.957C442.325 145.46 476.606 104.16 532.021 104.16C575.323 104.16 607.025 126.359 614.5 167.659H581.251C576.353 144.169 556.765 131.005 532.021 131.005C492.07 131.005 474.544 165.594 474.544 200.957C474.544 236.32 492.07 270.651 532.021 270.651C570.168 270.651 586.921 243.031 588.21 220.058H530.732V193.331H617.593L617.451 207.305C617.451 259.231 596.295 296.258 530.938 296.258Z"
      fill="#0A0A0A"
    />
    <path
      d="M163.591 251.367L288.916 158.716C295.06 154.174 303.842 155.946 306.769 163.001C322.178 200.209 315.294 244.924 284.638 275.625C253.982 306.326 211.328 313.059 172.34 297.724L129.75 317.472C190.837 359.287 265.016 348.946 311.369 302.492C348.137 265.67 359.524 215.479 348.877 170.217L348.973 170.314C333.533 103.822 352.769 77.2447 392.174 22.898C393.107 21.6094 394.04 20.3208 394.973 19L343.119 70.9306V70.7695L163.559 251.399"
      fill="#0A0A0A"
    />
    <path
      d="M137.728 273.885C93.8835 231.941 101.443 167.028 138.854 129.594C166.518 101.889 211.842 90.5817 251.409 107.205L293.902 87.5535C286.246 82.0126 276.435 76.0528 265.176 71.8648C214.287 50.8929 153.362 61.3305 111.994 102.727C72.2025 142.577 59.6893 203.85 81.1773 256.135C97.229 295.211 70.9158 322.852 44.4097 350.75C35.0167 360.64 25.5916 370.53 18 381L137.696 273.917"
      fill="#0A0A0A"
    />
  </svg>
);

export { Grok };
`;

const ZURIS_BLACK_CODE = `import type { SVGProps } from "react";

export function ZurisBlackV1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="292"
      height="208"
      viewBox="0 0 292 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 0H212C249.5 0 280 30.5 280 67C280 94 266 112 245 131L230 146L292 208H226L164 146L101 208H0V129L81 47H0V0ZM147 47H212C224 47 233 56 233 68C233 75 229 82 223 88L164 146V80L82 162H34L147 47Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
`;

const ZURIS_WHITE_CODE = `import type { SVGProps } from "react";

export function ZurisWhiteV1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="292"
      height="208"
      viewBox="0 0 292 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 0H212C249.5 0 280 30.5 280 67C280 94 266 112 245 131L230 146L292 208H226L164 146L101 208H0V129L81 47H0V0ZM147 47H212C224 47 233 56 233 68C233 75 229 82 223 88L164 146V80L82 162H34L147 47Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
`;

export const HERO_2_FILES: FileItem[] = [
  {
    id: "hero-2.tsx",
    name: "hero-2.tsx",
    path: "components/hero-section-2/hero-2.tsx",
    folder: "components/hero-section-2",
    language: "tsx",
    code: HERO_2_CODE,
  },
  {
    id: "navbar.tsx",
    name: "navbar.tsx",
    path: "components/hero-section-2/navbar.tsx",
    folder: "components/hero-section-2",
    language: "tsx",
    code: NAVBAR_CODE,
  },
  {
    id: "index.ts",
    name: "index.ts",
    path: "components/hero-section-2/index.ts",
    folder: "components/hero-section-2",
    language: "typescript",
    code: INDEX_CODE,
  },
  {
    id: "all-logos.tsx",
    name: "all-logos.tsx",
    path: "components/logos/all-logos.tsx",
    folder: "components/logos",
    language: "tsx",
    code: ALL_LOGOS_CODE,
  },
  {
    id: "openai.tsx",
    name: "openai.tsx",
    path: "components/logos/openai.tsx",
    folder: "components/logos",
    language: "tsx",
    code: OPENAI_CODE,
  },
  {
    id: "anthropic.tsx",
    name: "anthropic.tsx",
    path: "components/logos/anthropic.tsx",
    folder: "components/logos",
    language: "tsx",
    code: ANTHROPIC_CODE,
  },
  {
    id: "relicate.tsx",
    name: "relicate.tsx",
    path: "components/logos/relicate.tsx",
    folder: "components/logos",
    language: "tsx",
    code: REPLICATE_CODE,
  },
  {
    id: "github.tsx",
    name: "github.tsx",
    path: "components/logos/github.tsx",
    folder: "components/logos",
    language: "tsx",
    code: GITHUB_CODE,
  },
  {
    id: "vercel.tsx",
    name: "vercel.tsx",
    path: "components/logos/vercel.tsx",
    folder: "components/logos",
    language: "tsx",
    code: VERCEL_CODE,
  },
  {
    id: "grok.tsx",
    name: "grok.tsx",
    path: "components/logos/grok.tsx",
    folder: "components/logos",
    language: "tsx",
    code: GROK_CODE,
  },
  {
    id: "zuris-black-v1.tsx",
    name: "zuris-black-v1.tsx",
    path: "components/ui/zuris-black-v1.tsx",
    folder: "components/ui",
    language: "tsx",
    code: ZURIS_BLACK_CODE,
  },
  {
    id: "zuris-white-v1.tsx",
    name: "zuris-white-v1.tsx",
    path: "components/ui/zuris-white-v1.tsx",
    folder: "components/ui",
    language: "tsx",
    code: ZURIS_WHITE_CODE,
  },
];
