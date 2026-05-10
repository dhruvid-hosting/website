const BASE = 'https://api.openprovider.eu/v1beta'

// OpenProvider login tokens live 12 hours — cache for 11 to stay safely inside that window.
const TOKEN_TTL_MS = 11 * 60 * 60 * 1000

// Module-level cache — persists across requests within a warm serverless instance.
// On a cold start the cache is empty and a fresh login is performed automatically.
let _token = null
let _tokenExpiry = 0

export function clearToken() {
  _token = null
  _tokenExpiry = 0
}

export async function getToken() {
  if (_token && Date.now() < _tokenExpiry) return _token

  const username = process.env.OP_USERNAME
  const password = process.env.OP_PASSWORD

  if (!username || !password) {
    throw new Error('OP_USERNAME and OP_PASSWORD must be set in environment variables')
  }

  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json()
  if (data.code !== 0) throw new Error(`OpenProvider login failed: ${data.desc}`)

  _token = data.data.token
  _tokenExpiry = Date.now() + TOKEN_TTL_MS
  return _token
}
