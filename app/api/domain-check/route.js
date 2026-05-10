import { NextResponse } from 'next/server'
import { opJson } from '../_openprovider.js'

const ALLOWED_TLDS = new Set(['com', 'in', 'co.in', 'net', 'org', 'io', 'store', 'online'])
const DEFAULT_TLDS = [...ALLOWED_TLDS]

export async function POST(req) {
  try {
    const body = await req.json()
    const name = typeof body?.name === 'string' ? body.name : ''
    const requestedTlds = Array.isArray(body?.tlds) ? body.tlds : DEFAULT_TLDS

    if (!name || !/^[a-z0-9-]{1,63}$/i.test(name)) {
      return NextResponse.json({ error: 'Invalid domain name' }, { status: 400 })
    }

    const tlds = requestedTlds.filter((t) => typeof t === 'string' && ALLOWED_TLDS.has(t))
    if (tlds.length === 0) {
      return NextResponse.json({ error: 'No valid TLDs requested' }, { status: 400 })
    }

    const domains = tlds.map((ext) => ({ name: name.toLowerCase(), extension: ext }))
    const data = await opJson('POST', '/domains/check', { domains, with_price: true })

    const results = (data.results ?? []).map((r) => {
      const domainStr = typeof r.domain === 'string' ? r.domain : ''
      const dotIdx = domainStr.indexOf('.')
      const tld = dotIdx >= 0 ? domainStr.slice(dotIdx + 1) : ''
      return {
        tld,
        available: r.status === 'free',
        premium: r.premium ?? false,
        isPremium: r.is_premium ?? false,
        resellerPrice: r.price?.reseller?.price ?? null,
        currency: r.price?.reseller?.currency ?? 'INR',
      }
    })

    return NextResponse.json({ results }, { status: 200 })
  } catch (err) {
    console.error('[domain-check] ERROR:', err?.message)
    return NextResponse.json({ error: 'Domain check failed' }, { status: 502 })
  }
}
