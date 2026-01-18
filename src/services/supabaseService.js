import { Ok, Err } from "../utils/result";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function fetchSupabase({
  endpoint = "",
  method = "GET",
  body,
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

  //Comprobar que hay body y que no esta vacio
  const hasBody =
    body !== undefined &&
    body !== null &&
    (typeof body !== "object" || Object.keys(body).length > 0);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...authHeader,
        ...headers,
      },
      body: hasBody ? JSON.stringify(body) : undefined,
    });

    //Para saber si se puede procesar la respuesta como json
    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await response.json()
      : null;

    //Se devuelve una respuesta generica, esta funcion no debe saber sobre los datos
    if (!response.ok) {
      const msg = data?.message ?? data?.msg ?? "Error en la petición";
      const code = data?.code ?? null;

      return Err({ msg, code });
    }

    return Ok({ data });
  } catch (error) {
    const msg = error.message ?? "Error de red";
    const code = error.error_code ?? null;
    return Err({ msg, code });
  }
}
