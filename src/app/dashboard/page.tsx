import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { PhaseCard } from "@/components/learning/PhaseCard";
import { PHASES, UNITS } from "@/data/curriculum";
import { getCompletedUnitIds } from "@/lib/actions/progress";
import { isPhaseUnlocked } from "@/lib/lock";
import type { Phase } from "@/data/curriculum";

export default async function DashboardPage() {
  const completedUnitIds = await getCompletedUnitIds();

  // 「現在学習中」= 未完了の先頭ユニット。全修了ならマスター状態
  const nextUnit = UNITS.find((u) => !completedUnitIds.includes(u.id)) ?? null;
  const isMaster = nextUnit === null;
  const currentPhase: Phase = nextUnit ? nextUnit.phase : 5;
  const nextPhaseInfo = nextUnit
    ? PHASES.find((p) => p.phase === nextUnit.phase)!
    : null;

  const totalPct = Math.round((completedUnitIds.length / UNITS.length) * 100);

  const currentPhaseUnits = UNITS.filter((u) => u.phase === currentPhase);
  const currentPhaseCompleted = currentPhaseUnits.filter((u) =>
    completedUnitIds.includes(u.id)
  ).length;
  const currentPhasePct = Math.round(
    (currentPhaseCompleted / currentPhaseUnits.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPhase={currentPhase} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-8">
          <Sidebar completedIds={completedUnitIds} />

          <main className="flex-1 min-w-0" data-track-id="dashboard-main">
            {/* ウェルカムバナー */}
            <div
              className="mb-6 rounded-2xl bg-gradient-to-r from-shopify-dark to-shopify-deep p-6 text-white"
              data-track-id="dashboard-welcome"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white/90 text-sm mb-1">おかえりなさい 👋</p>
                  <h1 className="text-2xl font-black mb-1">
                    {isMaster ? "🏆 全フェーズ修了！" : `Phase ${currentPhase} を学習中`}
                  </h1>
                  <p className="text-white/90 text-sm">
                    {isMaster
                      ? "Shopify マスターです。いつでも復習できます"
                      : `${currentPhaseCompleted}/${currentPhaseUnits.length} ユニット完了 · 引き続き頑張りましょう！`}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black">{totalPct}%</div>
                  <div className="text-white/90 text-xs mt-0.5">全体進捗</div>
                </div>
              </div>

              {/* 全体プログレスバー */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${totalPct}%` }}
                />
              </div>

              <div className="mt-3 flex gap-4 text-sm text-white/90">
                <span>✓ 完了: {completedUnitIds.length}</span>
                <span>📚 残り: {UNITS.length - completedUnitIds.length}</span>
                <span>📋 全: {UNITS.length}</span>
              </div>
            </div>

            {/* 現在学習中 / マスター称号 */}
            {isMaster ? (
              <div
                className="mb-6 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-6"
                data-track-id="dashboard-master"
              >
                <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950 mb-3">
                  🏆 Shopify マスター
                </span>
                <h2 className="text-xl font-black text-gray-900 mb-1">
                  全 {UNITS.length} ユニット修了、おめでとうございます！
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  どのフェーズからでも復習できます
                </p>
                <div className="flex flex-wrap gap-2">
                  {PHASES.map(({ phase, title, bgColor, textColor }) => (
                    <Link
                      key={phase}
                      href={`/phase/${phase}`}
                      className={`rounded-lg px-3 py-1.5 text-sm font-bold ${bgColor} ${textColor} hover:shadow-sm transition-shadow`}
                      data-track-id={`dashboard-master-phase-${phase}`}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              nextUnit &&
              nextPhaseInfo && (
                <div
                  className={`mb-6 rounded-2xl border-2 ${nextPhaseInfo.borderColor} bg-white p-6`}
                  data-track-id="dashboard-current-learning"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${nextPhaseInfo.bgColor} ${nextPhaseInfo.textColor}`}
                    >
                      📍 現在学習中
                    </span>
                    <span className="text-xs text-gray-400">
                      {nextPhaseInfo.subtitle} · Lv.{nextUnit.level} · ⏱ 約{" "}
                      {nextUnit.estimatedMin} 分
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-gray-900 mb-1">
                    <span className="mr-2 text-sm font-bold text-gray-400">
                      {nextUnit.id}
                    </span>
                    {nextUnit.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">{nextUnit.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="mb-1 flex justify-between text-xs text-gray-400">
                        <span>{nextPhaseInfo.title} の進捗</span>
                        <span className="font-bold">{currentPhasePct}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${currentPhasePct}%`,
                            backgroundColor: nextPhaseInfo.color,
                          }}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/unit/${nextUnit.id}`}
                      className="shrink-0 rounded-xl bg-shopify px-6 py-2.5 text-center text-sm font-bold text-shopify-ink hover:bg-shopify-hover transition-colors shadow-sm"
                      data-track-id="dashboard-continue-btn"
                      data-track-unit={nextUnit.id}
                    >
                      続きから学習する →
                    </Link>
                  </div>
                </div>
              )
            )}

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
                    isCurrent={!isMaster && phase === currentPhase}
                  />
                ))}
              </div>
            </div>

            {/* 学習の進め方 */}
            <div
              className="mt-6 rounded-2xl border border-gray-100 bg-white p-5"
              data-track-id="dashboard-how-to-learn"
            >
              <h2 className="text-sm font-semibold text-gray-500 mb-3">学習の進め方</h2>
              <ol className="space-y-2 text-sm text-gray-500">
                <li>
                  <span className="font-bold text-gray-700">1. 教材を読む</span>
                  {" "}— 手順・ポイント・注意事項をユニットごとに学ぶ
                </li>
                <li>
                  <span className="font-bold text-gray-700">2. 英単語とチェックリストで確認</span>
                  {" "}— 管理画面の英語表記に慣れ、やり残しを自己点検する
                </li>
                <li>
                  <span className="font-bold text-gray-700">3. 一問一答クイズに挑戦</span>
                  {" "}— 全問正解でユニット完了（間違えても解説を読んで再挑戦できます）
                </li>
                <li>
                  <span className="font-bold text-gray-700">4. 次のユニットが解放</span>
                  {" "}— 順番に進めてフェーズを修了しましょう
                </li>
              </ol>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
