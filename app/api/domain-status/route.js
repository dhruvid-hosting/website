import { NextResponse } from 'next/server'
import { opJson } from '../_openprovider.js'

export async function GET(req) {
  const id = new URL(req.url).searchParams.get('id')
  if (!id || !/^\d+$/.test(id)) return NextResponse.json({ error: 'id query param required' }, { status: 400 })

  try {
    const data = await opJson('GET', `/domains/${id}`, undefined, process.env)
    return NextResponse.json({
      status: data.status,
      domain: `${data.domain?.name}.${data.domain?.extension}`,
      expirationDate: data.expiration_date,
      renewalDate: data.renewal_date,
    }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
