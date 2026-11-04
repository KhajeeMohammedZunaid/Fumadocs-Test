"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  File01Icon,
  Copy01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { ScrollArea } from "@/components/ui/scroll-area";

const STUX_BUTTON_CODE = `"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export type StuxColorScheme =
  | "yellow"
  | "lime"
  | "cyan"
  | "orange"
  | "white"
  | "violet"
  | "emerald";

export type StuxButtonSize = "sm" | "default" | "lg";
export type StuxButtonVariant = "default" | "edge-fill";
export type StuxFillPattern = "cross" | "wave" | "cyber" | "arc" | "zigzag";

export interface StuxColorConfig {
  accentBg: string;
  accentHex: string;
  textColorOnHover: string;
  iconColor: string;
  darkHoverBorder: string;
  darkActiveBorder: string;
}

export const STUX_COLOR_SCHEMES: Record<StuxColorScheme, StuxColorConfig> = {
  yellow: {
    accentBg: "bg-[#ffea2f]",
    accentHex: "#ffea2f",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#ffea2f]",
    darkActiveBorder: "dark:border-[#ffea2f]",
  },
  lime: {
    accentBg: "bg-[#d4ff32]",
    accentHex: "#d4ff32",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#d4ff32]",
    darkActiveBorder: "dark:border-[#d4ff32]",
  },
  cyan: {
    accentBg: "bg-[#00f0ff]",
    accentHex: "#00f0ff",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#00f0ff]",
    darkActiveBorder: "dark:border-[#00f0ff]",
  },
  orange: {
    accentBg: "bg-[#ff5416]",
    accentHex: "#ff5416",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#ff5416]",
    darkActiveBorder: "dark:border-[#ff5416]",
  },
  white: {
    accentBg: "bg-white",
    accentHex: "#ffffff",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-white",
    darkActiveBorder: "dark:border-white",
  },
  violet: {
    accentBg: "bg-[#a855f7]",
    accentHex: "#a855f7",
    textColorOnHover: "group-hover:text-white",
    iconColor: "text-white",
    darkHoverBorder: "dark:group-hover:border-[#a855f7]",
    darkActiveBorder: "dark:border-[#a855f7]",
  },
  emerald: {
    accentBg: "bg-[#10b981]",
    accentHex: "#10b981",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#10b981]",
    darkActiveBorder: "dark:border-[#10b981]",
  },
};

export const STUX_SVG_PATTERNS: Record<
  StuxFillPattern,
  { label: string; description: string; path: string }
> = {
  cross: {
    label: "Cross Cut",
    description: "Sharp diagonal -38° cross-angled blade sweep",
    path: "M 0 0 L 126 0 L 94 100 L 0 100 Z",
  },
  wave: {
    label: "Liquid Wave",
    description: "Organic liquid fluid S-curve wave sweep",
    path: "M 0 0 L 110 0 C 132 25, 88 75, 110 100 L 0 100 Z",
  },
  cyber: {
    label: "Cyber Chevron",
    description: "Futuristic tech chevron > cutting across",
    path: "M 0 0 L 100 0 L 126 50 L 100 100 L 0 100 Z",
  },
  arc: {
    label: "Convex Arc",
    description: "Smooth parabolic convex dome curve",
    path: "M 0 0 L 100 0 Q 126 50, 100 100 L 0 100 Z",
  },
  zigzag: {
    label: "Sawtooth Blade",
    description: "Geometric serrated zigzag tech cut",
    path: "M 0 0 L 100 0 L 120 25 L 100 50 L 120 75 L 100 100 L 0 100 Z",
  },
};

const SIZES: Record<
  StuxButtonSize,
  {
    height: number;
    endcapWidth: number;
    paddingX: number;
    fontSize: number;
    iconSize: number;
    shift: number;
  }
> = {
  sm: {
    height: 44,
    endcapWidth: 44,
    paddingX: 20,
    fontSize: 14,
    iconSize: 16,
    shift: 38,
  },
  default: {
    height: 52,
    endcapWidth: 52,
    paddingX: 28,
    fontSize: 16,
    iconSize: 19,
    shift: 44,
  },
  lg: {
    height: 62,
    endcapWidth: 62,
    paddingX: 36,
    fontSize: 18,
    iconSize: 22,
    shift: 52,
  },
};

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

export interface StuxButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: StuxButtonVariant;
  fillPattern?: StuxFillPattern;
  menuOpen?: boolean;
  text?: string;
  size?: StuxButtonSize;
  colorScheme?: StuxColorScheme;
  customAccent?: string;
  children?: React.ReactNode;
}

export const StuxButton = React.forwardRef<HTMLButtonElement, StuxButtonProps>(
  (
    {
      variant = "default",
      fillPattern = "cross",
      menuOpen = false,
      onClick,
      text,
      children,
      className,
      id = "stux-btn",
      size = "default",
      colorScheme = "yellow",
      customAccent,
      style,
      ...props
    },
    ref
  ) => {
    const isEdgeFill = variant === "edge-fill";
    const defaultText = isEdgeFill ? "ALL PROJECTS" : "LET'S TALK";
    const displayText = children ?? text ?? defaultText;
    const isOpen = menuOpen;
    const cfg = SIZES[size] ?? SIZES.default;
    const scheme = STUX_COLOR_SCHEMES[colorScheme] ?? STUX_COLOR_SCHEMES.yellow;
    const currentPattern = STUX_SVG_PATTERNS[fillPattern] ?? STUX_SVG_PATTERNS.cross;

    const [isTapped, setIsTapped] = React.useState(false);
    const innerRef = React.useRef<HTMLButtonElement | null>(null);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement);

    React.useEffect(() => {
      if (!isTapped) return;

      const handlePointerDownOutside = (e: MouseEvent | TouchEvent | PointerEvent) => {
        if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
          setIsTapped(false);
        }
      };

      document.addEventListener("pointerdown", handlePointerDownOutside);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDownOutside);
      };
    }, [isTapped]);

    const isActionActive = isOpen || isTapped;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsTapped((prev) => !prev);
      onClick?.(e);
    };

    const handleMouseLeave = () => {
      setIsTapped(false);
    };

    return (
      <>
        <style>{\`
          .stux-btn-\${id} .stux-arrow-main,
          .stux-btn-\${id} .stux-arrow-clone {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform;
          }
          .stux-btn-\${id} .stux-arrow-main {
            transform: translate(0, 0);
          }
          .stux-btn-\${id} .stux-arrow-clone {
            transform: translate(calc(-1 * var(--arrow-dist)), var(--arrow-dist));
          }
          .stux-btn-\${id}:hover .stux-arrow-main,
          .stux-btn-\${id}[data-tapped="true"] .stux-arrow-main,
          .stux-btn-\${id}:focus-visible .stux-arrow-main,
          .stux-btn-\${id}[aria-expanded="true"] .stux-arrow-main {
            transform: translate(var(--arrow-dist), calc(-1 * var(--arrow-dist)));
          }
          .stux-btn-\${id}:hover .stux-arrow-clone,
          .stux-btn-\${id}[data-tapped="true"] .stux-arrow-clone,
          .stux-btn-\${id}:focus-visible .stux-arrow-clone,
          .stux-btn-\${id}[aria-expanded="true"] .stux-arrow-clone {
            transform: translate(0, 0);
          }
        \`}</style>

        <motion.button
          ref={innerRef}
          type="button"
          id={id}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          aria-expanded={isOpen}
          data-tapped={isActionActive ? "true" : undefined}
          initial={false}
          animate={{
            height: cfg.height,
          }}
          transition={SPRING_TRANSITION}
          style={
            {
              "--arrow-dist": \`\${cfg.shift}px\`,
              ...(customAccent ? { "--stux-accent": customAccent } : {}),
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            \`stux-btn-\${id}\`,
            "relative flex items-stretch select-none overflow-hidden focus:outline-none shadow-none group pointer-events-auto border-[3px] border-[#040404] dark:border-white/30 transition-all duration-300 cursor-pointer will-change-transform active:scale-[0.98] active:translate-y-[1px]",
            scheme.darkHoverBorder,
            isOpen
              ? cn(scheme.accentBg, scheme.darkActiveBorder)
              : "bg-black dark:bg-[#0c0d10]",
            className
          )}
          {...props}
        >
          {isEdgeFill ? (
            <>
              <div className="absolute -inset-[3px] overflow-hidden pointer-events-none z-0">
                <svg
                  viewBox="0 0 220 100"
                  preserveAspectRatio="none"
                  className={cn(
                    "absolute top-0 bottom-0 left-0 h-full w-[220%] pointer-events-none will-change-transform",
                    "transition-transform duration-[850ms] ease-[0.22,1,0.36,1]",
                    isActionActive
                      ? "translate-x-0"
                      : "-translate-x-[58%] group-hover:translate-x-0 group-focus-visible:translate-x-0"
                  )}
                  style={{ fill: customAccent ?? scheme.accentHex }}
                >
                  <path d={currentPattern.path} />
                </svg>
              </div>

              <motion.p
                initial={false}
                animate={{
                  paddingLeft: cfg.paddingX + 12,
                  paddingRight: cfg.paddingX + 12,
                  fontSize: cfg.fontSize,
                }}
                transition={SPRING_TRANSITION}
                className={cn(
                  "relative z-10 m-0 w-full font-['Inter',sans-serif] font-medium tracking-[0.02em] uppercase flex items-center justify-center transition-colors duration-[700ms] select-none whitespace-nowrap leading-none",
                  isActionActive
                    ? scheme.textColorOnHover.replace("group-hover:", "")
                    : cn("text-white", scheme.textColorOnHover)
                )}
              >
                {displayText}
              </motion.p>
            </>
          ) : (
            <>
              <div
                className={cn(
                  "absolute top-0 right-0 bottom-0 transition-[width] duration-[600ms] ease-[0.22,1,0.36,1] z-0 pointer-events-none",
                  isActionActive ? "!w-full" : "group-hover:!w-full",
                  scheme.accentBg
                )}
                style={{
                  width: isActionActive ? "100%" : \`\${cfg.endcapWidth}px\`,
                }}
              />

              <motion.p
                initial={false}
                animate={{
                  paddingLeft: cfg.paddingX,
                  paddingRight: cfg.paddingX,
                  fontSize: cfg.fontSize,
                }}
                transition={SPRING_TRANSITION}
                className={cn(
                  "relative z-10 m-0 font-['Inter',sans-serif] font-normal tracking-normal flex items-center justify-center transition-colors duration-[600ms] select-none whitespace-nowrap leading-none",
                  isActionActive
                    ? scheme.textColorOnHover.replace("group-hover:", "")
                    : cn("text-white", scheme.textColorOnHover)
                )}
              >
                {displayText}
              </motion.p>

              <motion.div
                initial={false}
                animate={{
                  width: cfg.endcapWidth,
                }}
                transition={SPRING_TRANSITION}
                className={cn(
                  "relative z-10 flex items-center justify-center transition-colors duration-[600ms] border-l-[3px] shrink-0 overflow-hidden h-full",
                  isActionActive
                    ? "border-black/15 dark:border-black/25"
                    : "border-transparent group-hover:border-black/15 dark:group-hover:border-black/25"
                )}
              >
                <motion.span
                  initial={false}
                  animate={{
                    width: cfg.iconSize,
                    height: cfg.iconSize,
                  }}
                  transition={SPRING_TRANSITION}
                  className="stux-arrow-wrapper relative flex items-center justify-center pointer-events-none select-none shrink-0"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={cn("stux-arrow-main block", scheme.iconColor)}
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={cn("stux-arrow-clone block", scheme.iconColor)}
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </motion.span>
              </motion.div>
            </>
          )}
        </motion.button>
      </>
    );
  }
);

StuxButton.displayName = "StuxButton";

export default StuxButton;
`;

