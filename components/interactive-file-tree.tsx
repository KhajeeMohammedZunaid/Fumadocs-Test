"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { EditorProps } from "@monaco-editor/react";
import { useTheme } from "next-themes";
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
import { HERO_FILES, type FileItem } from "@/components/hero-code-data";
import { cn } from "@/lib/utils";

// Locally served Monaco Editor via static AMD bundle in /monaco/vs (Zero CDN requests, zero Turbopack worker bundling errors)
const MonacoEditor = dynamic<EditorProps>(
  () =>
    import("@monaco-editor/react").then((mod) => {
      mod.loader.config({
        paths: {
          vs: "/monaco/vs",
        },
      });
      const Comp =
        mod.Editor ||
        ((mod as any).default?.default
          ? (mod as any).default.default
          : mod.default);
      return { default: Comp };
    }),
  {
    ssr: false,
    loading: () => null,
  }
);

function CodeFallback({ code }: { code: string }) {
  const lines = React.useMemo(() => code.split("\n"), [code]);

  return (
    <ScrollArea className="h-full w-full font-mono text-[13px] leading-relaxed">
      <div className="py-3 px-4 flex min-w-full">
        {/* Line numbers */}
        <div className="select-none text-zinc-500/50 pr-4 text-right font-mono text-xs shrink-0 border-r border-zinc-800/40 mr-4">
          {lines.map((_, i) => (
            <div key={i} className="leading-[21px] min-h-[21px]">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Code */}
        <pre className="flex-1 m-0 p-0 text-zinc-300 font-mono text-[13px] leading-[21px] whitespace-pre select-text overflow-x-auto min-w-0">
          <code>{code}</code>
        </pre>
      </div>
    </ScrollArea>
  );
}

interface EditorErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface EditorErrorBoundaryState {
  hasError: boolean;
}

class EditorErrorBoundary extends React.Component<
  EditorErrorBoundaryProps,
  EditorErrorBoundaryState
> {
  constructor(props: EditorErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): EditorErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Monaco Editor fallback rendered:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function getMonacoLanguage(fileName: string): string {
  if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) return "typescript";
  if (fileName.endsWith(".css")) return "css";
  if (fileName.endsWith(".json")) return "json";
  if (fileName.endsWith(".html")) return "html";
  return "plaintext";
}

export function InteractiveFileTree() {
  const [activeFileId, setActiveFileId] = React.useState<string>("hero.tsx");
  const [copied, setCopied] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [mobileView, setMobileView] = React.useState<"code" | "tree">("code");
  const [openFolders, setOpenFolders] = React.useState<Record<string, boolean>>({
    "components/hero-sections": true,
    "components/ui": true,
    app: true,
  });

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeFile = React.useMemo(() => {
    return HERO_FILES.find((f) => f.id === activeFileId) || HERO_FILES[0];
  }, [activeFileId]);

  const toggleFolder = (folderKey: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  const handleSelectFile = (fileId: string) => {
    setActiveFileId(fileId);
    setMobileView("code");
  };

  const handleCopy = async () => {
    if (!activeFile) return;
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Group files by folder
  const folders = React.useMemo(() => {
    const map = new Map<string, FileItem[]>();
    for (const f of HERO_FILES) {
      if (!map.has(f.folder)) {
        map.set(f.folder, []);
      }
      map.get(f.folder)!.push(f);
    }
    return Array.from(map.entries());
  }, []);

  const editorTheme = mounted && resolvedTheme === "light" ? "light" : "vs-dark";

  return (
    <div
      className={cn(
        "my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm not-prose flex flex-col h-[540px]",
        sidebarOpen
          ? "lg:grid lg:grid-cols-[250px_1fr]"
          : "lg:grid lg:grid-cols-1"
      )}
    >
      {/* =========================================================================
          LEFT PANEL: File Tree (visible on lg: when sidebarOpen is true, 
          OR on mobile when mobileView === 'tree')
         ========================================================================= */}
      <div
        className={cn(
          "border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/30 flex-col h-full min-w-0 overflow-hidden",
          mobileView === "tree"
            ? "flex flex-1"
            : sidebarOpen
            ? "hidden lg:flex"
            : "hidden"
        )}
      >
        {/* File tree top header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/60 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shrink-0 select-none">
          <div className="flex items-center gap-2 truncate min-w-0">
            <HugeiconsIcon icon={Folder02Icon} size={15} className="text-sky-500 shrink-0" />
            <span className="truncate font-medium">Component Files</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0 ml-1">
            {HERO_FILES.length}
          </span>
        </div>

        {/* File tree scrollable list */}
        <ScrollArea className="flex-1 p-2 overflow-x-hidden">
          <div className="space-y-1 min-w-0">
            {folders.map(([folderName, filesInFolder]) => {
              const isOpen = openFolders[folderName] ?? true;
              return (
                <div key={folderName} className="space-y-0.5 min-w-0">
                  {/* Folder Row */}
                  <button
                    type="button"
                    onClick={() => toggleFolder(folderName)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer select-none text-left min-w-0"
                  >
                    <HugeiconsIcon
                      icon={isOpen ? ArrowDown01Icon : ArrowRight01Icon}
                      size={12}
                      className="text-zinc-400 shrink-0"
                    />
                    <HugeiconsIcon
                      icon={isOpen ? Folder02Icon : Folder01Icon}
                      size={14}
                      className="text-sky-500 shrink-0"
                    />
                    <span className="truncate min-w-0 flex-1">{folderName}</span>
                  </button>

                  {/* Files inside Folder */}
                  {isOpen && (
                    <div className="pl-2 space-y-0.5 border-l border-zinc-200 dark:border-zinc-800 ml-2.5 my-0.5 min-w-0">
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
                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium shadow-xs"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-950 dark:hover:text-zinc-100"
                            )}
                          >
                            <HugeiconsIcon
                              icon={File01Icon}
                              size={13}
                              className={cn(
                                "shrink-0",
                                isActive ? "text-white dark:text-zinc-950" : "text-zinc-400"
                              )}
                            />
                            <span className="truncate min-w-0 flex-1">{file.name}</span>
                            <span
                              className={cn(
                                "text-[9px] uppercase font-mono px-1 rounded shrink-0",
                                isActive
                                  ? "text-zinc-400 dark:text-zinc-600"
                                  : "text-zinc-400"
                              )}
                            >
                              {file.language}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Mobile footer to return directly to code */}
        {mobileView === "tree" && (
          <div className="lg:hidden p-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
            <button
              type="button"
              onClick={() => setMobileView("code")}
              className="w-full py-1.5 px-3 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium cursor-pointer shadow-xs"
            >
              Back to Code View ({activeFile.name})
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          RIGHT PANEL: Code Editor & Viewer
          (Always visible on lg:; on mobile visible when mobileView === 'code')
         ========================================================================= */}
      <div
        className={cn(
          "flex-col h-full min-w-0 bg-zinc-950 dark:bg-black overflow-hidden",
          mobileView === "code" ? "flex flex-1" : "hidden lg:flex"
        )}
      >
        {/* Code Viewer Top Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-3 py-2 bg-zinc-900/95 backdrop-blur shrink-0 select-none gap-2">
          {/* Left Controls */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Desktop Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              title={sidebarOpen ? "Hide File Tree" : "Show File Tree"}
              className="hidden lg:flex items-center justify-center p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={SidebarLeft01Icon} size={15} />
            </button>

            {/* Mobile / Narrow Screen: Browse Tree button */}
            <button
              type="button"
              onClick={() => setMobileView("tree")}
              className="flex lg:hidden items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md shrink-0 cursor-pointer border border-zinc-700/60 transition-colors"
            >
              <HugeiconsIcon icon={Folder02Icon} size={13} className="text-sky-400" />
              <span>Tree</span>
            </button>

            {/* shadcn DropdownMenu File Selector (Primary switcher for mobile, and quick-picker on desktop) */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 border border-zinc-700 transition-colors cursor-pointer max-w-[260px] truncate shadow-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <HugeiconsIcon icon={File01Icon} size={13} className="text-zinc-400 shrink-0" />
                  <span className="truncate">{activeFile.name}</span>
                </div>
                <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-zinc-400 shrink-0" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-1.5 bg-zinc-900 border-zinc-800 text-zinc-200 shadow-xl">
                <DropdownMenuLabel className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 px-2 py-1">
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
                          <span className="text-[10px] font-mono uppercase text-zinc-400 shrink-0">
                            {file.language}
                          </span>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Path display */}
            <div className="hidden xl:flex items-center gap-1 text-[11px] text-zinc-400 font-mono truncate">
              <span>{activeFile.path}</span>
            </div>
          </div>

          {/* Right Controls: Language Badge & Copy Button */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              {activeFile.language}
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

        {/* Monaco Editor Container */}
        <div className="flex-1 min-h-0 w-full overflow-hidden relative">
          <EditorErrorBoundary fallback={<CodeFallback code={activeFile.code} />}>
            <MonacoEditor
              height="100%"
              width="100%"
              path={activeFile.path}
              language={getMonacoLanguage(activeFile.name)}
              value={activeFile.code}
              theme={editorTheme}
              loading={<CodeFallback code={activeFile.code} />}
              options={{
                readOnly: true,
                domReadOnly: true,
                minimap: { enabled: false },
                fontSize: 12.5,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "off",
                automaticLayout: true,
                fontFamily: "var(--font-geist-mono), 'Fira Code', 'Courier New', monospace",
                padding: { top: 12, bottom: 12 },
                renderLineHighlight: "all",
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                smoothScrolling: true,
                scrollbar: {
                  vertical: "visible",
                  horizontal: "visible",
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          </EditorErrorBoundary>
        </div>
      </div>
    </div>
  );
}
