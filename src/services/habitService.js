import { fetchSupabase } from "./supabaseService";

//Cada usuario solo puede hacer modificaciones en sus habitos de tal forma que al hacer un select all, solo recibira los suyos.
//Tambien para los updates y deletes.

//Crea un habito del usuario autenticado y devuelve la representacion si es exitoso.
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

//Devuelve todos los habitos del usuario autenticado.
export async function readHabit({ token }) {
  const result = await fetchSupabase({
    endpoint: `/rest/v1/habits?select=*`,
    token,
  });

  return result;
}

//Actualiza un habito del usuario autenticado cuyo id es igual al proporcionado.
//Si no se encuentra el habito devuelve un array vacio, de lo contrario devuelve una representacion de los cambios.
//Se puede modificar cualquier campo del habito.
export async function updateHabit({ token, habitId, habit }) {
  const result = await fetchSupabase({
    endpoint: `/rest/v1/habits?id=eq.${habitId}`,
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    token,
    body: habit,
  });

  return result;
}

//Elimina un habito del usuario autenticado cuyo id es igual al proporcionado.
//Si no se encuentra el habito devuelve un array vacio, de lo contrario devuelve una representacion de los cambios.
export async function deleteHabit({ token, habitId }) {
  const result = await fetchSupabase({
    endpoint: `/rest/v1/habits?id=eq.${habitId}`,
    method: "DELETE",
    headers: { Prefer: "return=representation" },
    token,
  });

  return result;
}
