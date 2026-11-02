import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8 text-center sm:p-24">
      <div className="max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span>Powered by Fumadocs &amp; Base UI</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Component Library Docs
        </h1>

        <p className="text-lg text-muted-foreground sm:text-xl">
          A modern, accessible, and fast UI component library built with Next.js,
          Tailwind CSS, Base UI, and documented with Fumadocs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/docs"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Get Started
          </Link>
          <Link
            href="/docs/components/button"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            View Components
          </Link>
        </div>

        <div className="mt-12 rounded-xl border bg-card p-6 text-left shadow-sm">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Component Preview: Button
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
