import { NextResponse } from 'next/server'
import { opJson } from '../_openprovider.js'

export async function GET(req) {
  const tld = new URL(req.url).searchParams.get('tld')
  if (!tld) return NextResponse.json({ error: 'tld query param required' }, { status: 400 })

  try {
    // Returns the extra fields required for this TLD (empty array = no extras needed)
    const data = await opJson(
      'GET',
      `/domains/additional-data/customers?domain.extension=${encodeURIComponent(tld)}`,
      undefined,
      process.env
    )
    return NextResponse.json({ fields: data ?? [] }, { status: 200 })
  } catch (err) {
    // If endpoint returns an error, assume no extra fields required
    return NextResponse.json({ fields: [] }, { status: 200 })
  }
}
