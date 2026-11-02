"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Folder01Icon,
  Folder02Icon,
  File01Icon,
  Copy01Icon,
  Tick01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface FileItem {
  id: string;
  name: string;
  path: string;
  folder: string;
  language: string;
  code: string;
}

const FILES: FileItem[] = [
  {
    id: "hero.tsx",
    name: "hero.tsx",
    path: "components/hero-sections/hero.tsx",
    folder: "components/hero-sections",
    language: "tsx",
    code: `"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { HeroTextSwap } from "@/components/hero-sections/hero-text-swap";
import { TypewriterPrompt } from "@/components/hero-sections/typewriter-prompt";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [startBtnText, setStartBtnText] = React.useState("Start for free");
  const [isBtnBusy, setIsBtnBusy] = React.useState(false);

  const handleStartClick = () => {
    if (isBtnBusy) return;
    setIsBtnBusy(true);

    setStartBtnText("Launching workspace…");

    setTimeout(() => {
      setStartBtnText("Workspace ready ✓");

      setTimeout(() => {
        setStartBtnText("Start for free");
        setIsBtnBusy(false);
      }, 2200);
    }, 1200);
  };

  const handleStartKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      handleStartClick();
    }
  };

  return (
    <div className="relative w-full flex-1 min-h-0 bg-[#fafafa] dark:bg-[#09090b] overflow-hidden flex flex-col justify-between">
      {/* Hero Artwork */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] xs:h-[56%] sm:h-[58%] md:h-[60%] lg:h-[62%] 4k:h-[68%] z-[1] overflow-hidden pointer-events-none">
        <img
          src="/alone-upscaled.png"
          alt=""
          className="w-full h-full object-cover object-bottom artwork-fade-mask"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Sarah Badge */}
      <div className="flex absolute left-[10%] xs:left-[14%] sm:left-[18%] lg:left-[14%] xl:left-[16%] 4k:left-[17%] bottom-[38%] xs:bottom-[40%] sm:bottom-[36%] lg:bottom-[35%] 4k:bottom-[44%] z-[12] pointer-events-none flex-col items-start scale-[0.82] xs:scale-90 lg:scale-100 4k:scale-125 origin-bottom-left">
        <div className="floating-badge-sarah flex flex-col items-start">
          <svg className="w-[17px] h-[17px] fill-sky-400 -rotate-[15deg] drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M4 2l16 11-7 2-3 7L4 2z" />
          </svg>
          <div className="bg-sky-400 text-white font-sans text-[0.78rem] font-medium py-[0.22rem] px-[0.65rem] rounded-full ml-[10px] mt-[2px] tracking-tight shadow-sm select-none">
            Sarah
          </div>
        </div>
      </div>

      {/* Aaron Badge */}
      <div className="flex absolute right-[10%] xs:right-[14%] sm:right-[18%] lg:right-[13%] xl:right-[15%] 4k:right-[17%] bottom-[34%] xs:bottom-[36%] sm:bottom-[33%] lg:bottom-[32%] 4k:bottom-[40%] z-[12] pointer-events-none flex-col items-start scale-[0.82] xs:scale-90 lg:scale-100 4k:scale-125 origin-bottom-left">
        <div className="floating-badge-aaron flex flex-col items-start">
          <svg className="w-[17px] h-[17px] fill-amber-500 -rotate-[15deg] drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M4 2l16 11-7 2-3 7L4 2z" />
          </svg>
          <div className="bg-amber-500 text-white font-sans text-[0.78rem] font-medium py-[0.22rem] px-[0.65rem] rounded-full ml-[10px] mt-[2px] tracking-tight shadow-sm select-none">
            Aaron
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <main className="relative z-10 w-full max-w-[820px] 4k:max-w-[1180px] mx-auto px-4 pt-24 xs:pt-28 sm:pt-10 md:pt-12 lg:pt-16 4k:pt-24 text-center flex flex-col items-center">
        <h1 className="animate-enter-1 text-[2.1rem] xs:text-[2.45rem] sm:text-[2.9rem] md:text-[3.4rem] lg:text-[3.9rem] 4k:text-[5.4rem] font-semibold sm:font-medium text-zinc-950 dark:text-zinc-50 leading-[1.12] sm:leading-[1.14] 4k:leading-[1.12] tracking-[-0.035em] mb-2.5 sm:mb-3 4k:mb-5 max-w-[680px] md:max-w-[720px] lg:max-w-[740px] 4k:max-w-[1060px]">
          Scale faster with
          <br />
          <HeroTextSwap />
        </h1>

        <p className="animate-enter-2 text-[0.84rem] xs:text-[0.88rem] sm:text-[1rem] md:text-[1.04rem] lg:text-[1.08rem] 4k:text-[1.32rem] font-normal sm:font-light text-slate-800 dark:text-zinc-400 max-w-[580px] md:max-w-[620px] 4k:max-w-[860px] leading-[1.46] sm:leading-[1.58] 4k:leading-[1.62] mb-4 sm:mb-6 4k:mb-8 tracking-tight px-2">
          Spend less time on logistics and more on strategy while Nexura handles the execution of your global marketing<span className="hidden xl:inline"> operations</span>.
        </p>

        <div className="animate-enter-3 flex flex-row items-center justify-center gap-2.5 xs:gap-3 sm:gap-3.5 md:gap-4 4k:gap-5 w-auto">
          <Button
            id="startBtn"
            onClick={handleStartClick}
            onKeyDown={handleStartKeyDown}
            className="h-auto inline-flex items-center justify-center py-[0.68rem] xs:py-[0.72rem] sm:py-[0.75rem] 4k:py-[1rem] px-5 xs:px-6 sm:px-7 md:px-[1.75rem] 4k:px-10 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-medium sm:font-normal text-[0.88rem] xs:text-[0.92rem] sm:text-[0.92rem] 4k:text-[1.08rem] rounded-full border border-zinc-950 dark:border-zinc-50 cursor-pointer transition-colors shadow-sm whitespace-nowrap flex-shrink-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={startBtnText}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 4, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -4, filter: "blur(2px)" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {startBtnText}
              </motion.span>
            </AnimatePresence>
          </Button>

          <Button
            nativeButton={false}
            variant="outline"
            render={<a href="#sales" />}
            className="h-auto inline-flex items-center justify-center py-[0.68rem] xs:py-[0.72rem] sm:py-[0.75rem] 4k:py-[1rem] px-5 xs:px-6 sm:px-7 md:px-[1.75rem] 4k:px-10 bg-white hover:bg-zinc-50 text-zinc-950 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:text-zinc-100 font-medium sm:font-normal text-[0.88rem] xs:text-[0.92rem] sm:text-[0.92rem] 4k:text-[1.08rem] rounded-full no-underline border border-black/15 dark:border-zinc-700 cursor-pointer transition-colors shadow-none whitespace-nowrap flex-shrink-0"
          >
            Talk to sales
          </Button>
        </div>
      </main>

      {/* Prompt Card */}
      <TypewriterPrompt />
    </div>
  );
}

export { Hero as Hero1 };`,
  },
  {
    id: "hero-text-swap.tsx",
    name: "hero-text-swap.tsx",
    path: "components/hero-sections/hero-text-swap.tsx",
    folder: "components/hero-sections",
    language: "tsx",
    code: `"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const HERO_ROLES = [
  "your Copilot",
  "your AI Marketing",
  "your Agents",
  "your Platform",
];

export function HeroTextSwap() {
  const [index, setIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-flex items-center justify-center overflow-visible">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={HERO_ROLES[index]}
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 8, filter: "blur(3.5px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: -8, filter: "blur(3.5px)" }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.21,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block whitespace-nowrap"
        >
          {HERO_ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}`,
  },
  {
    id: "typewriter-prompt.tsx",
    name: "typewriter-prompt.tsx",
    path: "components/hero-sections/typewriter-prompt.tsx",
    folder: "components/hero-sections",
    language: "tsx",
    code: `"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const PROMPTS = [
  "Generate Q3 performance report",
  "Analyze ad spend metrics",
  "Optimize global campaign budget",
];

export function TypewriterPrompt() {
  const shouldReduceMotion = useReducedMotion();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [promptIndex, setPromptIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState(PROMPTS[0]);
  const [caretVisible, setCaretVisible] = React.useState(true);
  const [isUserTyping, setIsUserTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isBusy, setIsBusy] = React.useState(false);

  React.useEffect(() => {
    if (isUserTyping || shouldReduceMotion) {
      setCaretVisible(true);
      return;
    }
    const interval = setInterval(() => {
      setCaretVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [isUserTyping, shouldReduceMotion]);

  React.useEffect(() => {
    if (isUserTyping || shouldReduceMotion || isBusy) {
      if (!isBusy) setDisplayText(PROMPTS[0]);
      return;
    }

    let charIndex = 0;
    let isDeleting = false;
    let currentIdx = promptIndex;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentPrompt = PROMPTS[currentIdx];

      if (isDeleting) {
        charIndex--;
        setDisplayText(currentPrompt.substring(0, charIndex));
      } else {
        charIndex++;
        setDisplayText(currentPrompt.substring(0, charIndex));
      }

      let speed = isDeleting ? 22 : 55 + Math.random() * 20;

      if (!isDeleting && charIndex === currentPrompt.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % PROMPTS.length;
        setPromptIndex(currentIdx);
        speed = 400;
      }

      timeoutId = setTimeout(tick, speed);
    };

    timeoutId = setTimeout(tick, 400);
    return () => clearTimeout(timeoutId);
  }, [isUserTyping, shouldReduceMotion, isBusy, promptIndex]);

  const handleFocus = () => {
    setIsUserTyping(true);
    if (!inputValue) setInputValue(displayText);
  };

  const handleBlur = () => {
    if (!inputValue.trim()) {
      setIsUserTyping(false);
      setInputValue("");
    }
  };

  const handleSubmit = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    if (isBusy) return;
    setIsBusy(true);
    setIsSubmitted(true);

    const query = inputValue.trim() || "Analyzing metrics across channels";
    setDisplayText(\`\${query}…\`);
    setIsUserTyping(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setDisplayText("Report generated successfully ✓");

      setTimeout(() => {
        setIsBusy(false);
        setInputValue("");
      }, 2000);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="animate-enter-4 relative z-10 w-full max-w-[540px] 4k:max-w-[760px] mx-auto px-3 sm:px-4 mb-5 sm:mb-6 4k:mb-8">
      <Card
        className="w-full bg-white dark:bg-[#121215] rounded-[18px] sm:rounded-[20px] 4k:rounded-[24px] p-3.5 sm:p-5 4k:p-6 pb-3 sm:pb-3.5 4k:pb-4 min-h-[105px] sm:min-h-[125px] 4k:min-h-[155px] flex flex-col justify-between border border-black/[0.08] dark:border-white/[0.12] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] cursor-text ring-0 gap-0"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="relative w-full flex items-center min-h-[1.6rem] sm:min-h-[1.75rem] 4k:min-h-[2.2rem] mt-1.5 sm:mt-0">
          {!isUserTyping && (
            <div id="typewriterDisplay" aria-hidden="true" className="flex items-center w-full pointer-events-none">
              <span id="typewriterText" className="font-sans text-[16px] sm:text-[1.02rem] 4k:text-[1.22rem] font-medium sm:font-normal text-slate-800 dark:text-zinc-200 tracking-tight">
                {displayText}
              </span>
              <span
                id="typewriterCaret"
                className="inline-block w-[1.5px] 4k:w-[2px] h-[1rem] sm:h-[1.15rem] 4k:h-[1.4rem] bg-zinc-950 dark:bg-zinc-100 ml-[2px] transition-opacity duration-150"
                style={{ opacity: caretVisible ? 1 : 0 }}
              />
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            className={cn(
              "absolute inset-0 w-full h-full border-none outline-none bg-transparent font-sans text-[16px] sm:text-[1.02rem] 4k:text-[1.22rem] font-medium sm:font-normal text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 tracking-tight transition-opacity",
              isUserTyping ? "opacity-100" : "opacity-0"
            )}
            id="promptInput"
            aria-label="Prompt"
            placeholder="Ask Nexura anything..."
            spellCheck={false}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex justify-end items-center mt-2 sm:mt-2.5 4k:mt-3">
          <Button
            id="promptSubmitBtn"
            size="icon"
            type="button"
            aria-label="Submit Prompt"
            className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] 4k:w-[46px] 4k:h-[46px] rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-zinc-950 border-none flex items-center justify-center cursor-pointer transition-colors p-0 shrink-0 shadow-none"
            onClick={handleSubmit}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSubmitted ? (
                <motion.span
                  key="check"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.14 }}
                  className="flex items-center justify-center"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 4k:w-5 4k:h-5 stroke-emerald-400 stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.span>
              ) : (
                <motion.span
                  key="arrow"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.14 }}
                  className="flex items-center justify-center"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 4k:w-5 4k:h-5 stroke-white dark:stroke-zinc-950 stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </Card>
    </div>
  );
}`,
  },
  {
    id: "navbar.tsx",
    name: "navbar.tsx",
    path: "components/hero-sections/navbar.tsx",
    folder: "components/hero-sections",
    language: "tsx",
    code: `"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const mobileBtnRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const openMenu = React.useCallback(() => {
    setIsMenuOpen(true);
    document.body.classList.add("overflow-hidden");
    setTimeout(() => {
      const firstFocusable = overlayRef.current?.querySelector<HTMLElement>("a, button");
      firstFocusable?.focus();
    }, 60);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
    document.body.classList.remove("overflow-hidden");
    mobileBtnRef.current?.focus();
  }, []);

  const toggleMenu = React.useCallback(() => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  }, [isMenuOpen, openMenu, closeMenu]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <header className="relative w-full px-4 sm:px-6 md:px-5 lg:px-12 4k:px-16 py-2.5 sm:py-3.5 4k:py-5 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] bg-[#fafafa] dark:bg-[#09090b] border-b border-solid border-zinc-200 dark:border-zinc-800 z-50 flex-shrink-0">
      <div className="flex items-center justify-start justify-self-start flex-shrink-0">
        <a href="#" className="flex items-center gap-2 xs:gap-2.5 md:gap-2.5 lg:gap-3 4k:gap-4 font-sans text-[1.08rem] font-medium tracking-tight text-zinc-950 dark:text-zinc-50 no-underline whitespace-nowrap select-none">
          <svg className="w-[21px] h-[21px] xs:w-[23px] xs:h-[23px] sm:w-[24px] sm:h-[24px] flex-shrink-0" viewBox="0 0 180 180" fill="none">
            <path d="M73.9286 81.9811C77.479 81.9811 80.3571 84.8533 80.3571 88.3962V100.357C80.3571 103.832 77.5887 106.661 74.1329 106.769C73.9974 106.773 73.8617 106.786 73.7289 106.813L38.7711 114.015C38.6383 114.043 38.5026 114.056 38.3671 114.06C34.9113 114.167 32.1429 116.997 32.1429 120.472V136.509C32.1429 140.052 35.021 142.925 38.5714 142.925H141.429C144.979 142.925 147.857 140.052 147.857 136.509V120.472C147.857 116.929 150.735 114.057 154.286 114.057H173.571C177.122 114.057 180 116.929 180 120.472V139.717C180 143.26 177.122 146.132 173.571 146.132H157.5C153.95 146.132 151.071 149.004 151.071 152.547V168.585C151.071 172.128 148.193 175 144.643 175H35.3571C31.8067 175 28.9286 172.128 28.9286 168.585V152.547C28.9286 149.004 26.0504 146.132 22.5 146.132H6.42857C2.87817 146.132 0 143.26 0 139.717V95.6806C0 92.1376 2.87817 89.2655 6.42857 89.2655L73.9286 81.9811Z" fill="currentColor" />
            <path d="M151.071 27.4528C151.071 30.9958 153.95 33.8679 157.5 33.8679H173.571C177.122 33.8679 180 36.7401 180 40.283V84.3194C180 87.8624 177.122 90.7345 173.571 90.7345L106.071 98.0189C102.521 98.0189 99.6429 95.1467 99.6429 91.6038V79.6428C99.6429 76.1681 102.411 73.3386 105.867 73.2309C106.003 73.2267 106.138 73.214 106.271 73.1866L141.229 65.9845C141.362 65.9572 141.497 65.9444 141.633 65.9402C145.089 65.8326 147.857 63.0031 147.857 59.5283V43.4906C147.857 39.9476 144.979 37.0755 141.429 37.0755H38.5714C35.021 37.0755 32.1429 39.9476 32.1429 43.4906V59.5283C32.1429 63.0713 29.2647 65.9434 25.7143 65.9434H6.42857C2.87817 65.9434 0 63.0713 0 59.5283V40.283C0 36.7401 2.87817 33.8679 6.42857 33.8679H22.5C26.0504 33.8679 28.9286 30.9958 28.9286 27.4528V11.4151C28.9286 7.87214 31.8067 5 35.3571 5H144.643C148.193 5 151.071 7.87214 151.071 11.4151V27.4528Z" fill="currentColor" />
          </svg>
          <span className="leading-none">Nexura</span>
        </a>
      </div>

      <nav className="hidden md:flex items-center justify-center justify-self-center" aria-label="Main Navigation">
        <ul className="flex items-center gap-3.5 md:gap-4 lg:gap-8 list-none m-0 p-0">
          <li><a href="#product" className="text-sm font-normal text-slate-800 hover:text-black dark:text-zinc-400 dark:hover:text-white no-underline tracking-tight transition-colors">Product</a></li>
          <li><a href="#pricing" className="text-sm font-normal text-slate-800 hover:text-black dark:text-zinc-400 dark:hover:text-white no-underline tracking-tight transition-colors">Pricing</a></li>
          <li><a href="#integration" className="text-sm font-normal text-slate-800 hover:text-black dark:text-zinc-400 dark:hover:text-white no-underline tracking-tight transition-colors">Integration</a></li>
          <li><a href="#resources" className="text-sm font-normal text-slate-800 hover:text-black dark:text-zinc-400 dark:hover:text-white no-underline tracking-tight transition-colors">Resources</a></li>
        </ul>
      </nav>

      <div className="flex items-center justify-end justify-self-end gap-2 sm:gap-3 flex-shrink-0">
        <Button type="button" variant="ghost" onClick={toggleTheme} className="hidden md:inline-flex items-center justify-center text-sm font-normal text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white tracking-tight cursor-pointer rounded-full px-2.5 py-1">
          {mounted ? (resolvedTheme === "dark" ? "Light" : "Dark") : "Theme"}
        </Button>
        <Button nativeButton={false} render={<a href="#signin" />} className="hidden md:inline-flex bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-normal text-sm px-4 py-1.5 rounded-full no-underline transition-colors shadow-sm">
          Sign in
        </Button>
      </div>
    </header>
  );
}`,
  },
  {
    id: "button.tsx",
    name: "button.tsx",
    path: "components/ui/button.tsx",
    folder: "components/ui",
    language: "tsx",
    code: `import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border-border hover:bg-input/50 hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-7 gap-1 px-2 text-xs/relaxed",
        xs: "h-5 gap-1 rounded-sm px-2 text-[0.625rem]",
        sm: "h-6 gap-1 px-2 text-xs/relaxed",
        lg: "h-8 gap-1 px-2.5 text-xs/relaxed",
        icon: "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };`,
  },
  {
    id: "card.tsx",
    name: "card.tsx",
    path: "components/ui/card.tsx",
    folder: "components/ui",
    language: "tsx",
    code: `import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export { Card };`,
  },
  {
    id: "globals.css",
    name: "globals.css",
    path: "app/globals.css (Animations & Breakpoints)",
    folder: "app",
    language: "css",
    code: `@theme inline {
  --breakpoint-xs: 420px;
  --breakpoint-4k: 2000px;
}

/* Hero artwork fade */
.artwork-fade-mask {
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 35%,
    rgba(0, 0, 0, 0) 90%
  );
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 35%,
    rgba(0, 0, 0, 0) 90%
  );
}

/* Badge animations */
@keyframes floatSarah {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-9px) translateX(2.5px); }
}

@keyframes floatAaron {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-11px) translateX(-3px); }
}

.floating-badge-sarah {
  animation: floatSarah 4.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  will-change: transform;
}

.floating-badge-aaron {
  animation: floatAaron 5.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  animation-delay: -1.4s;
  will-change: transform;
}

/* Hero entrance animations */
@keyframes textEnterRise {
  from { transform: translateY(18px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-enter-1,
.animate-enter-2,
.animate-enter-3,
.animate-enter-4 {
  animation-name: textEnterRise;
  animation-duration: 720ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: both;
  will-change: transform, opacity;
}

.animate-enter-1 { animation-delay: 100ms; }
.animate-enter-2 { animation-delay: 220ms; }
.animate-enter-3 { animation-delay: 340ms; }
.animate-enter-4 { animation-delay: 460ms; }

@media (prefers-reduced-motion: reduce) {
  .floating-badge-sarah,
  .floating-badge-aaron,
  .animate-enter-1,
  .animate-enter-2,
  .animate-enter-3,
  .animate-enter-4 {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}`,
  },
];

