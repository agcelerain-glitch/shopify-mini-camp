export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50" aria-busy="true" aria-live="polite">
      <span className="sr-only">クイズを読み込み中…</span>
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* パンくず骨格 */}
        <div className="skeleton mb-6 h-4 w-48 rounded" />

        {/* クイズカード骨格 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="skeleton h-6 w-16 rounded-lg" />
            <div className="skeleton h-4 w-28 rounded" />
          </div>

          {/* 進捗ドット骨格 */}
          <div className="mb-6 flex items-center gap-3">
            <div className="skeleton h-4 w-16 rounded" />
            <div className="skeleton h-5 w-16 rounded-full" />
          </div>

          {/* 問題文骨格 */}
          <div className="mb-8 space-y-2">
            <div className="skeleton h-5 w-full rounded" />
            <div className="skeleton h-5 w-3/4 rounded" />
          </div>

          {/* 選択肢骨格 */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-14 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
