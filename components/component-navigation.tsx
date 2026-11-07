import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ComponentNavTarget {
  name: string;
  url: string;
}

export interface ComponentNavigationProps {
  previous?: ComponentNavTarget | null;
  next?: ComponentNavTarget | null;
  className?: string;
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ComponentNavigation({
  previous,
  next,
  className,
}: ComponentNavigationProps) {
  return (
    <nav
      aria-label="Component navigation"
      className={cn("inline-flex items-center gap-1.5 shrink-0", className)}
    >
      {previous ? (
        <Link
          href={previous.url}
          title={`Previous: ${previous.name}`}
          aria-label={`Previous component: ${previous.name}`}
          className="group inline-flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 transition-all select-none shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <ArrowLeftIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          title="No previous component"
          className="inline-flex size-8 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground/35 cursor-not-allowed select-none opacity-40 shrink-0 pointer-events-none"
        >
          <ArrowLeftIcon className="size-4 shrink-0" />
        </span>
      )}

      {next ? (
        <Link
          href={next.url}
          title={`Next: ${next.name}`}
          aria-label={`Next component: ${next.name}`}
          className="group inline-flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 transition-all select-none shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          title="No next component"
          className="inline-flex size-8 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground/35 cursor-not-allowed select-none opacity-40 shrink-0 pointer-events-none"
        >
          <ArrowRightIcon className="size-4 shrink-0" />
        </span>
      )}
    </nav>
  );
}
