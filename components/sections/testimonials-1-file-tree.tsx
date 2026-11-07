"use client";

import * as React from "react";
import {
  UniversalFileTree,
  type InteractiveFileTreeProps,
} from "@/components/interactive-file-tree";
import type { FileItem } from "@/components/interactive-file-tree/types";

const TESTIMONIALS_1_CODE = `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ClaudeAI } from "@/components/logo-only/claude";
import { Shopify } from "@/components/logo-only/shopify";
import { Stripe } from "@/components/logo-only/stripe";

export interface Testimonials1Props {
  className?: string;
  variant?: "dual" | "trio";
}

export function Testimonials1({ className, variant = "trio" }: Testimonials1Props) {
  return (
    <section id="customers" className={cn("w-full py-16 overflow-hidden select-none", className)}>
      <div className="max-w-[1340px] mx-auto px-4">
        {/* Trio or Dual Cards Container */}
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
          {/* Testimonial Cards */}
        </div>
      </div>
    </section>
  );
}

export default Testimonials1;`;

const PAGE_CODE = `"use client";

import * as React from "react";
import { Testimonials1 } from "@/components/testimonials-1";

export default function TestimonialsPage() {
  const [variant, setVariant] = React.useState<"trio" | "dual">("trio");

  return (
    <main className="min-h-screen w-full bg-[#fcfcfd] dark:bg-[#08090a] text-zinc-950 dark:text-zinc-50 flex flex-col items-center justify-center relative py-12">
      <Testimonials1 variant={variant} />
    </main>
  );
}`;

const TESTIMONIALS_1_FILES: FileItem[] = [
  {
    id: "testimonials-1.tsx",
    name: "testimonials-1.tsx",
    path: "components/sections/testimonials-1.tsx",
    folder: "components/sections",
    language: "tsx",
    code: TESTIMONIALS_1_CODE,
  },
  {
    id: "page.tsx",
    name: "page.tsx",
    path: "testimonials/page.tsx",
    folder: "testimonials",
    language: "tsx",
    code: PAGE_CODE,
  },
];

export function Testimonials1FileTree(props: Partial<InteractiveFileTreeProps>) {
  return (
    <UniversalFileTree
      files={TESTIMONIALS_1_FILES}
      defaultFileId="testimonials-1.tsx"
      title="Component Files"
      height="540px"
      {...props}
    />
  );
}

export default Testimonials1FileTree;

