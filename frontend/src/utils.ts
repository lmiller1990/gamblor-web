const snakeCase = require('lodash/snakeCase')

export const rgbFromStringHash = (str: string) => {
  return new Promise(async (resolve) => {
    // We transform the string into an arraybuffer.
    const buffer = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buffer)
    const arr = new Uint8Array(hash)

    resolve(`rgb(${ arr[0] }, ${ arr[1] }, ${ arr[2] })`)
  })
}

export const keysToSnake = (obj: object) => {
  const snakeCased = {}
  for (const k of Object.keys(obj)) {
    // @ts-ignore
    snakeCased[snakeCase(k)] = obj[k]
  }

  return snakeCased
}
