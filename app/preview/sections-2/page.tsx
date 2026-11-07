import { Sections2 } from "@/components/sections/sections-2";

export const metadata = {
  title: "Sections 2 Preview",
  description: "3-Card Feature Bento / Showcase Grid",
};

export default function Sections2PreviewPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fb] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 flex items-center justify-center transition-colors duration-300 no-scrollbar">
      <Sections2 />
    </main>
  );
}