export function InteractiveFileTree() {
  const [activeFileId, setActiveFileId] = React.useState<string>("hero.tsx");
  const [copied, setCopied] = React.useState(false);
  const [openFolders, setOpenFolders] = React.useState<Record<string, boolean>>({
    "components/hero-sections": true,
    "components/ui": true,
    app: true,
  });

  const activeFile = React.useMemo(() => {
    return FILES.find((f) => f.id === activeFileId) || FILES[0];
  }, [activeFileId]);

  const toggleFolder = (folderKey: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  const handleCopy = async () => {
    if (!activeFile) return;
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Group files by folder
  const folders = React.useMemo(() => {
    const map = new Map<string, FileItem[]>();
    for (const f of FILES) {
      if (!map.has(f.folder)) {
        map.set(f.folder, []);
      }
      map.get(f.folder)!.push(f);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm not-prose">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Folder02Icon} size={16} className="text-zinc-500" />
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Interactive File Structure &amp; Code Explorer
          </span>
        </div>
        <span className="text-[11px] text-zinc-500">
          Click any file to view code
        </span>
      </div>

      {/* Side-by-side Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 min-h-[500px]">
        {/* Left Side: File Explorer */}
        <div className="bg-zinc-50/70 dark:bg-zinc-900/30 p-3 space-y-3 overflow-y-auto max-h-[520px]">
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2">
            Project Files
          </div>

          <div className="space-y-1">
            {folders.map(([folderName, filesInFolder]) => {
              const isOpen = openFolders[folderName] ?? true;
              return (
                <div key={folderName} className="space-y-0.5">
                  {/* Folder Row */}
                  <button
                    type="button"
                    onClick={() => toggleFolder(folderName)}
                    className="w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer select-none text-left"
                  >
                    <HugeiconsIcon
                      icon={isOpen ? ArrowDown01Icon : ArrowRight01Icon}
                      size={12}
                      className="text-zinc-400 shrink-0"
                    />
                    <HugeiconsIcon
                      icon={isOpen ? Folder02Icon : Folder01Icon}
                      size={14}
                      className="text-sky-500 shrink-0"
                    />
                    <span className="truncate">{folderName}</span>
                  </button>

                  {/* Files inside Folder */}
                  {isOpen && (
                    <div className="pl-4 space-y-0.5 border-l border-zinc-200 dark:border-zinc-800 ml-3 my-0.5">
                      {filesInFolder.map((file) => {
                        const isActive = file.id === activeFileId;
                        return (
                          <button
                            key={file.id}
                            type="button"
                            onClick={() => setActiveFileId(file.id)}
                            className={cn(
                              "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer text-left",
                              isActive
                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium shadow-xs"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-950 dark:hover:text-zinc-100"
                            )}
                          >
                            <HugeiconsIcon
                              icon={File01Icon}
                              size={13}
                              className={cn(
                                isActive
                                  ? "text-white dark:text-zinc-950"
                                  : "text-zinc-400"
                              )}
                            />
                            <span className="truncate">{file.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Code Viewer */}
        <div className="flex flex-col bg-zinc-950 dark:bg-black text-zinc-100 min-h-[500px] overflow-hidden">
          {/* Code Viewer Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2 bg-zinc-900/90 backdrop-blur">
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
              <HugeiconsIcon icon={File01Icon} size={14} className="text-zinc-400" />
              <span>{activeFile.path}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                {activeFile.language}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1 rounded-md transition-colors cursor-pointer border border-zinc-700/80"
              >
                <HugeiconsIcon
                  icon={copied ? Tick01Icon : Copy01Icon}
                  size={13}
                  className={copied ? "text-emerald-400" : "text-zinc-400"}
                />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 p-4 overflow-auto font-mono text-[12.5px] leading-relaxed max-h-[500px]">
            <pre className="m-0 p-0 text-zinc-200 select-text whitespace-pre">
              <code>{activeFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

