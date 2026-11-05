import * as React from "react";
import { cn } from "@/lib/utils";

export interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface PropsTableProps {
  items: PropItem[];
  className?: string;
}

export function PropsTable({ items, className }: PropsTableProps) {
  const hasDefault = items.some((item) => item.default !== undefined && item.default !== "");

  return (
    <div
      className={cn(
        "my-6 w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-white/[0.08] shadow-xs not-prose bg-white dark:bg-black",
        className
      )}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px] sm:text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-black">
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white border-r border-zinc-200 dark:border-white/[0.08] w-[22%] min-w-[120px]">
                Prop name
              </th>
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white border-r border-zinc-200 dark:border-white/[0.08] w-[24%] min-w-[120px]">
                Type
              </th>
              {hasDefault && (
                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white border-r border-zinc-200 dark:border-white/[0.08] w-[18%] min-w-[100px]">
                  Default
                </th>
              )}
              <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-white min-w-[200px]">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((prop, idx) => {
              const isOdd = idx % 2 === 1;
              return (
                <tr
                  key={prop.name}
                  className={cn(
                    "border-b border-zinc-200 dark:border-white/[0.08] last:border-b-0 transition-colors",
                    isOdd
                      ? "bg-[#f8f8f9] dark:bg-[#121214]"
                      : "bg-white dark:bg-black"
                  )}
                >
                  {/* Prop Name */}
                  <td className="py-3 px-4 border-r border-zinc-200 dark:border-white/[0.08] align-top">
                    <code className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[12.5px] bg-[#f2f2f4] dark:bg-[#18181b] text-zinc-900 dark:text-zinc-100 border border-zinc-300/40 dark:border-white/10 font-medium tracking-tight">
                      {prop.name}
                    </code>
                  </td>

                  {/* Type */}
                  <td className="py-3 px-4 border-r border-zinc-200 dark:border-white/[0.08] align-top">
                    <code className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[12.5px] bg-[#f2f2f4] dark:bg-[#18181b] text-zinc-800 dark:text-zinc-200 border border-zinc-300/40 dark:border-white/10 font-normal tracking-tight break-all">
                      {prop.type}
                    </code>
                  </td>

                  {/* Default (if any prop specifies default) */}
                  {hasDefault && (
                    <td className="py-3 px-4 border-r border-zinc-200 dark:border-white/[0.08] align-top">
                      {prop.default && prop.default !== "—" ? (
                        <code className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[12px] bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-300/40 dark:border-white/10">
                          {prop.default}
                        </code>
                      ) : (
                        <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs select-none">
                          —
                        </span>
                      )}
                    </td>
                  )}

                  {/* Description */}
                  <td className="py-3 px-4 align-top text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed text-[13px] sm:text-sm">
                    {prop.description}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
