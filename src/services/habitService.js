import { fetchSupabase } from "./supabaseService";

//Cada usuario solo podra hacer modificaciones en sus habitos de tal forma que al hacer un select all, solo recibira los suyos
//Tambien para los updates y deletes

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

export async function readHabit({ token }) {
  const result = await fetchSupabase({
    endpoint: `/rest/v1/habits?select=*`,
    token,
  });

  return result;
}

export async function updateHabit() {}

export async function deleteHabit() {}
