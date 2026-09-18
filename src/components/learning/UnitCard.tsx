"use client";
import Link from "next/link";
import type { Unit, Phase } from "@/data/curriculum";
import { PHASES } from "@/data/curriculum";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { FormatIcon } from "@/components/ui/FormatIcon";

interface Props {
  unit: Unit;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export function UnitCard({ unit, isCompleted = false, isCurrent = false }: Props) {
  const phaseInfo = PHASES.find((p) => p.phase === unit.phase)!;

  return (
    <Link
      href={`/unit/${unit.id}`}
      className={`group relative flex flex-col gap-3 rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        isCompleted
          ? "border-green-300 bg-green-50"
          : isCurrent
          ? "border-[#96BF48] bg-[#F4F9EE] shadow-sm"
          : "border-gray-200 bg-white hover:border-[#96BF48]"
      }`}
      data-track-id={`unit-card-${unit.id}`}
      data-track-phase={unit.phase}
      data-track-level={unit.level}
    >
      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-bold ${phaseInfo.bgColor} ${phaseInfo.textColor}`}
          >
            {unit.id}
          </span>
          {isCurrent && (
            <span className="rounded-full bg-[#96BF48] px-2 py-0.5 text-xs font-bold text-white">
              学習中
            </span>
          )}
          {isCompleted && (
            <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
              ✓ 完了
            </span>
          )}
        </div>
        <LevelBadge level={unit.level} size="sm" />
      </div>

      {/* タイトル */}
      <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-[#6B8E35] transition-colors">
        {unit.title}
      </h3>

      {/* 説明 */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{unit.description}</p>

      {/* フッター */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <FormatIcon format={unit.format} />
        <span className="text-xs text-gray-400">⏱ {unit.estimatedMin}分</span>
      </div>

      {/* 進捗インジケーター */}
      {isCompleted && (
        <div
          className="absolute inset-0 rounded-xl ring-2 ring-green-400 ring-opacity-40"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
