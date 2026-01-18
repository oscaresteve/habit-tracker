import { fetchSupabase } from "./supabaseService";

export function loginRequest({ email, password }) {
  return fetchSupabase({
    endpoint: "/auth/v1/token?grant_type=password",
    method: "POST",
    body: { email, password },
  });
}

export function signupRequest({ email, password }) {
  return fetchSupabase({
    endpoint: "/auth/v1/signup",
    method: "POST",
    body: { email, password },
  });
}

export function refreshTokenRequest({ refresh_token }) {
  return fetchSupabase({
    endpoint: "/auth/v1/token?grant_type=refresh_token",
    method: "POST",
    body: { refresh_token },
  });
}
