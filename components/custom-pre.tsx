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
      Actions={({ className }) => (
        <div className={cn("flex items-center", className)}>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            title={copied ? "Copied" : "Copy code"}
            className="flex items-center justify-center size-7 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer select-none"
          >
            <CopyCheck
              copied={copied}
              size={14}
              className={copied ? "text-emerald-400 shrink-0" : "text-zinc-400 shrink-0"}
            />
          </button>
        </div>
      )}
    >
      <Pre>{children}</Pre>
    </CodeBlock>
  );
}

