import { Ok, Err } from "../utils/result";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function fetchSupabase({
  endpoint = "",
  method = "GET",
  body = {},
  headers = {},
  token,
}) {
  const url = `${SUPABASE_URL}${endpoint}`;

  const defaultHeaders = {
    apikey: SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
  };

  //Como hay rls siempre que haga falta Bearer se usara el token, si no no
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...authHeader,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    //Para saber si se puede procesar la respuesta como json
    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await response.json()
      : null;

    //Se devuelve una respuesta generica, esta funcion no debe saber sobre los datos
    if (!response.ok) {
      return Err(data);
    }
    return Ok(data);
  } catch (error) {
    return Err(error);
  }
}
