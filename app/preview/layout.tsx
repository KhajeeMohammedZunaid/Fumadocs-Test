import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-preview-root="true"
      className="w-full min-h-screen no-scrollbar overflow-x-hidden"
    >
      <style>{`
        /* Suppress scrollbars on separate preview pages and within preview frames */
        html,
        body {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
      `}</style>
      {children}
    </div>
  );
}

