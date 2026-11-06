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
  const baseId = React.useId();
  const mainTabLayoutId = `${baseId}-main-tab`;
  const cliPkgLayoutId = `${baseId}-pkg-cli`;
  const manualPkgLayoutId = `${baseId}-pkg-manual`;

  const [tab, setTab] = React.useState<"cli" | "manual">("cli");
  const [pkg, setPkg] = React.useState<PkgManager>("pnpm");
  const [copied, setCopied] = React.useState(false);
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const currentPkg = PKG_CONFIGS.find((p) => p.id === pkg) ?? PKG_CONFIGS[1];

  const currentCliCommand =
    cliCommand || `${currentPkg.cliPrefix} ${componentName}`;

  const currentInstallCommand = dependencies
    ? `${currentPkg.installPrefix} ${dependencies}`
    : `${currentPkg.installPrefix} ${componentName}`;

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
      <div className="flex items-center gap-6 border-b border-zinc-200/80 dark:border-white/[0.08] mb-4">
        <button
          type="button"
          onClick={() => setTab("cli")}
          className={cn(
            "relative pb-2.5 text-sm font-medium transition-colors cursor-pointer select-none",
            tab === "cli"
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>CLI</span>
          {tab === "cli" && (
            <motion.div
              layoutId={mainTabLayoutId}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab("manual")}
          className={cn(
            "relative pb-2.5 text-sm font-medium transition-colors cursor-pointer select-none",
            tab === "manual"
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>Manual</span>
          {tab === "manual" && (
            <motion.div
              layoutId={mainTabLayoutId}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
        </button>
      </div>

      {tab === "cli" ? (
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
                    "relative inline-flex items-center justify-center gap-2 min-w-[76px] sm:min-w-[82px] h-8 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer select-none",
                    isSelected
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={cliPkgLayoutId}
                      className="absolute inset-0 rounded-md bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/60 dark:border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
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
      ) : (
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
                        "relative inline-flex items-center justify-center gap-2 min-w-[76px] sm:min-w-[82px] h-8 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer select-none",
                        isSelected
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId={manualPkgLayoutId}
                          className="absolute inset-0 rounded-md bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/60 dark:border-white/[0.08]"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
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
      )}
    </div>
  );
}

