import { NextResponse } from 'next/server'
import { opJson } from '../_openprovider.js'

export async function POST(req) {
  try {
    const { firstName, lastName, email, phoneCode, phoneNumber, address } = await req.json()

    if (!firstName || !lastName || !email || !phoneNumber || !address) {
      return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 })
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (typeof firstName !== 'string' || firstName.length > 64 || typeof lastName !== 'string' || lastName.length > 64) {
      return NextResponse.json({ error: 'Invalid name fields' }, { status: 400 })
    }

    const digits = phoneNumber.replace(/\D/g, '')

    const customerData = {
      name: {
        first_name: firstName,
        last_name: lastName,
        initials: `${firstName[0]}.${lastName[0]}.`.toUpperCase(),
        full_name: `${firstName} ${lastName}`,
      },
      address: {
        street: address.street || '',
        number: address.number || '',
        city: address.city || '',
        zipcode: address.zipcode || '',
        country: address.country || 'US',
        state: address.state || '',
      },
      phone: {
        country_code: phoneCode || '+1',
        area_code: '',
        subscriber_number: digits,
      },
      email,
    }

    const data = await opJson('POST', '/customers', customerData)
    return NextResponse.json({ handle: data.handle }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
