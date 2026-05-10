import { getToken, clearToken } from '../../lib/openprovider.js'

const BASE = 'https://api.openprovider.eu/v1beta'

async function doRequest(method, path, body, token) {
  return fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

// Raw fetch with auto-retry on 401 (forces a fresh login on token expiry)
export async function opFetch(method, path, body) {
  const token = await getToken()
  let res = await doRequest(method, path, body, token)

  if (res.status === 401) {
    clearToken()
    const fresh = await getToken()
    res = await doRequest(method, path, body, fresh)
  }

  return res
}

// Fetch + parse JSON + throw on non-zero OpenProvider code → returns data.data
export async function opJson(method, path, body) {
  const res = await opFetch(method, path, body)
  const json = await res.json()
  if (json.code !== 0) throw new Error(json.desc || `OpenProvider error (code ${json.code})`)
  return json.data
}
