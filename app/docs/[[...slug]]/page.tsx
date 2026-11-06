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

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const isComponentsPage = slug?.length === 1 && slug[0] === "components";

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
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description ? (
        <DocsDescription>{page.data.description}</DocsDescription>
      ) : null}
      <DocsBody className={isComponentsPage ? "max-w-none w-full !max-w-full" : undefined}>
        <MDX components={mdxComponents} />
      </DocsBody>
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
