'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Check, Minus, Phone, Shield, Zap, Building2 } from 'lucide-react'

const YELLOW   = '#FFD940'
const HAIRLINE = '#1e1e1e'
const INK      = '#5a5a5f'
const INTER    = `'Inter', Arial, sans-serif`

// ── Plan cards ────────────────────────────────────────────────────────────────
const plans = [
  {
    name: 'Starter', price: '$349', period: '/mo',
    tagline: 'Get compliance under control.',
    hi: false, badge: null, icon: Shield,
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start free trial', ctaHref: '/login/user',
  },
  {
    name: 'Professional', price: '$489', period: '/mo',
    tagline: 'For growing compliance teams.',
    hi: true, badge: 'Most Popular', icon: Zap,
    photo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    cta: 'Start free trial', ctaHref: '/login/user',
  },
  {
    name: 'Enterprise', price: 'Custom', period: '',
    tagline: 'For large multi-site operations.',
    hi: false, badge: null, icon: Building2,
    photo: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    cta: 'Contact sales', ctaHref: '/login/user',
  },
]

// ── Comparison table data ─────────────────────────────────────────────────────
type Cell = string | boolean
interface Row { label: string; values: [Cell, Cell, Cell] }
interface Section { heading: string; rows: Row[] }

const sections: Section[] = [
  {
    heading: 'Platform',
    rows: [
      { label: 'Users',            values: ['Up to 15', 'Up to 50', 'Unlimited'] },
      { label: 'Sites',            values: ['1',        'Up to 5',  'Unlimited'] },
      { label: 'Document storage', values: ['10 GB',    '50 GB',    'Custom']    },
      { label: 'Free trial',       values: [true, true, true]                    },
      { label: 'Mobile app',       values: [true, true, true]                    },
    ],
  },
  {
    heading: 'Support',
    rows: [
      { label: 'Support channel',  values: ['Email & chat', 'Phone & chat', 'Dedicated CSM'] },
      { label: 'Onboarding call',  values: [true,  true,  true]  },
      { label: 'On-site training', values: [false, false, true]  },
      { label: 'SLA guarantee',    values: [false, false, true]  },
    ],
  },
  {
    heading: 'Core Compliance',
    rows: [
      { label: 'Incident & hazard tracking', values: [true, true, true] },
      { label: 'Contractor management',      values: [true, true, true] },
      { label: 'Document management',        values: [true, true, true] },
      { label: 'Training records',           values: [true, true, true] },
      { label: 'SWMS management',            values: [true, true, true] },
      { label: 'Inspections & audits',       values: [true, true, true] },
      { label: 'Chemical & plant registers', values: [true, true, true] },
      { label: 'Pre-built forms library',    values: [true, true, true] },
    ],
  },
  {
    heading: 'Advanced Features',
    rows: [
      { label: 'Custom inspection forms', values: [false, true, true] },
      { label: 'Build management portal', values: [false, true, true] },
      { label: 'Contractor portal',       values: [false, true, true] },
      { label: 'ISO 9001 / 45001 module', values: [false, true, true] },
      { label: 'Corrective actions',      values: [false, true, true] },
      { label: 'Permits to work',         values: [false, true, true] },
      { label: 'Pre-start checks',        values: [false, true, true] },
      { label: 'KPI dashboards',          values: [false, true, true] },
    ],
  },
  {
    heading: 'AI Tools',
    rows: [
      { label: 'AI SWMS generator',      values: [false, true, true] },
      { label: 'Toolbox talk generator', values: [false, true, true] },
      { label: 'Risk assessment AI',     values: [false, true, true] },
      { label: 'AI compliance reports',  values: [false, true, true] },
    ],
  },
  {
    heading: 'Reporting',
    rows: [
      { label: 'Standard reports',   values: ['Limited', 'All modules', 'All modules'] },
      { label: 'Reporting history',  values: ['90 days', 'Unlimited',   'Unlimited']   },
      { label: 'Advanced analytics', values: [false,     false,         true]          },
      { label: 'Custom reports',     values: [false,     false,         true]          },
      { label: 'Bespoke reporting',  values: [false,     false,         true]          },
    ],
  },
  {
    heading: 'Enterprise',
    rows: [
      { label: 'Custom integrations & API', values: [false, false, true] },
      { label: 'White-label options',       values: [false, false, true] },
      { label: 'Single sign-on (SSO)',      values: [false, false, true] },
      { label: 'Custom data retention',     values: [false, false, true] },
      { label: 'Custom access & roles',     values: [false, false, true] },
      { label: 'Dedicated account manager', values: [false, false, true] },
    ],
  },
]

