'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Loader2, ChevronRight, ChevronLeft, Globe } from 'lucide-react'
import { createCustomer, registerDomain, getAdditionalData } from '../lib/domainApi'
import { getRetailPrice, RETAIL_PRICES } from '../lib/domainPricing'
import useBreakpoint from '../hooks/useBreakpoint'
import useCurrency from '../hooks/useCurrency'

const STEPS = ['Confirm', 'Contact', 'Options', 'Review', 'Done']

// Embedded phone dial code so selecting country auto-fills the phone prefix
const COUNTRIES = [
  { code: 'US', label: 'United States',            phone: '+1'   },
  { code: 'GB', label: 'United Kingdom',            phone: '+44'  },
  { code: 'CA', label: 'Canada',                    phone: '+1'   },
  { code: 'AU', label: 'Australia',                 phone: '+61'  },
  { code: 'IN', label: 'India',                     phone: '+91'  },
  { code: 'SG', label: 'Singapore',                 phone: '+65'  },
  { code: 'AE', label: 'United Arab Emirates',      phone: '+971' },
  { code: 'DE', label: 'Germany',                   phone: '+49'  },
  { code: 'FR', label: 'France',                    phone: '+33'  },
  { code: 'NL', label: 'Netherlands',               phone: '+31'  },
  { code: 'NZ', label: 'New Zealand',               phone: '+64'  },
  { code: 'IE', label: 'Ireland',                   phone: '+353' },
  { code: 'AF', label: 'Afghanistan',               phone: '+93'  },
  { code: 'AL', label: 'Albania',                   phone: '+355' },
  { code: 'DZ', label: 'Algeria',                   phone: '+213' },
  { code: 'AR', label: 'Argentina',                 phone: '+54'  },
  { code: 'AM', label: 'Armenia',                   phone: '+374' },
  { code: 'AT', label: 'Austria',                   phone: '+43'  },
  { code: 'AZ', label: 'Azerbaijan',                phone: '+994' },
  { code: 'BH', label: 'Bahrain',                   phone: '+973' },
  { code: 'BD', label: 'Bangladesh',                phone: '+880' },
  { code: 'BY', label: 'Belarus',                   phone: '+375' },
  { code: 'BE', label: 'Belgium',                   phone: '+32'  },
  { code: 'BO', label: 'Bolivia',                   phone: '+591' },
  { code: 'BA', label: 'Bosnia & Herzegovina',      phone: '+387' },
  { code: 'BR', label: 'Brazil',                    phone: '+55'  },
  { code: 'BN', label: 'Brunei',                    phone: '+673' },
  { code: 'BG', label: 'Bulgaria',                  phone: '+359' },
  { code: 'KH', label: 'Cambodia',                  phone: '+855' },
  { code: 'CM', label: 'Cameroon',                  phone: '+237' },
  { code: 'CL', label: 'Chile',                     phone: '+56'  },
  { code: 'CN', label: 'China',                     phone: '+86'  },
  { code: 'CO', label: 'Colombia',                  phone: '+57'  },
  { code: 'HR', label: 'Croatia',                   phone: '+385' },
  { code: 'CY', label: 'Cyprus',                    phone: '+357' },
  { code: 'CZ', label: 'Czech Republic',            phone: '+420' },
  { code: 'DK', label: 'Denmark',                   phone: '+45'  },
  { code: 'EC', label: 'Ecuador',                   phone: '+593' },
  { code: 'EG', label: 'Egypt',                     phone: '+20'  },
  { code: 'ET', label: 'Ethiopia',                  phone: '+251' },
  { code: 'FI', label: 'Finland',                   phone: '+358' },
  { code: 'GE', label: 'Georgia',                   phone: '+995' },
  { code: 'GH', label: 'Ghana',                     phone: '+233' },
  { code: 'GR', label: 'Greece',                    phone: '+30'  },
  { code: 'HK', label: 'Hong Kong',                 phone: '+852' },
  { code: 'HU', label: 'Hungary',                   phone: '+36'  },
  { code: 'ID', label: 'Indonesia',                 phone: '+62'  },
  { code: 'IL', label: 'Israel',                    phone: '+972' },
  { code: 'IT', label: 'Italy',                     phone: '+39'  },
  { code: 'JP', label: 'Japan',                     phone: '+81'  },
  { code: 'JO', label: 'Jordan',                    phone: '+962' },
  { code: 'KZ', label: 'Kazakhstan',                phone: '+7'   },
  { code: 'KE', label: 'Kenya',                     phone: '+254' },
  { code: 'KW', label: 'Kuwait',                    phone: '+965' },
  { code: 'KG', label: 'Kyrgyzstan',               phone: '+996' },
  { code: 'LA', label: 'Laos',                      phone: '+856' },
  { code: 'LB', label: 'Lebanon',                   phone: '+961' },
  { code: 'LK', label: 'Sri Lanka',                 phone: '+94'  },
  { code: 'LT', label: 'Lithuania',                 phone: '+370' },
  { code: 'LU', label: 'Luxembourg',                phone: '+352' },
  { code: 'MO', label: 'Macau',                     phone: '+853' },
  { code: 'MK', label: 'North Macedonia',           phone: '+389' },
  { code: 'MY', label: 'Malaysia',                  phone: '+60'  },
  { code: 'MV', label: 'Maldives',                  phone: '+960' },
  { code: 'MT', label: 'Malta',                     phone: '+356' },
  { code: 'MX', label: 'Mexico',                    phone: '+52'  },
  { code: 'MD', label: 'Moldova',                   phone: '+373' },
  { code: 'MN', label: 'Mongolia',                  phone: '+976' },
  { code: 'MA', label: 'Morocco',                   phone: '+212' },
  { code: 'MZ', label: 'Mozambique',                phone: '+258' },
  { code: 'MM', label: 'Myanmar',                   phone: '+95'  },
  { code: 'NA', label: 'Namibia',                   phone: '+264' },
  { code: 'NP', label: 'Nepal',                     phone: '+977' },
  { code: 'NG', label: 'Nigeria',                   phone: '+234' },
  { code: 'NO', label: 'Norway',                    phone: '+47'  },
  { code: 'OM', label: 'Oman',                      phone: '+968' },
  { code: 'PK', label: 'Pakistan',                  phone: '+92'  },
  { code: 'PA', label: 'Panama',                    phone: '+507' },
  { code: 'PE', label: 'Peru',                      phone: '+51'  },
  { code: 'PH', label: 'Philippines',               phone: '+63'  },
  { code: 'PL', label: 'Poland',                    phone: '+48'  },
  { code: 'PT', label: 'Portugal',                  phone: '+351' },
  { code: 'QA', label: 'Qatar',                     phone: '+974' },
  { code: 'RO', label: 'Romania',                   phone: '+40'  },
  { code: 'RU', label: 'Russia',                    phone: '+7'   },
  { code: 'RW', label: 'Rwanda',                    phone: '+250' },
  { code: 'SA', label: 'Saudi Arabia',              phone: '+966' },
  { code: 'RS', label: 'Serbia',                    phone: '+381' },
  { code: 'SK', label: 'Slovakia',                  phone: '+421' },
  { code: 'SI', label: 'Slovenia',                  phone: '+386' },
  { code: 'ZA', label: 'South Africa',              phone: '+27'  },
  { code: 'KR', label: 'South Korea',               phone: '+82'  },
  { code: 'ES', label: 'Spain',                     phone: '+34'  },
  { code: 'SE', label: 'Sweden',                    phone: '+46'  },
  { code: 'CH', label: 'Switzerland',               phone: '+41'  },
  { code: 'TW', label: 'Taiwan',                    phone: '+886' },
  { code: 'TJ', label: 'Tajikistan',                phone: '+992' },
  { code: 'TZ', label: 'Tanzania',                  phone: '+255' },
  { code: 'TH', label: 'Thailand',                  phone: '+66'  },
  { code: 'TN', label: 'Tunisia',                   phone: '+216' },
  { code: 'TR', label: 'Turkey',                    phone: '+90'  },
  { code: 'TM', label: 'Turkmenistan',              phone: '+993' },
  { code: 'UG', label: 'Uganda',                    phone: '+256' },
  { code: 'UA', label: 'Ukraine',                   phone: '+380' },
  { code: 'UY', label: 'Uruguay',                   phone: '+598' },
  { code: 'UZ', label: 'Uzbekistan',                phone: '+998' },
  { code: 'VE', label: 'Venezuela',                 phone: '+58'  },
  { code: 'VN', label: 'Vietnam',                   phone: '+84'  },
  { code: 'YE', label: 'Yemen',                     phone: '+967' },
  { code: 'ZM', label: 'Zambia',                    phone: '+260' },
  { code: 'ZW', label: 'Zimbabwe',                  phone: '+263' },
]

