// @ts-nocheck
import { default as __fd_glob_10 } from "../content/docs/meta.json?collection=meta"
import { default as __fd_glob_9 } from "../content/docs/components/meta.json?collection=meta"
import * as __fd_glob_8 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/components/testimonials-1.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/components/sections-3.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/components/sections-2.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/components/sections-1.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/components/index.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/components/hero.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/components/hero-section-2.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/components/button.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.doc("docs", "content/docs", {"components/button.mdx": __fd_glob_0, "components/hero-section-2.mdx": __fd_glob_1, "components/hero.mdx": __fd_glob_2, "components/index.mdx": __fd_glob_3, "components/sections-1.mdx": __fd_glob_4, "components/sections-2.mdx": __fd_glob_5, "components/sections-3.mdx": __fd_glob_6, "components/testimonials-1.mdx": __fd_glob_7, "index.mdx": __fd_glob_8, });

export const meta = await create.meta("meta", "content/docs", {"components/meta.json": __fd_glob_9, "meta.json": __fd_glob_10, });