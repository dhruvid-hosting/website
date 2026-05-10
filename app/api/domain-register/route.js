import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { opJson } from '../_openprovider.js'

// Derive a valid WHM username from a domain SLD:
// lowercase, alphanumeric only, starts with a letter, max 16 chars.
function toWhmUsername(domainName) {
  const cleaned = domainName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const safe = /^[a-z]/.test(cleaned) ? cleaned : 'u' + cleaned
  return safe.slice(0, 16)
}

async function createWhmAccount(domain) {
  const token = process.env.WHM_API_TOKEN
  const host  = process.env.WHM_HOST

  if (!token || !host) {
    console.warn('[WHM] WHM_API_TOKEN or WHM_HOST not set — skipping cPanel account creation')
    return
  }

  const username = toWhmUsername(domain.split('.')[0])
  // Random password — not returned to the client. Reset from WHM if needed.
  const password = randomBytes(16).toString('hex')

  const params = new URLSearchParams({ username, domain, password })

  const res = await fetch(
    `https://${host}:2087/json-api/createacct?api.version=1`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }
  )

  const json = await res.json()

  if (json?.metadata?.result !== 1) {
    throw new Error(json?.metadata?.reason ?? 'WHM createacct returned a failure')
  }
}

export async function POST(req) {
  try {
    const {
      domainName,
      extension,
      ownerHandle,
      period = 1,
      customNameservers,
      autoRenew = true,
      isPremium = false,
    } = await req.json()

    const ALLOWED_EXTENSIONS = new Set(['com', 'in', 'co.in', 'net', 'org', 'io', 'store', 'online'])

    if (!domainName || typeof domainName !== 'string' || !/^[a-z0-9-]{1,63}$/i.test(domainName)) {
      return NextResponse.json({ error: 'Invalid domain name' }, { status: 400 })
    }
    if (!extension || !ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json({ error: 'Invalid extension' }, { status: 400 })
    }
    if (!ownerHandle || typeof ownerHandle !== 'string' || !/^[A-Z0-9-]+$/i.test(ownerHandle)) {
      return NextResponse.json({ error: 'Invalid owner handle' }, { status: 400 })
    }
    if (typeof period !== 'number' || period < 1 || period > 10) {
      return NextResponse.json({ error: 'Invalid period' }, { status: 400 })
    }

    const registrationData = {
      domain: { name: domainName.toLowerCase(), extension },
      owner_handle: ownerHandle,
      admin_handle: ownerHandle,
      tech_handle: ownerHandle,
      period,
      autorenew: autoRenew ? 'on' : 'off',
      ...(customNameservers?.length > 0
        ? { name_servers: customNameservers.map((ns) => ({ name: ns })) }
        : { ns_group: 'Dhruvid' }),
      ...(isPremium ? { accept_premium_fee: true } : {}),
    }

    const data = await opJson('POST', '/domains', registrationData, process.env)

    const fullDomain = `${domainName.toLowerCase()}.${extension}`

    // Fire-and-forget: WHM failure must not fail the registration response.
    createWhmAccount(fullDomain).catch((err) =>
      console.error(`[WHM] Failed to create cPanel account for ${fullDomain}:`, err.message)
    )

    return NextResponse.json({
      id: data.id,
      status: data.status, // "ACT" = active immediately, "REQ" = pending
      domain: fullDomain,
      expirationDate: data.expiration_date,
      renewalDate: data.renewal_date,
    }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
