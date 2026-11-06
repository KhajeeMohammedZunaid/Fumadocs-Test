"use client";

import * as React from "react";
import { ZurisBlackV1 } from "@/components/ui/zuris-black-v1";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";
import { cn } from "@/lib/utils";

export function ZurisBrand({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <div className="flex items-center justify-center shrink-0">
        <ZurisBlackV1
          className="h-[21px] w-auto text-zinc-950 dark:hidden"
          aria-hidden="true"
        />
        <ZurisWhiteV1
          className="hidden h-[21px] w-auto text-zinc-50 dark:block"
          aria-hidden="true"
        />
      </div>
      <h4
        className="
          font-['Inter',sans-serif]
          text-[18.5px]
          font-normal
          tracking-[-0.045em]
          text-zinc-950
          dark:text-zinc-50
          leading-none
          select-none
          whitespace-nowrap
          m-0
          translate-y-[1.5px]
        "
      >
        Zuris
      </h4>
    </div>
  );
}

