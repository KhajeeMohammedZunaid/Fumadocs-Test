"use client";

import * as React from "react";
import { UniversalFileTree, type InteractiveFileTreeProps } from "@/components/interactive-file-tree";
import { HERO_FILES } from "@/components/hero-sections/hero-code-data";

export function HeroFileTree(props: Partial<InteractiveFileTreeProps>) {
  return (
    <UniversalFileTree
      files={HERO_FILES}
      defaultFileId="hero.tsx"
      title="Component Files"
      height="540px"
      {...props}
    />
  );
}

// Named alias so existing <InteractiveFileTree /> in MDX and imports continue working seamlessly
export const InteractiveFileTree = HeroFileTree;
export default HeroFileTree;
