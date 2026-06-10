'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, Shield, LayoutDashboard, HardHat, CheckCircle2 } from 'lucide-react'

const YELLOW   = '#FFD940'
const HAIRLINE = '#1e1e1e'
const INK      = '#5a5a5f'
const INTER    = `'Inter', Arial, sans-serif`
const GRAIN    = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const portals = [
  {
    href:      '/login/user',
    label:     'Client Portal',
    icon:      Shield,
    accent:    YELLOW,
    badge:     null,
    badgeBg:   '',
    headline:  'Compliance & project management',
    desc:      'For builders, developers and businesses managing WHS, safety, contractors and build projects.',
    features:  ['Compliance dashboard & scoring', 'Build management portal', 'Contractor oversight', 'Incident & audit tracking'],
    cta:       'Log in',
    ctaBg:     YELLOW,
    ctaColor:  '#000',
    cardBg:    '#0a0a0a',
    border:    `2px solid ${YELLOW}`,
  },
  {
    href:      '/login/admin',
    label:     'Admin Portal',
    icon:      LayoutDashboard,
    accent:    '#fff',
    badge:     null,
    badgeBg:   '',
    headline:  'Platform administration',
    desc:      'For Briesa administrators managing client accounts, subscriptions, templates and platform settings.',
    features:  ['Client management', 'Billing & subscriptions', 'Template library', 'Platform analytics'],
    cta:       'Admin sign in',
    ctaBg:     '#fff',
    ctaColor:  '#000',
    cardBg:    '#000',
    border:    `1px solid #2a2a2a`,
  },
  {
    href:      '/contractor/login',
    label:     'Contractor Portal',
    icon:      HardHat,
    accent:    '#22c55e',
    badge:     'Free',
    badgeBg:   '#22c55e',
    headline:  'Your jobs & compliance docs',
    desc:      'For contractors and subcontractors. See assigned jobs, site guidelines, requirements and manage documents.',
    features:  ['View assigned jobs & scope', 'Site guidelines & PPE rules', 'Document submissions', 'Builder contact info'],
    cta:       'Sign up free',
    ctaBg:     '#22c55e',
    ctaColor:  '#fff',
    cardBg:    '#0a0a0a',
    border:    `2px solid #22c55e`,
  },
]

export default function LoginSelectorPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#000', fontFamily: INTER,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background construction photo — very dark */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
        opacity: 0.12,
      }} />
      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: GRAIN, opacity: 0.2, mixBlendMode: 'overlay' as const,
      }} />

      {/* Nav */}
      <header style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: `1px solid ${HAIRLINE}`,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: INTER }}>
            brie<span style={{ color: YELLOW }}>sa</span>
          </span>
        </Link>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 10, fontWeight: 500, letterSpacing: '2px',
          textTransform: 'uppercase' as const, color: INK,
          textDecoration: 'none', transition: 'color .3s', fontFamily: INTER,
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = INK)}
        >
          <ArrowLeft size={12} /> Back to site
        </Link>
      </header>

      {/* Content */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(40px,6vh,80px) clamp(24px,5vw,48px)',
      }}>
        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          {/* Gold line */}
          <div style={{ width: 32, height: 1, background: YELLOW, margin: '0 auto 20px' }} />
          <p style={{
            fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontFamily: INTER,
          }}>Select your portal</p>
          <h1 style={{
            fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900,
            textTransform: 'uppercase' as const, lineHeight: 0.92,
            letterSpacing: '0.5px', color: '#fff', fontFamily: INTER,
          }}>
            WHO ARE YOU<br />
            <span style={{ color: YELLOW }}>SIGNING IN AS?</span>
          </h1>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2, width: '100%', maxWidth: 1000,
        }}>
          {portals.map(({ href, label, icon: Icon, accent, badge, badgeBg, headline, desc, features, cta, ctaBg, ctaColor, cardBg, border }) => (
            <div key={href} style={{
              background: cardBg, border,
              padding: '44px 36px',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Icon + badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color: accent }} />
                </div>
                {badge && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: '2px',
                    textTransform: 'uppercase' as const, padding: '5px 10px',
                    background: badgeBg, color: '#fff', fontFamily: INTER,
                  }}>{badge}</span>
                )}
              </div>

              {/* Label + headline */}
              <p style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '3px',
                textTransform: 'uppercase' as const, color: accent,
                marginBottom: 8, fontFamily: INTER,
              }}>{label}</p>
              <h2 style={{
                fontSize: 16, fontWeight: 900, lineHeight: 1.2,
                color: '#fff', marginBottom: 12, fontFamily: INTER,
              }}>{headline}</h2>
              <p style={{
                fontSize: 13, fontWeight: 300, lineHeight: 1.7,
                color: INK, marginBottom: 24, fontFamily: INTER, flex: 1,
              }}>{desc}</p>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                {features.map(f => (
                  <li key={f} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    marginBottom: 10, fontSize: 12, fontWeight: 300,
                    color: INK, fontFamily: INTER,
                  }}>
                    <CheckCircle2 size={11} style={{ color: accent, flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={href} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 0', fontSize: 10, fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase' as const,
                textDecoration: 'none', fontFamily: INTER,
                background: ctaBg, color: ctaColor,
              }}>
                {cta} <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
