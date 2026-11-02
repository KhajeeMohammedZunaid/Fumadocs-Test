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

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={navConfig}
      links={navLinks}
    >
      {children}
    </DocsLayout>
  );
}
