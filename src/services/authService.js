import { fetchSupabase } from "./supabaseService";
import { Ok, Err } from "../utils/result";
import { isErr } from "../utils/result";

export async function login({ email, password }) {
  const result = await fetchSupabase({
    endpoint: "/auth/v1/token?grant_type=password",
    method: "POST",
    body: { email, password },
  });

  console.log("result -> ", result);

  //Object destructuring con defaults, se extraen solo los datos necesarios y si no existen se devuelve null

  if (isErr(result)) {
    const { error_code = null, msg = null } = result.error ?? {};

    return Err({
      error_code,
      msg,
    });
  }

  //Si el login es exitoso se guarda la sesion, y se devuelven los datos

  const {
    access_token = null,
    expires_at = null,
    expires_in = null,
    refresh_token = null,
    user: { id = null, email: userEmail = null } = {},
  } = result.data ?? {};

  saveSession({
    access_token,
    expires_at,
    expires_in,
    refresh_token,
    user: {
      id,
      email: userEmail,
    },
  });

  //El estado lo deben modificar las vistas

  return Ok({
    access_token,
    expires_at,
    expires_in,
    refresh_token,
    user: {
      id,
      email: userEmail,
    },
  });
}

export async function signup({ email, password }) {
  const result = await fetchSupabase({
    endpoint: "/auth/v1/signup",
    method: "POST",
    body: { email, password },
  });

  console.log("result -> ", result);

  if (isErr(result)) {
    const { error_code = null, msg = null } = result.error ?? {};

    return Err({
      error_code,
      msg,
    });
  }

  //Signup no maneja si el usuario ha confirmado el email o no
  //Solo maneja si el usuario esta registrado o no

  const { id = null, email: userEmail = null } = result.data ?? {};

  return Ok({
    id,
    email: userEmail,
  });
}

export function saveSession(session) {

  //Convertir de segundos a milisegundos, formato entendible por JS
  
  const expires_at = session.expires_at * 1000;

  localStorage.setItem(
    "user_session",
    JSON.stringify({
      ...session,
      expires_at,
    })
  );
  console.log("Sesion saved -> ", {
    ...session,
    expires_at,
  });
}

//Si hay session la devuelve parseada, y si no devuelve null

function getStoredSession() {
  const raw = localStorage.getItem("user_session");
  return raw ? JSON.parse(raw) : null;
}

//Recoge la sesion de localStorage y comprueba que

export async function restoreSession() {
  const session = getStoredSession();

  console.log("Stored session -> ", session);
  
  if (!session) return null;

  //Si la sesion esta expirada se refresca la sesion

  if (Date.now() > session.expires_at) {

    console.log("Sesion expirada, refrescando sesion");
    
    return await refreshSession(session);
  }

  return session;
}

export async function refreshSession(session) {
  const result = await fetchSupabase({
    endpoint: "/auth/v1/token?grant_type=refresh_token",
    method: "POST",
    body: {
      refresh_token: session.refresh_token,
    },
  });

  if (isErr(result)) {
    localStorage.removeItem("user_session");
    return null;
  }

  //Se guarda y se devuelve la sesion normalizada

  saveSession(result.data);
  return getStoredSession();
}
