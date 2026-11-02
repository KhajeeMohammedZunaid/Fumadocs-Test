import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{
        title: "Component Library",
      }}
      links={[
        {
          text: "Home",
          url: "/",
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
