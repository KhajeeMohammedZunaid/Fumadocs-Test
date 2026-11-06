"use client";

import * as React from "react";
import Link from "next/link";
import { ZurisBrand } from "@/components/ui/zuris-brand";
import { SidebarTrigger } from "fumadocs-ui/layouts/docs/slots/sidebar";

const SidebarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
  </svg>
);

export function DocsMobileHeader() {
  return (
    <header
      id="nd-subnav"
      className="sticky top-0 z-30 flex h-14 items-center justify-between px-4 sm:px-6 border-b border-border/80 bg-background/85 backdrop-blur-md md:hidden transition-colors"
    >
      <Link
        href="/"
        className="inline-flex items-center no-underline hover:opacity-90 transition-opacity shrink-0"
      >
        <ZurisBrand />
      </Link>

      <SidebarTrigger className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0">
        <SidebarIcon className="size-4 shrink-0" />
      </SidebarTrigger>
    </header>
  );
}

