'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowRight, CheckCircle2, ArrowLeft, Phone } from 'lucide-react'

const YELLOW    = '#FFD940'
const HAIRLINE  = '#1e1e1e'
const HAIRLINE_MID = '#2a2a2a'
const INK       = '#5a5a5f'
const INTER     = `'Inter', Arial, sans-serif`
const GRAIN     = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const plans = [
  {
    name:     'Starter',
    price:    '$349',
    period:   '/month',
    tagline:  'Everything you need to get compliance under control.',
    hi:       false,
    badge:    null,
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
    cta:      'Start free trial',
    ctaHref:  '/login/user',
  },
  {
    name:     'Professional',
    price:    '$489',
    period:   '/month',
    tagline:  'The full platform for growing compliance teams.',
    hi:       true,
    badge:    'Most Popular',
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
    cta:      'Start free trial',
    ctaHref:  '/login/user',
  },
  {
    name:     'Enterprise',
    price:    'Custom',
    period:   '',
    tagline:  'Tailored for large organisations and multi-site operations.',
    hi:       false,
    badge:    null,
    features: [
      'Unlimited users & sites',
      'Custom integrations & API',
      'Dedicated account manager',
      'White-label options',
      'SLA guarantee',
      'On-site onboarding & training',
      'Advanced analytics & reporting',
      'Custom data retention',
    ],
    cta:      'Contact sales',
    ctaHref:  '/login/user',
  },
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
    }, { threshold: 0.1 })
    els.forEach(el => {
      const h = el as HTMLElement
      h.style.opacity = '0'
      h.style.transform = 'translateY(32px)'
      h.style.transition = 'opacity .8s cubic-bezier(.23,1,.32,1), transform .8s cubic-bezier(.23,1,.32,1)'
      obs.observe(h)
    })
    return () => obs.disconnect()
  }, [])
}

