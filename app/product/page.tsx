'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight, Menu, X, CheckCircle2, ShieldCheck,
  Clock, TrendingUp, Zap, Lock, Globe, HeartHandshake,
} from 'lucide-react'

const YELLOW     = '#FFD940'
const HAIRLINE   = '#1e1e1e'
const HAIRLINE_MID = '#2a2a2a'
const INK        = '#5a5a5f'
const INTER      = `'Inter', Arial, sans-serif`
const GRAIN      = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

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

function GoldLine() {
  return <div style={{ width: 28, height: 1, background: YELLOW, marginBottom: 20 }} />
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const linkColor = scrolled ? INK : 'rgba(255,255,255,0.6)'
  const linkHover = scrolled ? '#000' : '#fff'
  const linkStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 500, letterSpacing: '2px',
    textTransform: 'uppercase', color: linkColor,
    textDecoration: 'none', transition: 'color .3s', fontFamily: INTER,
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '10px 48px' : '18px 48px',
        background: scrolled ? '#fff' : 'transparent',
        borderBottom: scrolled ? '1px solid #e8e8e8' : 'none',
        transition: 'background .4s ease, border-color .4s ease, padding .4s ease',
        fontFamily: INTER,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.3px', fontFamily: INTER, color: scrolled ? '#000' : '#fff', transition: 'color .4s ease' }}>Briesa</span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {[['Features', '/features'], ['Product', '/product'], ['About', '#about']].map(([label, href]) => (
            <Link key={label} href={href} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
            >{label}</Link>
          ))}
          <Link href="/pricing" style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
            onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
          >Pricing</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" style={linkStyle}>Log in</Link>
          <Link href="/login" style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: INTER,
            background: scrolled ? '#000' : 'transparent', color: '#fff',
            border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.4)',
            padding: '12px 24px', textDecoration: 'none', transition: 'background .3s, color .3s, border-color .3s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = YELLOW; el.style.color = '#000'; el.style.borderColor = 'transparent' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = scrolled ? '#000' : 'transparent'; el.style.color = '#fff'; el.style.borderColor = scrolled ? 'transparent' : 'rgba(255,255,255,0.4)' }}
          >Get Started</Link>
        </div>
        <button onClick={() => setOpen(v => !v)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {open ? <X size={22} color={scrolled ? '#000' : '#fff'} /> : <Menu size={22} color={scrolled ? '#000' : '#fff'} />}
        </button>
      </nav>
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#fff', paddingTop: 64, fontFamily: INTER }}>
          {[['Features', '/features'], ['Product', '/product'], ['About', '#about']].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)} style={{
              padding: '20px 28px', fontSize: 13, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
              color: '#000', textDecoration: 'none', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between',
            }}>{label} <span style={{ color: '#aaa' }}>→</span></Link>
          ))}
          <Link href="/pricing" onClick={() => setOpen(false)} style={{
            padding: '20px 28px', fontSize: 13, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
            color: '#000', textDecoration: 'none', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between',
          }}>Pricing <span style={{ color: '#aaa' }}>→</span></Link>
          <div style={{ padding: 28, borderTop: '1px solid #f0f0f0' }}>
            <Link href="/login" onClick={() => setOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: 16, background: '#000', color: '#fff',
              fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
            }}>Get Started</Link>
          </div>
        </div>
      )}
    </>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center 35%',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.4) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.2, mixBlendMode: 'overlay', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(28px,6vw,100px)', paddingTop: 'clamp(120px,16vh,160px)', maxWidth: 1100, width: '100%' }}>
        <p style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20, fontFamily: INTER }}>Why Briesa</p>
        <GoldLine />
        <h1 style={{
          fontSize: 'clamp(44px,7vw,96px)', fontWeight: 900,
          textTransform: 'uppercase', lineHeight: 0.88,
          letterSpacing: '-2px', color: '#fff',
          marginBottom: 32, fontFamily: INTER, maxWidth: 800,
        }}>
          COMPLIANCE<br />THAT ACTUALLY<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>WORKS.</em>
        </h1>
        <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: 520, marginBottom: 48, fontFamily: INTER }}>
          Built from the ground up for Australian industry — Briesa replaces the spreadsheets, email chains and manual checklists that put your business at risk every single day.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/login" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: INTER,
            background: YELLOW, color: '#000', padding: '16px 32px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>Start Free Trial <ArrowRight size={13} /></Link>
          <Link href="/features" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: INTER,
            color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '16px 32px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>See Features</Link>
        </div>
      </div>
    </section>
  )
}