// Unique dial codes for the phone prefix dropdown (deduplicated, sorted numerically)
const PHONE_CODES = [...new Map(
  COUNTRIES.map(c => [c.phone, { code: c.phone, label: `${c.phone} (${c.label})` }])
).values()].sort((a, b) => {
  const n = (s) => parseInt(s.code.replace('+', ''), 10)
  return n(a) - n(b)
})

// ── Shared input style ────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(201,168,76,0.2)',
  borderRadius: '8px',
  color: '#f0ece0',
  fontSize: '14px',
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  letterSpacing: '1.5px',
  color: '#8a8678',
  marginBottom: '0.4rem',
}

function Field({ label, children, half }) {
  return (
    <div style={{ flex: half ? '1 1 calc(50% - 0.5rem)' : '1 1 100%', minWidth: 0 }}>
      <label style={labelStyle}>{label.toUpperCase()}</label>
      {children}
    </div>
  )
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepBar({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '2.5rem' }}>
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: done ? '#c9a84c' : active ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.05)',
                  border: done ? '2px solid #c9a84c' : active ? '2px solid #c9a84c' : '2px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700,
                  color: done ? '#09111f' : active ? '#c9a84c' : '#4a5568',
                  transition: 'all 0.3s',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: '10px', letterSpacing: '1px', color: active ? '#c9a84c' : '#4a5568', whiteSpace: 'nowrap' }}>
                {label.toUpperCase()}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ width: '3rem', height: 2, background: done ? '#c9a84c' : 'rgba(255,255,255,0.08)', margin: '0 0.25rem', marginBottom: '1.1rem', transition: 'background 0.3s' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Step 1: Confirm domain ────────────────────────────────────────────────────
