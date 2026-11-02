"use client";

import * as React from "react";
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

type DeviceMode = "desktop" | "tablet" | "mobile";

interface HeroPreviewFrameProps {
  src?: string;
  title?: string;
}

export function HeroPreviewFrame({
  src = "/preview/hero-1",
  title = "Hero Section Preview",
}: HeroPreviewFrameProps) {
  const [device, setDevice] = React.useState<DeviceMode>("desktop");
  const [key, setKey] = React.useState(0);

  const getWidth = () => {
    switch (device) {
      case "mobile":
        return "max-w-[390px]";
      case "tablet":
        return "max-w-[768px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-950/60 overflow-hidden shadow-sm not-prose">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 bg-white dark:bg-zinc-900/80 backdrop-blur">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {title}
          </span>
        </div>

        {/* Device Switcher & Open Link */}
        <div className="flex items-center gap-1.5">
          {/* Mobile Device Switcher Dropdown (shadcn) */}
          <div className="flex sm:hidden items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-xs">
                {device === "desktop" && <HugeiconsIcon icon={ComputerIcon} size={14} />}
                {device === "tablet" && <HugeiconsIcon icon={Tablet01Icon} size={14} />}
                {device === "mobile" && <HugeiconsIcon icon={SmartPhone01Icon} size={14} />}
                <span className="capitalize">{device}</span>
                <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-zinc-400 ml-0.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 p-1">
                <DropdownMenuLabel className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 px-2 py-1">
                  Preview Device
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDevice("desktop")}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm cursor-pointer",
                    device === "desktop" && "bg-zinc-100 dark:bg-zinc-800 font-medium"
                  )}
                >
                  <HugeiconsIcon icon={ComputerIcon} size={14} />
                  <span>Desktop (100%)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDevice("tablet")}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm cursor-pointer",
                    device === "tablet" && "bg-zinc-100 dark:bg-zinc-800 font-medium"
                  )}
                >
                  <HugeiconsIcon icon={Tablet01Icon} size={14} />
                  <span>Tablet (768px)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDevice("mobile")}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm cursor-pointer",
                    device === "mobile" && "bg-zinc-100 dark:bg-zinc-800 font-medium"
                  )}
                >
                  <HugeiconsIcon icon={SmartPhone01Icon} size={14} />
                  <span>Mobile (390px)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop/Tablet segmented device buttons */}
          <div className="hidden sm:flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-0.5">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              title="Desktop view"
              className={cn(
                "p-1.5 rounded-md transition-colors cursor-pointer",
                device === "desktop"
                  ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              <HugeiconsIcon icon={ComputerIcon} size={15} />
            </button>
            <button
              type="button"
              onClick={() => setDevice("tablet")}
              title="Tablet view (768px)"
              className={cn(
                "p-1.5 rounded-md transition-colors cursor-pointer",
                device === "tablet"
                  ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              <HugeiconsIcon icon={Tablet01Icon} size={15} />
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              title="Mobile view (390px)"
              className={cn(
                "p-1.5 rounded-md transition-colors cursor-pointer",
                device === "mobile"
                  ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              <HugeiconsIcon icon={SmartPhone01Icon} size={15} />
            </button>
          </div>

          {/* Reload button */}
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            title="Reload preview"
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={ReloadIcon} size={15} />
          </button>

          {/* Full preview in new tab */}
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            title="Open full preview in new tab"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 no-underline cursor-pointer"
          >
            <span>Full Preview</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex items-center justify-center p-3 sm:p-6 bg-zinc-100/50 dark:bg-zinc-950/50 min-h-[640px] overflow-hidden">
        <div
          className={cn(
            "w-full transition-all duration-300 ease-in-out mx-auto rounded-lg overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-sm bg-white dark:bg-black",
            getWidth()
          )}
        >
          <iframe
            key={key}
            src={src}
            title={title}
            className="w-full h-[620px] border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
