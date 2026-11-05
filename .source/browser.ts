// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"components/button.mdx": () => import("../content/docs/components/button.mdx?collection=docs"), "components/hero-section-2.mdx": () => import("../content/docs/components/hero-section-2.mdx?collection=docs"), "components/hero.mdx": () => import("../content/docs/components/hero.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), }),
};
export default browserCollections;