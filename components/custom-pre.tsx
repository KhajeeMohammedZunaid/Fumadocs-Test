"use client";

import * as React from "react";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { CopyCheck } from "@/components/ui/copy-check";
import { cn } from "@/lib/utils";

export function CustomPre({
  children,
  ...props
}: React.ComponentProps<typeof CodeBlock>) {
  const figureRef = React.useRef<HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = React.useCallback(async (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!figureRef.current) return;
    const codeEl =
      figureRef.current.querySelector("pre code") ||
      figureRef.current.querySelector("pre");
    const text = codeEl?.textContent ?? "";
    if (!text) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        textarea.setAttribute("readonly", "");
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch {
      // Fallback
    }

    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <CodeBlock
      ref={figureRef}
      allowCopy={false}
      {...props}
      className={cn(
        "my-5 rounded-xl border border-zinc-200/90 dark:border-white/[0.08] shadow-xs overflow-hidden max-w-full min-w-0",
        props.className
      )}
      viewportProps={{
        ...props.viewportProps,
        className: cn(
          "text-[14px] leading-relaxed py-4 px-4.5 max-w-full overflow-x-auto",
          props.viewportProps?.className
        ),
      }}
      Actions={({ className }) => (
        <div className={cn("flex items-center bg-transparent backdrop-blur-none", className)}>
          <button
            type="button"
            onClick={handleCopy}
            onPointerDown={(e) => {
              if (e.pointerType === "touch") {
                handleCopy(e);
              }
            }}
            aria-label={copied ? "Copied" : "Copy code"}
            title={copied ? "Copied" : "Copy code"}
            className="flex items-center justify-center size-8 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer select-none bg-transparent hover:bg-transparent touch-manipulation active:scale-95"
          >
            <CopyCheck
              copied={copied}
              size={16}
              strokeWidth={1.8}
              className={copied ? "text-emerald-500 shrink-0" : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 shrink-0 transition-colors"}
            />
          </button>
        </div>
      )}
    >
      <Pre className="text-[14px] leading-relaxed font-mono">{children}</Pre>
    </CodeBlock>
  );
}