function StepConfirm({ domain, tld, retail, isPremium, symbol, onNext }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontFamily: "'Rosarivo', serif", color: '#f0ece0', marginBottom: '0.5rem', textAlign: 'center' }}>
        Register Your Domain
      </h2>
      <p style={{ color: '#8a8678', textAlign: 'center', marginBottom: '2rem', fontSize: '14px' }}>
        Review the domain you're registering before proceeding.
      </p>

      <div style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '16px', padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
        <Globe size={32} strokeWidth={1.5} style={{ color: '#c9a84c', marginBottom: '1rem' }} />
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#f0ece0', marginBottom: '0.5rem' }}>
          {domain}<span style={{ color: '#c9a84c' }}>.{tld}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
          <CheckCircle2 size={14} style={{ color: '#4caf50' }} />
          <span style={{ fontSize: '13px', color: '#4caf50', fontWeight: 600 }}>Available</span>
        </div>
        {retail && (
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#c9a84c' }}>
            {symbol}{retail.currency === 'INR' ? retail.price.toLocaleString('en-IN') : retail.price} / {retail.period}
          </div>
        )}
        {isPremium && (
          <div style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', background: 'rgba(239,166,50,0.1)', border: '1px solid rgba(239,166,50,0.3)', borderRadius: '8px', fontSize: '12px', color: '#f0a030' }}>
            ⚠ Premium domain — registration fee may differ
          </div>
        )}
      </div>

      <button onClick={onNext} style={{ width: '100%', padding: '0.9rem', background: '#c9a84c', border: 'none', borderRadius: '10px', color: '#09111f', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit' }}>
        Continue to Registration <ChevronRight size={18} />
      </button>
    </motion.div>
  )
}

