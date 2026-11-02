"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01Icon,
  Tick01Icon,
  ReloadIcon,
  GridIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import {
  StuxButton,
  type StuxColorScheme,
  type StuxButtonSize,
  type StuxButtonVariant,
  type StuxFillPattern,
} from "@/components/buttons/stux-button";
import { cn } from "@/lib/utils";

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

  const handleReset = () => {
    setVariant("default");
    setFillPattern("cross");
    setSize("default");
    setColorScheme("yellow");
    setButtonText("LET'S TALK");
    setIsGrid(true);
  };

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

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm not-prose flex flex-col">
      {/* Studio Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur select-none">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 font-mono">
            <HugeiconsIcon icon={SparklesIcon} size={14} className="text-amber-500" />
            <span>Interactive Studio</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Grid Toggle */}
          <button
            type="button"
            onClick={() => setIsGrid((prev) => !prev)}
            title="Toggle background canvas grid"
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer border",
              isGrid
                ? "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
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
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={ReloadIcon} size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Copy JSX Snippet */}
          <button
            type="button"
            onClick={handleCopyCode}
            title="Copy JSX component snippet"
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-zinc-950 transition-colors cursor-pointer shadow-xs ml-1"
          >
            <HugeiconsIcon
              icon={copied ? Tick01Icon : Copy01Icon}
              size={13}
              className={copied ? "text-emerald-400 dark:text-emerald-600" : "text-zinc-400 dark:text-zinc-600"}
            />
            <span>{copied ? "Copied!" : "Copy JSX"}</span>
          </button>
        </div>
      </div>

      {/* Center Stage Preview Canvas */}
      <div
        className={cn(
          "relative min-h-[220px] sm:min-h-[250px] w-full flex items-center justify-center p-8 transition-colors select-none overflow-hidden",
          "bg-[#fafafa] dark:bg-[#09090b]",
          isGrid &&
            "bg-[radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:20px_20px]"
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

      {/* Control Panel: Studio Customizer Bar */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-3.5 sm:p-4 flex flex-col gap-3">
        {/* Main Controls Row: Variant, Size, Palette, Label */}
        <div className="flex flex-wrap items-end gap-3.5 justify-between">
          {/* Variant Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Variant
            </span>
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setVariant("default")}
                className={cn(
                  "py-1 px-3 rounded-md text-xs font-medium transition-all cursor-pointer select-none",
                  variant === "default"
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                )}
              >
                Split Arrow
              </button>
              <button
                type="button"
                onClick={() => setVariant("edge-fill")}
                className={cn(
                  "py-1 px-3 rounded-md text-xs font-medium transition-all cursor-pointer select-none",
                  variant === "edge-fill"
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                )}
              >
                Edge Fill (SVG)
              </button>
            </div>
          </div>

          {/* Size Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Size
            </span>
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {SIZE_OPTIONS.map((s) => {
                const active = size === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSize(s.key)}
                    className={cn(
                      "py-1 px-2.5 rounded-md text-xs font-medium transition-all cursor-pointer select-none",
                      active
                        ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color Palette */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Color
            </span>
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {COLOR_OPTIONS.map((c) => {
                const active = colorScheme === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    title={c.label}
                    onClick={() => setColorScheme(c.key)}
                    className={cn(
                      "size-5 rounded-full transition-all cursor-pointer border shrink-0",
                      active
                        ? "scale-110 ring-2 ring-zinc-950 dark:ring-white border-transparent"
                        : "opacity-75 hover:opacity-100 hover:scale-105 border-black/20 dark:border-white/20"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Label Text Input */}
          <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-initial">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Label
            </span>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="LET'S TALK"
              className="py-1 px-3 rounded-lg text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all h-[30px]"
            />
          </div>
        </div>

        {/* Conditional Second Row: SVG Contour Pattern (ONLY when variant === 'edge-fill') */}
        <AnimatePresence>
          {variant === "edge-fill" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-wrap items-center gap-2 overflow-hidden"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium mr-1 shrink-0">
                Pattern:
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
                        "py-1 px-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer border select-none",
                        active
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-xs"
                          : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                      )}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