const KEYWORDS = new Set([
  "import", "export", "from", "const", "let", "var", "function", "return",
  "type", "interface", "extends", "default", "as", "typeof", "new", "if",
  "else", "switch", "case", "break", "continue", "for", "while", "do",
  "try", "catch", "finally", "throw", "async", "await", "yield", "class",
  "true", "false", "null", "undefined", "void", "any", "never", "unknown",
  "boolean", "string", "number", "object", "symbol", "bigint",
]);

function highlightLine(line: string, lineIndex: number): React.ReactNode {
  const trimmed = line.trim();
  if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
    return (
      <span key={lineIndex} className="text-zinc-500 italic">
        {line}
      </span>
    );
  }

  const tokenRegex =
    /(\/\/.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][A-Za-z0-9_$]*\b)|([{}()\[\].,:;=+\-*/%&|^!<>?~]+)|(\s+)/g;

  const elements: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenRegex.exec(line)) !== null) {
    const [full, comment, str, num, word, punct, space] = match;

    if (comment) {
      elements.push(
        <span key={key++} className="text-zinc-500 italic">
          {comment}
        </span>
      );
    } else if (str) {
      elements.push(
        <span key={key++} className="text-emerald-400 dark:text-emerald-300">
          {str}
        </span>
      );
    } else if (num) {
      elements.push(
        <span key={key++} className="text-amber-400 dark:text-amber-300">
          {num}
        </span>
      );
    } else if (word) {
      if (KEYWORDS.has(word)) {
        elements.push(
          <span key={key++} className="text-purple-400 dark:text-purple-300 font-medium">
            {word}
          </span>
        );
      } else if (/^[A-Z][A-Za-z0-9_]*$/.test(word)) {
        elements.push(
          <span key={key++} className="text-sky-400 dark:text-sky-300">
            {word}
          </span>
        );
      } else if (word === "motion") {
        elements.push(
          <span key={key++} className="text-cyan-400 dark:text-cyan-300">
            {word}
          </span>
        );
      } else {
        elements.push(
          <span key={key++} className="text-zinc-200">
            {word}
          </span>
        );
      }
    } else if (punct) {
      elements.push(
        <span key={key++} className="text-zinc-400">
          {punct}
        </span>
      );
    } else if (space) {
      elements.push(space);
    }
  }

  return <React.Fragment key={lineIndex}>{elements}</React.Fragment>;
}

