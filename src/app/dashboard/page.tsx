import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { PhaseCard } from "@/components/learning/PhaseCard";
import { PHASES, UNITS } from "@/data/curriculum";
import { getCompletedUnitIds } from "@/lib/actions/progress";
import { isPhaseUnlocked } from "@/lib/lock";
import type { Phase } from "@/data/curriculum";

export default async function DashboardPage() {
  const completedUnitIds = await getCompletedUnitIds();

  const currentPhase: Phase =
    completedUnitIds.length === 0
      ? 0
      : (Math.max(
          ...UNITS.filter((u) => completedUnitIds.includes(u.id)).map((u) => u.phase)
        ) as Phase);

  const totalPct = Math.round((completedUnitIds.length / UNITS.length) * 100);

  const currentPhaseUnits = UNITS.filter((u) => u.phase === currentPhase);
  const currentPhaseCompleted = currentPhaseUnits.filter((u) =>
    completedUnitIds.includes(u.id)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPhase={currentPhase} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-8">
          <Sidebar completedIds={completedUnitIds} />

          <main className="flex-1 min-w-0" data-track-id="dashboard-main">
            {/* ウェルカムバナー */}
            <div
              className="mb-6 rounded-2xl bg-gradient-to-r from-[#96BF48] to-[#7ea83a] p-6 text-white"
              data-track-id="dashboard-welcome"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">おかえりなさい 👋</p>
                  <h1 className="text-2xl font-black mb-1">
                    Phase {currentPhase} を学習中
                  </h1>
                  <p className="text-white/80 text-sm">
                    {currentPhaseCompleted}/{currentPhaseUnits.length} ユニット完了 · 引き続き頑張りましょう！
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black">{totalPct}%</div>
                  <div className="text-white/70 text-xs mt-0.5">全体進捗</div>
                </div>
              </div>

              {/* 全体プログレスバー */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${totalPct}%` }}
                />
              </div>

              <div className="mt-3 flex gap-4 text-sm text-white/80">
                <span>✓ 完了: {completedUnitIds.length}</span>
                <span>📚 残り: {UNITS.length - completedUnitIds.length}</span>
                <span>📋 全: {UNITS.length}</span>
              </div>
            </div>

            {/* クイックアクセス（直近ユニット） */}
            <div className="mb-6" data-track-id="dashboard-quick-access">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                次のユニット
              </h2>
              {(() => {
                const nextUnit = UNITS.find((u) => !completedUnitIds.includes(u.id));
                if (!nextUnit) return null;
                const phaseInfo = PHASES.find((p) => p.phase === nextUnit.phase)!;
                return (
                  <a
                    href={`/unit/${nextUnit.id}`}
                    className="flex items-center gap-4 rounded-xl border-2 border-[#96BF48] bg-[#F4F9EE] p-4 hover:shadow-md transition-all"
                    data-track-id="dashboard-next-unit"
                    data-track-unit={nextUnit.id}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${phaseInfo.bgColor} ${phaseInfo.textColor}`}
                    >
                      {nextUnit.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-medium text-[#96BF48]">{phaseInfo.subtitle}</span>
                        <span className="text-xs text-gray-400">Lv.{nextUnit.level}</span>
                      </div>
                      <p className="font-semibold text-gray-900 truncate">{nextUnit.title}</p>
                    </div>
                    <span className="text-[#96BF48] text-lg font-bold shrink-0">→</span>
                  </a>
                );
              })()}
            </div>

            {/* フェーズグリッド */}
            <div data-track-id="dashboard-phase-grid">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                全フェーズ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PHASES.map(({ phase }) => (
                  <PhaseCard
                    key={phase}
                    phase={phase as Phase}
                    completedIds={completedUnitIds}
                    isLocked={!isPhaseUnlocked(phase as Phase, completedUnitIds)}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
