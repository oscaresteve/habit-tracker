export const Ok = (data) => ({
  ok: true,
  data
})

export const Err = (error) => ({
  ok: false,
  error
})

export const isOk = (result) => result.ok
export const isErr = (result) => !result.ok
