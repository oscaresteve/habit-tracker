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

  const {
    access_token = null,
    user: { id = null, email: userEmail = null } = {},
  } = result.data ?? {};

  return Ok({
    access_token,
    id,
    email: userEmail,
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
