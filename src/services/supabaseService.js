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

    console.log("response ->", response);

    //Para saber si se puede procesar la respuesta como json
    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await response.json()
      : null;

    console.log("data -> ", data);

    if (!response.ok) {
      /* data ->
        code: 400
        error_code: "invalid_credentials"
        msg: "Invalid login credentials
      */
      return null;
    }
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
