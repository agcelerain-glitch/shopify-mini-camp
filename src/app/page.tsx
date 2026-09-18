import Link from "next/link";
import { PHASES, UNITS } from "@/data/curriculum";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── ヒーロー ─────────────────────────────────────── */}
      <header
        className="relative overflow-hidden bg-gradient-to-br from-[#96BF48] via-[#7ea83a] to-[#5a7a28]"
        data-track-id="landing-hero"
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm text-white mb-6">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            Phase 0〜5 · 全 51 ユニット
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Shopify を<br />
            ゼロから<span className="text-yellow-200">体系的に</span>学ぼう
          </h1>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            ストア開設から越境EC・ヘッドレス開発まで、フェーズ×レベルで段階的に習得できる実践型 e-learning
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center" data-track-id="landing-cta-group">
            <Link
              href="/dashboard"
              className="rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#6B8E35] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              data-track-id="landing-cta-primary"
            >
              学習を始める →
            </Link>
            <Link
              href="/phase/0"
              className="rounded-xl border-2 border-white/50 px-8 py-3.5 text-base font-bold text-white hover:bg-white/10 transition-all duration-200"
              data-track-id="landing-cta-phase0"
            >
              Phase 0 から見る
            </Link>
          </div>
        </div>
      </header>

      {/* ── フェーズ概要グリッド ─────────────────────────── */}
      <section
        className="mx-auto max-w-5xl px-6 py-16"
        id="phase-overview"
        data-track-id="landing-phase-overview"
      >
        <h2 className="text-2xl font-black text-gray-900 mb-2">カリキュラム全体像</h2>
        <p className="text-gray-500 mb-8">6フェーズ × Lv.1〜5 で段階的にスキルアップ</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PHASES.map(({ phase, title, subtitle, bgColor, textColor, borderColor, color }) => {
            const units = UNITS.filter((u) => u.phase === phase);
            const levels = [...new Set(units.map((u) => u.level))].sort();

            return (
              <Link
                key={phase}
                href={`/phase/${phase}`}
                className={`group flex flex-col gap-3 rounded-2xl border-2 ${borderColor} p-5 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
                data-track-id={`landing-phase-card-${phase}`}
                data-track-phase={phase}
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-lg px-2.5 py-1 text-sm font-bold ${bgColor} ${textColor}`}>
                    {title}
                  </span>
                  <span className="text-gray-300 text-xl group-hover:text-[#96BF48] transition-colors">→</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#6B8E35] transition-colors">
                  {subtitle}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{units.length} ユニット</span>
                  <div className="flex gap-1">
                    {levels.map((lv) => (
                      <span
                        key={lv}
                        className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium"
                      >
                        Lv.{lv}
                      </span>
                    ))}
                  </div>
                </div>
                {/* フェーズカラーストライプ */}
                <div
                  className="h-1 w-full rounded-full"
                  style={{ backgroundColor: color }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 学習ルート紹介 ───────────────────────────────── */}
      <section
        className="bg-[#F4F9EE] py-16"
        data-track-id="landing-routes"
      >
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-black text-gray-900 mb-2">あなたに合った学習ルート</h2>
          <p className="text-gray-500 mb-8">目標に応じた優先ユニットを確認しましょう</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🧑‍💼", label: "個人事業主", desc: "Phase 0〜2 中心。まずは売れる仕組みを作る", color: "bg-green-100 text-green-800" },
              { icon: "🏢", label: "法人・チーム", desc: "Phase 1〜4。運用・分析まで網羅", color: "bg-blue-100 text-blue-800" },
              { icon: "🌏", label: "越境EC", desc: "Phase 1〜3 + P3-08 Markets を優先", color: "bg-amber-100 text-amber-800" },
              { icon: "💻", label: "開発者志望", desc: "Phase 5 Liquid・API・Hydrogen を中心に", color: "bg-purple-100 text-purple-800" },
            ].map(({ icon, label, desc, color }) => (
              <div
                key={label}
                className="rounded-xl bg-white border border-gray-100 p-4 hover:shadow-md transition-shadow"
                data-track-id={`landing-route-${label}`}
              >
                <div className={`inline-flex rounded-lg px-2 py-1 text-xs font-bold mb-3 ${color}`}>
                  {icon} {label}
                </div>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── フッター ─────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400" data-track-id="landing-footer">
        <Link href="/dashboard" className="font-bold text-[#96BF48] hover:underline" data-track-id="footer-start">
          学習を開始する →
        </Link>
        <p className="mt-2">© 2026 Shopify e-Learning · Mock Design Phase</p>
      </footer>
    </div>
  );
}
