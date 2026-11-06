"use client";

import * as React from "react";
import { motion } from "motion/react";
import { NPM } from "@/components/ui/npm";
import { Bun } from "@/components/ui/bun";
import { Pnpm } from "@/components/ui/pnpm";
import { Yarn } from "@/components/ui/yarn";
import { CopyCheck } from "@/components/ui/copy-check";
import { cn } from "@/lib/utils";

type PkgManager = "npm" | "pnpm" | "yarn" | "bun";

const PKG_CONFIGS: {
  id: PkgManager;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  cliPrefix: string;
  installPrefix: string;
}[] = [
  {
    id: "npm",
    label: "npm",
    icon: NPM,
    cliPrefix: "npx shadcn@latest add",
    installPrefix: "npm install",
  },
  {
    id: "pnpm",
    label: "pnpm",
    icon: Pnpm,
    cliPrefix: "pnpm dlx shadcn@latest add",
    installPrefix: "pnpm add",
  },
  {
    id: "yarn",
    label: "yarn",
    icon: Yarn,
    cliPrefix: "yarn dlx shadcn@latest add",
    installPrefix: "yarn add",
  },
  {
    id: "bun",
    label: "bun",
    icon: Bun,
    cliPrefix: "bunx --bun shadcn@latest add",
    installPrefix: "bun add",
  },
];

interface CliInstallationProps {
  componentName?: string;
  dependencies?: string;
  cliCommand?: string;
  children?: React.ReactNode;
  className?: string;
}

