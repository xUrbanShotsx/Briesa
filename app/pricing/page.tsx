'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Check, Phone, Shield, Zap, Building2 } from 'lucide-react'

const YELLOW = '#FFD940'
const HAIRLINE = '#1e1e1e'
const INK = '#5a5a5f'
const INTER = `'Inter', Arial, sans-serif`

const plans = [
  {
    name: 'Starter',
    price: '$349',
    period: '/mo',
    tagline: 'Get compliance under control.',
    hi: false,
    badge: null,
    icon: Shield,
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Up to 15 users',
      'Core compliance modules',
      'Incident & hazard tracking',
      'Contractor management',
      'Document storage (10 GB)',
      'Pre-built inspection forms',
      'Email & chat support',
    ],
    cta: 'Start free trial',
  },
  {
    name: 'Professional',
    price: '$489',
    period: '/mo',
    tagline: 'For growing compliance teams.',
    hi: true,
    badge: 'Most Popular',
    icon: Zap,
    photo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Up to 50 users',
      'All compliance modules',
      'AI tools & template generator',
      'Build management portal',
      'Contractor portal access',
      'Document storage (50 GB)',
      'Custom inspection forms',
    ],
    cta: 'Start free trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    tagline: 'For large multi-site operations.',
    hi: false,
    badge: null,
    icon: Building2,
    photo: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Unlimited users & sites',
      'Custom integrations & API',
      'Dedicated account manager',
      'White-label options',
      'SLA guarantee',
      'On-site onboarding & training',
      'Advanced analytics',
    ],
    cta: 'Contact sales',
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
      h.style.opacity = '0'
      h.style.transform = 'translateY(20px)'
      h.style.transition = 'opacity .7s cubic-bezier(.23,1,.32,1), transform .7s cubic-bezier(.23,1,.32,1)'
      obs.observe(h)
    })
    return () => obs.disconnect()
  }, [])
}

function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = plan.icon

  return (
    <div
      data-reveal
      data-delay={`${index * 80}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 28px',
        background: plan.hi ? '#0d0d0d' : '#000',
        border: plan.hi ? `1px solid ${YELLOW}55` : `1px solid ${HAIRLINE}`,
        transition: 'border-color .4s ease',
        cursor: 'default',
        ...(hovered && !plan.hi ? { borderColor: '#333' } : {}),
      }}
    >
      {/* Construction photo bg — revealed on hover */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('${plan.photo}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: hovered ? 0.18 : 0,
        transition: 'opacity .7s cubic-bezier(.23,1,.32,1)',
      }} />
      {/* Dark overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(160deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.5) 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity .7s ease',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Badge */}
        {plan.badge && (
          <p style={{
            fontSize: 8, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase' as const, color: YELLOW,
            marginBottom: 14, fontFamily: INTER,
          }}>● {plan.badge}</p>
        )}

        {/* Icon + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 30, height: 30,
            border: `1px solid ${plan.hi ? YELLOW + '50' : '#252525'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color .4s',
            ...(hovered ? { borderColor: plan.hi ? YELLOW : '#444' } : {}),
          }}>
            <Icon size={13} style={{ color: plan.hi ? YELLOW : 'rgba(255,255,255,0.35)' }} />
          </div>
          <p style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase' as const,
            color: plan.hi ? '#fff' : INK,
            fontFamily: INTER,
          }}>{plan.name}</p>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
          <span style={{
            fontSize: 'clamp(32px,3.5vw,44px)',
            fontWeight: 800, lineHeight: 1,
            letterSpacing: '-1.5px', fontFamily: INTER,
            color: plan.hi ? YELLOW : '#fff',
          }}>{plan.price}</span>
          {plan.period && (
            <span style={{ fontSize: 11, fontWeight: 300, color: INK, fontFamily: INTER }}>
              {plan.period}
            </span>
          )}
        </div>

        <p style={{
          fontSize: 11, fontWeight: 300, lineHeight: 1.6,
          color: INK, marginBottom: 22, fontFamily: INTER,
        }}>{plan.tagline}</p>

        {/* Divider */}
        <div style={{
          height: 1,
          background: plan.hi
            ? `linear-gradient(to right, ${YELLOW}35, transparent)`
            : `linear-gradient(to right, #222, transparent)`,
          marginBottom: 20,
        }} />

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1 }}>
          {plan.features.map(f => (
            <li key={f} style={{
              display: 'flex', alignItems: 'flex-start', gap: 9,
              marginBottom: 9, fontSize: 11, fontWeight: 300,
              color: 'rgba(255,255,255,0.55)', fontFamily: INTER,
            }}>
              <Check size={11} style={{
                color: plan.hi ? YELLOW : '#22c55e',
                flexShrink: 0, marginTop: 1,
              }} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/login/user" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          padding: '12px 0', fontSize: 9, fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase' as const,
          textDecoration: 'none', fontFamily: INTER,
          background: plan.hi ? YELLOW : 'transparent',
          color: plan.hi ? '#000' : 'rgba(255,255,255,0.6)',
          border: plan.hi ? 'none' : '1px solid #252525',
          transition: 'all .3s ease',
        }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            if (plan.hi) { el.style.opacity = '0.85' }
            else { el.style.borderColor = YELLOW; el.style.color = YELLOW }
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.opacity = '1'
            if (!plan.hi) { el.style.borderColor = '#252525'; el.style.color = 'rgba(255,255,255,0.6)' }
          }}
        >
          {plan.cta} <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  )
}

