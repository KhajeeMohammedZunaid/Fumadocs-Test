"use client";

import * as React from "react";
import { UniversalFileTree } from "@/components/interactive-file-tree";
import { STUX_BUTTON_FILES } from "@/components/stux-button/stux-button-code-data";
import type { InteractiveFileTreeProps } from "@/components/interactive-file-tree";

export function StuxButtonCodeViewer(props: Partial<InteractiveFileTreeProps>) {
  return (
    <UniversalFileTree
      files={STUX_BUTTON_FILES}
      defaultFileId="stux-button.tsx"
      title="Component Files"
      height="520px"
      {...props}
    />
  );
}

export default StuxButtonCodeViewer;