function SyntaxHighlightedCode({ code }: { code: string }) {
  const lines = React.useMemo(() => code.split("\n"), [code]);

  return (
    <ScrollArea className="h-full w-full font-mono text-[13px] leading-relaxed">
      <div className="py-3 px-4 flex min-w-full">
        {/* Line numbers */}
        <div className="select-none text-zinc-500/50 pr-4 text-right font-mono text-xs shrink-0 border-r border-zinc-800/60 mr-4">
          {lines.map((_, i) => (
            <div key={i} className="leading-[22px] min-h-[22px]">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Code */}
        <pre className="flex-1 m-0 p-0 font-mono text-[13px] leading-[22px] whitespace-pre select-text overflow-x-auto min-w-0">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="min-h-[22px]">
                {line.length === 0 ? "\u00A0" : highlightLine(line, i)}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </ScrollArea>
  );
}

export function StuxButtonCodeViewer() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(STUX_BUTTON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 dark:bg-black overflow-hidden shadow-sm not-prose flex flex-col h-[520px]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5 bg-zinc-900/90 backdrop-blur select-none">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
          <HugeiconsIcon icon={File01Icon} size={14} className="text-zinc-400 shrink-0" />
          <span>components/stux-button/stux-button.tsx</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            TSX
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1 rounded-md transition-colors cursor-pointer border border-zinc-700/80 shadow-xs"
          >
            <HugeiconsIcon
              icon={copied ? Tick01Icon : Copy01Icon}
              size={13}
              className={copied ? "text-emerald-400" : "text-zinc-400"}
            />
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Syntax Highlighted Code Viewer */}
      <div className="flex-1 min-h-0 w-full overflow-hidden relative">
        <SyntaxHighlightedCode code={STUX_BUTTON_CODE} />
      </div>
    </div>
  );
}

