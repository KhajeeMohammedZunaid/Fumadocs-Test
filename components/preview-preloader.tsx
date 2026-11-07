"use client";

import * as React from "react";
import { preloadDetailPreview } from "./preview-cache";

const PRELOAD_TARGETS = [
  { src: "/preview/hero-1", title: "Hero Section 1" },
  { src: "/preview/hero-2", title: "Hero Section 2" },
];

/**
 * Pre-warms all component previews in the background into the persistent layout pool
 * immediately after page initialization, ensuring zero-wait, zero-flash previews at each visit.
 */
export function PreviewPreloader() {
  React.useEffect(() => {
    // Warm up all component previews in the background during initial idle
    const timer = setTimeout(() => {
      for (const target of PRELOAD_TARGETS) {
        preloadDetailPreview(target.src, target.title);
      }
    }, 40);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

