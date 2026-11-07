"use client";

import * as React from "react";
import {
  UniversalFileTree,
  type InteractiveFileTreeProps,
} from "@/components/interactive-file-tree";
import type { FileItem } from "@/components/interactive-file-tree/types";

const SECTIONS_1_CODE = `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Sections1Props {
  className?: string;
  showThemeBar?: boolean;
}

export function Sections1({ className, showThemeBar = false }: Sections1Props) {
  const [animKey, setAnimKey] = React.useState(0);

  const replayAnimation = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div
      className={cn(
        "sections-1-root w-full bg-[var(--bg)] text-[var(--text-main)] font-body antialiased transition-[background-color,color] duration-300 ease-in-out",
        className
      )}
    >
      <div
        key={animKey}
        className="w-full flex flex-col items-center justify-center pt-[3.5rem] px-[1.5rem] pb-[5.5rem] overflow-x-hidden"
      >
        <main className="showcase-container w-full max-w-[1130px] mx-auto flex flex-col gap-[5.5rem]">
          {/* Row 1: Visual Composition + About Development & AI Studio */}
          <section className="section-row grid grid-cols-[minmax(0,490px)_minmax(0,490px)] justify-between items-center gap-[4rem] relative">
            <figure className="visual-composition-top relative flex items-end gap-[1.25rem] pt-[2rem] min-h-[420px] w-full max-w-[490px]">
              {/* 360-Degree Circular Marquee Stamp Badge */}
              <div className="circular-stamp-wrapper absolute top-[18px] right-[63%] -translate-x-1/2 w-[116px] h-[116px] z-10 flex items-center justify-center">
                <svg className="stamp-svg w-full h-full origin-center animate-marquee" viewBox="0 0 120 120">
                  <defs>
                    <path
                      id="stampCirclePath"
                      d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                      fill="none"
                    />
                  </defs>
                  <text fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif" fontSize="8.6" fontWeight="700" fill="var(--text-main)">
                    <textPath href="#stampCirclePath" startOffset="0%" textLength="268" lengthAdjust="spacing">
                      {" WINNER • AI STUDIO • DEV & DESIGN •"}
                    </textPath>
                  </text>
                </svg>
                <span className="stamp-center-text absolute font-display text-[1.85rem] font-bold text-[var(--text-main)]">
                  #1
                </span>
              </div>

              {/* Cards & Proof */}
              <div className="card-left-short w-[44%] h-[270px] bg-[var(--card-bg)] rounded-[28px] border border-[var(--border-subtle)]" />
              <div className="card-right-tall w-[54%] h-[380px] bg-[var(--card-bg)] rounded-[28px] border border-[var(--border-subtle)]" />
            </figure>

            <header className="text-content-top flex flex-col items-start w-full max-w-[490px]">
              <span className="about-tag inline-flex items-center justify-center py-[0.35rem] px-[0.95rem] border border-[var(--border-main)] rounded-full text-[0.72rem] font-semibold tracking-[0.06em] uppercase">
                AI & PRODUCT STUDIO
              </span>
              <h1 className="headline-main font-display text-[clamp(2.35rem,4.2vw,3.45rem)] font-medium leading-[1.12] tracking-[-0.035em] mb-[0.85rem]">
                Developing AI that Inspire & Scale.
              </h1>
              <p className="paragraph-main font-body text-[1rem] leading-[1.55] text-[var(--text-muted)]">
                Intelligent full-stack systems and intuitive AI interfaces, crafted to scale seamlessly.
              </p>
            </header>
          </section>

          {/* Row 2: Engineering Systems + Monochrome Tag Card */}
          <section className="section-row grid grid-cols-[minmax(0,490px)_minmax(0,490px)] justify-between items-center gap-[4rem] relative">
            <article className="text-content-bottom flex flex-col items-start w-full max-w-[490px]">
              <h2 className="headline-secondary font-display text-[clamp(2.25rem,4vw,3.3rem)] font-medium leading-[1.14] tracking-[-0.035em] mb-[0.85rem]">
                Smart Designs that inspire people
              </h2>
              <p className="paragraph-secondary font-body text-[1rem] leading-[1.55] text-[var(--text-muted)] mb-[2rem]">
                High-throughput infrastructure paired with pixel-crafted design systems.
              </p>
            </article>

            {/* Right Feature Card with Notched Corner & Sticker Cluster */}
            <figure className="feature-card-wrapper relative w-full max-w-[490px] h-[385px]">
              <button className="corner-arrow-btn absolute top-0 right-0 w-[48px] h-[48px] bg-[var(--corner-btn-bg)] text-[var(--corner-btn-text)] rounded-[14px] flex items-center justify-center z-10" type="button">
                ↗
              </button>
            </figure>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Sections1;`;

const PAGE_CODE = `import { Sections1 } from "@/components/sections-1";

export default function Sections1ShowcasePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] transition-colors duration-300">
      <Sections1 showThemeBar={true} />
    </div>
  );
}`;

const SECTIONS_1_FILES: FileItem[] = [
  {
    id: "sections-1.tsx",
    name: "sections-1.tsx",
    path: "components/sections/sections-1.tsx",
    folder: "components/sections",
    language: "tsx",
    code: SECTIONS_1_CODE,
  },
  {
    id: "page.tsx",
    name: "page.tsx",
    path: "section-1/page.tsx",
    folder: "section-1",
    language: "tsx",
    code: PAGE_CODE,
  },
];

export function Sections1FileTree(props: Partial<InteractiveFileTreeProps>) {
  return (
    <UniversalFileTree
      files={SECTIONS_1_FILES}
      defaultFileId="sections-1.tsx"
      title="Component Files"
      height="540px"
      {...props}
    />
  );
}

export default Sections1FileTree;

