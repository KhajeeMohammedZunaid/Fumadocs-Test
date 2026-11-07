"use client";

// Persistent global in-memory pool of rendered detail preview iframes.
// Persists across client-side page transitions without re-fetching or destroying iframe contexts.
const detailPreviewCache = new Map<string, HTMLIFrameElement>();

/**
 * Gets or creates an iframe for a detail preview, cached in memory.
 */
export function getDetailPreviewIframe(
  src: string,
  title?: string
): HTMLIFrameElement | null {
  if (typeof document === "undefined") return null;

  let iframe = detailPreviewCache.get(src);
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = title || "Component Preview";
    iframe.loading = "eager";
    iframe.className = "w-full h-[500px] sm:h-[620px] border-0 block bg-background";
    detailPreviewCache.set(src, iframe);
  }

  return iframe;
}

/**
 * Pre-warms and preloads a preview iframe into the persistent layout pool
 * so it is already downloaded, compiled, and rendered before the user visits.
 */
export function preloadDetailPreview(src: string, title?: string) {
  if (typeof document === "undefined") return;
  const pool = document.getElementById("fd-persistent-preview-pool");
  if (!pool) return;

  let iframe = detailPreviewCache.get(src);
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = title || "Component Preview";
    iframe.loading = "eager";
    iframe.tabIndex = -1;
    iframe.className = "w-full h-[500px] sm:h-[620px] border-0 block bg-background";
    detailPreviewCache.set(src, iframe);
    pool.appendChild(iframe);
  } else if (iframe.parentElement !== pool && !iframe.parentElement) {
    pool.appendChild(iframe);
  }
}

