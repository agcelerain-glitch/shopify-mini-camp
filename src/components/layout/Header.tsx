"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Props {
  currentPhase?: number;
}

export function Header({ currentPhase }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  // ユーザー情報取得 & 認証状態変化を監視
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  // メニュー外クリックで閉じる
  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    setMenuOpen(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const displayName =
    (user?.user_metadata?.full_name as string) ||
    user?.email?.split("@")[0] ||
    "ユーザー";
  const email = user?.email ?? "";
  const initial = displayName.charAt(0).toUpperCase();

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
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-shopify">
            <span className="text-shopify-ink font-black text-sm">S</span>
          </div>
          <span className="hidden sm:inline font-bold text-gray-900 group-hover:text-shopify-dark transition-colors">
            Shopify e-Learning
          </span>
        </Link>

        {/* フェーズナビゲーション */}
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto" data-track-id="header-nav">
          {[0, 1, 2, 3, 4, 5].map((phase) => (
            <Link
              key={phase}
              href={`/phase/${phase}`}
              className={`shrink-0 rounded-lg px-2.5 sm:px-3 py-1.5 text-sm font-medium transition-colors ${
                currentPhase === phase
                  ? "bg-shopify text-shopify-ink font-bold"
                  : "text-gray-600 hover:bg-shopify-pale hover:text-shopify-dark"
              }`}
              data-track-id={`header-nav-phase-${phase}`}
            >
              P{phase}
            </Link>
          ))}
        </nav>

        {/* ユーザーエリア */}
        <div
          className="relative flex items-center gap-3"
          ref={menuRef}
          data-track-id="header-user"
        >
          <Link
            href="/dashboard"
            className="hidden md:block text-sm text-gray-600 hover:text-shopify-dark transition-colors"
            data-track-id="header-dashboard-link"
          >
            ダッシュボード
          </Link>

          {/* アバターボタン */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden transition-all ring-2 ring-offset-1 ${
              menuOpen ? "ring-shopify" : "ring-transparent hover:ring-shopify/50"
            }`}
            aria-label="ユーザーメニューを開く"
            aria-expanded={menuOpen}
            data-track-id="header-user-avatar"
          >
            {avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-8 w-8 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-shopify text-shopify-ink text-sm font-bold">
                {initial}
              </span>
            )}
          </button>

          {/* ドロップダウンメニュー */}
          {menuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-gray-100 bg-white shadow-2xl z-50 overflow-hidden"
              data-track-id="header-user-menu"
            >
              {/* ユーザー情報 */}
              <div className="flex items-center gap-3 px-4 py-4 bg-shopify-pale">
                <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
                  {avatarUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-shopify text-shopify-ink text-sm font-bold">
                      {initial}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{displayName}</p>
                  <p className="text-xs text-gray-500 truncate">{email}</p>
                </div>
              </div>

              {/* 設定メニュー */}
              <div className="py-1.5">
                <p className="px-4 py-1 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                  設定
                </p>
                {isDashboard ? (
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400"
                    data-track-id="menu-dashboard-current"
                  >
                    <span className="text-base">📊</span>
                    <span className="flex-1">学習ダッシュボード</span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-shopify-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-shopify" />
                      現在のページ
                    </span>
                  </div>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    data-track-id="menu-dashboard"
                  >
                    <span className="text-base">📊</span>
                    <span>学習ダッシュボード</span>
                  </Link>
                )}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  data-track-id="menu-profile"
                  disabled
                  title="近日公開予定"
                >
                  <span className="text-base">👤</span>
                  <span className="flex-1">プロフィール編集</span>
                  <span className="text-[10px] text-gray-300 font-medium">準備中</span>
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  data-track-id="menu-notifications"
                  disabled
                  title="近日公開予定"
                >
                  <span className="text-base">🔔</span>
                  <span className="flex-1">通知設定</span>
                  <span className="text-[10px] text-gray-300 font-medium">準備中</span>
                </button>
              </div>

              {/* ログアウト */}
              <div className="border-t border-gray-100 py-1.5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  data-track-id="menu-logout"
                >
                  <span className="text-base">🚪</span>
                  <span>ログアウト</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
