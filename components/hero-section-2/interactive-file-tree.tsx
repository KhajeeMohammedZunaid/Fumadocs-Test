"use client";

import * as React from "react";
import {
  UniversalFileTree,
  type InteractiveFileTreeProps,
} from "@/components/interactive-file-tree";
import { HERO_2_FILES } from "@/components/hero-section-2/hero-2-code-data";

export function Hero2FileTree(props: Partial<InteractiveFileTreeProps>) {
  return (
    <UniversalFileTree
      files={HERO_2_FILES}
      defaultFileId="hero-2.tsx"
      title="Component Files"
      height="540px"
      {...props}
    />
  );
}

export default Hero2FileTree;

