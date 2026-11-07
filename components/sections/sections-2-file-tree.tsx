"use client";

import * as React from "react";
import {
  UniversalFileTree,
  type InteractiveFileTreeProps,
} from "@/components/interactive-file-tree";
import type { FileItem } from "@/components/interactive-file-tree/types";

const SECTIONS_2_CODE = `"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ClaudeAI } from "@/components/logo-only/claude";
import { OpenAI } from "@/components/logo-only/openai";
import { Shopify } from "@/components/logo-only/shopify";
import { Stripe } from "@/components/logo-only/stripe";
import { Google } from "@/components/logo-only/google";
import { Datadog } from "@/components/logo-only/datadog";

export interface Sections2Props {
  className?: string;
}

const CARD_PADDING = 10;
const INNER_RADIUS = 14;
const OUTER_RADIUS = INNER_RADIUS + CARD_PADDING; // 24px: outer radius = inner radius + padding

export function Sections2({ className }: Sections2Props) {
  return (
    <section className={cn("w-full max-w-[1340px] mx-auto py-12 px-4 select-none", className)}>
      {/* 3-Card Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
        {/* Card 1: Project & Task Management */}
        <div className="rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2.5 flex flex-col justify-between">
          <div className="w-full h-[240px] rounded-[14px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative" />
          <div className="p-4">
            <h3 className="font-semibold text-lg text-zinc-950 dark:text-zinc-50">Project Management</h3>
            <p className="text-sm text-zinc-500 mt-1">Real-time task tracking with collaborative team assignee stacks.</p>
          </div>
        </div>

        {/* Card 2: Progress Tracking */}
        <div className="rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2.5 flex flex-col justify-between">
          <div className="w-full h-[240px] rounded-[14px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative" />
          <div className="p-4">
            <h3 className="font-semibold text-lg text-zinc-950 dark:text-zinc-50">Progress Tracking</h3>
            <p className="text-sm text-zinc-500 mt-1">Weekly milestones, sprint analytics, and continuous burndown metrics.</p>
          </div>
        </div>

        {/* Card 3: Connected Apps */}
        <div className="rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2.5 flex flex-col justify-between">
          <div className="w-full h-[240px] rounded-[14px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative flex items-center justify-center gap-3">
            <ClaudeAI className="w-7 h-7" />
            <OpenAI className="w-7 h-7" />
            <Shopify className="w-7 h-7" />
            <Stripe className="w-7 h-7" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-zinc-950 dark:text-zinc-50">Connected Ecosystem</h3>
            <p className="text-sm text-zinc-500 mt-1">Deep native integrations across your favorite developer and cloud platforms.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sections2;`;

const PAGE_CODE = `import { Sections2 } from "@/components/sections-2";

export default function Sections2ShowcasePage() {
  return (
    <main className="min-h-screen bg-[#f8f9fb] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-6 xl:p-8 transition-colors duration-300">
      <Sections2 />
    </main>
  );
}`;

const SECTIONS_2_FILES: FileItem[] = [
  {
    id: "sections-2.tsx",
    name: "sections-2.tsx",
    path: "components/sections/sections-2.tsx",
    folder: "components/sections",
    language: "tsx",
    code: SECTIONS_2_CODE,
  },
  {
    id: "page.tsx",
    name: "page.tsx",
    path: "section-2/page.tsx",
    folder: "section-2",
    language: "tsx",
    code: PAGE_CODE,
  },
];

export function Sections2FileTree(props: Partial<InteractiveFileTreeProps>) {
  return (
    <UniversalFileTree
      files={SECTIONS_2_FILES}
      defaultFileId="sections-2.tsx"
      title="Component Files"
      height="540px"
      {...props}
    />
  );
}

export default Sections2FileTree;

