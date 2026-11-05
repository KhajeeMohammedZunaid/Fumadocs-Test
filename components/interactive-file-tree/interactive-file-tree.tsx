"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Folder01Icon,
  Folder02Icon,
  File01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  SidebarLeft01Icon,
} from "@hugeicons/core-free-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CopyCheck } from "@/components/ui/copy-check";
import { React as ReactLogo } from "@/components/logos/react";
import { TailwindCSS as TailwindLogo } from "@/components/logos/tailwind";
import type { FileItem, InteractiveFileTreeProps } from "./types";

const CODE_FONT_FAMILY =
  "var(--font-geist-mono), 'Fira Code', 'Courier New', monospace";

const customCodeDarkTheme: { [key: string]: React.CSSProperties } = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "transparent",
    backgroundColor: "transparent",
    fontFamily: CODE_FONT_FAMILY,
    padding: "16px 18px",
    margin: 0,
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: "transparent",
    backgroundColor: "transparent",
    fontFamily: CODE_FONT_FAMILY,
    padding: 0,
  },
  ':not(pre) > code[class*="language-"]': {
    ...vscDarkPlus[':not(pre) > code[class*="language-"]'],
    background: "transparent",
  },
};

const customCodeLightTheme: { [key: string]: React.CSSProperties } = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...oneLight['pre[class*="language-"]'],
    background: "transparent",
    backgroundColor: "transparent",
    fontFamily: CODE_FONT_FAMILY,
    fontSize: "14px",
    lineHeight: "24px",
    fontStyle: "normal",
    padding: "16px 18px",
    margin: 0,
  },
  'code[class*="language-"]': {
    ...oneLight['code[class*="language-"]'],
    background: "transparent",
    backgroundColor: "transparent",
    fontFamily: CODE_FONT_FAMILY,
    fontSize: "14px",
    lineHeight: "24px",
    fontStyle: "normal",
    padding: 0,
  },
  ':not(pre) > code[class*="language-"]': {
    ...oneLight[':not(pre) > code[class*="language-"]'],
    background: "transparent",
  },
};

function getSyntaxLanguage(fileName: string): string {
  if (fileName.endsWith(".tsx")) return "tsx";
  if (fileName.endsWith(".ts")) return "typescript";
  if (fileName.endsWith(".css")) return "css";
  if (fileName.endsWith(".json")) return "json";
  if (fileName.endsWith(".html")) return "html";
  return "javascript";
}

function FileTypeIcon({
  fileName,
  className,
}: {
  fileName: string;
  className?: string;
}) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".tsx") || lower.endsWith(".jsx")) {
    return <ReactLogo className={cn("size-[15px] shrink-0", className)} />;
  }
  if (lower.endsWith(".css")) {
    return <TailwindLogo className={cn("size-[15px] shrink-0", className)} />;
  }
  return (
    <HugeiconsIcon
      icon={File01Icon}
      size={14}
      className={cn("text-zinc-500 dark:text-zinc-400 shrink-0", className)}
    />
  );
}

