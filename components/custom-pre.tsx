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

  const handleCopy = React.useCallback(async () => {
    if (!figureRef.current) return;
    const codeEl =
      figureRef.current.querySelector("pre code") ||
      figureRef.current.querySelector("pre");
    const text = codeEl?.textContent ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, []);

  return (
    <CodeBlock
      ref={figureRef}
      allowCopy={false}
      {...props}
      className={cn(
        "my-5 rounded-xl border border-zinc-200/90 dark:border-white/[0.08] shadow-xs overflow-hidden",
        props.className
      )}
      viewportProps={{
        ...props.viewportProps,
        className: cn(
          "text-[14px] leading-relaxed py-4 px-4.5",
          props.viewportProps?.className
        ),
      }}
      Actions={({ className }) => (
        <div className={cn("flex items-center bg-transparent backdrop-blur-none", className)}>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            title={copied ? "Copied" : "Copy code"}
            className="flex items-center justify-center size-8 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer select-none bg-transparent hover:bg-transparent"
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