export default function PricingPage() {
  useReveal()

  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: INTER }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 48px', background: '#fff', borderBottom: '1px solid #e8e8e8',
        fontFamily: INTER,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#000', fontFamily: INTER }}>
            brie<span style={{ color: YELLOW }}>sa</span>
          </span>
        </Link>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 10, fontWeight: 500, letterSpacing: '2px',
          textTransform: 'uppercase' as const, color: INK,
          textDecoration: 'none', transition: 'color .3s', fontFamily: INTER,
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#000')}
          onMouseLeave={e => (e.currentTarget.style.color = INK)}
        >
          <ArrowLeft size={12} /> Back to site
        </Link>
      </nav>

      {/* Hero */}
      <div style={{
        position: 'relative', paddingTop: 160, paddingBottom: 80,
        paddingLeft: 'clamp(24px,6vw,80px)', paddingRight: 'clamp(24px,6vw,80px)',
        textAlign: 'center', overflow: 'hidden',
      }}>
        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: GRAIN, opacity: 0.18, mixBlendMode: 'overlay' as const,
        }} />
        {/* Faint radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 800px 500px at 50% 0%, rgba(255,217,64,0.07) 0%, transparent 70%)`,
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Gold line */}
          <div style={{ width: 32, height: 1, background: YELLOW, margin: '0 auto 20px' }} />
          <p style={{
            fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontFamily: INTER,
          }}>Simple, transparent pricing</p>
          <h1 style={{
            fontSize: 'clamp(36px,6vw,80px)', fontWeight: 900,
            textTransform: 'uppercase' as const, lineHeight: 0.9,
            letterSpacing: '-0.5px', color: '#fff',
            marginBottom: 20, fontFamily: INTER,
          }}>
            PRICING THAT<br />
            <span style={{ color: YELLOW }}>SCALES WITH YOU.</span>
          </h1>
          <p style={{
            fontSize: 15, fontWeight: 300, lineHeight: 1.7,
            color: INK, maxWidth: 480, margin: '0 auto',
            fontFamily: INTER,
          }}>
            All plans include a 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div style={{
        padding: '0 clamp(24px,6vw,80px) clamp(60px,10vh,120px)',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {plans.map(({ name, price, period, tagline, hi, badge, features, cta, ctaHref }, i) => (
            <div
              key={name}
              data-reveal
              data-delay={`${i * 80}`}
              style={{
                padding: '48px 40px',
                background: hi ? '#0d0d0d' : '#000',
                border: hi ? `2px solid ${YELLOW}` : `1px solid ${HAIRLINE}`,
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Badge */}
              {badge && (
                <p style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '3px',
                  textTransform: 'uppercase' as const, color: YELLOW,
                  marginBottom: 14, fontFamily: INTER,
                }}>● {badge}</p>
              )}

              {/* Name */}
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: hi ? '#fff' : INK,
                marginBottom: 10, fontFamily: INTER,
              }}>{name}</p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                <span style={{
                  fontSize: 'clamp(44px,5vw,64px)', fontWeight: 900, lineHeight: 1,
                  color: hi ? YELLOW : '#fff', letterSpacing: '-1px', fontFamily: INTER,
                }}>{price}</span>
                {period && (
                  <span style={{ fontSize: 13, fontWeight: 300, color: INK, fontFamily: INTER }}>{period}</span>
                )}
              </div>

              <p style={{ fontSize: 13, fontWeight: 300, color: INK, lineHeight: 1.7, marginBottom: 36, fontFamily: INTER }}>
                {tagline}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: HAIRLINE, marginBottom: 28 }} />

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', flex: 1 }}>
                {features.map(f => (
                  <li key={f} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    marginBottom: 12, fontSize: 13, fontWeight: 300,
                    color: 'rgba(255,255,255,0.65)', fontFamily: INTER,
                  }}>
                    <CheckCircle2 size={14} style={{ color: hi ? YELLOW : '#22c55e', flexShrink: 0, marginTop: 1 }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={ctaHref} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '15px 0', fontSize: 10, fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase' as const,
                textDecoration: 'none', fontFamily: INTER,
                background: hi ? YELLOW : 'transparent',
                color: hi ? '#000' : '#fff',
                border: hi ? 'none' : `1px solid ${HAIRLINE_MID}`,
                transition: 'opacity .3s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                {cta} <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ-style reassurance */}
        <div style={{ marginTop: 80 }}>
          <div style={{ width: 32, height: 1, background: YELLOW, marginBottom: 20 }} />
          <p data-reveal style={{
            fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.3)', marginBottom: 56, fontFamily: INTER,
          }}>All plans include</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {[
              { title: '14-day free trial',       desc: 'Full access to your plan, no credit card required.' },
              { title: 'No lock-in contracts',    desc: 'Monthly billing. Cancel any time, no questions asked.' },
              { title: 'Australian data hosting', desc: 'Your data stays in Australia on AWS ap-southeast-2.' },
              { title: 'SOC 2 compliant',         desc: 'Enterprise-grade security and access controls.' },
              { title: 'Free onboarding call',    desc: 'A guided setup call with our team on every plan.' },
              { title: 'Ongoing updates',         desc: 'New features and AI tools released regularly at no extra cost.' },
            ].map(({ title, desc }, i) => (
              <div key={i} data-reveal data-delay={`${i * 50}`} style={{
                padding: '32px 28px', border: `1px solid ${HAIRLINE}`,
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', color: '#fff', marginBottom: 10, fontFamily: INTER }}>{title}</p>
                <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: INK, fontFamily: INTER }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div data-reveal style={{
          marginTop: 4, padding: '52px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap' as const, gap: 32,
          border: `1px solid ${HAIRLINE_MID}`, background: '#0a0a0a',
        }}>
          <div>
            <div style={{ width: 32, height: 1, background: YELLOW, marginBottom: 16 }} />
            <h2 style={{
              fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 900,
              textTransform: 'uppercase' as const, lineHeight: 0.92,
              color: '#fff', marginBottom: 12, fontFamily: INTER,
            }}>
              NEED SOMETHING<br />
              <span style={{ color: YELLOW }}>CUSTOM?</span>
            </h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: INK, maxWidth: 420, lineHeight: 1.7, fontFamily: INTER }}>
              Multi-site operations, custom integrations, white-label deployments, or volume pricing — talk to our team and we'll build a plan around your business.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12, flexShrink: 0 }}>
            <Link href="/login/user" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '15px 32px', fontSize: 10, fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase' as const,
              background: YELLOW, color: '#000',
              textDecoration: 'none', fontFamily: INTER,
            }}>
              Contact sales <ArrowRight size={13} />
            </Link>
            <a href="tel:+61200000000" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 32px', fontSize: 10, fontWeight: 500,
              letterSpacing: '2px', textTransform: 'uppercase' as const,
              border: `1px solid ${HAIRLINE_MID}`, color: INK,
              textDecoration: 'none', fontFamily: INTER,
            }}>
              <Phone size={12} /> +61 2 0000 0000
            </a>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div style={{
        padding: '28px clamp(24px,6vw,80px)',
        borderTop: `1px solid ${HAIRLINE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap' as const, gap: 16,
      }}>
        <p style={{ fontSize: 11, color: INK, fontFamily: INTER }}>
          © 2025 Briesa Pty Ltd · ABN 12 345 678 901
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms', 'Contact'].map(item => (
            <Link key={item} href="/" style={{
              fontSize: 11, color: INK, textDecoration: 'none',
              fontFamily: INTER, transition: 'color .3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = INK)}
            >{item}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
