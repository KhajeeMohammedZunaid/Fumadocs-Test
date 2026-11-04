"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01Icon,
  Tick01Icon,
  ReloadIcon,
  GridIcon,
} from "@hugeicons/core-free-icons";
import {
  StuxButton,
  type StuxColorScheme,
  type StuxButtonSize,
  type StuxButtonVariant,
  type StuxFillPattern,
} from "./stux-button";
import { cn } from "@/lib/utils";

// Hoist static option arrays outside component (Vercel best practice: server-hoist-static-io)
const COLOR_OPTIONS: { key: StuxColorScheme; label: string; hex: string }[] = [
  { key: "yellow", label: "Yellow", hex: "#ffea2f" },
  { key: "lime", label: "Lime", hex: "#d4ff32" },
  { key: "cyan", label: "Cyan", hex: "#00f0ff" },
  { key: "orange", label: "Orange", hex: "#ff5416" },
  { key: "white", label: "White", hex: "#ffffff" },
  { key: "violet", label: "Violet", hex: "#a855f7" },
  { key: "emerald", label: "Emerald", hex: "#10b981" },
];

const PATTERN_OPTIONS: { key: StuxFillPattern; label: string }[] = [
  { key: "cross", label: "Cross Cut" },
  { key: "wave", label: "Liquid Wave" },
  { key: "cyber", label: "Cyber Chevron" },
  { key: "arc", label: "Convex Arc" },
  { key: "zigzag", label: "Sawtooth Blade" },
];

const SIZE_OPTIONS: { key: StuxButtonSize; label: string }[] = [
  { key: "sm", label: "Small" },
  { key: "default", label: "Default" },
  { key: "lg", label: "Large" },
];

