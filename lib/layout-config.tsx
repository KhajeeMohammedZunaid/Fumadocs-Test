import type { LinkItemType, NavOptions } from "fumadocs-ui/layouts/shared";
import { ZurisBrand } from "@/components/ui/zuris-brand";

export const baseNavConfig: NavOptions = {
  title: <ZurisBrand />,
  url: "/",
};

export const baseNavLinks: LinkItemType[] = [
  {
    text: "Home",
    url: "/",
    active: "url",
  },
  {
    text: "Components",
    url: "/docs/components",
    active: "nested-url",
  },
  {
    text: "Documentation",
    url: "/docs",
    active: "nested-url",
  },
];

