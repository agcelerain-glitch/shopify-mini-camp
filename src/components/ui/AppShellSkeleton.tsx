import { Header } from "@/components/layout/Header";

/**
 * Header + Sidebar + main の骨格スケルトン。
 * データ取得を伴うページの loading.tsx で使い、遷移時の「固まった感」を解消する。
 * Header は実物を描画（即表示され自然）、Sidebar と main は shimmer スケルトン。
 */
export function AppShellSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50" aria-busy="true" aria-live="polite">
      <span className="sr-only">読み込み中…</span>
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-8">
          {/* サイドバー骨格 */}
          <aside className="hidden w-56 shrink-0 flex-col gap-2 lg:flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                <div className="skeleton h-7 w-7 shrink-0 rounded-lg" />
                <div className="flex-1">
                  <div className="skeleton h-3 w-24 rounded" />
                  <div className="skeleton mt-2 h-1 w-full rounded-full" />
                </div>
              </div>
            ))}
          </aside>

          {/* メイン骨格 */}
          <main className="flex-1 min-w-0">
            {/* ヒーローバナー骨格 */}
            <div className="skeleton mb-6 h-36 w-full rounded-2xl" />

            {/* 見出し骨格 */}
            <div className="skeleton mb-3 h-4 w-28 rounded" />

            {/* カードグリッド骨格 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="skeleton h-5 w-20 rounded-lg" />
                    <div className="skeleton h-7 w-12 rounded" />
                  </div>
                  <div className="skeleton mt-3 h-2.5 w-full rounded-full" />
                  <div className="skeleton mt-3 h-3 w-32 rounded" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