// ── The Problem ───────────────────────────────────────────────────────────────
function Problem() {
  const pains = [
    'Compliance documents scattered across emails, USB drives and shared folders',
    'Contractor licences and insurances expiring without anyone noticing',
    'Incident reports filled out on paper — then lost before an audit',
    'Hours wasted pulling together records every time a regulator shows up',
    'No visibility across multiple sites — until something goes wrong',
    'SWMS and toolbox talks created from scratch every single time',
  ]

  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="split-grid">
          <div>
            <GoldLine />
            <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: INTER }}>The Problem</p>
            <h2 data-reveal data-delay="100" style={{
              fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900,
              textTransform: 'uppercase', lineHeight: 0.92,
              color: '#fff', marginBottom: 24, fontFamily: INTER,
            }}>
              COMPLIANCE IS<br />BROKEN FOR<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>MOST BUSINESSES.</em>
            </h2>
            <p data-reveal data-delay="200" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, fontFamily: INTER }}>
              Most Australian businesses are still managing compliance the same way they did 20 years ago. The tools haven't kept up — and the consequences are severe.
            </p>
          </div>
          <div>
            {pains.map((pain, i) => (
              <div key={i} data-reveal data-delay={`${i * 60}`} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: '16px 0', borderBottom: `1px solid ${HAIRLINE}`,
              }}>
                <div style={{ width: 6, height: 6, background: '#ef4444', borderRadius: '50%', flexShrink: 0, marginTop: 6 }} />
                <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', fontFamily: INTER }}>{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── The Solution ──────────────────────────────────────────────────────────────
function Solution() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#000', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.1, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <GoldLine />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: INTER }}>The Solution</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="split-grid">
          <div>
            <h2 data-reveal data-delay="100" style={{
              fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900,
              textTransform: 'uppercase', lineHeight: 0.92,
              color: '#fff', marginBottom: 24, fontFamily: INTER,
            }}>
              ONE PLATFORM.<br />TOTAL<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>CONTROL.</em>
            </h2>
            <p data-reveal data-delay="200" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, marginBottom: 36, fontFamily: INTER }}>
              Briesa brings every compliance workflow — incidents, contractors, training, audits, documents, AI tools — into one intelligent platform. Built for the way Australian industry actually works.
            </p>
            <Link href="/features" data-reveal data-delay="300" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: INTER,
              color: YELLOW, textDecoration: 'none', transition: 'gap .3s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '14px'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '8px'}
            >Explore all features <ArrowRight size={13} /></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[
              ['Incident tracking', 'Log and close hazards fast with auto-triggered corrective actions.'],
              ['Contractor hub', 'Every licence, insurance and induction — tracked and auto-alerted.'],
              ['AI document tools', 'Generate SWMS, risk assessments and toolbox talks in seconds.'],
              ['Audit-ready records', 'Export full compliance packs any time, for any inspection.'],
              ['Training records', 'Never miss an expiry. Monitor every worker across every site.'],
              ['Real-time scoring', 'Live compliance score across WHS, ISO, training and contractors.'],
            ].map(([title, desc], i) => (
              <div key={i} data-reveal data-delay={`${i * 50}`} style={{
                padding: '24px 20px', background: '#0a0a0a', border: `1px solid ${HAIRLINE}`,
                transition: 'background .3s, border-color .3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#111'; el.style.borderColor = YELLOW + '30' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0a0a0a'; el.style.borderColor = HAIRLINE }}
              >
                <div style={{ width: 5, height: 5, background: YELLOW, marginBottom: 12 }} />
                <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: INTER }}>{title}</p>
                <p style={{ fontSize: 11, fontWeight: 300, lineHeight: 1.55, color: INK, fontFamily: INTER }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Why Briesa ────────────────────────────────────────────────────────────────
function WhyBriesa() {
  const reasons = [
    {
      icon: ShieldCheck, color: '#22c55e',
      title: 'Built for compliance, not adapted for it',
      body: 'Every other tool is a generic project management app with compliance bolted on. Briesa was built from day one for WHS, ISO, contractor and training compliance — nothing else.',
    },
    {
      icon: Zap, color: YELLOW,
      title: 'AI that actually saves time',
      body: 'Generating a SWMS used to take half a day. With Briesa AI, it takes five minutes — using your actual project data, site conditions and worker requirements, not a blank template.',
    },
    {
      icon: Clock, color: '#3b82f6',
      title: 'Audit-ready in minutes, not weeks',
      body: 'When a regulator or client asks for your compliance records, you shouldn\'t need a week to prepare. Briesa keeps everything current and exports full audit packs on demand.',
    },
    {
      icon: TrendingUp, color: '#f59e0b',
      title: 'Real-time visibility across every site',
      body: 'See compliance scores, open incidents, expiring documents and contractor statuses across every site and project — from one dashboard, updated in real time.',
    },
    {
      icon: Lock, color: '#a855f7',
      title: 'Enterprise-grade security, Australian data',
      body: 'Your compliance data never leaves Australia. Briesa is SOC 2 compliant, with role-based permissions, full audit trails and enterprise SSO — so your data is always protected.',
    },
    {
      icon: HeartHandshake, color: '#ef4444',
      title: 'A team behind you, not just a product',
      body: 'Every plan includes a free onboarding call. Our compliance specialists help you configure Briesa for your specific industry, workflows and team size — not a generic setup wizard.',
    },
  ]

  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <GoldLine />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: INTER }}>Why Briesa</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 32 }}>
          <h2 data-reveal data-delay="100" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', fontFamily: INTER }}>
            THE PLATFORM<br />THAT PUTS YOU<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>AHEAD.</em>
          </h2>
          <p data-reveal data-delay="200" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, maxWidth: 380, fontFamily: INTER }}>
            Compliance isn't just about avoiding fines. It's about protecting your people, winning better clients and running a business that can scale.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {reasons.map(({ icon: Icon, color, title, body }, i) => (
            <div key={i} data-reveal data-delay={`${i * 60}`} style={{
              padding: '36px 32px', background: '#000',
              border: `1px solid ${HAIRLINE}`, borderTop: `2px solid ${color}`,
              transition: 'background .3s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#080808'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#000'}
            >
              <div style={{ width: 40, height: 40, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#fff', marginBottom: 12, fontFamily: INTER }}>{title}</p>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: INK, fontFamily: INTER }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Social proof ──────────────────────────────────────────────────────────────
function Proof() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#000', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.07,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.6))', }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }} className="proof-grid">
          {[
            { stat: '98%',    label: 'Audit pass rate',          sub: 'Across active Briesa customers' },
            { stat: '5 min',  label: 'To generate a full SWMS',  sub: 'Down from 4+ hours manually' },
            { stat: '60%',    label: 'Less time on admin',        sub: 'Reported by compliance teams' },
          ].map(({ stat, label, sub }, i) => (
            <div key={i} data-reveal data-delay={`${i * 80}`} style={{
              padding: 'clamp(32px,4vw,52px)',
              borderRight: i < 2 ? `1px solid ${HAIRLINE}` : undefined,
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 'clamp(44px,5vw,72px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-2px', color: YELLOW, fontFamily: INTER }}>{stat}</p>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', color: '#fff', margin: '12px 0 6px', fontFamily: INTER }}>{label}</p>
              <p style={{ fontSize: 11, fontWeight: 300, color: INK, fontFamily: INTER }}>{sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 2, marginTop: 2 }}>
          {[
            { quote: 'Briesa cut our audit prep from two weeks to two days. It\'s the compliance platform we\'ve been waiting for.', author: 'Michael Torres', role: 'HSE Manager · Apex Civil Group' },
            { quote: 'We used to lose track of contractor docs constantly. Now everything is in one place and we get alerts before anything expires.', author: 'Lisa Chen', role: 'Operations Director · Premier Labour Hire' },
            { quote: 'The AI tools are a game changer. Generating a SWMS used to take half a day — now it\'s five minutes.', author: 'James Walters', role: 'Site Manager · Stronghold Construction' },
          ].map(({ quote, author, role }, i) => (
            <div key={i} data-reveal data-delay={`${i * 80}`} style={{
              padding: '36px 32px', background: '#0a0a0a', border: `1px solid ${HAIRLINE}`,
            }}>
              <span style={{ fontSize: 32, lineHeight: 1, color: YELLOW, display: 'block', marginBottom: 16, fontFamily: INTER }}>"</span>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', marginBottom: 24, fontStyle: 'italic', fontFamily: INTER }}>{quote}</p>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: YELLOW, marginBottom: 4, fontFamily: INTER }}>{author}</p>
              <p style={{ fontSize: 10, fontWeight: 300, letterSpacing: '1px', textTransform: 'uppercase', color: INK, fontFamily: INTER }}>{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Comparison ────────────────────────────────────────────────────────────────
function Comparison() {
  const rows = [
    { label: 'Purpose-built for compliance',       briesa: true,  others: false },
    { label: 'Australian data hosting',            briesa: true,  others: false },
    { label: 'AI document generation',             briesa: true,  others: false },
    { label: 'Real-time compliance score',         briesa: true,  others: false },
    { label: 'Contractor portal (free)',           briesa: true,  others: false },
    { label: 'Audit-ready export packs',           briesa: true,  others: false },
    { label: 'ISO + WHS + training in one system', briesa: true,  others: false },
    { label: 'Dedicated onboarding on every plan', briesa: true,  others: false },
  ]

  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <GoldLine />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: INTER }}>Vs. The Alternatives</p>
        <h2 data-reveal data-delay="100" style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: 56, fontFamily: INTER }}>
          NOTHING ELSE<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>COMES CLOSE.</em>
        </h2>

        <div data-reveal data-delay="200">
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px', borderBottom: `1px solid ${HAIRLINE}`, paddingBottom: 14, marginBottom: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: INK, fontFamily: INTER }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: YELLOW, fontFamily: INTER, textAlign: 'center' }}>Briesa</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: INK, fontFamily: INTER, textAlign: 'center' }}>Others</span>
          </div>
          {rows.map(({ label, briesa, others }, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 160px 160px',
              padding: '14px 0', borderBottom: `1px solid ${HAIRLINE}`,
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
            }}>
              <span style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.6)', fontFamily: INTER }}>{label}</span>
              <span style={{ textAlign: 'center' }}>
                {briesa
                  ? <CheckCircle2 size={16} style={{ color: '#22c55e', margin: '0 auto', display: 'block' }} />
                  : <span style={{ color: HAIRLINE_MID, fontFamily: INTER, fontSize: 18, display: 'block', textAlign: 'center' }}>—</span>
                }
              </span>
              <span style={{ textAlign: 'center' }}>
                {others
                  ? <CheckCircle2 size={16} style={{ color: '#22c55e', margin: '0 auto', display: 'block' }} />
                  : <span style={{ color: HAIRLINE_MID, fontFamily: INTER, fontSize: 18, display: 'block', textAlign: 'center' }}>—</span>
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: YELLOW, fontFamily: INTER }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 20, fontFamily: INTER }}>Ready to get started?</p>
        <h2 data-reveal data-delay="100" style={{
          fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900, textTransform: 'uppercase',
          lineHeight: 0.88, letterSpacing: '0.5px', color: '#000', marginBottom: 24, fontFamily: INTER,
        }}>
          YOUR NEXT AUDIT<br />STARTS TODAY.
        </h2>
        <p data-reveal data-delay="200" style={{ fontSize: 15, fontWeight: 300, color: 'rgba(0,0,0,0.5)', marginBottom: 44, fontFamily: INTER }}>
          14-day free trial. No credit card required. Set up in under 30 minutes.
        </p>
        <div data-reveal data-delay="300" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: INTER,
            background: '#000', color: YELLOW, padding: '18px 40px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>Start Free Trial <ArrowRight size={13} /></Link>
          <Link href="/pricing" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: INTER,
            color: '#000', border: '2px solid rgba(0,0,0,0.22)', padding: '18px 40px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>View Pricing</Link>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, padding: 'clamp(40px,6vh,72px) clamp(24px,6vw,80px) clamp(24px,4vh,40px)', fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }} className="footer-grid">
          <div>
            <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 4, fontFamily: INTER }}>Briesa</p>
            <p style={{ fontSize: 9, fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', color: YELLOW, marginBottom: 20, fontFamily: INTER }}>Compliance Platform</p>
            <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: INK, maxWidth: 260, fontFamily: INTER }}>
              Australia's leading AI-powered compliance management platform for high-risk industries.
            </p>
          </div>
          {[
            { heading: 'Product',   links: ['Features', 'Pricing', 'Security', 'Integrations'] },
            { heading: 'Solutions', links: ['Construction', 'Labour Hire', 'Manufacturing', 'Mining'] },
            { heading: 'Company',   links: ['About', 'Blog', 'Careers', 'Contact'] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#fff', marginBottom: 24, fontFamily: INTER }}>{heading}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map(l => (
                  <li key={l} style={{ marginBottom: 14 }}>
                    <a href="#" style={{ fontSize: 13, fontWeight: 300, color: INK, textDecoration: 'none', fontFamily: INTER, transition: 'color .3s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = YELLOW)}
                      onMouseLeave={e => (e.currentTarget.style.color = INK)}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, borderTop: `1px solid ${HAIRLINE}`, flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 300, letterSpacing: '1px', color: INK, fontFamily: INTER }}>© 2025 Briesa Pty Ltd. All rights reserved. ABN 12 345 678 901</p>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Privacy Policy', 'Terms', 'Cookie Policy'].map(item => (
              <a key={item} href="#" style={{ fontSize: 11, fontWeight: 300, color: INK, textDecoration: 'none', fontFamily: INTER, transition: 'color .3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = INK)}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Global styles ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @media (max-width: 900px) {
        .split-grid  { grid-template-columns: 1fr !important; gap: 48px !important; }
        .proof-grid  { grid-template-columns: 1fr !important; }
        .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
      }
      @media (max-width: 600px) {
        .footer-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  useReveal()
  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', background: '#000', fontFamily: INTER }}>
        <Nav />
        <main>
          <Hero />
          <Problem />
          <Solution />
          <WhyBriesa />
          <Proof />
          <Comparison />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
