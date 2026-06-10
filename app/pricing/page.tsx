'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, ArrowLeft, Phone, Shield, Zap, Building2 } from 'lucide-react'

const YELLOW   = '#FFD940'
const HAIRLINE = '#1e1e1e'
const INK      = '#5a5a5f'
const INTER    = `'Inter', Arial, sans-serif`
const GRAIN    = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const plans = [
  {
    name:    'Starter',
    price:   '$349',
    period:  '/month',
    tagline: 'Everything you need to get compliance under control.',
    hi:      false,
    badge:   null,
    icon:    Shield,
    photo:   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Up to 15 users',
      'Core compliance modules',
      'Incident & hazard tracking',
      'Contractor management',
      'Document storage (10 GB)',
      'Pre-built inspection forms',
      'Email & chat support',
      '14-day free trial',
    ],
    cta: 'Start free trial',
  },
  {
    name:    'Professional',
    price:   '$489',
    period:  '/month',
    tagline: 'The full platform for growing compliance teams.',
    hi:      true,
    badge:   'Most Popular',
    icon:    Zap,
    photo:   'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Up to 50 users',
      'All compliance modules',
      'AI tools & template generator',
      'Build management portal',
      'Contractor portal access',
      'Document storage (50 GB)',
      'Custom inspection forms',
      'Priority support & onboarding',
    ],
    cta: 'Start free trial',
  },
  {
    name:    'Enterprise',
    price:   'Custom',
    period:  '',
    tagline: 'Tailored for large organisations and multi-site operations.',
    hi:      false,
    badge:   null,
    icon:    Building2,
    photo:   'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Unlimited users & sites',
      'Custom integrations & API',
      'Dedicated account manager',
      'White-label options',
      'SLA guarantee',
      'On-site onboarding & training',
      'Advanced analytics',
      'Custom data retention',
    ],
    cta: 'Contact sales',
  },
]

const included = [
  { title: '14-day free trial',       desc: 'Full access, no credit card required.' },
  { title: 'No lock-in contracts',    desc: 'Monthly billing. Cancel any time.' },
  { title: 'Australian data hosting', desc: 'Your data stays in Australia.' },
  { title: 'SOC 2 compliant',         desc: 'Enterprise-grade security controls.' },
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
      h.style.transform = 'translateY(28px)'
      h.style.transition = 'opacity .8s cubic-bezier(.23,1,.32,1), transform .8s cubic-bezier(.23,1,.32,1)'
      obs.observe(h)
    })
    return () => obs.disconnect()
  }, [])
}

