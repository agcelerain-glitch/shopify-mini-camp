import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { UnitCard } from "@/components/learning/UnitCard";
import { PHASES, UNITS } from "@/data/curriculum";
import { getCompletedUnitIds } from "@/lib/actions/progress";
import { isUnitLocked } from "@/lib/lock";
import type { Phase, Level } from "@/data/curriculum";

interface Props {
  params: Promise<{ phase: string }>;
  searchParams: Promise<{ level?: string }>;
}

export default async function PhasePage({ params, searchParams }: Props) {
  const { phase: phaseStr } = await params;
  const { level: levelStr } = await searchParams;

  const phaseNum = parseInt(phaseStr, 10) as Phase;
  if (isNaN(phaseNum) || phaseNum < 0 || phaseNum > 5) notFound();

  const info = PHASES.find((p) => p.phase === phaseNum);
  if (!info) notFound();

  const completedUnitIds = await getCompletedUnitIds();

  const allUnits = UNITS.filter((u) => u.phase === phaseNum);
  const selectedLevel = levelStr ? (parseInt(levelStr, 10) as Level) : undefined;
  const filteredUnits = selectedLevel
    ? allUnits.filter((u) => u.level === selectedLevel)
    : allUnits;

  const completed = allUnits.filter((u) => completedUnitIds.includes(u.id)).length;
  const pct = Math.round((completed / allUnits.length) * 100);

  const levels: Level[] = [...new Set(allUnits.map((u) => u.level))].sort() as Level[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPhase={phaseNum} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-8">
          <Sidebar completedIds={completedUnitIds} />

          <main className="flex-1 min-w-0" data-track-id={`phase-${phaseNum}-main`}>
            {/* フェーズヘッダー */}
            <div
              className={`mb-6 rounded-2xl border-2 ${info.borderColor} p-6 bg-white`}
              data-track-id={`phase-${phaseNum}-header`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href="/dashboard"
                      className="text-sm text-gray-400 hover:text-[#96BF48] transition-colors"
                      data-track-id="phase-breadcrumb-dashboard"
                    >
                      ダッシュボード
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className={`rounded-lg px-2 py-0.5 text-sm font-bold ${info.bgColor} ${info.textColor}`}>
                      {info.title}
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-gray-900">{info.subtitle}</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {allUnits.length} ユニット · {completed} 完了
                  </p>
                </div>

                {/* フェーズ進捗リング（SVG） */}
                <div
                  className="relative flex h-16 w-16 shrink-0 items-center justify-center"
                  data-track-id={`phase-${phaseNum}-ring`}
                >
                  <svg className="absolute h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="none"
                      stroke={info.color}
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-sm font-black" style={{ color: info.color }}>
                    {pct}%
                  </span>
                </div>
              </div>

              {/* プログレスバー */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: info.color }}
                />
              </div>
            </div>

            {/* レベルフィルター */}
            <div
              className="mb-5 flex items-center gap-2 flex-wrap"
              data-track-id={`phase-${phaseNum}-level-filter`}
            >
              <span className="text-sm text-gray-500 font-medium">レベル絞り込み:</span>
              <Link
                href={`/phase/${phaseNum}`}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  !selectedLevel
                    ? "bg-[#96BF48] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                data-track-id={`phase-filter-all`}
              >
                すべて ({allUnits.length})
              </Link>
              {levels.map((lv) => {
                const count = allUnits.filter((u) => u.level === lv).length;
                return (
                  <Link
                    key={lv}
                    href={`/phase/${phaseNum}?level=${lv}`}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      selectedLevel === lv
                        ? "bg-[#96BF48] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    data-track-id={`phase-filter-lv${lv}`}
                    data-track-level={lv}
                  >
                    Lv.{lv} ({count})
                  </Link>
                );
              })}
            </div>

            {/* ユニットグリッド */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              id={`phase-${phaseNum}-units`}
              data-track-id={`phase-${phaseNum}-unit-grid`}
            >
              {filteredUnits.map((unit) => (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  isCompleted={completedUnitIds.includes(unit.id)}
                  isCurrent={
                    !completedUnitIds.includes(unit.id) &&
                    UNITS.findIndex((u) => !completedUnitIds.includes(u.id)) ===
                      UNITS.indexOf(unit)
                  }
                  isLocked={isUnitLocked(unit.id, completedUnitIds)}
                />
              ))}
            </div>

            {filteredUnits.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                このレベルのユニットはありません
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [0, 1, 2, 3, 4, 5].map((phase) => ({ phase: String(phase) }));
}
