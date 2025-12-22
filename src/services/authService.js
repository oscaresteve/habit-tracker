import { fetchSupabase } from "./supabaseService";

export async function login({ email, password }) {
  await fetchSupabase({
    endpoint: "/auth/v1/token?grant_type=password",
    method: "POST",
    body: { email, password },  
  });
}

export async function signup({ email, password }) {
  await fetchSupabase({
    endpoint: "/auth/v1/signup",
    method: "POST",
    body: { email, password },
  })
}
