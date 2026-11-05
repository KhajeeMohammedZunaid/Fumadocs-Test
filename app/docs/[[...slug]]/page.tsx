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
  UniversalFileTree,
} from "@/components/interactive-file-tree";
import {
  StuxButton,
  StuxButtonStudio,
  StuxButtonCodeViewer,
} from "@/components/stux-button";
import { CustomPre } from "@/components/custom-pre";
import { PropsTable } from "@/components/props-table";

// Hoist static MDX components to module level (Vercel best practice: server-hoist-static-io & rerender-no-inline-components)
const mdxComponents = {
  ...defaultMdxComponents,
  pre: CustomPre,
  PropsTable,
  Tab,
  Tabs,
  Files,
  Folder,
  File,
  HeroPreviewFrame,
  InteractiveFileTree,
  UniversalFileTree,
  StuxButton,
  StuxButtonStudio,
  StuxButtonCodeViewer,
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
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
