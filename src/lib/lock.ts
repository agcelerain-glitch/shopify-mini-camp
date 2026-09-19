import { UNITS } from "@/data/curriculum";
import type { Phase } from "@/data/curriculum";

/**
 * Unit N is locked when unit N-1 (globally ordered in UNITS array) is not completed.
 * P0-01 (index 0) is always unlocked.
 */
export function isUnitLocked(unitId: string, completedUnitIds: string[]): boolean {
  const index = UNITS.findIndex((u) => u.id === unitId);
  if (index <= 0) return false;
  return !completedUnitIds.includes(UNITS[index - 1].id);
}

/**
 * Phase N is unlocked when its first unit is accessible (not locked).
 * Phase 0 is always unlocked.
 */
export function isPhaseUnlocked(phase: Phase, completedUnitIds: string[]): boolean {
  if (phase === 0) return true;
  const firstUnit = UNITS.find((u) => u.phase === phase);
  if (!firstUnit) return true;
  return !isUnitLocked(firstUnit.id, completedUnitIds);
}
