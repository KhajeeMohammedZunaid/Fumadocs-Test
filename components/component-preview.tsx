"use client";

import * as React from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ComputerIcon,
  Tablet01Icon,
  SmartPhone01Icon,
  ArrowUpRight01Icon,
  ArrowDown01Icon,
  ReloadIcon,
} from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getDetailPreviewIframe } from "@/components/preview-cache";

export type DeviceMode = "desktop" | "tablet" | "mobile";

// Hoist static lookup maps to module level (Vercel best practice: server-hoist-static-io)
const DEVICES: {
  id: DeviceMode;
  label: string;
  widthLabel: string;
  targetWidth: number | null; // null means 100% full width
  icon: typeof ComputerIcon;
}[] = [
  { id: "desktop", label: "Desktop", widthLabel: "100%", targetWidth: null, icon: ComputerIcon },
  { id: "tablet", label: "Tablet", widthLabel: "768px", targetWidth: 768, icon: Tablet01Icon },
  { id: "mobile", label: "Mobile", widthLabel: "390px", targetWidth: 390, icon: SmartPhone01Icon },
];

export interface ComponentPreviewProps {
  src?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  defaultDevice?: DeviceMode;
  height?: string;
}

export function ComponentPreview({
  src,
  title = "Component Preview",
  children,
  className,
  containerClassName,
  defaultDevice = "desktop",
  height,
}: ComponentPreviewProps) {
  const baseId = React.useId();
  const deviceLayoutId = `${baseId}-device-pill`;

  const [device, setDevice] = React.useState<DeviceMode>(defaultDevice);
  const [key, setKey] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const previewMountRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(1200);

  // Measure available content width accurately (excluding padding)
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const style = window.getComputedStyle(el);
      const paddingX =
        (parseFloat(style.paddingLeft) || 0) +
        (parseFloat(style.paddingRight) || 0);
      const available = Math.max(0, el.clientWidth - paddingX);
      if (available > 0) {
        setContainerWidth(available);
      }
    };

    measure();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Persistent preview iframe attachment & caching across client navigations
  React.useEffect(() => {
    if (!src) return;
    const mountPoint = previewMountRef.current;
    if (!mountPoint) return;

    const iframe = getDetailPreviewIframe(src, title);
    if (!iframe) return;

    if (height) {
      iframe.className = cn(
        "w-full h-[500px] sm:h-[620px] border-0 block bg-background",
        height
      );
    }
    iframe.style.pointerEvents = isAnimating ? "none" : "auto";

    // Attach iframe to this mount point if not already inside
    if (iframe.parentElement !== mountPoint) {
      mountPoint.appendChild(iframe);
    }

    return () => {
      // On unmount (e.g. navigating to another component), preserve the iframe in the persistent layout pool
      // so it stays alive in DOM without reloading or re-fetching
      const pool = document.getElementById("fd-persistent-preview-pool");
      if (pool && iframe && iframe.parentElement === mountPoint) {
        pool.appendChild(iframe);
      }
    };
  }, [src, title, height, key, isAnimating]);

  const handleReload = React.useCallback(() => {
    if (src) {
      const iframe = getDetailPreviewIframe(src, title);
      if (iframe) {
        try {
          iframe.contentWindow?.location.reload();
        } catch {
          iframe.src = src;
        }
      }
    }
    setKey((k) => k + 1);
  }, [src, title]);

  // Compute animated numerical width in pixels so motion/react animates smoothly with zero unit mismatch
  const targetWidth = React.useMemo(() => {
    const activeConfig = DEVICES.find((d) => d.id === device);
    if (!activeConfig || activeConfig.targetWidth === null) {
      return containerWidth;
    }
    return Math.min(containerWidth, activeConfig.targetWidth);
  }, [device, containerWidth]);

  return (
    <div
      className={cn(
        "my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-950/60 overflow-hidden shadow-sm not-prose w-full max-w-full min-w-0",
        className
      )}
    >
      {/* Top Controls Bar */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-3 sm:px-4 py-2.5 bg-white dark:bg-zinc-900/80 backdrop-blur gap-2">
        {/* Title */}
        <div className="flex items-center gap-2 min-w-0 truncate">
          <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {title}
          </span>
        </div>

        {/* Device Switcher & Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Mobile Device Switcher Dropdown */}
          <div className="flex sm:hidden items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-xs">
                {device === "desktop" && <HugeiconsIcon icon={ComputerIcon} size={14} />}
                {device === "tablet" && <HugeiconsIcon icon={Tablet01Icon} size={14} />}
                {device === "mobile" && <HugeiconsIcon icon={SmartPhone01Icon} size={14} />}
                <span className="capitalize">{device}</span>
                <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-zinc-400 ml-0.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 p-1">
                <DropdownMenuLabel className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 px-2 py-1">
                  Preview Viewport
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {DEVICES.map(({ id, label, widthLabel, icon: Icon }) => (
                  <DropdownMenuItem
                    key={id}
                    onClick={() => setDevice(id)}
                    className={cn(
                      "flex items-center justify-between gap-2 px-2 py-1.5 text-xs rounded-sm cursor-pointer",
                      device === id && "bg-zinc-100 dark:bg-zinc-800 font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={Icon} size={14} />
                      <span>{label}</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">({widthLabel})</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop/Tablet/Mobile Segmented Controls with motion layoutId */}
          <div className="hidden sm:flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-0.5">
            {DEVICES.map(({ id, label, widthLabel, icon: Icon }) => {
              const isSelected = device === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDevice(id)}
                  title={`${label} view (${widthLabel})`}
                  className={cn(
                    "relative p-1.5 rounded-md transition-colors cursor-pointer select-none",
                    isSelected
                      ? "text-zinc-950 dark:text-zinc-50 font-medium"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={deviceLayoutId}
                      className="absolute inset-0 rounded-md bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/50 dark:border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center">
                    <HugeiconsIcon icon={Icon} size={15} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reload / Reset Preview Button */}
          <button
            type="button"
            onClick={handleReload}
            title="Reload preview"
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={ReloadIcon} size={15} />
          </button>

          {/* Full preview in new tab (when src URL is available) */}
          {src && (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full preview in new tab"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 no-underline cursor-pointer"
            >
              <span className="hidden xs:inline">Full Preview</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Frame Container with smooth motion/react monotonic ease-out animation */}
      <div
        ref={containerRef}
        className={cn(
          "flex items-center justify-center overflow-hidden w-full max-w-full",
          device === "desktop"
            ? "p-0 bg-background"
            : "p-2 sm:p-6 bg-zinc-100/50 dark:bg-zinc-950/50 min-h-[420px] sm:min-h-[580px]",
          containerClassName
        )}
      >
        <motion.div
          initial={false}
          animate={{
            width: targetWidth,
          }}
          transition={{
            duration: 0.38,
            ease: [0.16, 1, 0.3, 1], // Smooth monotonic deceleration curve, prevents media-query flicker near 768px
          }}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => setIsAnimating(false)}
          className={cn(
            "mx-auto overflow-hidden min-w-0 w-full",
            device === "desktop"
              ? "rounded-none border-0 shadow-none bg-background"
              : "rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm bg-white dark:bg-black"
          )}
          style={{
            maxWidth: "100%",
          }}
        >
          {src ? (
            <div
              ref={previewMountRef}
              className={cn(
                "w-full h-[500px] sm:h-[620px] border-0 block bg-background no-scrollbar",
                height
              )}
            />
          ) : (
            <div
              key={key}
              className={cn(
                "w-full min-h-[350px] p-6 sm:p-10 flex items-center justify-center bg-background overflow-auto no-scrollbar",
                height
              )}
            >
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Global Aliases for universal compatibility across all component docs
export { ComponentPreview as UniversalPreviewFrame };
export { ComponentPreview as HeroPreviewFrame };
