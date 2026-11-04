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
    gridTemplate: `"sidebar sidebar header toc toc"
"sidebar sidebar toc-popover toc toc"
"sidebar sidebar tabs toc toc"
"sidebar sidebar main toc toc" 1fr / 0px var(--fd-sidebar-col, 268px) minmax(0, 1fr) var(--fd-toc-width, 210px) 0px`,
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
