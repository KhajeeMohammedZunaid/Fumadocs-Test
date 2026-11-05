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

// In desktop preview, the sidebar is permanently docked and not closable (collapsible: false).
// On mobile and tablet, the responsive slide-in drawer functions via the mobile navbar hamburger.
const sidebarConfig = {
  collapsible: false,
};

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={navConfig}
      links={navLinks}
      sidebar={sidebarConfig}
    >
      {children}
    </DocsLayout>
  );
}
