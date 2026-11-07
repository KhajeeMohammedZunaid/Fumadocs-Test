"use client";

import * as React from "react";
import { Testimonials1 } from "@/components/sections/testimonials-1";

export default function Testimonials1PreviewPage() {
  const [variant, setVariant] = React.useState<"trio" | "dual">("trio");

  return (
    <main className="min-h-screen w-full bg-[#fcfcfd] dark:bg-[#08090a] text-zinc-950 dark:text-zinc-50 flex flex-col items-center justify-center relative transition-colors duration-200 py-12 no-scrollbar">
      {/* Floating Variant Switcher */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-800 p-1 rounded-full shadow-sm">
        <button
          type="button"
          onClick={() => setVariant("trio")}
          className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
            variant === "trio"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          3 Cards (Trio)
        </button>
        <button
          type="button"
          onClick={() => setVariant("dual")}
          className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
            variant === "dual"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          2 Cards (Dual)
        </button>
      </div>

      <Testimonials1 variant={variant} />
    </main>
  );
}

