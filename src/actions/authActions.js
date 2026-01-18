import {
  loginRequest,
  signupRequest,
  refreshTokenRequest,
} from "../services/authService";
import { Ok, Err, isErr } from "../utils/result";

export async function login({ email, password }) {
  const result = await loginRequest({ email, password });

  if (isErr(result)) {
    // Traduce el error a un mensaje entendible
    const msg = "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
    const code = "AUTH_LOGIN_FAILED";
    return Err({ code, msg });
  }

  //Si el login es exitoso se guarda la sesion, y se devuelven los datos
  //Object destructuring con defaults, se extraen solo los datos necesarios y si no existen se devuelve null

  const {
    access_token = null,
    expires_at = null,
    expires_in = null,
    refresh_token = null,
    user: { id = null, email: userEmail = null } = {},
  } = result.data ?? {};

  const session = {
    access_token,
    expires_at,
    expires_in,
    refresh_token,
    user: {
      id,
      email: userEmail,
    },
  };

  saveSession(session);

  //El estado lo deben modificar las vistas
  //Se devuelve un resultado entendible

  return Ok({ data: session, msg: "Sesión iniciada correctamente" });
}

export function logout() {
  localStorage.removeItem("user_session");
  return Ok({ msg: "Sesión cerrada correctamente" });
}

export async function signup({ email, password }) {
  const result = await signupRequest({ email, password });

  if (isErr(result)) {
    const msg = "Error al registrarse. Por favor, inténtalo de nuevo.";
    const code = "AUTH_SIGNUP_FAILED";
    return Err({ code, msg });
  }

  //Signup no maneja si el usuario ha confirmado el email o no
  //Solo maneja si el usuario esta registrado o no

  const { id = null, email: userEmail = null } = result.data ?? {};

  return Ok({
    data: {
      id,
      email: userEmail,
    },
    msg: "Usuario registrado correctamente",
  });
}

//Recoge la sesion de localStorage y comprueba que no este expirada, si lo necesita la refresca

export async function restoreSession() {
  const session = getStoredSession();

  if (!session) {
    const msg = "Error al restaurar la sesión";
    const code = "RESTORE_SESSION_FAILED";
    return Err({ msg, code });
  }

  //Si la sesion esta expirada se refresca la sesion

  if (Date.now() > session.expires_at) {
    return await refreshSession({ session });
  }

  return Ok({ data: session, msg: "Sesión restaurada correctamente" });
}

export async function refreshSession({ session }) {
  const result = await refreshTokenRequest({
    refresh_token: session.refresh_token,
  });

  if (isErr(result)) {
    localStorage.removeItem("user_session");
    const msg = "Error al refrescar el access token";
    const code = "REFRESH_TOKEN_FAILED";
    return Err({ msg, code });
  }

  //Se guarda y se devuelve la sesion normalizada

  saveSession(result.data);

  return getStoredSession();
}

function saveSession(session) {
  //Convertir de segundos a milisegundos, formato entendible por JS

  const expires_at = session.expires_at * 1000;

  localStorage.setItem(
    "user_session",
    JSON.stringify({
      ...session,
      expires_at,
    }),
  );
}

//Si hay session la devuelve parseada, y si no devuelve null

function getStoredSession() {
  const raw = localStorage.getItem("user_session");
  return raw ? JSON.parse(raw) : null;
}
