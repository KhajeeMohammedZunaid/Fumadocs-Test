import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Files, Folder, File } from "fumadocs-ui/components/files";
import {
  HeroPreviewFrame,
  InteractiveFileTree,
} from "@/components/hero-sections";
import {
  Hero2,
  Hero2FileTree,
} from "@/components/hero-section-2";
import {
  UniversalFileTree,
} from "@/components/interactive-file-tree";
import {
  StuxButton,
  StuxButtonStudio,
  StuxButtonCodeViewer,
} from "@/components/stux-button";
import {
  ComponentsGallery,
  ComponentCard,
} from "@/components/components-gallery";
import { CustomPre } from "@/components/custom-pre";
import { PropsTable } from "@/components/props-table";
import { CliInstallation } from "@/components/cli-installation";
import {
  ComponentPreview,
  UniversalPreviewFrame,
} from "@/components/component-preview";
import {
  ComponentNavigation,
  type ComponentNavTarget,
} from "@/components/component-navigation";
import { PageTransition } from "@/components/page-transition";

// Hoist static MDX components to module level (Vercel best practice: server-hoist-static-io & rerender-no-inline-components)
const mdxComponents = {
  ...defaultMdxComponents,
  pre: CustomPre,
  PropsTable,
  CliInstallation,
  ComponentPreview,
  UniversalPreviewFrame,
  Tab,
  Tabs,
  Files,
  Folder,
  File,
  HeroPreviewFrame,
  InteractiveFileTree,
  Hero2,
  Hero2FileTree,
  UniversalFileTree,
  StuxButton,
  StuxButtonStudio,
  StuxButtonCodeViewer,
  ComponentsGallery,
  ComponentCard,
};

/**
 * Resolves the ordered list of component detail pages matching the sidebar structure.
 */
function getComponentNavItems(): ComponentNavTarget[] {
  const tree = source.getPageTree();
  const items: ComponentNavTarget[] = [];
  const seen = new Set<string>();

  function traverse(nodes: unknown[]) {
    if (!Array.isArray(nodes)) return;
    for (const node of nodes) {
      if (node && typeof node === "object" && "type" in node) {
        if (
          node.type === "page" &&
          "url" in node &&
          typeof node.url === "string" &&
          node.url.startsWith("/docs/components/") &&
          node.url !== "/docs/components"
        ) {
          if (!seen.has(node.url)) {
            seen.add(node.url);
            const pageObj = source.getPageByUrl(node.url);
            const name =
              pageObj?.data.title ||
              ("name" in node && typeof node.name === "string" ? node.name : "Component");
            items.push({ name, url: node.url });
          }
        } else if (
          node.type === "folder" &&
          "children" in node &&
          Array.isArray(node.children)
        ) {
          traverse(node.children);
        }
      }
    }
  }

  if (tree && typeof tree === "object" && "children" in tree && Array.isArray(tree.children)) {
    traverse(tree.children);
  }

  // Resilient fallback: if tree traversal returned empty, use source.getPages()
  if (items.length === 0) {
    const pages = source
      .getPages()
      .filter((p) => p.slugs.length === 2 && p.slugs[0] === "components");
    for (const p of pages) {
      if (!seen.has(p.url)) {
        seen.add(p.url);
        items.push({ name: p.data.title, url: p.url });
      }
    }
  }

  return items;
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const isComponentsPage = slug?.length === 1 && slug[0] === "components";
  const isComponentDetailPage =
    Boolean(slug && slug.length >= 2 && slug[0] === "components");

  let previous: ComponentNavTarget | null = null;
  let next: ComponentNavTarget | null = null;

  if (isComponentDetailPage) {
    const componentPages = getComponentNavItems();
    const currentIndex = componentPages.findIndex(
      (p) => p.url.replace(/\/$/, "") === page.url.replace(/\/$/, "")
    );
    if (currentIndex !== -1) {
      previous = currentIndex > 0 ? componentPages[currentIndex - 1] : null;
      next =
        currentIndex < componentPages.length - 1
          ? componentPages[currentIndex + 1]
          : null;
    }
  }

  return (
    <DocsPage
      toc={isComponentsPage ? [] : page.data.toc}
      full={isComponentsPage ? true : page.data.full}
      tableOfContent={isComponentsPage ? { enabled: false } : { enabled: true }}
      className={
        isComponentsPage
          ? "max-w-none w-full !max-w-full px-4 sm:px-6 md:px-8 py-6"
          : undefined
      }
    >
      <PageTransition
        key={page.url}
        className="flex flex-col min-w-0 w-full flex-1"
      >
        {isComponentDetailPage ? (
          <div className="flex items-center justify-between gap-3 sm:gap-4 not-prose mb-2">
            <DocsTitle className="mb-0 text-2xl sm:text-3xl font-bold tracking-tight">
              {page.data.title}
            </DocsTitle>
            <ComponentNavigation previous={previous} next={next} />
          </div>
        ) : (
          <DocsTitle>{page.data.title}</DocsTitle>
        )}
        {page.data.description ? (
          <DocsDescription className="mt-2 mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground">
            {page.data.description}
          </DocsDescription>
        ) : null}
        <DocsBody className={isComponentsPage ? "max-w-none w-full !max-w-full" : undefined}>
          <MDX components={mdxComponents} />
        </DocsBody>
      </PageTransition>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
