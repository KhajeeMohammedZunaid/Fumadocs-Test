"use client";

import * as React from "react";
import {
  UniversalFileTree,
  type InteractiveFileTreeProps,
} from "@/components/interactive-file-tree";
import type { FileItem } from "@/components/interactive-file-tree/types";

const SECTIONS_3_CODE = `"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface CloudServiceItem {
  num: string;
  title: string;
  desc: string;
  img: string;
}

export const cloudServicesData: CloudServiceItem[] = [
  {
    num: "01",
    title: "CLOUD COMPUTE",
    desc: "Elastic serverless compute engines architected for high-concurrency workloads and instantaneous auto-scaling.",
    img: "/acc-1.webp",
  },
  {
    num: "02",
    title: "EDGE NETWORK",
    desc: "Global low-latency edge distribution with automated caching, dynamic routing, and DDoS mitigation.",
    img: "/acc-2.webp",
  },
  {
    num: "03",
    title: "OBJECT STORAGE",
    desc: "Highly resilient multi-region cloud object storage optimized for real-time asset delivery and petabyte-scale throughput.",
    img: "/acc-3.webp",
  },
  {
    num: "04",
    title: "DATA & TELEMETRY",
    desc: "Managed distributed data streaming and query engines delivering sub-second insights across real-time pipelines.",
    img: "/acc-4.webp",
  },
  {
    num: "05",
    title: "SECURITY & IAM",
    desc: "Zero-trust identity governance, end-to-end cryptographic key management, and continuous compliance enforcement.",
    img: "/acc-5.webp",
  },
];

export function Sections3() {
  return (
    <section className="w-full py-16 bg-white dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-12">
          Modular Cloud Architecture
        </h2>
        {/* Accordion Component */}
      </div>
    </section>
  );
}

export default Sections3;`;

const PAGE_CODE = `import { Sections3 } from "@/components/sections-3";

export const metadata = {
  title: "Sections 3 | Component Library",
  description: "Cloud & SaaS horizontal expanding interactive accordion section",
};

export default function Sections3Page() {
  return (
    <main className="min-h-screen bg-white">
      <Sections3 />
    </main>
  );
}`;

const SECTIONS_3_FILES: FileItem[] = [
  {
    id: "sections-3.tsx",
    name: "sections-3.tsx",
    path: "components/sections/sections-3.tsx",
    folder: "components/sections",
    language: "tsx",
    code: SECTIONS_3_CODE,
  },
  {
    id: "page.tsx",
    name: "page.tsx",
    path: "section-3/page.tsx",
    folder: "section-3",
    language: "tsx",
    code: PAGE_CODE,
  },
];

export function Sections3FileTree(props: Partial<InteractiveFileTreeProps>) {
  return (
    <UniversalFileTree
      files={SECTIONS_3_FILES}
      defaultFileId="sections-3.tsx"
      title="Component Files"
      height="540px"
      {...props}
    />
  );
}

export default Sections3FileTree;