export default function PricingPage() {
  useReveal()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

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
          <span style={{
            fontSize: 16, fontWeight: 900, fontFamily: INTER,
            color: scrolled ? '#000' : '#fff',
            transition: 'color .4s ease',
          }}>
            brie<span style={{ color: YELLOW }}>sa</span>
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link href="/" style={{
            fontSize: 9, fontWeight: 500, letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: scrolled ? INK : 'rgba(255,255,255,0.6)',
            textDecoration: 'none', transition: 'color .3s', fontFamily: INTER,
          }}
            onMouseEnter={e => (e.currentTarget.style.color = scrolled ? '#000' : '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = scrolled ? INK : 'rgba(255,255,255,0.6)')}
          >Features</Link>
          <Link href="/login" style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase' as const, fontFamily: INTER,
            background: scrolled ? '#000' : 'transparent',
            color: '#fff',
            border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.4)',
            padding: '9px 18px', textDecoration: 'none',
            transition: 'background .3s, color .3s, border-color .3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = YELLOW; (e.currentTarget as HTMLElement).style.color = '#000'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent' }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = scrolled ? '#000' : 'transparent'
              el.style.color = '#fff'
              el.style.borderColor = scrolled ? 'transparent' : 'rgba(255,255,255,0.4)'
            }}
          >Log in</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        paddingTop: 'clamp(100px,13vh,140px)',
        paddingBottom: 'clamp(40px,6vh,72px)',
        paddingLeft: 'clamp(24px,7vw,100px)',
        paddingRight: 'clamp(24px,7vw,100px)',
      }}>
        <p style={{
          fontSize: 9, letterSpacing: '4px', textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontFamily: INTER,
        }}>Pricing</p>
        <div style={{ width: 28, height: 1, background: YELLOW, marginBottom: 20 }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 24 }}>
          <h1 style={{
            fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 900,
            textTransform: 'uppercase' as const, lineHeight: 0.92,
            letterSpacing: '-1px', color: '#fff',
            fontFamily: INTER,
          }}>
            Simple.<br />
            <em style={{ fontStyle: 'normal', color: YELLOW }}>No surprises.</em>
          </h1>
          <p style={{
            fontSize: 12, fontWeight: 300, lineHeight: 1.75,
            color: INK, maxWidth: 360, fontFamily: INTER,
          }}>
            14-day free trial on any plan. No credit card. No lock-in. Cancel any time.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div style={{ padding: '0 clamp(24px,7vw,100px) clamp(60px,8vh,100px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 2,
          maxWidth: 1100, margin: '0 auto',
        }}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* All plans include */}
        <div style={{ maxWidth: 1100, margin: '56px auto 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32 }}>
            <div style={{ width: 24, height: 1, background: YELLOW, flexShrink: 0 }} />
            <p style={{
              fontSize: 9, letterSpacing: '3.5px', textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.25)', fontFamily: INTER,
            }}>Everything included, on every plan</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: 2,
          }}>
            {included.map(({ title, desc }, i) => (
              <div key={i} data-reveal data-delay={`${i * 40}`} style={{
                padding: '22px 22px',
                border: `1px solid ${HAIRLINE}`,
              }}>
                <div style={{ width: 5, height: 5, background: YELLOW, marginBottom: 12 }} />
                <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', marginBottom: 5, fontFamily: INTER }}>{title}</p>
                <p style={{ fontSize: 11, fontWeight: 300, lineHeight: 1.55, color: INK, fontFamily: INTER }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise band */}
        <div data-reveal style={{ maxWidth: 1100, margin: '4px auto 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.07,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 100%)',
          }} />
          <div style={{
            position: 'relative', zIndex: 2,
            padding: '44px 44px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap' as const, gap: 32,
            border: `1px solid #222`,
          }}>
            <div>
              <div style={{ width: 24, height: 1, background: YELLOW, marginBottom: 16 }} />
              <h2 style={{
                fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 900,
                textTransform: 'uppercase' as const, lineHeight: 0.95,
                color: '#fff', marginBottom: 12, fontFamily: INTER,
              }}>
                Need something<br />
                <span style={{ color: YELLOW }}>custom?</span>
              </h2>
              <p style={{
                fontSize: 12, fontWeight: 300, color: INK,
                maxWidth: 400, lineHeight: 1.75, fontFamily: INTER,
              }}>
                Multi-site operations, custom integrations, white-label or volume pricing — our team will build a plan around your business.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, flexShrink: 0 }}>
              <Link href="/login/user" style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '12px 28px', fontSize: 9, fontWeight: 700,
                letterSpacing: '2.5px', textTransform: 'uppercase' as const,
                background: YELLOW, color: '#000', textDecoration: 'none', fontFamily: INTER,
              }}>
                Contact sales <ArrowRight size={11} />
              </Link>
              <a href="tel:+61200000000" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                padding: '11px 28px', fontSize: 9, fontWeight: 500,
                letterSpacing: '2.5px', textTransform: 'uppercase' as const,
                border: '1px solid #252525', color: INK,
                textDecoration: 'none', fontFamily: INTER,
                transition: 'border-color .3s, color .3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#555'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#252525'; (e.currentTarget as HTMLElement).style.color = INK }}
              >
                <Phone size={10} /> +61 2 0000 0000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{
        padding: '20px clamp(24px,7vw,100px)',
        borderTop: `1px solid ${HAIRLINE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap' as const, gap: 12,
      }}>
        <p style={{ fontSize: 10, fontWeight: 300, color: INK, fontFamily: INTER }}>
          © 2025 Briesa Pty Ltd · ABN 12 345 678 901
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms', 'Contact'].map(l => (
            <Link key={l} href="/" style={{
              fontSize: 10, fontWeight: 300, color: INK,
              textDecoration: 'none', transition: 'color .3s', fontFamily: INTER,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = INK)}
            >{l}</Link>
          ))}
        </div>
      </div>

    </div>
  )
}
