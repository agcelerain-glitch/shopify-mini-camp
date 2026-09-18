import type { Unit } from "@/data/curriculum";

const FORMAT_CONFIG: Record<
  Unit["format"],
  { icon: string; label: string; color: string }
> = {
  text: { icon: "📄", label: "テキスト", color: "text-gray-500" },
  video: { icon: "🎬", label: "動画", color: "text-red-500" },
  "hands-on": { icon: "🛠️", label: "ハンズオン", color: "text-orange-500" },
  quiz: { icon: "❓", label: "クイズ", color: "text-indigo-500" },
};

interface Props {
  format: Unit["format"];
}

export function FormatIcon({ format }: Props) {
  const cfg = FORMAT_CONFIG[format];
  return (
    <span className={`text-xs ${cfg.color} flex items-center gap-0.5`}>
      <span>{cfg.icon}</span>
      <span>{cfg.label}</span>
    </span>
  );
}
