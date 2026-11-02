"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon, ReloadIcon } from "@hugeicons/core-free-icons";

export default function DocsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Docs page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center space-y-4">
      <div className="p-3 rounded-full bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400">
        <HugeiconsIcon icon={AlertCircleIcon} size={28} />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Something went wrong
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
          {error?.message || "An unexpected error occurred while loading this page."}
        </p>
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer shadow-xs"
      >
        <HugeiconsIcon icon={ReloadIcon} size={15} />
        <span>Try again</span>
      </button>
    </div>
  );
}

