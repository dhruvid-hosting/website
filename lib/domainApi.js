import { DEFAULT_TLDS, getRetailPrice } from './domainPricing'

// Strips accidental TLD: "mysite.com" → "mysite", "mysite.co.in" → "mysite"
export function stripTld(input) {
  return input.trim().toLowerCase().replace(/\.[a-z.]+$/, '')
}

async function apiFetch(path, options) {
  const res = await fetch(path, options)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Request to ${path} failed`)
  }
  return res.json()
}

// ── Domain availability check ─────────────────────────────────────────────────
export async function checkDomains(rawName) {
  const name = stripTld(rawName)
  if (!name) throw new Error('Please enter a valid domain name')

  const json = await apiFetch('/api/domain-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, tlds: DEFAULT_TLDS }),
  })

  return json.results.map((r) => ({
    tld: r.tld,
    domain: `${name}.${r.tld}`,
    available: r.available,
    premium: r.premium,
    isPremium: r.isPremium,
    resellerPrice: r.resellerPrice,
    retail: getRetailPrice(r.tld, r.resellerPrice),
  }))
}

// ── TLD additional data (extra required fields) ───────────────────────────────
export async function getAdditionalData(tld) {
  const json = await apiFetch(`/api/domain-additional-data?tld=${encodeURIComponent(tld)}`)
  return json.fields ?? []
}

// ── Create customer handle ────────────────────────────────────────────────────
export async function createCustomer(contactData) {
  return apiFetch('/api/customer-create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  })
  // Returns { handle: "CV904716-NL" }
}

// ── Register domain ───────────────────────────────────────────────────────────
export async function registerDomain(data) {
  return apiFetch('/api/domain-register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  // Returns { id, status ("ACT"|"REQ"), domain, expirationDate, renewalDate }
}
