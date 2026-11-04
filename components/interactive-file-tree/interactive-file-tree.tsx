"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Folder01Icon,
  Folder02Icon,
  File01Icon,
  Copy01Icon,
  Tick01Icon,
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
import type { FileItem, InteractiveFileTreeProps } from "./types";

const CODE_BG = "#161616";
const CODE_FONT_FAMILY =
  "var(--font-geist-mono), 'Fira Code', 'Courier New', monospace";

const customCodeDarkTheme: { [key: string]: React.CSSProperties } = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: CODE_BG,
    backgroundColor: CODE_BG,
    fontFamily: CODE_FONT_FAMILY,
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: CODE_BG,
    backgroundColor: CODE_BG,
    fontFamily: CODE_FONT_FAMILY,
  },
  ':not(pre) > code[class*="language-"]': {
    ...vscDarkPlus[':not(pre) > code[class*="language-"]'],
    background: CODE_BG,
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
  const [mobileView, setMobileView] = React.useState<"tree" | "code">("code");

  const activeFile = fileMap.get(activeFileId) ?? files[0];

  const toggleFolder = React.useCallback((folderKey: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  }, []);

  const handleSelectFile = React.useCallback((fileId: string) => {
    setActiveFileId(fileId);
    setMobileView("code");
  }, []);

  const handleCopy = React.useCallback(async () => {
    if (!activeFile) return;
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [activeFile]);

  if (!files || files.length === 0) {
    return null;
  }

  const heightStyle = typeof height === "number" ? `${height}px` : height;

  const renderTreeHeader = () => (
    <div className="flex items-center justify-between px-3 h-10 border-b border-white/[0.08] bg-[#161616] text-xs font-semibold text-zinc-300 shrink-0 select-none box-border">
      <div className="flex items-center gap-2 truncate min-w-0">
        <HugeiconsIcon icon={Folder02Icon} size={15} className="text-sky-500 shrink-0" />
        <span className="truncate font-medium">{title}</span>
      </div>
      <span className="text-[10px] font-mono h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 shrink-0 ml-1 border border-zinc-700/50">
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
              className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors cursor-pointer select-none text-left min-w-0"
            >
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex shrink-0 items-center justify-center"
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={12}
                  className="text-zinc-400 shrink-0"
                />
              </motion.span>
              <HugeiconsIcon
                icon={isOpen ? Folder02Icon : Folder01Icon}
                size={14}
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
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden pl-2 space-y-0.5 border-l border-zinc-800 ml-3.5 my-0.5 min-w-0"
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
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors cursor-pointer text-left min-w-0",
                          isActive
                            ? "bg-zinc-800 text-white font-medium shadow-xs"
                            : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                        )}
                      >
                        <HugeiconsIcon
                          icon={File01Icon}
                          size={13}
                          className={cn(
                            "shrink-0",
                            isActive ? "text-white" : "text-zinc-500"
                          )}
                        />
                        <span className="truncate min-w-0 flex-1 font-medium">{file.name}</span>
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
        "my-6 rounded-xl border border-white/[0.08] bg-[#161616] overflow-hidden shadow-sm not-prose flex flex-col lg:flex-row relative",
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col h-full shrink-0 border-r border-white/[0.08] bg-[#161616] overflow-hidden"
          >
            <div className="w-[250px] min-w-[250px] flex flex-col h-full">
              {renderTreeHeader()}
              <ScrollArea className="flex-1 p-2 overflow-x-hidden bg-[#161616] scroll-fade">
                {renderFolderList()}
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MOBILE VIEW: Tree Panel (visible on mobile when mobileView === 'tree')
         ========================================================================= */}
      {mobileView === "tree" && (
        <div className="flex lg:hidden flex-col flex-1 h-full min-w-0 overflow-hidden bg-[#161616]">
          {renderTreeHeader()}
          <ScrollArea className="flex-1 p-2 overflow-x-hidden bg-[#161616] scroll-fade">
            {renderFolderList()}
          </ScrollArea>
          <div className="p-2 border-t border-white/[0.08] bg-[#161616]">
            <button
              type="button"
              onClick={() => setMobileView("code")}
              className="w-full py-1.5 px-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium cursor-pointer shadow-xs border border-zinc-700"
            >
              Back to Code View ({activeFile?.name})
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          RIGHT PANEL: Code Syntax Highlighter & Viewer
          (Always visible on lg:; on mobile visible when mobileView === 'code')
         ========================================================================= */}
      <div
        className={cn(
          "flex-col h-full min-w-0 bg-[#161616] overflow-hidden flex-1",
          mobileView === "code" ? "flex" : "hidden lg:flex"
        )}
      >
        {/* Code Viewer Top Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-3 h-10 bg-[#161616] shrink-0 select-none gap-2 box-border">
          {/* Left Controls */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Desktop Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              title={sidebarOpen ? "Hide File Tree" : "Show File Tree"}
              className="hidden lg:flex items-center justify-center h-7 w-7 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <HugeiconsIcon
                icon={SidebarLeft01Icon}
                size={15}
                className={cn("transition-colors", sidebarOpen ? "text-zinc-200" : "text-zinc-500")}
              />
            </button>

            {/* Mobile / Narrow Screen: Browse Tree button */}
            <button
              type="button"
              onClick={() => setMobileView("tree")}
              className="flex lg:hidden items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 h-7 px-2 rounded-md shrink-0 cursor-pointer border border-zinc-700/60 transition-colors"
            >
              <HugeiconsIcon icon={Folder02Icon} size={13} className="text-sky-400" />
              <span>Tree</span>
            </button>

            {/* Desktop: Clean File Indicator */}
            {activeFile && (
              <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-300 truncate">
                <HugeiconsIcon icon={File01Icon} size={14} className="text-zinc-400 shrink-0" />
                <span className="font-medium text-zinc-200">{activeFile.name}</span>
                <span className="text-zinc-500 text-[11px] hidden xl:inline">({activeFile.path})</span>
              </div>
            )}

            {/* Mobile / Narrow Screen: Dropdown File Selector */}
            <div className="flex lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-2.5 h-7 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 border border-zinc-700 transition-colors cursor-pointer max-w-[200px] truncate shadow-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <HugeiconsIcon icon={File01Icon} size={13} className="text-zinc-400 shrink-0" />
                    <span className="truncate">{activeFile?.name}</span>
                  </div>
                  <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-zinc-400 shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-1.5 bg-[#161616] border-zinc-800 text-zinc-200 shadow-xl">
                  <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-zinc-400 px-2 py-1">
                    Select Component File
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800 my-1" />
                  {folders.map(([folderName, filesInFolder]) => (
                    <DropdownMenuGroup key={folderName}>
                      <div className="px-2 py-1 text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5">
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
                                ? "bg-zinc-800 text-white font-medium"
                                : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                            )}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <HugeiconsIcon icon={File01Icon} size={12} className="text-zinc-400 shrink-0" />
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
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 h-7 px-2.5 rounded-md transition-colors cursor-pointer border border-zinc-700/80 shadow-xs"
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

        {/* React Syntax Highlighter Container */}
        <div className="flex-1 min-h-0 w-full overflow-hidden relative bg-[#161616]">
          <ScrollArea className="h-full w-full bg-[#161616] scroll-fade">
            <div className="min-w-fit">
              {activeFile && (
                <SyntaxHighlighter
                  language={getSyntaxLanguage(activeFile.name)}
                  style={customCodeDarkTheme}
                  showLineNumbers
                  wrapLines={false}
                  customStyle={{
                    margin: 0,
                    padding: "16px 14px",
                    background: CODE_BG,
                    backgroundColor: CODE_BG,
                    fontSize: "13px",
                    lineHeight: "22px",
                    fontFamily: CODE_FONT_FAMILY,
                    minWidth: "100%",
                  }}
                  lineNumberStyle={{
                    minWidth: "2.75em",
                    paddingRight: "1.25em",
                    color: "#52525b",
                    userSelect: "none",
                    fontSize: "12px",
                    fontFamily: CODE_FONT_FAMILY,
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: CODE_FONT_FAMILY,
                      fontSize: "13px",
                      lineHeight: "22px",
                      background: CODE_BG,
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