export function StuxButtonStudio() {
  const [variant, setVariant] = React.useState<StuxButtonVariant>("default");
  const [fillPattern, setFillPattern] = React.useState<StuxFillPattern>("cross");
  const [size, setSize] = React.useState<StuxButtonSize>("default");
  const [colorScheme, setColorScheme] = React.useState<StuxColorScheme>("yellow");
  const [buttonText, setButtonText] = React.useState<string>("LET'S TALK");
  const [isGrid, setIsGrid] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState<boolean>(false);
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleReset = React.useCallback(() => {
    setVariant("default");
    setFillPattern("cross");
    setSize("default");
    setColorScheme("yellow");
    setButtonText("LET'S TALK");
    setIsGrid(true);
  }, []);

  const generatedCode = React.useMemo(() => {
    const propsList: string[] = [];
    if (variant !== "default") propsList.push(`variant="${variant}"`);
    if (variant === "edge-fill" && fillPattern !== "cross") {
      propsList.push(`fillPattern="${fillPattern}"`);
    }
    if (colorScheme !== "yellow") propsList.push(`colorScheme="${colorScheme}"`);
    if (size !== "default") propsList.push(`size="${size}"`);

    const propsStr = propsList.length > 0 ? " " + propsList.join(" ") : "";
    return `<StuxButton${propsStr}>${buttonText}</StuxButton>`;
  }, [variant, fillPattern, colorScheme, size, buttonText]);

  const handleCopyCode = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [generatedCode]);

  return (
    <div className="my-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm not-prose flex flex-col font-sans">
      {/* Studio Top Header (Zero emojis, zero glowing badges) */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 backdrop-blur select-none">
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
          Interactive Studio
        </span>

        <div className="flex items-center gap-1.5 font-sans">
          {/* Grid Toggle */}
          <button
            type="button"
            onClick={() => setIsGrid((prev) => !prev)}
            title="Toggle canvas grid"
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer border font-sans",
              isGrid
                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
                : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            )}
          >
            <HugeiconsIcon icon={GridIcon} size={13} />
            <span className="hidden sm:inline">Grid</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            title="Reset to defaults"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer border border-transparent font-sans"
          >
            <HugeiconsIcon icon={ReloadIcon} size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Copy JSX Snippet */}
          <button
            type="button"
            onClick={handleCopyCode}
            title="Copy JSX component snippet"
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-zinc-950 transition-colors cursor-pointer shadow-xs ml-1 font-sans"
          >
            <HugeiconsIcon
              icon={copied ? Tick01Icon : Copy01Icon}
              size={13}
              className={copied ? "text-emerald-400 dark:text-emerald-600" : "text-zinc-300 dark:text-zinc-700"}
            />
            <span>{copied ? "Copied!" : "Copy JSX"}</span>
          </button>
        </div>
      </div>

      {/* Center Stage Preview Canvas (Clean, unmuted, zero clutter text) */}
      <div
        className={cn(
          "relative min-h-[220px] sm:min-h-[260px] w-full flex items-center justify-center p-8 transition-colors select-none overflow-hidden",
          "bg-[#fafafa] dark:bg-[#09090b]",
          isGrid
            ? "bg-[radial-gradient(rgba(0,0,0,0.14)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:20px_20px]"
            : ""
        )}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="flex items-center justify-center z-10"
        >
          <StuxButton
            key={`${variant}-${fillPattern}-${colorScheme}-${size}`}
            variant={variant}
            fillPattern={fillPattern}
            size={size}
            colorScheme={colorScheme}
            text={buttonText}
          />
        </motion.div>
      </div>

      {/* Control Panel: 4 Core Controls Aligned 4 in single line on desktop, 2/2 on tablets/mobile */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 p-4 flex flex-col gap-3 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* 1. Variant Selector */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block mb-1.5 font-sans select-none">
              Variant
            </label>
            <div className="flex h-9 items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full">
              <button
                type="button"
                onClick={() => setVariant("default")}
                className={cn(
                  "flex-1 h-full flex items-center justify-center rounded-md text-xs font-medium transition-all cursor-pointer font-sans select-none",
                  variant === "default"
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs font-semibold"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100"
                )}
              >
                Split Arrow
              </button>
              <button
                type="button"
                onClick={() => setVariant("edge-fill")}
                className={cn(
                  "flex-1 h-full flex items-center justify-center rounded-md text-xs font-medium transition-all cursor-pointer font-sans select-none",
                  variant === "edge-fill"
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs font-semibold"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100"
                )}
              >
                Edge Fill
              </button>
            </div>
          </div>

          {/* 2. Size Selector */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block mb-1.5 font-sans select-none">
              Size
            </label>
            <div className="flex h-9 items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full">
              {SIZE_OPTIONS.map((s) => {
                const active = size === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSize(s.key)}
                    className={cn(
                      "flex-1 h-full flex items-center justify-center rounded-md text-xs font-medium transition-all cursor-pointer font-sans select-none",
                      active
                        ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100"
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Color Palette Swatches */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block mb-1.5 font-sans select-none">
              Color Accent
            </label>
            <div className="flex h-9 items-center justify-between px-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full">
              {COLOR_OPTIONS.map((c) => {
                const active = colorScheme === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    title={c.label}
                    onClick={() => setColorScheme(c.key)}
                    className={cn(
                      "size-5 rounded-full transition-transform cursor-pointer border shrink-0",
                      active
                        ? "scale-[1.15] ring-2 ring-zinc-950 dark:ring-white border-transparent"
                        : "hover:scale-110 border-black/25 dark:border-white/25"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* 4. Label Text Input */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block mb-1.5 font-sans select-none">
              Label Text
            </label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="LET'S TALK"
              className="h-9 px-3 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors font-sans w-full"
            />
          </div>
        </div>

        {/* Contour Pattern Selector: Only shown when Edge Fill is selected */}
        <AnimatePresence>
          {variant === "edge-fill" ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.16 }}
              className="pt-2.5 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 overflow-hidden"
            >
              <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 mr-1 shrink-0 font-sans select-none">
                Contour Pattern:
              </span>
              <div className="inline-flex flex-wrap items-center gap-1.5">
                {PATTERN_OPTIONS.map((p) => {
                  const active = fillPattern === p.key;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setFillPattern(p.key)}
                      className={cn(
                        "py-1 px-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer border select-none font-sans",
                        active
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-xs"
                          : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                      )}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
