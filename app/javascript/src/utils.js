export function rgbFromStringHash(str) {
  return new Promise(async (resolve) => {
    // We transform the string into an arraybuffer.
    const buffer = new TextEncoder('utf-8').encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buffer)
    const arr = new Uint8Array(hash)

    resolve(
      `rgb(${ arr[0] }, ${ arr[1] }, ${ arr[2] })`
    )
  })
}
