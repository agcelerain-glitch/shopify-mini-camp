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

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      unit_id: unitId,
      status: "completed",
      quiz_score: quizScore,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,unit_id" }
  );

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/unit/${unitId}`);
  return { success: true };
}
