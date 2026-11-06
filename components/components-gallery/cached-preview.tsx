"use client";

import * as React from "react";

// Persistent global in-memory pool of rendered preview elements
// Persists across client-side page transitions without re-fetching, re-rendering, or ballooning memory
const previewDOMCache = new Map<string, HTMLIFrameElement>();

const DEFAULT_IFRAME_CLASS =
  "w-[200%] h-[200%] border-0 origin-top-left transform scale-[0.5] pointer-events-none select-none";

interface CachedPreviewProps {
  id: string;
  src: string;
  title: string;
  className?: string;
}

export function CachedPreview({
  id,
  src,
  title,
  className = DEFAULT_IFRAME_CLASS,
}: CachedPreviewProps) {
  const mountRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mountPoint = mountRef.current;
    if (!mountPoint) return;

    // Check if we already have an initialized preview iframe in the persistent pool
    let iframe = previewDOMCache.get(id);

    if (!iframe) {
      // First visit: create and cache the iframe once
      iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = title;
      iframe.tabIndex = -1;
      iframe.loading = "eager";
      iframe.className = className;
      iframe.style.pointerEvents = "none";
      iframe.style.userSelect = "none";
      previewDOMCache.set(id, iframe);
    }

    // Attach iframe to this card's container
    mountPoint.appendChild(iframe);

    return () => {
      // On unmount: preserve iframe in the persistent layout pool so it never reloads or leaks memory
      const pool = document.getElementById("fd-persistent-preview-pool");
      if (pool && iframe && iframe.parentElement === mountPoint) {
        pool.appendChild(iframe);
      }
    };
  }, [id, src, title, className]);

  // Clean empty div rendered identically on server and client to guarantee zero hydration mismatch
  return <div ref={mountRef} className="absolute inset-0 overflow-hidden" />;
}

