"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHASES, UNITS } from "@/data/curriculum";
import type { Phase } from "@/data/curriculum";
import { isPhaseUnlocked } from "@/lib/lock";

interface Props {
  completedIds?: string[];
}

export function Sidebar({ completedIds = [] }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col gap-1" data-track-id="sidebar">
      <p className="mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        カリキュラム
      </p>
      {PHASES.map(({ phase, subtitle, bgColor, textColor, color }) => {
        const units = UNITS.filter((u) => u.phase === phase);
        const completed = units.filter((u) => completedIds.includes(u.id)).length;
        const isActive = pathname === `/phase/${phase}`;
        const unlocked = isPhaseUnlocked(phase as Phase, completedIds);

        if (!unlocked) {
          return (
            <div
              key={phase}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 border border-transparent cursor-not-allowed opacity-50"
              data-track-id={`sidebar-phase-${phase}`}
              aria-disabled="true"
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${bgColor} ${textColor} shrink-0`}>
                {phase}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 truncate">{subtitle}</span>
                  <span className="text-gray-300 text-xs shrink-0 ml-1">🔒</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100" />
              </div>
            </div>
          );
        }

        return (
          <Link
            key={phase}
            href={`/phase/${phase}`}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
              isActive
                ? "bg-[#F4F9EE] border border-[#96BF48]"
                : "hover:bg-gray-50 border border-transparent"
            }`}
            data-track-id={`sidebar-phase-${phase}`}
            data-track-phase={phase}
          >
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${bgColor} ${textColor} shrink-0`}>
              {phase}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700 truncate">{subtitle}</span>
                <span className="text-xs text-gray-400 shrink-0 ml-1">{completed}/{units.length}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round((completed / units.length) * 100)}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          </Link>
        );
      })}

      <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
        <p className="text-xs text-gray-500 font-medium">全体進捗</p>
        <p className="text-lg font-black text-[#96BF48]">
          {completedIds.length}
          <span className="text-sm font-normal text-gray-400"> / {UNITS.length}</span>
        </p>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#96BF48]"
            style={{ width: `${Math.round((completedIds.length / UNITS.length) * 100)}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
