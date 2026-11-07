import { Sections1 } from "@/components/sections/sections-1";

export const metadata = {
  title: "Sections 1 Preview",
  description: "Editorial & AI Studio Landing Showcase",
};

export default function Sections1PreviewPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] transition-colors duration-300 no-scrollbar">
      <Sections1 showThemeBar={true} />
    </div>
  );
}

