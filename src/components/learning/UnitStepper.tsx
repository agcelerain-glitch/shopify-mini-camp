import Link from "next/link";
import type { Unit } from "@/data/curriculum";
import { UNITS } from "@/data/curriculum";
import { isUnitLocked } from "@/lib/lock";

interface Props {
  units: Unit[]; // フェーズ内ユニット（表示順）
  completedIds: string[];
}

/**
 * フェーズ内のユニットを横一列のステップで可視化する。
 * 完了 = 緑✓ / 現在 = ライム強調 / 未解放 = グレー🔒。
 */
export function UnitStepper({ units, completedIds }: Props) {
  const currentId = UNITS.find((u) => !completedIds.includes(u.id))?.id;

  return (
    <div
      className="mb-5 overflow-x-auto rounded-2xl border border-gray-100 bg-white px-4 py-3"
      data-track-id="unit-stepper"
    >
      <div className="flex min-w-max items-center">
        {units.map((unit, i) => {
          const completed = completedIds.includes(unit.id);
          const locked = isUnitLocked(unit.id, completedIds);
          const isCurrent = unit.id === currentId;
          const prevCompleted = i > 0 && completedIds.includes(units[i - 1].id);
          const label = `${unit.id} ${unit.title}`;

          const nodeClass =
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform";

          return (
            <div key={unit.id} className="flex items-center">
              {i > 0 && (
                <div
                  className={`h-0.5 w-5 sm:w-7 shrink-0 ${
                    prevCompleted ? "bg-green-400" : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                />
              )}
              {completed ? (
                <Link
                  href={`/unit/${unit.id}`}
                  className={`${nodeClass} bg-green-500 text-white hover:scale-110`}
                  title={label}
                  aria-label={`${label}（完了・復習する）`}
                  data-track-id={`stepper-${unit.id}`}
                >
                  ✓
                </Link>
              ) : isCurrent ? (
                <Link
                  href={`/unit/${unit.id}`}
                  className={`${nodeClass} bg-shopify text-shopify-ink ring-2 ring-shopify/40 ring-offset-2 hover:scale-110`}
                  title={label}
                  aria-label={`${label}（学習中）`}
                  data-track-id={`stepper-${unit.id}`}
                >
                  {i + 1}
                </Link>
              ) : locked ? (
                <div
                  className={`${nodeClass} bg-gray-100 text-gray-300 cursor-not-allowed`}
                  title={`${label}（未解放）`}
                  aria-label={`${label}（未解放）`}
                  data-track-id={`stepper-${unit.id}`}
                >
                  {i + 1}
                </div>
              ) : (
                <Link
                  href={`/unit/${unit.id}`}
                  className={`${nodeClass} border-2 border-gray-200 bg-white text-gray-500 hover:border-shopify hover:scale-110`}
                  title={label}
                  aria-label={label}
                  data-track-id={`stepper-${unit.id}`}
                >
                  {i + 1}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
