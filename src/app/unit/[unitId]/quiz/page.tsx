import { notFound, redirect } from "next/navigation";
import { UNITS } from "@/data/curriculum";
import { getCompletedUnitIds } from "@/lib/actions/progress";
import { isUnitLocked } from "@/lib/lock";
import { QuizClient } from "./QuizClient";

interface Props {
  params: Promise<{ unitId: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { unitId } = await params;
  const unit = UNITS.find((u) => u.id === unitId);
  if (!unit) notFound();

  const completedUnitIds = await getCompletedUnitIds();
  if (isUnitLocked(unitId, completedUnitIds)) {
    redirect(`/phase/${unit.phase}`);
  }

  return <QuizClient unitId={unitId} />;
}
