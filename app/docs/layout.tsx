import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

// Hoist static layout configuration to module level (Vercel best practice: server-hoist-static-io)
const navConfig = {
  title: "Component Library",
};

const navLinks = [
  {
    text: "Home",
    url: "/",
  },
];

const sidebarConfig = {
  collapsible: false,
};

const docsContainerProps = {
  style: {
    gridTemplate: `"sidebar sidebar header toc"
"sidebar sidebar toc-popover toc"
"sidebar sidebar tabs toc"
"sidebar sidebar main toc" 1fr / 0px var(--fd-sidebar-width) minmax(0, 1fr) var(--fd-toc-width, 210px)`,
  },
};

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={navConfig}
      links={navLinks}
      sidebar={sidebarConfig}
      containerProps={docsContainerProps}
    >
      {children}
    </DocsLayout>
  );
}
