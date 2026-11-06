"use client";

import * as React from "react";

export function SidebarHoverEffect() {
  React.useEffect(() => {
    // Append the floating pill directly to document.body
    // Keeping it outside the React VDOM tree completely prevents any hydration mismatch
    let pill = document.getElementById(
      "global-sidebar-hover-pill"
    ) as HTMLDivElement | null;

    if (!pill) {
      pill = document.createElement("div");
      pill.id = "global-sidebar-hover-pill";
      pill.className = "sidebar-hover-pill";
      pill.style.position = "fixed";
      pill.style.pointerEvents = "none";
      pill.style.zIndex = "5";
      pill.style.opacity = "0";
      document.body.appendChild(pill);
    }

    function handlePointerMove(e: PointerEvent) {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "#nd-sidebar a, #nd-sidebar button, #nd-sidebar [role='button'], #nd-toc a"
      );

      if (!target) {
        if (pill && pill.style.opacity !== "0") {
          pill.style.opacity = "0";
        }
        return;
      }

      const rect = target.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        if (pill && pill.style.opacity !== "0") {
          pill.style.opacity = "0";
        }
        return;
      }

      if (pill) {
        pill.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
        pill.style.width = `${rect.width}px`;
        pill.style.height = `${rect.height}px`;
        pill.style.opacity = "1";
      }
    }

    function handlePointerLeave(e: PointerEvent) {
      const related = e.relatedTarget as HTMLElement | null;
      if (
        !related ||
        (!related.closest("#nd-sidebar") && !related.closest("#nd-toc"))
      ) {
        if (pill) {
          pill.style.opacity = "0";
        }
      }
    }

    function handleScroll() {
      if (pill && pill.style.opacity !== "0") {
        pill.style.opacity = "0";
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      pill?.remove();
    };
  }, []);

  return null;
}
