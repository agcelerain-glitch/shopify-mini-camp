import type { Level } from "@/data/curriculum";
import { LEVEL_LABELS } from "@/data/curriculum";

const LEVEL_STYLES: Record<Level, string> = {
  1: "bg-gray-100 text-gray-600 border-gray-300",
  2: "bg-green-100 text-green-700 border-green-300",
  3: "bg-blue-100 text-blue-700 border-blue-300",
  4: "bg-purple-100 text-purple-700 border-purple-300",
  5: "bg-red-100 text-red-700 border-red-300",
};

interface Props {
  level: Level;
  size?: "sm" | "md";
}

export function LevelBadge({ level, size = "md" }: Props) {
  const sizeClass = size === "sm" ? "text-xs px-1.5 py-0.5" : "text-sm px-2 py-1";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${sizeClass} ${LEVEL_STYLES[level]}`}
      data-track-id={`level-badge-lv${level}`}
    >
      <span className="font-bold">Lv.{level}</span>
      <span>{LEVEL_LABELS[level]}</span>
    </span>
  );
}
