"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface TocItem {
  title: string;
  url: string;
  depth: number;
}

export interface DesktopTocRingProps {
  toc?: TocItem[];
  className?: string;
}

/**
 * Modern Desktop TOC Ring Trigger & Glassy Timeline Overlay
 * - Shows an interactive progress ring on desktop tracking reading scroll percentage
 * - On click, smoothly reveals a glassy, floating card overlay at the right side
 * - Displays a connected timeline of headings with active anchor tracking
 * - Uses scroll-fade mask for smooth top & bottom list edge dissipation
 */
export function DesktopTocRing({ toc = [], className }: DesktopTocRingProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [activeAnchor, setActiveAnchor] = React.useState<string>("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Filter out any top-level title duplicates or empty items
  const items = React.useMemo(() => {
    return toc.filter((item) => item.depth >= 2 && item.title.trim().length > 0);
  }, [toc]);

  // Track document scroll progress (0% - 100%)
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollElement = document.documentElement;
      const totalScrollable = scrollElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const currentProgress = (window.scrollY / totalScrollable) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track currently visible section anchor via IntersectionObserver
  React.useEffect(() => {
    if (items.length === 0) return;

    // Check initial hash
    if (typeof window !== "undefined" && window.location.hash) {
      setActiveAnchor(window.location.hash);
    } else if (items[0]) {
      setActiveAnchor(items[0].url);
    }

    const headingElements = items
      .map((item) => {
        const id = item.url.replace(/^#/, "");
        return document.getElementById(id);
      })
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort visible headings by vertical position
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveAnchor(`#${visibleEntries[0].target.id}`);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Click-outside and escape-key dismissal
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    e.preventDefault();
    const id = url.replace(/^#/, "");
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 80;
      const targetPos =
        target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: targetPos, behavior: "smooth" });
      history.pushState(null, "", url);
      setActiveAnchor(url);
    }
  };

  if (items.length === 0) return null;

  // Geometry for 40px circular progress ring
  const circleSize = 40;
  const strokeWidth = 2.5;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={containerRef}
      id="nd-toc-ring"
      className={cn(
        "hidden lg:flex flex-col [grid-area:toc] sticky top-20 h-fit self-start z-30 pt-6 pr-2 select-none relative",
        className
      )}
    >
      {/* =========================================================================
          RING TRIGGER BUTTON (Desktop Only)
          ========================================================================= */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Table of contents"
        title={
          isOpen
            ? "Close table of contents"
            : `On this page (${Math.round(progress)}% read)`
        }
        className={cn(
          "group relative size-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
          "bg-white/85 dark:bg-[#121214]/85 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-sm hover:shadow-md",
          isOpen
            ? "border-primary/50 ring-4 ring-primary/15 dark:ring-primary/20 scale-105"
            : "hover:border-zinc-300 dark:hover:border-white/20 active:scale-95"
        )}
      >
        {/* SVG Progress Ring */}
        <svg
          className="size-10 absolute inset-0 -rotate-90 pointer-events-none"
          viewBox={`0 0 ${circleSize} ${circleSize}`}
        >
          {/* Background Track */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-zinc-200/80 dark:text-zinc-800"
          />
          {/* Active Progress Dash */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-zinc-900 dark:text-zinc-100 transition-all duration-150 ease-out"
          />
        </svg>

        {/* Center Icon: Morphs smoothly between Outline bars and Close X */}
        <div className="relative size-4 flex items-center justify-center">
          {isOpen ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-900 dark:text-zinc-100 transition-transform duration-200"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors"
            >
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="14" y1="12" y2="12" />
              <line x1="4" x2="18" y1="18" y2="18" />
            </svg>
          )}
        </div>
      </button>

      {/* =========================================================================
          GLASSY CARD OVERLAY WITH TIMELINE & SCROLL-FADE
          ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 8, y: -4 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, x: 8, y: -4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute right-0 top-14 z-50 w-72 sm:w-80 rounded-2xl p-4 not-prose",
              "bg-white/85 dark:bg-[#121214]/85 backdrop-blur-xl",
              "border border-zinc-200/80 dark:border-white/10 shadow-2xl",
              "transition-colors duration-200"
            )}
          >
            {/* Header: Title + Section Counter + Close */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-white/[0.08] mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold tracking-wider uppercase text-zinc-900 dark:text-zinc-100 font-sans">
                  On This Page
                </span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                  {items.length}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Timeline Content inside ScrollArea with scroll-fade */}
            <ScrollArea className="max-h-[340px] scroll-fade overflow-y-auto pr-1">
              <div className="relative pl-5 py-1">
                {/* Continuous Vertical Timeline Rail Line */}
                <div
                  className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-zinc-200 dark:bg-zinc-800 pointer-events-none rounded-full"
                  aria-hidden="true"
                />

                {/* Timeline Items */}
                <div className="space-y-3">
                  {items.map((item) => {
                    const isActive = activeAnchor === item.url;
                    return (
                      <a
                        key={item.url}
                        href={item.url}
                        onClick={(e) => handleItemClick(e, item.url)}
                        className={cn(
                          "group relative flex items-start gap-2.5 text-xs transition-colors py-0.5 no-underline cursor-pointer select-none",
                          item.depth > 2 && "pl-3 text-[11.5px]",
                          isActive
                            ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-normal"
                        )}
                      >
                        {/* Timeline Node Dot */}
                        <span
                          className={cn(
                            "absolute -left-[17px] top-1.5 rounded-full transition-all duration-200",
                            isActive
                              ? "size-2.5 bg-zinc-950 dark:bg-zinc-100 border-2 border-white dark:border-[#121214] ring-4 ring-zinc-900/15 dark:ring-white/20 scale-110"
                              : "size-2 bg-zinc-300 dark:bg-zinc-700 border border-white dark:border-[#121214] group-hover:bg-zinc-500 dark:group-hover:bg-zinc-400 group-hover:scale-125"
                          )}
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed line-clamp-2">
                          {item.title}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DesktopTocRing;

