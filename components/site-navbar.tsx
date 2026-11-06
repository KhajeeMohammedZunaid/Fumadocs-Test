"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ThemeSwitchIcon } from "@/components/ui/theme-switch-icon";
import { GitHub } from "@/components/ui/github";
import { Separator } from "@/components/ui/separator";
import { ZurisBrand } from "@/components/ui/zuris-brand";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs", label: "Documentation" },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="size-8 rounded-lg border border-border/50 bg-background/50" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <ThemeSwitchIcon
        className={cn(
          "size-[18px] transition-transform duration-300",
          isDark ? "rotate-180 text-foreground" : "rotate-0 text-foreground"
        )}
      />
    </button>
  );
}

export function SiteNavbar() {
  const pathname = usePathname();

  // Do not render top navbar inside canvas preview iframes
  if (pathname?.startsWith("/preview")) {
    return null;
  }

  // Navbar is visible on mobile and tablet ONLY on the landing page (main page).
  // On all other pages (docs, components), it is hidden on mobile/tablet and visible on desktop (md+).
  const isLandingPage = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-14 border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors",
        isLandingPage ? "block" : "hidden md:block"
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 w-full">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="inline-flex items-center no-underline hover:opacity-90 transition-opacity shrink-0"
        >
          <ZurisBrand />
        </Link>

        {/* Right Navigation & Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Tabs: Home, Components, Documentation (no separator between tabs) */}
          <nav className="flex items-center gap-0.5 sm:gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href === "/docs/components"
                  ? pathname === "/docs/components" || pathname === "/components"
                  : pathname?.startsWith("/docs") &&
                    pathname !== "/docs/components";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center px-2 sm:px-3 h-8 rounded-lg text-xs sm:text-sm font-medium transition-colors no-underline whitespace-nowrap",
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800/80 text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  )}
                >
                  {link.label === "Documentation" ? (
                    <>
                      <span className="hidden md:inline">Documentation</span>
                      <span className="md:hidden">Docs</span>
                    </>
                  ) : (
                    link.label
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Separator between tabs and GitHub (height matches 32px icon button) */}
          <Separator
            orientation="vertical"
            className="h-8 w-px self-center bg-border/80 mx-0.5 sm:mx-1 shrink-0"
          />

          {/* GitHub Icon Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
            aria-label="GitHub repository"
          >
            <GitHub className="size-[18px]" />
          </a>

          {/* Separator between GitHub and Theme Switcher (height matches 32px icon button) */}
          <Separator
            orientation="vertical"
            className="h-8 w-px self-center bg-border/80 mx-0.5 sm:mx-1 shrink-0"
          />

          {/* Theme Switcher */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
