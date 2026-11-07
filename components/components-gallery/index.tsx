"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { StuxButton } from "@/components/stux-button";
import { CachedPreview } from "./cached-preview";
import { cn } from "@/lib/utils";

export interface UniversalComponentCardProps {
  name: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function UniversalComponentCard({
  name,
  href,
  children,
  className,
}: UniversalComponentCardProps) {
  const router = useRouter();

  const handleNavigate = React.useCallback(() => {
    router.push(href);
  }, [router, href]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        router.push(href);
      }
    },
    [router, href]
  );

  const handlePrefetch = React.useCallback(() => {
    router.prefetch(href);
  }, [router, href]);

  // Geometric formula: outer radius (24px) = inner radius (12px) + padding (12px)
  // Transparent borderless card by default, border and subtle tint appear smoothly on hover
  // Uses div role="link" instead of a to avoid invalid nesting with buttons/interactive elements, preventing hydration errors
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      onPointerEnter={handlePrefetch}
      onFocus={handlePrefetch}
      className={cn(
        "group block w-full rounded-[24px] border border-transparent bg-transparent p-3 no-underline select-none cursor-pointer transition-all duration-300 ease-out hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30",
        className
      )}
    >
      {/* Preview container with inner radius (12px) */}
      <div className="relative w-full h-72 sm:h-80 md:h-[340px] rounded-[12px] border border-zinc-200/80 dark:border-zinc-800/80 bg-[#fbfbfb] dark:bg-[#08080a] overflow-hidden flex items-center justify-center">
        {children}
      </div>

      {/* Component Name with tightly calibrated gap above and below */}
      <div className="pt-2.5 pb-0.5 px-1.5 flex items-center justify-between">
        <h3 className="font-semibold text-base sm:text-lg text-zinc-950 dark:text-zinc-50 tracking-[-0.015em] m-0 leading-tight">
          {name}
        </h3>
      </div>
    </div>
  );
}

export function ComponentsGallery() {
  return (
    <div className="components-gallery w-full my-4 not-prose">
      {/* Wide, big responsive cards grid filling the available page space */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 w-full">
        {/* Hero Section 1 - Cached preview renders once and persists across revisits with zero memory growth */}
        <UniversalComponentCard
          name="Hero Section 1"
          href="/docs/components/hero"
        >
          <div className="absolute inset-0 overflow-hidden bg-[#fafafa] dark:bg-[#09090b]">
            <CachedPreview
              id="hero-1"
              src="/preview/hero-1"
              title="Hero Section 1"
            />
            <div className="absolute inset-0 z-10 cursor-pointer" />
          </div>
        </UniversalComponentCard>

        {/* Hero Section 2 - Cached preview renders once and persists across revisits with zero memory growth */}
        <UniversalComponentCard
          name="Hero Section 2"
          href="/docs/components/hero-section-2"
        >
          <div className="absolute inset-0 overflow-hidden bg-white dark:bg-[#09090b]">
            <CachedPreview
              id="hero-2"
              src="/preview/hero-2"
              title="Hero Section 2"
            />
            <div className="absolute inset-0 z-10 cursor-pointer" />
          </div>
        </UniversalComponentCard>

        {/* Stux Button */}
        <UniversalComponentCard
          name="Stux Button"
          href="/docs/components/button"
        >
          <div className="flex items-center justify-center p-6 select-none pointer-events-none">
            <StuxButton variant="default" colorScheme="yellow" size="lg">
              Explore Button
            </StuxButton>
          </div>
        </UniversalComponentCard>

        {/* Sections 1 */}
        <UniversalComponentCard
          name="Sections 1"
          href="/docs/components/sections-1"
        >
          <div className="absolute inset-0 overflow-hidden bg-[#fafafa] dark:bg-[#09090b]">
            <CachedPreview
              id="sections-1"
              src="/preview/sections-1"
              title="Sections 1"
            />
            <div className="absolute inset-0 z-10 cursor-pointer" />
          </div>
        </UniversalComponentCard>

        {/* Sections 2 */}
        <UniversalComponentCard
          name="Sections 2"
          href="/docs/components/sections-2"
        >
          <div className="absolute inset-0 overflow-hidden bg-[#f8f9fb] dark:bg-[#09090b]">
            <CachedPreview
              id="sections-2"
              src="/preview/sections-2"
              title="Sections 2"
            />
            <div className="absolute inset-0 z-10 cursor-pointer" />
          </div>
        </UniversalComponentCard>

        {/* Sections 3 */}
        <UniversalComponentCard
          name="Sections 3"
          href="/docs/components/sections-3"
        >
          <div className="absolute inset-0 overflow-hidden bg-white dark:bg-[#09090b]">
            <CachedPreview
              id="sections-3"
              src="/preview/sections-3"
              title="Sections 3"
            />
            <div className="absolute inset-0 z-10 cursor-pointer" />
          </div>
        </UniversalComponentCard>

        {/* Testimonials 1 */}
        <UniversalComponentCard
          name="Testimonials 1"
          href="/docs/components/testimonials-1"
        >
          <div className="absolute inset-0 overflow-hidden bg-[#fcfcfd] dark:bg-[#08090a]">
            <CachedPreview
              id="testimonials-1"
              src="/preview/testimonials-1"
              title="Testimonials 1"
            />
            <div className="absolute inset-0 z-10 cursor-pointer" />
          </div>
        </UniversalComponentCard>
      </div>
    </div>
  );
}

export const ComponentCard = UniversalComponentCard;
export default ComponentsGallery;
