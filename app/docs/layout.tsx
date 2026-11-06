import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { DocsMobileHeader } from "@/components/docs-mobile-header";
import { SidebarHoverEffect } from "@/components/sidebar-hover-effect";
import { LayoutModeController } from "@/components/layout-mode-controller";

// Hoist static layout configuration to module level (Vercel best practice: server-hoist-static-io)
const navConfig = {
  component: <DocsMobileHeader />,
};

// In desktop preview, the sidebar is permanently docked and not closable (collapsible: false).
// On mobile and tablet, the responsive slide-in drawer functions via the mobile navbar hamburger.
// defaultOpenLevel: 1 ensures the Components folder/accordion starts open on initial view.
const sidebarConfig = {
  collapsible: false,
  defaultOpenLevel: 1,
};

const searchToggleConfig = {
  enabled: false,
};

const themeSwitchConfig = {
  enabled: false,
};

const containerPropsConfig = {
  className: "max-md:[--fd-header-height:3.5rem]",
};

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={navConfig}
      sidebar={sidebarConfig}
      searchToggle={searchToggleConfig}
      themeSwitch={themeSwitchConfig}
      containerProps={containerPropsConfig}
    >
      {/* Persistent pool for caching component previews across client-side navigations with zero reloads */}
      <div
        id="fd-persistent-preview-pool"
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <SidebarHoverEffect />
      <LayoutModeController />
      {children}
    </DocsLayout>
  );
}
