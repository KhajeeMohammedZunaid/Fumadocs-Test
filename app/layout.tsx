import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { RootProvider } from "fumadocs-ui/provider/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Component Library",
    default: "Component Library Docs",
  },
  description: "Documentation for the UI component library",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
