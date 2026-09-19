"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCompletedUnitIds(): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_progress")
    .select("unit_id")
    .eq("user_id", user.id)
    .eq("status", "completed");

  if (error) return [];
  return (data ?? []).map((r: { unit_id: string }) => r.unit_id);
}

export async function markUnitCompleted(
  unitId: string,
  quizScore: number
): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // 既存レコードを確認：最高スコアと最初の完了日時を保持する
  const { data: existing } = await supabase
    .from("user_progress")
    .select("quiz_score, completed_at")
    .eq("user_id", user.id)
    .eq("unit_id", unitId)
    .maybeSingle();

  const bestScore = Math.max(quizScore, existing?.quiz_score ?? 0);
  const completedAt = existing?.completed_at ?? new Date().toISOString();

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      unit_id: unitId,
      status: "completed",
      quiz_score: bestScore,
      completed_at: completedAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,unit_id" }
  );

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/unit/${unitId}`);
  return { success: true };
}