// ── Pricing card ──────────────────────────────────────────────────────────────
function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = plan.icon

  return (
    <div
      data-reveal
      data-delay={`${index * 100}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '52px 44px',
        background: plan.hi ? '#0a0a0a' : '#000',
        border: plan.hi ? `2px solid ${YELLOW}` : `1px solid ${HAIRLINE}`,
        transition: 'border-color .4s ease',
        ...(hovered && !plan.hi ? { borderColor: '#333' } : {}),
      }}
    >
      {/* ── Background photo (revealed on hover) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('${plan.photo}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: hovered ? 0.13 : 0,
        transition: 'opacity .6s cubic-bezier(.23,1,.32,1)',
        filter: 'grayscale(30%)',
      }} />
      {/* Extra dark vignette so text stays crisp */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity .6s ease',
      }} />
      {/* Grain on top */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        backgroundImage: GRAIN, opacity: hovered ? 0.15 : 0,
        mixBlendMode: 'overlay' as const,
        transition: 'opacity .6s ease',
      }} />

      {/* ── Content (above photo) ── */}
      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Badge */}
        {plan.badge && (
          <p style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase' as const, color: YELLOW,
            marginBottom: 16, fontFamily: INTER,
          }}>● {plan.badge}</p>
        )}

        {/* Icon + name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{
            width: 40, height: 40,
            border: `1px solid ${plan.hi ? YELLOW + '40' : '#2a2a2a'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color .4s',
          }}>
            <Icon size={17} style={{ color: plan.hi ? YELLOW : 'rgba(255,255,255,0.4)' }} />
          </div>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase' as const,
            color: plan.hi ? '#fff' : INK,
            fontFamily: INTER,
          }}>{plan.name}</p>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{
              fontSize: 'clamp(48px,5.5vw,72px)', fontWeight: 900, lineHeight: 1,
              letterSpacing: '-2px', fontFamily: INTER,
              color: plan.hi ? YELLOW : '#fff',
              transition: 'color .3s',
            }}>{plan.price}</span>
            {plan.period && (
              <span style={{ fontSize: 13, fontWeight: 300, color: INK, fontFamily: INTER }}>
                {plan.period}
              </span>
            )}
          </div>
        </div>

        <p style={{
          fontSize: 13, fontWeight: 300, lineHeight: 1.7,
          color: INK, marginBottom: 32, fontFamily: INTER,
        }}>{plan.tagline}</p>

        {/* Divider */}
        <div style={{
          height: 1,
          background: plan.hi
            ? `linear-gradient(to right, ${YELLOW}40, transparent)`
            : `linear-gradient(to right, #2a2a2a, transparent)`,
          marginBottom: 28,
        }} />

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 44px', flex: 1 }}>
          {plan.features.map(f => (
            <li key={f} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              marginBottom: 11, fontSize: 13, fontWeight: 300,
              color: 'rgba(255,255,255,0.6)', fontFamily: INTER,
            }}>
              <CheckCircle2 size={13} style={{
                color: plan.hi ? YELLOW : '#22c55e',
                flexShrink: 0, marginTop: 2,
              }} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/login/user" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '15px 0', fontSize: 10, fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase' as const,
          textDecoration: 'none', fontFamily: INTER,
          background: plan.hi ? YELLOW : 'transparent',
          color: plan.hi ? '#000' : 'rgba(255,255,255,0.7)',
          border: plan.hi ? 'none' : '1px solid #2a2a2a',
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
            if (!plan.hi) { el.style.borderColor = '#2a2a2a'; el.style.color = 'rgba(255,255,255,0.7)' }
          }}
        >
          {plan.cta} <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  useReveal()

  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: INTER }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 48px', background: '#fff', borderBottom: '1px solid #e8e8e8',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#000', fontFamily: INTER }}>
            brie<span style={{ color: YELLOW }}>sa</span>
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link href="/" style={{
            fontSize: 10, fontWeight: 500, letterSpacing: '2px',
            textTransform: 'uppercase' as const, color: INK,
            textDecoration: 'none', transition: 'color .3s', fontFamily: INTER,
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#000')}
            onMouseLeave={e => (e.currentTarget.style.color = INK)}
          >Features</Link>
          <Link href="/login" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase' as const, fontFamily: INTER,
            background: '#000', color: '#fff',
            padding: '10px 20px', textDecoration: 'none',
            transition: 'background .3s, color .3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = YELLOW; (e.currentTarget as HTMLElement).style.color = '#000' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#000'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          >Log in</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        position: 'relative',
        paddingTop: 'clamp(120px,16vh,180px)',
        paddingBottom: 'clamp(60px,8vh,100px)',
        paddingLeft: 'clamp(24px,8vw,120px)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 700px 500px at 60% 50%, rgba(255,217,64,0.05) 0%, transparent 70%)`,
        }} />

        <p style={{
          fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.35)', marginBottom: 20, fontFamily: INTER,
        }}>Pricing</p>

        {/* Gold line */}
        <div style={{ width: 32, height: 1, background: YELLOW, marginBottom: 24 }} />

        <h1 style={{
          fontSize: 'clamp(44px,7vw,96px)', fontWeight: 900,
          textTransform: 'uppercase' as const, lineHeight: 0.88,
          letterSpacing: '-1.5px', color: '#fff',
          marginBottom: 28, fontFamily: INTER,
          maxWidth: 700,
        }}>
          SIMPLE.<br />TRANSPARENT.<br />
          <em style={{ fontStyle: 'normal', color: YELLOW }}>NO SURPRISES.</em>
        </h1>

        <p style={{
          fontSize: 15, fontWeight: 300, lineHeight: 1.75,
          color: INK, maxWidth: 440, fontFamily: INTER,
        }}>
          Start with a 14-day free trial on any plan. No credit card. No lock-in. Cancel any time.
        </p>
      </div>

      {/* Plans grid */}
      <div style={{
        padding: '0 clamp(24px,6vw,80px) clamp(80px,10vh,120px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
          maxWidth: 1200, margin: '0 auto',
        }}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* "All plans include" */}
        <div style={{ maxWidth: 1200, margin: '80px auto 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48 }}>
            <div style={{ width: 32, height: 1, background: YELLOW, flexShrink: 0 }} />
            <p style={{
              fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.3)', fontFamily: INTER,
            }}>Everything included, on every plan</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
          }}>
            {included.map(({ title, desc }, i) => (
              <div key={i} data-reveal data-delay={`${i * 50}`} style={{
                padding: '28px 28px',
                border: `1px solid ${HAIRLINE}`,
              }}>
                <div style={{ width: 6, height: 6, background: YELLOW, marginBottom: 14 }} />
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', color: '#fff', marginBottom: 8, fontFamily: INTER }}>{title}</p>
                <p style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.6, color: INK, fontFamily: INTER }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise band */}
        <div
          data-reveal
          style={{
            maxWidth: 1200, margin: '4px auto 0',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Subtle construction photo behind enterprise band */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.08, filter: 'grayscale(50%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 100%)',
          }} />

          <div style={{
            position: 'relative', zIndex: 2,
            padding: '56px 52px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap' as const, gap: 40,
            border: `1px solid #2a2a2a`,
            background: 'transparent',
          }}>
            <div>
              <div style={{ width: 32, height: 1, background: YELLOW, marginBottom: 20 }} />
              <h2 style={{
                fontSize: 'clamp(24px,3vw,42px)', fontWeight: 900,
                textTransform: 'uppercase' as const, lineHeight: 0.9,
                color: '#fff', marginBottom: 14, fontFamily: INTER,
              }}>
                NEED SOMETHING<br />
                <span style={{ color: YELLOW }}>CUSTOM?</span>
              </h2>
              <p style={{
                fontSize: 14, fontWeight: 300, color: INK,
                maxWidth: 460, lineHeight: 1.75, fontFamily: INTER,
              }}>
                Multi-site operations, custom integrations, white-label deployments or volume pricing — our team will build a plan around your business.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, flexShrink: 0 }}>
              <Link href="/login/user" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '15px 36px', fontSize: 10, fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase' as const,
                background: YELLOW, color: '#000', textDecoration: 'none', fontFamily: INTER,
              }}>
                Contact sales <ArrowRight size={13} />
              </Link>
              <a href="tel:+61200000000" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 36px', fontSize: 10, fontWeight: 500,
                letterSpacing: '2px', textTransform: 'uppercase' as const,
                border: '1px solid #2a2a2a', color: INK,
                textDecoration: 'none', fontFamily: INTER,
                transition: 'border-color .3s, color .3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#555'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.color = INK }}
              >
                <Phone size={12} /> +61 2 0000 0000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{
        padding: '24px clamp(24px,6vw,80px)',
        borderTop: `1px solid ${HAIRLINE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap' as const, gap: 12,
      }}>
        <p style={{ fontSize: 11, fontWeight: 300, color: INK, fontFamily: INTER }}>
          © 2025 Briesa Pty Ltd · ABN 12 345 678 901
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms', 'Contact'].map(l => (
            <Link key={l} href="/" style={{
              fontSize: 11, fontWeight: 300, color: INK,
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
