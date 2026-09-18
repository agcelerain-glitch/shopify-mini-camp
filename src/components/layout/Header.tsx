"use client";
import Link from "next/link";

interface Props {
  currentPhase?: number;
}

export function Header({ currentPhase }: Props) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm"
      data-track-id="global-header"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* ロゴ */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group"
          data-track-id="header-logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#96BF48]">
            <span className="text-white font-black text-sm">S</span>
          </div>
          <span className="font-bold text-gray-900 group-hover:text-[#96BF48] transition-colors">
            Shopify e-Learning
          </span>
        </Link>

        {/* ナビゲーション */}
        <nav className="hidden md:flex items-center gap-1" data-track-id="header-nav">
          {[0, 1, 2, 3, 4, 5].map((phase) => (
            <Link
              key={phase}
              href={`/phase/${phase}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                currentPhase === phase
                  ? "bg-[#96BF48] text-white"
                  : "text-gray-600 hover:bg-[#F4F9EE] hover:text-[#6B8E35]"
              }`}
              data-track-id={`header-nav-phase-${phase}`}
              data-track-phase={phase}
            >
              P{phase}
            </Link>
          ))}
        </nav>

        {/* ユーザーエリア（mock） */}
        <div className="flex items-center gap-3" data-track-id="header-user">
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 hover:text-[#96BF48] transition-colors"
            data-track-id="header-dashboard-link"
          >
            ダッシュボード
          </Link>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#96BF48] text-white text-sm font-bold hover:bg-[#6B8E35] transition-colors"
            data-track-id="header-user-avatar"
            aria-label="ユーザーメニュー"
          >
            U
          </button>
        </div>
      </div>
    </header>
  );
}
