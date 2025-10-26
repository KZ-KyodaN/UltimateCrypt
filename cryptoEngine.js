export async function encryptText(text, hashHex) {
  const encoder = new TextEncoder()
  const keyBytes = new Uint8Array(hashHex.match(/.{1,2}/g).map(b => parseInt(b, 16)))

  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt'])
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoded = encoder.encode(text)

  const cipherBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded)

  const cipherHex = Array.from(new Uint8Array(cipherBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
  const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('')

  return { cipher: cipherHex, iv: ivHex }
}

export async function decryptText(cipherHex, hashHex, ivHex) {
  const decoder = new TextDecoder()
  const cipherBytes = new Uint8Array(cipherHex.match(/.{1,2}/g).map(b => parseInt(b, 16)))
  const keyBytes = new Uint8Array(hashHex.match(/.{1,2}/g).map(b => parseInt(b, 16)))
  const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(b => parseInt(b, 16)))

  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt'])

  try {
    const decryptedBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipherBytes)
    return decoder.decode(decryptedBuffer)
  } catch (e) {
    console.error('Error:', e)
    return 'Invalid Key Or IV'
  }
}
