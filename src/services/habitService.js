import { fetchSupabase } from "./supabaseService";
import { Err, isErr, Ok } from "../utils/result";

export async function createHabit({ token, habit }) {
  const result = await fetchSupabase({
    endpoint: "/rest/v1/habits",
    method: "POST",
    headers: { Prefer: "return=representation" },
    token,
    body: habit,
  });

  if (isErr(result)) {
    const { error_code = null, msg = null } = result.error ?? {};

    return Err({
      error_code,
      msg,
    });
  }

  return Ok(result);
}

export async function readHabit() {}

export async function updateHabit() {}

export async function deleteHabit() {}
