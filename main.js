import { generateKey } from './keyGenerator.js'
import { encryptText, decryptText } from './cryptoEngine.js'

const encryptBtn = document.getElementById('generate')
const decryptBtn = document.getElementById('decrypt')

encryptBtn.addEventListener('click', async () => {
  const inputText = document.getElementById('inputText').value
  if (!inputText.trim()) return alert('Type smth to encrypt')

  document.getElementById('output').textContent = 'Generating key and cipher...'

  const hashHex = await generateKey()
  const { cipher, iv } = await encryptText(inputText, hashHex)

  document.getElementById('output').textContent =
    `Key (SHA-256): ${hashHex}\n\n IV: ${iv}\n\n Cipher: ${cipher}`
})

decryptBtn.addEventListener('click', async () => {
  const hashHex = document.getElementById('keyInput').value.trim()
  const ivHex = document.getElementById('ivInput').value.trim()
  const cipherHex = document.getElementById('cipherInput').value.trim()

  if (!hashHex || !ivHex || !cipherHex) return alert('Fill in all fields')

  const decrypted = await decryptText(cipherHex, hashHex, ivHex)
  document.getElementById('decryptedOutput').textContent = decrypted
})