// ── Step 2: Contact details ───────────────────────────────────────────────────
function StepContact({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const set = (key, val) => onChange({ ...data, [key]: val })

  const setAddr = (key, val) => {
    const newAddr = { ...data.address, [key]: val }
    let newData = { ...data, address: newAddr }
    // Auto-fill phone prefix when country changes
    if (key === 'country') {
      const c = COUNTRIES.find((x) => x.code === val)
      if (c) newData = { ...newData, phoneCode: c.phone }
    }
    onChange(newData)
  }

  const validate = () => {
    const e = {}
    if (!data.firstName?.trim()) e.firstName = true
    if (!data.lastName?.trim()) e.lastName = true
    if (!data.email?.includes('@')) e.email = true
    if (!data.phoneNumber?.replace(/\D/g, '').match(/^\d{6,15}$/)) e.phoneNumber = true
    if (!data.address?.street?.trim()) e.street = true
    if (!data.address?.city?.trim()) e.city = true
    if (!data.address?.zipcode?.trim()) e.zipcode = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const borderFor = (key) => ({
    ...inputStyle,
    borderColor: errors[key] ? 'rgba(239,83,80,0.6)' : 'rgba(201,168,76,0.2)',
  })

  const selectStyle = { ...inputStyle, appearance: 'none', cursor: 'pointer' }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontFamily: "'Rosarivo', serif", color: '#f0ece0', marginBottom: '0.5rem' }}>Contact Details</h2>
      <p style={{ color: '#8a8678', fontSize: '13px', marginBottom: '1.75rem' }}>
        This information is registered with the domain registry. Please use accurate details.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <Field label="First Name" half>
          <input style={borderFor('firstName')} value={data.firstName || ''} onChange={(e) => set('firstName', e.target.value)} placeholder="Alex" />
        </Field>
        <Field label="Last Name" half>
          <input style={borderFor('lastName')} value={data.lastName || ''} onChange={(e) => set('lastName', e.target.value)} placeholder="Morgan" />
        </Field>
        <Field label="Email Address">
          <input type="email" style={borderFor('email')} value={data.email || ''} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
        </Field>
        <Field label="Phone Number">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select
              style={{ ...selectStyle, width: '130px', flex: '0 0 auto', padding: '0.75rem 0.5rem' }}
              value={data.phoneCode || '+1'}
              onChange={(e) => set('phoneCode', e.target.value)}
            >
              {PHONE_CODES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
            <input
              type="tel"
              style={{ ...borderFor('phoneNumber'), flex: 1 }}
              value={data.phoneNumber || ''}
              onChange={(e) => set('phoneNumber', e.target.value)}
              placeholder="555 000 1234"
            />
          </div>
        </Field>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginBottom: '1rem' }}>
        <p style={{ ...labelStyle, marginBottom: '1rem' }}>ADDRESS</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Field label="Country">
            <select
              style={selectStyle}
              value={data.address?.country || 'US'}
              onChange={(e) => setAddr('country', e.target.value)}
            >
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Street Address">
            <input style={borderFor('street')} value={data.address?.street || ''} onChange={(e) => setAddr('street', e.target.value)} placeholder="123 Main Street" />
          </Field>
          <Field label="Apt / Suite / Unit (optional)" half>
            <input style={inputStyle} value={data.address?.number || ''} onChange={(e) => setAddr('number', e.target.value)} placeholder="Apt 4B" />
          </Field>
          <Field label="City" half>
            <input style={borderFor('city')} value={data.address?.city || ''} onChange={(e) => setAddr('city', e.target.value)} placeholder="New York" />
          </Field>
          <Field label="State / Province (optional)" half>
            <input style={inputStyle} value={data.address?.state || ''} onChange={(e) => setAddr('state', e.target.value)} placeholder="New York" />
          </Field>
          <Field label="Postal / ZIP Code" half>
            <input style={borderFor('zipcode')} value={data.address?.zipcode || ''} onChange={(e) => setAddr('zipcode', e.target.value)} placeholder="10001" />
          </Field>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        <button onClick={onBack} style={{ flex: '0 0 auto', padding: '0.9rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#8a8678', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ChevronLeft size={16} /> Back
        </button>
        <button onClick={() => validate() && onNext()} style={{ flex: 1, padding: '0.9rem', background: '#c9a84c', border: 'none', borderRadius: '10px', color: '#09111f', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit' }}>
          Next: Options <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}

// ── Step 3: Registration options ──────────────────────────────────────────────
function StepOptions({ data, onChange, retail, symbol, onNext, onBack }) {
  const set = (key, val) => onChange({ ...data, [key]: val })

  const periodPrice = (yr) => {
    if (!retail) return null
    if (yr === 1) return retail.price
    if (yr === 2) return Math.ceil(retail.price * 2 * 0.95)
    if (yr === 3) return Math.ceil(retail.price * 3 * 0.90)
    return null
  }

  const periodLabel = (yr) => {
    if (yr === 1) return null
    if (yr === 2) return '5% off'
    if (yr === 3) return '10% off'
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontFamily: "'Rosarivo', serif", color: '#f0ece0', marginBottom: '0.5rem' }}>Registration Options</h2>
      <p style={{ color: '#8a8678', fontSize: '13px', marginBottom: '1.75rem' }}>Choose how long to register your domain.</p>

      {/* Period */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={labelStyle}>REGISTRATION PERIOD</p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[1, 2, 3].map((yr) => {
            const price = periodPrice(yr)
            const badge = periodLabel(yr)
            const active = data.period === yr
            return (
              <button
                key={yr}
                onClick={() => set('period', yr)}
                style={{
                  flex: 1, padding: '1rem', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  background: active ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
                  border: active ? '2px solid #c9a84c' : '2px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: active ? '#c9a84c' : '#f0ece0', marginBottom: '4px' }}>
                  {yr} Year{yr > 1 ? 's' : ''}
                </div>
                {price != null && (
                  <div style={{ fontSize: '12px', color: '#8a8678' }}>
                    {symbol}{retail.currency === 'INR' ? price.toLocaleString('en-IN') : price}
                    {badge && <span style={{ marginLeft: '4px', color: '#4caf50' }}>{badge}</span>}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Auto-renew */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', cursor: 'pointer', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }}>
        <input type="checkbox" checked={data.autoRenew !== false} onChange={(e) => set('autoRenew', e.target.checked)} style={{ accentColor: '#c9a84c', width: 16, height: 16, flexShrink: 0 }} />
        <div>
          <span style={{ fontSize: '13px', color: '#f0ece0', display: 'block' }}>Auto-renew domain</span>
          <span style={{ fontSize: '12px', color: '#6b6150', display: 'block', marginTop: '2px' }}>We'll remind you before renewal so your domain never accidentally expires</span>
        </div>
      </label>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={onBack} style={{ flex: '0 0 auto', padding: '0.9rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#8a8678', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ChevronLeft size={16} /> Back
        </button>
        <button onClick={onNext} style={{ flex: 1, padding: '0.9rem', background: '#c9a84c', border: 'none', borderRadius: '10px', color: '#09111f', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit' }}>
          Review Order <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}

// ── Step 4: Review + submit ───────────────────────────────────────────────────
function StepReview({ domain, tld, contact, options, retail, symbol, onConfirm, onBack, loading }) {
  const totalPrice = retail
    ? options.period === 1
      ? retail.price
      : Math.ceil(retail.price * 2 * 0.95)
    : null

  const fmtPrice = (p) => p == null ? '—' : `${symbol}${retail?.currency === 'INR' ? p.toLocaleString('en-IN') : p}`

  const addrParts = [
    contact.address?.street,
    contact.address?.number,
    contact.address?.city,
    contact.address?.state,
    contact.address?.zipcode,
    contact.address?.country,
  ].filter(Boolean).join(', ')

  const rows = [
    ['Domain', `${domain}.${tld}`],
    ['Period', `${options.period} year${options.period > 1 ? 's' : ''}`],
    ['Price', fmtPrice(totalPrice)],
    ['Contact', `${contact.firstName} ${contact.lastName}`],
    ['Email', contact.email],
    ['Phone', `${contact.phoneCode || ''} ${contact.phoneNumber || ''}`.trim()],
    ['Address', addrParts],
    ['Auto-renew', options.autoRenew !== false ? 'On' : 'Off'],
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontFamily: "'Rosarivo', serif", color: '#f0ece0', marginBottom: '0.5rem' }}>Review Your Order</h2>
      <p style={{ color: '#8a8678', fontSize: '13px', marginBottom: '1.75rem' }}>Double-check all details before confirming registration.</p>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
        {rows.map(([key, val], i) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.75rem 1.25rem', borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#6b6150', letterSpacing: '1px' }}>{key.toUpperCase()}</span>
            <span style={{ fontSize: '13px', color: key === 'Domain' ? '#c9a84c' : '#f0ece0', fontWeight: key === 'Domain' || key === 'Price' ? 700 : 400, textAlign: 'right', wordBreak: 'break-all' }}>{val}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '0.85rem 1rem', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '8px', fontSize: '12px', color: '#8a7040', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        ⚠ By confirming, you authorise Dhruvid to register this domain on your behalf. Ensure your account balance is sufficient before proceeding.
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={onBack} disabled={loading} style={{ flex: '0 0 auto', padding: '0.9rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#8a8678', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ChevronLeft size={16} /> Back
        </button>
        <button onClick={onConfirm} disabled={loading} style={{ flex: 1, padding: '0.9rem', background: '#c9a84c', border: 'none', borderRadius: '10px', color: '#09111f', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit', opacity: loading ? 0.7 : 1 }}>
          {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Registering...</> : <>Confirm & Register</>}
        </button>
      </div>
    </motion.div>
  )
}

// ── Step 5: Done ──────────────────────────────────────────────────────────────
function StepDone({ result, error, domain, tld, onRetry }) {
  const router = useRouter()
  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
        <AlertCircle size={48} style={{ color: '#ef5350', marginBottom: '1rem' }} />
        <h2 style={{ fontFamily: "'Rosarivo', serif", color: '#f0ece0', marginBottom: '0.75rem' }}>Registration Failed</h2>
        <p style={{ color: '#ef5350', fontSize: '14px', marginBottom: '1.5rem', background: 'rgba(239,83,80,0.07)', border: '1px solid rgba(239,83,80,0.2)', padding: '1rem', borderRadius: '8px' }}>{error}</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={onRetry} style={{ padding: '0.75rem 1.5rem', background: '#c9a84c', border: 'none', borderRadius: '8px', color: '#09111f', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Try Again</button>
          <button onClick={() => router.push('/domains/')} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#8a8678', cursor: 'pointer', fontFamily: 'inherit' }}>Back to Search</button>
        </div>
      </motion.div>
    )
  }

  const isActive = result?.status === 'ACT'

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
      <CheckCircle2 size={56} style={{ color: '#4caf50', marginBottom: '1rem' }} />
      <h2 style={{ fontFamily: "'Rosarivo', serif", color: '#f0ece0', marginBottom: '0.5rem' }}>
        {isActive ? 'Domain Registered!' : 'Registration Submitted'}
      </h2>
      <p style={{ color: '#8a8678', fontSize: '14px', marginBottom: isActive ? '2rem' : '0.75rem' }}>
        {isActive
          ? 'Your domain is now active and ready to use.'
          : 'Your registration is being processed by the registry. This can take up to 24 hours.'}
      </p>
      {!isActive && (
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', color: '#6b6150', marginBottom: '2rem' }}>
          <Loader2 size={13} style={{ animation: 'spin 1.5s linear infinite' }} />
          Checking status automatically every few seconds...
        </p>
      )}

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
        {[
          ['Domain', `${domain}.${tld}`],
          ['Status', isActive ? '✅ Active' : '⏳ Pending Registry'],
          result?.expirationDate && ['Expires', new Date(result.expirationDate * 1000).toLocaleDateString('en-IN')],
          result?.id && ['Registration ID', result.id],
        ].filter(Boolean).map(([key, val]) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '12px', color: '#6b6150', letterSpacing: '1px' }}>{key.toUpperCase()}</span>
            <span style={{ fontSize: '13px', color: '#f0ece0', fontWeight: 600 }}>{val}</span>
          </div>
        ))}
      </div>

      <button onClick={() => router.push('/domains/')} style={{ padding: '0.85rem 2rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '10px', color: '#c9a84c', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
        Search Another Domain
      </button>
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function DomainRegisterContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isMobile } = useBreakpoint()
  const { currency, symbol } = useCurrency()

  const rawDomain = searchParams.get('domain') || ''
  const tld = searchParams.get('tld') || 'com'
  const domain = rawDomain.replace(/\.[a-z.]+$/, '').toLowerCase()
  const isPremium = searchParams.get('premium') === '1'

  const retail = getRetailPrice(tld, null, currency)

  const [step, setStep] = useState(0)
  const [contact, setContact] = useState({ address: { country: 'US' }, phoneCode: '+1' })
  const [options, setOptions] = useState({ period: 1, autoRenew: true })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [regError, setRegError] = useState(null)
  const pollRef = useRef(null)

  useEffect(() => {
    if (!domain) router.push('/domains/')
  }, [domain, router])

  // Poll domain status every 5s when status is REQ until it becomes ACT
  useEffect(() => {
    if (step !== 4 || !result?.id || result.status === 'ACT') return
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/domain-status?id=${result.id}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.status === 'ACT') {
          setResult((prev) => ({ ...prev, status: 'ACT', expirationDate: data.expirationDate, renewalDate: data.renewalDate }))
          clearInterval(pollRef.current)
        }
      } catch {}
    }, 5000)
    return () => clearInterval(pollRef.current)
  }, [step, result?.id, result?.status])

  const handleConfirm = async () => {
    setLoading(true)
    setRegError(null)
    try {
      // 1. Create customer handle
      const { handle } = await createCustomer({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phoneCode: contact.phoneCode || '+1',
        phoneNumber: contact.phoneNumber,
        address: contact.address,
      })

      // 2. Register domain — branded nameservers applied silently
      const regData = {
        domainName: domain,
        extension: tld,
        ownerHandle: handle,
        period: options.period,
        nsGroup: 'dns-openprovider',
        autoRenew: options.autoRenew !== false,
        isPremium,
      }
      const reg = await registerDomain(regData)
      setResult(reg)
      setStep(4)
    } catch (err) {
      setRegError(err.message)
      setStep(4)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#09111f', minHeight: '100vh' }}>
      {/* Hero bar */}
      <div style={{ background: 'linear-gradient(180deg, #060d18 0%, #09111f 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: 'clamp(6rem, 10vw, 9rem) 0 2rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', letterSpacing: '4px', color: '#c9a84c' }}>✦ DOMAIN REGISTRATION</span>
        </div>
      </div>

      {/* Form area */}
      <div className="container" style={{ maxWidth: '600px', padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem' }}>
        <StepBar current={step} />

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: isMobile ? '1.5rem' : '2.5rem' }}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepConfirm key="confirm" domain={domain} tld={tld} retail={retail} isPremium={isPremium} symbol={symbol} onNext={() => setStep(1)} />
            )}
            {step === 1 && (
              <StepContact key="contact" data={contact} onChange={setContact} onNext={() => setStep(2)} onBack={() => setStep(0)} />
            )}
            {step === 2 && (
              <StepOptions key="options" data={options} onChange={setOptions} retail={retail} symbol={symbol} onNext={() => setStep(3)} onBack={() => setStep(1)} />
            )}
            {step === 3 && (
              <StepReview key="review" domain={domain} tld={tld} contact={contact} options={options} retail={retail} symbol={symbol} onConfirm={handleConfirm} onBack={() => setStep(2)} loading={loading} />
            )}
            {step === 4 && (
              <StepDone key="done" result={result} error={regError} domain={domain} tld={tld} onRetry={() => setStep(3)} />
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
