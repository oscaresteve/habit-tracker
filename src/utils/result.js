export const Ok = ({ data = null, msg = null } = {}) => ({
  ok: true,
  data,
  msg,
});

export const Err = ({ msg = "Error desconocido", code = null } = {}) => ({
  ok: false,
  error: { msg, code },
});

export const isOk = (result) => result.ok;
export const isErr = (result) => !result.ok;