const included = [
  { title: '14-day free trial',       desc: 'Full access, no credit card.' },
  { title: 'No lock-in contracts',    desc: 'Monthly billing, cancel anytime.' },
  { title: 'Australian data hosting', desc: 'Your data stays in Australia.' },
  { title: 'SOC 2 compliant',         desc: 'Enterprise-grade security.' },
  { title: 'Free onboarding call',    desc: 'Guided setup on every plan.' },
  { title: 'Ongoing updates',         desc: 'New features at no extra cost.' },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, Number(el.dataset.delay ?? 0))
        }
      })
    }, { threshold: 0.08 })
    els.forEach(el => {
      const h = el as HTMLElement
      h.style.opacity = '0'; h.style.transform = 'translateY(20px)'
      h.style.transition = 'opacity .7s cubic-bezier(.23,1,.32,1), transform .7s cubic-bezier(.23,1,.32,1)'
      obs.observe(h)
    })
    return () => obs.disconnect()
  }, [])
}

// ── Plan card ─────────────────────────────────────────────────────────────────
function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = plan.icon
  return (
    <div
      data-reveal data-delay={`${index * 80}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        padding: '32px 28px',
        background: plan.hi ? '#0d0d0d' : '#000',
        border: plan.hi ? `1px solid ${YELLOW}55` : `1px solid ${HAIRLINE}`,
        transition: 'border-color .4s ease',
        ...(hovered && !plan.hi ? { borderColor: '#333' } : {}),
      }}
    >
      {/* Hover photo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url('${plan.photo}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: hovered ? 0.32 : 0, transition: 'opacity .7s cubic-bezier(.23,1,.32,1)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(160deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.5) 100%)', opacity: hovered ? 1 : 0, transition: 'opacity .7s ease' }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {plan.badge && <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: YELLOW, marginBottom: 14, fontFamily: INTER }}>● {plan.badge}</p>}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 30, height: 30, border: `1px solid ${plan.hi ? YELLOW + '50' : '#252525'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={13} style={{ color: plan.hi ? YELLOW : 'rgba(255,255,255,0.35)' }} />
          </div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: plan.hi ? '#fff' : INK, fontFamily: INTER }}>{plan.name}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
          <span style={{ fontSize: 'clamp(32px,3.5vw,44px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-1.5px', fontFamily: INTER, color: plan.hi ? YELLOW : '#fff' }}>{plan.price}</span>
          {plan.period && <span style={{ fontSize: 11, fontWeight: 300, color: INK, fontFamily: INTER }}>{plan.period}</span>}
        </div>
        <p style={{ fontSize: 11, fontWeight: 300, lineHeight: 1.6, color: INK, marginBottom: 28, fontFamily: INTER }}>{plan.tagline}</p>

        <Link href={plan.ctaHref} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          padding: '13px 0', fontSize: 9, fontWeight: 700, letterSpacing: '2.5px',
          textTransform: 'uppercase' as const, textDecoration: 'none', fontFamily: INTER,
          background: plan.hi ? YELLOW : 'transparent',
          color: plan.hi ? '#000' : 'rgba(255,255,255,0.6)',
          border: plan.hi ? 'none' : '1px solid #252525',
          transition: 'all .3s ease',
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; if (plan.hi) { el.style.opacity = '0.85' } else { el.style.borderColor = YELLOW; el.style.color = YELLOW } }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1'; if (!plan.hi) { el.style.borderColor = '#252525'; el.style.color = 'rgba(255,255,255,0.6)' } }}
        >{plan.cta} <ArrowRight size={11} /></Link>
      </div>
    </div>
  )
}