export function CliInstallation({
  componentName = "component",
  dependencies = "",
  cliCommand,
  children,
  className,
}: CliInstallationProps) {
  const rawId = React.useId();
  const safeId = React.useMemo(() => rawId.replace(/[^a-zA-Z0-9]/g, ""), [rawId]);
  const mainTabLayoutId = `tab-underline-${safeId}`;
  const cliPkgLayoutId = `pkg-cli-${safeId}`;
  const manualPkgLayoutId = `pkg-manual-${safeId}`;

  // activeTab controls the urgent tab button text & sliding underline indicator (0ms latency)
  const [activeTab, setActiveTab] = React.useState<"cli" | "manual">("cli");
  // displayTab controls the panel visibility via startTransition for non-blocking UI
  const [displayTab, setDisplayTab] = React.useState<"cli" | "manual">("cli");
  // Keep-alive flag: once visited or idle pre-warmed, manual content stays mounted in DOM
  const [hasVisitedManual, setHasVisitedManual] = React.useState(false);
  const [, startTransition] = React.useTransition();

  const [pkg, setPkg] = React.useState<PkgManager>("pnpm");
  const [copied, setCopied] = React.useState(false);
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-warm manual panel during idle time after hydration for instantaneous tab switching (Vercel bundle-preload / keep-alive)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const idleCallback =
      "requestIdleCallback" in window
        ? (window as any).requestIdleCallback(() => setHasVisitedManual(true), { timeout: 1500 })
        : setTimeout(() => setHasVisitedManual(true), 300);

    return () => {
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const currentPkg = React.useMemo(
    () => PKG_CONFIGS.find((p) => p.id === pkg) ?? PKG_CONFIGS[1],
    [pkg]
  );

  const currentCliCommand = React.useMemo(
    () => cliCommand || `${currentPkg.cliPrefix} ${componentName}`,
    [cliCommand, currentPkg.cliPrefix, componentName]
  );

  const currentInstallCommand = React.useMemo(
    () =>
      dependencies
        ? `${currentPkg.installPrefix} ${dependencies}`
        : `${currentPkg.installPrefix} ${componentName}`,
    [dependencies, currentPkg.installPrefix, componentName]
  );

  const handleTabChange = React.useCallback(
    (nextTab: "cli" | "manual") => {
      if (nextTab === activeTab) return;
      // 1. Urgent update: instant button text & sliding indicator transition (0ms, 120fps)
      setActiveTab(nextTab);
      if (nextTab === "manual") {
        setHasVisitedManual(true);
      }
      // 2. Non-urgent update: concurrent transition for the panel contents
      startTransition(() => {
        setDisplayTab(nextTab);
      });
    },
    [activeTab]
  );

  const handleCopy = React.useCallback((text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, []);

  return (
    <div className={cn("w-full my-6 not-prose", className)}>
      {/* Installation Mode Tabs: CLI vs Manual with sliding motion/react layoutId indicator */}
      <div className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-800 mb-4">
        <button
          type="button"
          onClick={() => handleTabChange("cli")}
          className={cn(
            "relative pb-2.5 text-sm font-medium transition-colors cursor-pointer select-none",
            activeTab === "cli"
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>CLI</span>
          {activeTab === "cli" && (
            <motion.div
              layoutId={mainTabLayoutId}
              className="absolute -bottom-px left-0 right-0 h-0.5 bg-foreground z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => handleTabChange("manual")}
          className={cn(
            "relative pb-2.5 text-sm font-medium transition-colors cursor-pointer select-none",
            activeTab === "manual"
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>Manual</span>
          {activeTab === "manual" && (
            <motion.div
              layoutId={mainTabLayoutId}
              className="absolute -bottom-px left-0 right-0 h-0.5 bg-foreground z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* CLI Tab Panel */}
      <div className={displayTab === "cli" ? "block animate-in fade-in-50 duration-150" : "hidden"}>
        <div className="space-y-3">
          {/* Package Manager Selector: npm, pnpm, yarn, bun with logos & motion layoutId */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/[0.08] w-fit">
            {PKG_CONFIGS.map((p) => {
              const Icon = p.icon;
              const isSelected = p.id === pkg;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPkg(p.id)}
                  className={cn(
                    "relative inline-flex items-center justify-center gap-2 min-w-[78px] sm:min-w-[84px] h-8 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer select-none",
                    isSelected
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40"
                  )}
                >
                  {isSelected && displayTab === "cli" && (
                    <motion.div
                      layoutId={cliPkgLayoutId}
                      className="absolute inset-0 rounded-md bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/60 dark:border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    <Icon className="size-3.5 shrink-0" />
                    <span>{p.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Terminal Command Codeblock (theme-responsive background matching Fumadocs code blocks) */}
          <div className="relative flex items-center justify-between px-4 py-3.5 rounded-xl bg-fd-card dark:bg-[#161616] border border-zinc-200/90 dark:border-white/[0.08] text-foreground shadow-xs group">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-[13.5px]">
              <span className="text-zinc-400 dark:text-zinc-500 font-medium select-none">$</span>
              <span className="text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 whitespace-nowrap">
                {currentCliCommand}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(currentCliCommand)}
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-white/[0.08] bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer ml-3 active:scale-95"
              aria-label="Copy CLI command"
              title="Copy to clipboard"
            >
              <CopyCheck copied={copied} size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Manual Tab Panel (Mounted once, kept alive, hardware-accelerated instant visibility) */}
      {hasVisitedManual && (
        <div className={displayTab === "manual" ? "block animate-in fade-in-50 duration-150" : "hidden"}>
          <div className="space-y-6 pt-1">
            {/* Manual Step 1: Dependencies */}
            {dependencies && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground font-normal">
                  Install the following dependencies:
                </p>

                {/* Package Manager Selector for Dependencies with motion layoutId */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/[0.08] w-fit">
                  {PKG_CONFIGS.map((p) => {
                    const Icon = p.icon;
                    const isSelected = p.id === pkg;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPkg(p.id)}
                        className={cn(
                          "relative inline-flex items-center justify-center gap-2 min-w-[78px] sm:min-w-[84px] h-8 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer select-none",
                          isSelected
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40"
                        )}
                      >
                        {isSelected && displayTab === "manual" && (
                          <motion.div
                            layoutId={manualPkgLayoutId}
                            className="absolute inset-0 rounded-md bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/60 dark:border-white/[0.08]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10 inline-flex items-center justify-center gap-2">
                          <Icon className="size-3.5 shrink-0" />
                          <span>{p.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Dependency Codeblock (theme-responsive background matching Fumadocs code blocks) */}
                <div className="relative flex items-center justify-between px-4 py-3.5 rounded-xl bg-fd-card dark:bg-[#161616] border border-zinc-200/90 dark:border-white/[0.08] text-foreground shadow-xs group">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-[13.5px]">
                    <span className="text-zinc-400 dark:text-zinc-500 font-medium select-none">$</span>
                    <span className="text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 whitespace-nowrap">
                      {currentInstallCommand}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(currentInstallCommand)}
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-white/[0.08] bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer ml-3 active:scale-95"
                    aria-label="Copy install command"
                    title="Copy to clipboard"
                  >
                    <CopyCheck copied={copied} size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Manual Step 2: Component Files */}
            {children && (
              <div className="space-y-3 pt-2">
                <p className="text-sm text-muted-foreground font-normal">
                  Copy and paste the following code into your project:
                </p>
                <div>{children}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

