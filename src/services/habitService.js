import { fetchSupabase } from "./supabaseService";

export async function createHabit({ token, habit }) {
  const result = await fetchSupabase({
    endpoint: "/rest/v1/habits",
    method: "POST",
    headers: { Prefer: "return=representation" },
    token,
    body: habit,
  });

  return result;
}

export async function readHabit() {}

export async function updateHabit() {}

export async function deleteHabit() {}