// ── Comparison table cell ─────────────────────────────────────────────────────
function CellValue({ val, hi }: { val: Cell; hi: boolean }) {
  if (val === true)  return <Check size={13} style={{ color: hi ? YELLOW : '#22c55e', margin: '0 auto', display: 'block' }} />
  if (val === false) return <Minus size={12} style={{ color: '#2a2a2a', margin: '0 auto', display: 'block' }} />
  return <span style={{ fontSize: 11, fontWeight: hi ? 500 : 300, color: hi ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)', fontFamily: INTER }}>{val}</span>
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  useReveal()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const col: React.CSSProperties = { width: '22%', textAlign: 'center' as const, verticalAlign: 'middle' as const, padding: '13px 16px', borderLeft: `1px solid ${HAIRLINE}` }
  const colHi: React.CSSProperties = { ...col, background: 'rgba(255,217,64,0.03)', borderLeft: `1px solid ${YELLOW}30`, borderRight: `1px solid ${YELLOW}30` }

  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: INTER }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '11px 48px' : '18px 48px',
        background: scrolled ? '#fff' : 'transparent',
        borderBottom: scrolled ? '1px solid #e8e8e8' : 'none',
        transition: 'background .4s ease, border-color .4s ease, padding .4s ease',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 16, fontWeight: 900, fontFamily: INTER, color: scrolled ? '#000' : '#fff', transition: 'color .4s ease' }}>Briesa</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link href="/features" style={{ fontSize: 9, fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' as const, color: scrolled ? INK : 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color .3s', fontFamily: INTER }}
            onMouseEnter={e => (e.currentTarget.style.color = scrolled ? '#000' : '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = scrolled ? INK : 'rgba(255,255,255,0.6)')}
          >Features</Link>
          <Link href="/login" style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, fontFamily: INTER,
            background: scrolled ? '#000' : 'transparent', color: '#fff',
            border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.4)',
            padding: '9px 18px', textDecoration: 'none', transition: 'background .3s, color .3s, border-color .3s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = YELLOW; el.style.color = '#000'; el.style.borderColor = 'transparent' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = scrolled ? '#000' : 'transparent'; el.style.color = '#fff'; el.style.borderColor = scrolled ? 'transparent' : 'rgba(255,255,255,0.4)' }}
          >Log in</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ paddingTop: 'clamp(100px,13vh,140px)', paddingBottom: 'clamp(32px,5vh,56px)', paddingLeft: 'clamp(24px,7vw,100px)', paddingRight: 'clamp(24px,7vw,100px)' }}>
        <p style={{ fontSize: 9, letterSpacing: '4px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontFamily: INTER }}>Pricing</p>
        <div style={{ width: 28, height: 1, background: YELLOW, marginBottom: 20 }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 24 }}>
          <h1 style={{ fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 900, textTransform: 'uppercase' as const, lineHeight: 0.92, letterSpacing: '-1px', color: '#fff', fontFamily: INTER }}>
            Simple.<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>No surprises.</em>
          </h1>
          <p style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.75, color: INK, maxWidth: 360, fontFamily: INTER }}>
            14-day free trial on any plan. No credit card. No lock-in. Cancel any time.
          </p>
        </div>
      </div>

      <div style={{ padding: '0 clamp(24px,7vw,100px) clamp(60px,8vh,100px)' }}>

        {/* ── 3 Plan cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2, maxWidth: 1100, margin: '0 auto 80px' }}>
          {plans.map((plan, i) => <PlanCard key={plan.name} plan={plan} index={i} />)}
        </div>

        {/* ── Comparison table ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32 }}>
            <div style={{ width: 24, height: 1, background: YELLOW, flexShrink: 0 }} />
            <p style={{ fontSize: 9, letterSpacing: '3.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', fontFamily: INTER }}>Full feature breakdown</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ position: 'sticky', top: 52, zIndex: 10, background: '#000' }}>
                  <th style={{ width: '34%', textAlign: 'left' as const, padding: '0 0 20px', borderBottom: `1px solid ${HAIRLINE}`, background: '#000', verticalAlign: 'bottom' as const }} />
                  {/* Starter */}
                  <th style={{ ...col, verticalAlign: 'bottom' as const, borderBottom: `1px solid ${HAIRLINE}`, background: '#000', paddingBottom: 20 }}>
                    <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: INK, marginBottom: 8, fontFamily: INTER }}>Starter</p>
                    <p style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-1px', color: '#fff', lineHeight: 1, fontFamily: INTER }}>$349<span style={{ fontSize: 11, fontWeight: 300, color: INK }}>/mo</span></p>
                  </th>
                  {/* Professional */}
                  <th style={{ ...colHi, verticalAlign: 'bottom' as const, borderTop: `2px solid ${YELLOW}`, borderBottom: `1px solid ${YELLOW}30`, background: 'rgba(255,217,64,0.04)', paddingBottom: 20 }}>
                    <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: YELLOW, marginBottom: 4, fontFamily: INTER }}>● Most Popular</p>
                    <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 8, fontFamily: INTER }}>Professional</p>
                    <p style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-1px', color: YELLOW, lineHeight: 1, fontFamily: INTER }}>$489<span style={{ fontSize: 11, fontWeight: 300, color: INK }}>/mo</span></p>
                  </th>
                  {/* Enterprise */}
                  <th style={{ ...col, verticalAlign: 'bottom' as const, borderBottom: `1px solid ${HAIRLINE}`, background: '#000', paddingBottom: 20 }}>
                    <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: INK, marginBottom: 8, fontFamily: INTER }}>Enterprise</p>
                    <p style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-1px', color: '#fff', lineHeight: 1, fontFamily: INTER }}>Custom</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section, si) => (
                  <>
                    <tr key={`h-${si}`}>
                      <td colSpan={4} style={{ padding: '22px 0 10px', borderBottom: `1px solid ${HAIRLINE}` }}>
                        <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: YELLOW, fontFamily: INTER }}>{section.heading}</span>
                      </td>
                    </tr>
                    {section.rows.map((row, ri) => {
                      const even = ri % 2 === 0
                      const rowBg = even ? 'transparent' : 'rgba(255,255,255,0.015)'
                      return (
                        <tr key={`${si}-${ri}`} style={{ background: rowBg }}>
                          <td style={{ padding: '11px 0', fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.55)', fontFamily: INTER, borderBottom: `1px solid ${HAIRLINE}` }}>{row.label}</td>
                          <td style={{ ...col, borderBottom: `1px solid ${HAIRLINE}`, background: rowBg }}><CellValue val={row.values[0]} hi={false} /></td>
                          <td style={{ ...colHi, borderBottom: `1px solid ${YELLOW}18`, background: even ? 'rgba(255,217,64,0.03)' : 'rgba(255,217,64,0.05)' }}><CellValue val={row.values[1]} hi={true} /></td>
                          <td style={{ ...col, borderBottom: `1px solid ${HAIRLINE}`, background: rowBg }}><CellValue val={row.values[2]} hi={false} /></td>
                        </tr>
                      )
                    })}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── All plans include ── */}
        <div style={{ maxWidth: 1100, margin: '64px auto 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32 }}>
            <div style={{ width: 24, height: 1, background: YELLOW, flexShrink: 0 }} />
            <p style={{ fontSize: 9, letterSpacing: '3.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', fontFamily: INTER }}>Everything included, on every plan</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 2 }}>
            {included.map(({ title, desc }, i) => (
              <div key={i} data-reveal data-delay={`${i * 40}`} style={{ padding: '22px', border: `1px solid ${HAIRLINE}` }}>
                <div style={{ width: 5, height: 5, background: YELLOW, marginBottom: 12 }} />
                <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', marginBottom: 5, fontFamily: INTER }}>{title}</p>
                <p style={{ fontSize: 11, fontWeight: 300, lineHeight: 1.55, color: INK, fontFamily: INTER }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Enterprise band ── */}
        <div data-reveal style={{ maxWidth: 1100, margin: '4px auto 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 2, padding: '44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 32, border: `1px solid #222` }}>
            <div>
              <div style={{ width: 24, height: 1, background: YELLOW, marginBottom: 16 }} />
              <h2 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 900, textTransform: 'uppercase' as const, lineHeight: 0.95, color: '#fff', marginBottom: 12, fontFamily: INTER }}>
                Need something<br /><span style={{ color: YELLOW }}>custom?</span>
              </h2>
              <p style={{ fontSize: 12, fontWeight: 300, color: INK, maxWidth: 400, lineHeight: 1.75, fontFamily: INTER }}>
                Multi-site operations, custom integrations, white-label or volume pricing — our team will build a plan around your business.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, flexShrink: 0 }}>
              <Link href="/login/user" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 28px', fontSize: 9, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, background: YELLOW, color: '#000', textDecoration: 'none', fontFamily: INTER }}>
                Contact sales <ArrowRight size={11} />
              </Link>
              <a href="tel:+61200000000" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '11px 28px', fontSize: 9, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase' as const, border: '1px solid #252525', color: INK, textDecoration: 'none', fontFamily: INTER, transition: 'border-color .3s, color .3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#555'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#252525'; (e.currentTarget as HTMLElement).style.color = INK }}
              ><Phone size={10} /> +61 2 0000 0000</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ padding: '20px clamp(24px,7vw,100px)', borderTop: `1px solid ${HAIRLINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 12 }}>
        <p style={{ fontSize: 10, fontWeight: 300, color: INK, fontFamily: INTER }}>© 2025 Briesa Pty Ltd · ABN 12 345 678 901</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms', 'Contact'].map(l => (
            <Link key={l} href="/" style={{ fontSize: 10, fontWeight: 300, color: INK, textDecoration: 'none', transition: 'color .3s', fontFamily: INTER }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = INK)}
            >{l}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
