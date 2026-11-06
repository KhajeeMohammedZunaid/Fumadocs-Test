"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function LayoutModeController() {
  const pathname = usePathname();
  const isGallery =
    pathname === "/docs/components" || pathname === "/components";

  useIsomorphicLayoutEffect(() => {
    const layout = document.getElementById("nd-docs-layout");
    const root = document.documentElement;

    if (isGallery) {
      layout?.setAttribute("data-gallery-page", "true");
      root.setAttribute("data-gallery-page", "true");
    } else {
      layout?.removeAttribute("data-gallery-page");
      root.removeAttribute("data-gallery-page");
    }
  }, [isGallery]);

  return null;
}

