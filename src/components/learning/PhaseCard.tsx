"use client";
import Link from "next/link";
import type { Phase } from "@/data/curriculum";
import { PHASES, UNITS } from "@/data/curriculum";

interface Props {
  phase: Phase;
  completedIds: string[];
  isLocked?: boolean;
}

export function PhaseCard({ phase, completedIds, isLocked = false }: Props) {
  const info = PHASES.find((p) => p.phase === phase)!;
  const units = UNITS.filter((u) => u.phase === phase);
  const completed = units.filter((u) => completedIds.includes(u.id)).length;
  const pct = Math.round((completed / units.length) * 100);

  return (
    <Link
      href={isLocked ? "#" : `/phase/${phase}`}
      className={`group flex flex-col gap-4 rounded-2xl border-2 p-5 transition-all duration-200 ${
        isLocked
          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
          : `${info.borderColor} bg-white hover:shadow-lg hover:-translate-y-1`
      }`}
      data-track-id={`phase-card-${phase}`}
      data-track-phase={phase}
      aria-disabled={isLocked}
    >
      {/* フェーズヘッダー */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-lg px-2 py-1 text-xs font-bold ${info.bgColor} ${info.textColor}`}
            >
              {info.title}
            </span>
            {isLocked && (
              <span className="text-gray-400 text-sm">🔒</span>
            )}
          </div>
          <h3 className={`mt-1.5 font-bold text-lg text-gray-900 ${!isLocked && "group-hover:text-[#6B8E35]"} transition-colors`}>
            {info.subtitle}
          </h3>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-black ${info.textColor}`}>{pct}%</span>
          <p className="text-xs text-gray-400">{completed}/{units.length} ユニット</p>
        </div>
      </div>

      {/* プログレスバー */}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: info.color }}
          data-track-id={`phase-progress-${phase}`}
        />
      </div>

      {/* ユニット数とレベル分布 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{units.length} ユニット</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((lv) => {
            const count = units.filter((u) => u.level === lv).length;
            return count > 0 ? (
              <span
                key={lv}
                className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium"
              >
                Lv{lv}×{count}
              </span>
            ) : null;
          })}
        </div>
      </div>
    </Link>
  );
}
