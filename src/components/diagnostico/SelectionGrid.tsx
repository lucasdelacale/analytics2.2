"use client";

import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface SelectionGridProps {
  options: Option[];
  selected: string | null;
  onSelect: (value: string) => void;
  columns?: 2 | 3 | 4;
}

export function SelectionGrid({
  options,
  selected,
  onSelect,
  columns = 3,
}: SelectionGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => !opt.disabled && onSelect(opt.value)}
          disabled={opt.disabled}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-[16px] border p-4 text-left transition-all duration-200 min-h-[80px]",
            opt.disabled
              ? "opacity-30 cursor-not-allowed border-white/5 bg-white/[0.02]"
              : selected === opt.value
                ? "border-cyan-500/50 bg-cyan-500/10 shadow-glow"
                : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] cursor-pointer"
          )}
        >
          <span
            className={cn(
              "text-sm font-medium",
              selected === opt.value ? "text-cyan-300" : "text-white"
            )}
          >
            {opt.label}
          </span>
          {opt.description && (
            <span className="text-[11px] text-neutral-500 mt-1 text-center">
              {opt.description}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
