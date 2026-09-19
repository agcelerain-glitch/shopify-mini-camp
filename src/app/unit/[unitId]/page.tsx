import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { FormatIcon } from "@/components/ui/FormatIcon";
import { UNITS, PHASES } from "@/data/curriculum";
import { getMDXContent } from "@/lib/content";
import { getCompletedUnitIds } from "@/lib/actions/progress";

interface Props {
  params: Promise<{ unitId: string }>;
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-3 text-xl font-black text-gray-900 flex items-center gap-2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-5 mb-2 text-base font-bold text-gray-800" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-loose text-gray-700 text-[0.97rem]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 pl-5 space-y-1.5 list-disc text-gray-700 text-[0.97rem]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 pl-5 space-y-1.5 list-decimal text-gray-700 text-[0.97rem]" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="my-4 border-l-4 border-[#96BF48] bg-[#F4F9EE] pl-4 pr-3 py-3 rounded-r-xl text-sm text-gray-700 leading-relaxed"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-md bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-4 overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100 font-mono leading-relaxed"
      {...props}
    />
  ),
  hr: () => <hr className="my-6 border-gray-200" />,
};

export default async function UnitPage({ params }: Props) {
  const { unitId } = await params;
  const unit = UNITS.find((u) => u.id === unitId);
  if (!unit) notFound();

  const phaseInfo = PHASES.find((p) => p.phase === unit.phase)!;
  const completedUnitIds = await getCompletedUnitIds();
  const isCompleted = completedUnitIds.includes(unit.id);

  const phaseUnits = UNITS.filter((u) => u.phase === unit.phase);
  const idx = phaseUnits.indexOf(unit);
  const prevUnit = idx > 0 ? phaseUnits[idx - 1] : null;
  const nextUnit = idx < phaseUnits.length - 1 ? phaseUnits[idx + 1] : null;

  const mdx = getMDXContent(unit.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPhase={unit.phase} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-8">
          <Sidebar completedIds={completedUnitIds} />

          <main className="flex-1 min-w-0" data-track-id={`unit-${unit.id}-main`}>
            {/* パンくずリスト */}
            <nav className="mb-4 flex items-center gap-2 text-sm text-gray-400" data-track-id="unit-breadcrumb">
              <Link href="/dashboard" className="hover:text-[#96BF48]" data-track-id="breadcrumb-dashboard">ダッシュボード</Link>
              <span>/</span>
              <Link href={`/phase/${unit.phase}`} className={`hover:text-[#96BF48] ${phaseInfo.textColor} font-medium`} data-track-id="breadcrumb-phase">
                {phaseInfo.subtitle}
              </Link>
              <span>/</span>
              <span className="text-gray-700 font-medium">{unit.id}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* メインコンテンツ */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {/* ユニットヘッダー */}
                <div className="rounded-2xl border-2 border-gray-100 bg-white p-6" data-track-id={`unit-${unit.id}-header`}>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className={`rounded-lg px-2.5 py-1 text-sm font-bold ${phaseInfo.bgColor} ${phaseInfo.textColor}`}>
                      {unit.id}
                    </span>
                    <LevelBadge level={unit.level} />
                  </div>
                  <h1 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{unit.title}</h1>
                  <p className="text-gray-500 leading-relaxed mb-4">{unit.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <FormatIcon format={unit.format} />
                    <span>⏱ 約 {unit.estimatedMin} 分</span>
                    <span>📋 {phaseInfo.subtitle}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {unit.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500" data-track-id={`unit-tag-${tag}`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 学習コンテンツ */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 lg:p-8" data-track-id={`unit-${unit.id}-content`}>
                  {mdx ? (
                    <MDXRemote source={mdx.source} components={mdxComponents} />
                  ) : (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 text-amber-800 text-sm">
                      <strong>⚠️ コンテンツ準備中</strong><br />
                      このユニットの教材は現在作成中です。近日公開予定です。
                    </div>
                  )}
                </div>

                {/* クイズボタン */}
                <div className="rounded-2xl border-2 border-dashed border-[#96BF48] bg-[#F4F9EE] p-6 text-center" data-track-id={`unit-${unit.id}-quiz-section`}>
                  <Link
                    href={`/unit/${unit.id}/quiz`}
                    className="inline-block rounded-xl bg-[#96BF48] px-8 py-3 font-bold text-white hover:bg-[#6B8E35] transition-colors shadow-md hover:shadow-lg active:scale-95"
                    data-track-id={`unit-${unit.id}-quiz-btn`}
                    data-track-phase={unit.phase}
                    data-track-level={unit.level}
                  >
                    ミニクイズに挑戦 →
                  </Link>
                </div>

                {/* 前後ナビゲーション */}
                <div className="flex gap-3 justify-between" data-track-id={`unit-${unit.id}-nav`}>
                  {prevUnit ? (
                    <Link href={`/unit/${prevUnit.id}`} className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 hover:border-[#96BF48] hover:bg-[#F4F9EE] transition-all" data-track-id="unit-nav-prev">
                      <span className="text-gray-400">←</span>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">前のユニット</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">{prevUnit.title}</p>
                      </div>
                    </Link>
                  ) : <div className="flex-1" />}
                  {nextUnit ? (
                    <Link href={`/unit/${nextUnit.id}`} className="flex flex-1 items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white p-4 hover:border-[#96BF48] hover:bg-[#F4F9EE] transition-all text-right" data-track-id="unit-nav-next">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">次のユニット</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">{nextUnit.title}</p>
                      </div>
                      <span className="text-gray-400 shrink-0">→</span>
                    </Link>
                  ) : <div className="flex-1" />}
                </div>
              </div>

              {/* サイドパネル */}
              <div className="flex flex-col gap-4" data-track-id={`unit-${unit.id}-sidepanel`}>
                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">進捗状態</h3>
                  <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${isCompleted ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"}`} data-track-id={`unit-${unit.id}-status`}>
                    <span className={`text-lg ${isCompleted ? "text-green-500" : "text-gray-300"}`}>{isCompleted ? "✅" : "⬜"}</span>
                    <span className={`text-sm font-medium ${isCompleted ? "text-green-700" : "text-gray-500"}`}>{isCompleted ? "学習完了" : "未完了"}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">{phaseInfo.subtitle} のユニット</h3>
                  <div className="flex flex-col gap-1.5" data-track-id="unit-phase-list">
                    {phaseUnits.map((u) => (
                      <Link key={u.id} href={`/unit/${u.id}`}
                        className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${u.id === unit.id ? "bg-[#96BF48] text-white font-semibold" : completedUnitIds.includes(u.id) ? "text-green-700 hover:bg-green-50" : "text-gray-600 hover:bg-gray-50"}`}
                        data-track-id={`unit-list-item-${u.id}`}
                      >
                        <span className="text-xs opacity-70">{u.id}</span>
                        <span className="truncate">{u.title}</span>
                        {completedUnitIds.includes(u.id) && u.id !== unit.id && <span className="ml-auto text-green-500 shrink-0">✓</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { UNITS } = await import("@/data/curriculum");
  return UNITS.map((u) => ({ unitId: u.id }));
}