export function UniversalFileTree({
  files,
  defaultFileId,
  title = "Component Files",
  className,
  height = "540px",
}: InteractiveFileTreeProps) {
  const folders = React.useMemo(() => {
    const map = new Map<string, FileItem[]>();
    for (const f of files) {
      const list = map.get(f.folder);
      if (list) {
        list.push(f);
      } else {
        map.set(f.folder, [f]);
      }
    }
    return Array.from(map.entries());
  }, [files]);

  const fileMap = React.useMemo(() => {
    return new Map<string, FileItem>(files.map((f) => [f.id, f]));
  }, [files]);

  const [openFolders, setOpenFolders] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const f of files) {
      initial[f.folder] = true;
    }
    return initial;
  });

  const [activeFileId, setActiveFileId] = React.useState<string>(() => {
    if (defaultFileId && fileMap.has(defaultFileId)) return defaultFileId;
    return files[0]?.id ?? "";
  });

  // Track external changes to defaultFileId prop without clobbering user selection
  const prevDefaultFileIdRef = React.useRef(defaultFileId);
  React.useEffect(() => {
    if (prevDefaultFileIdRef.current !== defaultFileId) {
      prevDefaultFileIdRef.current = defaultFileId;
      if (defaultFileId && fileMap.has(defaultFileId)) {
        setActiveFileId(defaultFileId);
      }
    } else if (!fileMap.has(activeFileId) && files[0]) {
      setActiveFileId(files[0].id);
    }
  }, [defaultFileId, fileMap, activeFileId, files]);

  const [copied, setCopied] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  const activeFile = fileMap.get(activeFileId) ?? files[0];

  const toggleFolder = React.useCallback((folderKey: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  }, []);

  const handleSelectFile = React.useCallback((fileId: string) => {
    setActiveFileId(fileId);
  }, []);

  const handleCopy = React.useCallback(async (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!activeFile) return;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(activeFile.code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = activeFile.code;
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
    setTimeout(() => setCopied(false), 2000);
  }, [activeFile]);

  if (!files || files.length === 0) {
    return null;
  }

  const heightStyle = typeof height === "number" ? `${height}px` : height;

  const renderTreeHeader = () => (
    <div className="flex items-center justify-between px-3 h-10 border-b border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#161616] text-[13px] font-medium text-zinc-800 dark:text-zinc-200 shrink-0 select-none box-border">
      <div className="flex items-center gap-2 truncate min-w-0">
        <HugeiconsIcon icon={Folder02Icon} size={16} className="text-sky-500 shrink-0" />
        <span className="truncate font-medium">{title}</span>
      </div>
      {/* Desktop: Sidebar collapse button in place of the file count badge */}
      <button
        type="button"
        onClick={() => setSidebarOpen(false)}
        title="Collapse File Tree"
        className="hidden lg:flex items-center justify-center h-7 w-7 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer shrink-0 bg-transparent hover:bg-transparent"
      >
        <HugeiconsIcon
          icon={SidebarLeft01Icon}
          size={15}
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        />
      </button>
      {/* Mobile: File count badge */}
      <span className="flex lg:hidden text-[11px] font-mono h-5 min-w-[20px] px-1.5 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 shrink-0 ml-1 border border-zinc-300 dark:border-zinc-700/50">
        {files.length}
      </span>
    </div>
  );

  const renderFolderList = () => (
    <div className="space-y-1 min-w-0">
      {folders.map(([folderName, filesInFolder]) => {
        const isOpen = openFolders[folderName] ?? true;
        return (
          <div key={folderName} className="space-y-0.5 min-w-0">
            {/* Folder Row */}
            <button
              type="button"
              onClick={() => toggleFolder(folderName)}
              className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[13px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer select-none text-left min-w-0"
            >
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "transform" }}
                className="inline-flex shrink-0 items-center justify-center"
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={13}
                  className="text-zinc-400 dark:text-zinc-400 shrink-0"
                />
              </motion.span>
              <HugeiconsIcon
                icon={isOpen ? Folder02Icon : Folder01Icon}
                size={15}
                className="text-sky-500 shrink-0"
              />
              <span className="truncate min-w-0 flex-1">{folderName}</span>
            </button>

            {/* Files inside Folder with smooth accordion */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`folder-${folderName}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: "height, opacity" }}
                  className="overflow-hidden pl-2 space-y-0.5 border-l border-zinc-200 dark:border-zinc-800 ml-3.5 my-0.5 min-w-0"
                >
                  {filesInFolder.map((file) => {
                    const isActive = file.id === activeFileId;
                    return (
                      <button
                        key={file.id}
                        type="button"
                        title={file.name}
                        onClick={() => handleSelectFile(file.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer text-left min-w-0",
                          isActive
                            ? "bg-zinc-200/90 text-zinc-950 dark:bg-zinc-800 dark:text-white font-medium shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-950 dark:hover:text-zinc-100 font-normal"
                        )}
                      >
                        <FileTypeIcon fileName={file.name} />
                        <span className="truncate min-w-0 flex-1">{file.name}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      style={{ height: heightStyle }}
      className={cn(
        "my-6 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-[#fafafa] dark:bg-[#161616] overflow-hidden shadow-sm not-prose flex flex-col lg:flex-row relative",
        className
      )}
    >
      {/* =========================================================================
          DESKTOP LEFT PANEL: Animated File Tree via motion/react
         ========================================================================= */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            key="desktop-file-tree"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "width, opacity" }}
            className="hidden lg:flex flex-col h-full shrink-0 border-r border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#161616] overflow-hidden"
          >
            <div className="w-[250px] min-w-[250px] flex flex-col h-full bg-zinc-50 dark:bg-[#161616]">
              {renderTreeHeader()}
              <ScrollArea className="flex-1 p-2 overflow-x-hidden bg-zinc-50 dark:bg-[#161616] scroll-fade">
                {renderFolderList()}
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          CODE SYNTAX HIGHLIGHTER & VIEWER
         ========================================================================= */}
      <div className="flex flex-col h-full min-w-0 bg-[#fafafa] dark:bg-[#161616] overflow-hidden flex-1">
        {/* Code Viewer Top Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] px-3 h-10 bg-white dark:bg-[#161616] shrink-0 select-none gap-2 box-border">
          {/* Left Controls */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Desktop Sidebar Open Button (visible only when file tree sidebar is collapsed) */}
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                title="Expand File Tree"
                className="hidden lg:flex items-center justify-center h-7 w-7 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer shrink-0 bg-transparent hover:bg-transparent"
              >
                <HugeiconsIcon
                  icon={SidebarLeft01Icon}
                  size={15}
                  className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                />
              </button>
            )}

            {/* Desktop: Clean File Indicator */}
            {activeFile && (
              <div className="hidden lg:flex items-center gap-2 text-[13px] text-zinc-800 dark:text-zinc-200 truncate">
                <FileTypeIcon fileName={activeFile.name} />
                <span className="font-medium text-zinc-900 dark:text-zinc-200">{activeFile.name}</span>
              </div>
            )}

            {/* Mobile / Narrow Screen: Dropdown File Selector */}
            <div className="flex lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-2.5 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer max-w-[200px] truncate shadow-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    {activeFile && <FileTypeIcon fileName={activeFile.name} />}
                    <span className="truncate">{activeFile?.name}</span>
                  </div>
                  <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-zinc-400 shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-1.5 bg-white dark:bg-[#161616] border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-xl">
                  <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 py-1">
                    Select Component File
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800 my-1" />
                  {folders.map(([folderName, filesInFolder]) => (
                    <DropdownMenuGroup key={folderName}>
                      <div className="px-2 py-1 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <HugeiconsIcon icon={Folder01Icon} size={12} className="text-sky-400" />
                        <span>{folderName}</span>
                      </div>
                      {filesInFolder.map((file) => {
                        const isSelected = file.id === activeFileId;
                        return (
                          <DropdownMenuItem
                            key={file.id}
                            onClick={() => handleSelectFile(file.id)}
                            className={cn(
                              "flex items-center justify-between gap-2 px-2 py-1.5 text-xs rounded-sm cursor-pointer transition-colors pl-5",
                              isSelected
                                ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white font-medium"
                                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60 dark:hover:text-white"
                            )}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileTypeIcon fileName={file.name} />
                              <span className="truncate">{file.name}</span>
                            </div>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuGroup>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Controls: Copy Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              onPointerDown={(e) => {
                if (e.pointerType === "touch") {
                  handleCopy(e);
                }
              }}
              className="flex items-center gap-1.5 text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 h-7 px-2.5 rounded-md transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-700/80 shadow-xs select-none touch-manipulation active:scale-95"
            >
              <CopyCheck
                copied={copied}
                size={14}
                className={copied ? "text-emerald-600 dark:text-emerald-400 shrink-0" : "text-zinc-500 dark:text-zinc-400 shrink-0"}
              />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* React Syntax Highlighter Container */}
        <div suppressHydrationWarning className="flex-1 min-h-0 w-full overflow-hidden relative bg-[#fafafa] dark:bg-[#161616]">
          <ScrollArea className="h-full w-full bg-[#fafafa] dark:bg-[#161616] scroll-fade">
            <div suppressHydrationWarning className="min-w-fit">
              {activeFile && (
                <SyntaxHighlighter
                  language={getSyntaxLanguage(activeFile.name)}
                  style={isDark ? customCodeDarkTheme : customCodeLightTheme}
                  showLineNumbers={false}
                  wrapLines={false}
                  customStyle={{
                    margin: 0,
                    padding: "16px 18px",
                    background: "transparent",
                    backgroundColor: "transparent",
                    fontSize: "14px",
                    lineHeight: "24px",
                    fontFamily: CODE_FONT_FAMILY,
                    minWidth: "100%",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: CODE_FONT_FAMILY,
                      fontSize: "14px",
                      lineHeight: "24px",
                      background: "transparent",
                    },
                  }}
                >
                  {activeFile.code}
                </SyntaxHighlighter>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export const InteractiveFileTree = UniversalFileTree;
