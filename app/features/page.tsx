'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight, BarChart3, ClipboardCheck, GraduationCap,
  AlertTriangle, Building2, FileText, Zap, Users, Menu, X,
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

function GoldLine({ center = false }: { center?: boolean }) {
  return (
    <div style={{
      width: 28, height: 1, background: YELLOW, marginBottom: 20,
      marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0,
    }} />
  )
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
    textDecoration: 'none', transition: 'color .3s',
    fontFamily: INTER,
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
          <span style={{
            fontSize: 18, fontWeight: 900, letterSpacing: '-0.3px', fontFamily: INTER,
            color: scrolled ? '#000' : '#fff',
            transition: 'color .4s ease',
          }}>Briesa</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[['Product', '/product'], ['About', '#about']].map(([label, href]) => (
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
            fontSize: 11, fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', fontFamily: INTER,
            background: scrolled ? '#000' : 'transparent',
            color: '#fff',
            border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.4)',
            padding: '12px 24px', textDecoration: 'none',
            transition: 'background .3s, color .3s, border-color .3s',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = YELLOW; el.style.color = '#000'; el.style.borderColor = 'transparent'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = scrolled ? '#000' : 'transparent'
              el.style.color = '#fff'
              el.style.borderColor = scrolled ? 'transparent' : 'rgba(255,255,255,0.4)'
            }}
          >Get Started</Link>
        </div>

        <button onClick={() => setOpen(v => !v)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {open ? <X size={22} color={scrolled ? '#000' : '#fff'} /> : <Menu size={22} color={scrolled ? '#000' : '#fff'} />}
        </button>
      </nav>

      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#fff', paddingTop: 64, fontFamily: INTER }}>
          {[['Product', '/product'], ['About', '#about']].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)} style={{
              padding: '20px 28px', fontSize: 13, fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: '#000', textDecoration: 'none', borderBottom: '1px solid #f0f0f0',
              display: 'flex', justifyContent: 'space-between',
            }}>
              {label} <span style={{ color: '#aaa' }}>→</span>
            </Link>
          ))}
          <Link href="/pricing" onClick={() => setOpen(false)} style={{
            padding: '20px 28px', fontSize: 13, fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: '#000', textDecoration: 'none', borderBottom: '1px solid #f0f0f0',
            display: 'flex', justifyContent: 'space-between',
          }}>
            Pricing <span style={{ color: '#aaa' }}>→</span>
          </Link>
          <div style={{ padding: 28, borderTop: '1px solid #f0f0f0' }}>
            <Link href="/login" onClick={() => setOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: 16,
              background: '#000', color: '#fff', fontSize: 11,
              fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
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
    <section style={{
      position: 'relative', overflow: 'hidden',
      minHeight: '52vh', display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: GRAIN, opacity: 0.2, mixBlendMode: 'overlay',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(28px,5vw,80px)',
        paddingBottom: 'clamp(60px,8vh,100px)',
        paddingTop: 'clamp(120px,16vh,160px)',
        maxWidth: 800,
      }}>
        <p style={{
          fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)', marginBottom: 20, fontFamily: INTER,
        }}>Platform Features</p>
        <GoldLine />
        <h1 style={{
          fontSize: 'clamp(40px,6vw,80px)', fontWeight: 900,
          textTransform: 'uppercase', lineHeight: 0.9,
          letterSpacing: '-1px', color: '#fff',
          marginBottom: 28, fontFamily: INTER,
        }}>
          EVERYTHING<br />YOU NEED TO<br />
          <em style={{ fontStyle: 'normal', color: YELLOW }}>STAY COMPLIANT.</em>
        </h1>
        <p style={{
          fontSize: 14, fontWeight: 300, lineHeight: 1.78,
          color: 'rgba(255,255,255,0.55)', maxWidth: 460, fontFamily: INTER,
        }}>
          From contractor onboarding to incident reporting — every compliance workflow in one place. No more spreadsheets, email threads, or missed expiry dates.
        </p>
      </div>
    </section>
  )
}

// ── Feature cards ─────────────────────────────────────────────────────────────
function Features() {
  const items = [
    { icon: BarChart3,     color: '#22c55e', title: 'Compliance Score',      desc: 'Real-time scoring across WHS, ISO, contractor and training compliance. Always know your audit readiness.' },
    { icon: Users,         color: '#3b82f6', title: 'Contractor Management', desc: 'Track insurance, licences, inductions and compliance scores for every contractor and subcontractor.' },
    { icon: AlertTriangle, color: '#ef4444', title: 'Incidents & Hazards',   desc: 'Log, investigate and close incidents fast. Auto-trigger corrective actions and track to completion.' },
    { icon: GraduationCap, color: '#f59e0b', title: 'Training Records',      desc: 'Monitor staff training completion, expiry dates and competency records across your workforce.' },
    { icon: ClipboardCheck,color: '#a855f7', title: 'Inspections & Audits',  desc: 'Digital checklists, site inspections, SWMS and pre-start forms — captured and stored automatically.' },
    { icon: Zap,           color: YELLOW,    title: 'AI-Powered Tools',      desc: 'Generate SWMS, toolbox talks, risk assessments and reports in seconds with built-in AI.' },
  ]

  return (
    <section id="features" style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#000', fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {items.map(({ icon: Icon, color, title, desc }, i) => (
            <div key={i} data-reveal data-delay={`${i * 60}`} style={{
              padding: '36px 32px', background: '#0a0a0a',
              border: `1px solid ${HAIRLINE}`, borderTop: `2px solid ${color}`,
              transition: 'background .3s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#111'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#0a0a0a'}
            >
              <div style={{ width: 40, height: 40, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#fff', marginBottom: 12, fontFamily: INTER }}>{title}</p>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: INK, fontFamily: INTER }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── By Industry ───────────────────────────────────────────────────────────────
function Solutions() {
  const items = [
    { icon: Building2, title: 'Construction & Building',   points: ['SWMS & JSEA management', 'Subcontractor compliance', 'Site inspection forms', 'Permit-to-work workflows'] },
    { icon: Users,     title: 'Labour Hire & Staffing',    points: ['Worker licence tracking', 'Induction management', 'Training expiry alerts', 'Compliance dashboards'] },
    { icon: FileText,  title: 'Manufacturing & Industrial', points: ['ISO 9001 / 45001 readiness', 'Plant & equipment registers', 'Chemical registers', 'Audit trail documentation'] },
  ]

  return (
    <section id="solutions" style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <GoldLine />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontFamily: INTER }}>By Industry</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 32 }}>
          <h2 data-reveal data-delay="100" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', fontFamily: INTER }}>
            BUILT FOR INDUSTRIES<br />THAT CAN'T<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>AFFORD TO FAIL</em>
          </h2>
          <p data-reveal data-delay="200" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, maxWidth: 360, fontFamily: INTER }}>
            Tailored compliance workflows for high-risk, regulated industries across Australia.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {items.map(({ icon: Icon, title, points }, i) => (
            <div key={i} data-reveal data-delay={`${i * 80}`} style={{ padding: '48px 36px', background: '#000', border: `1px solid ${HAIRLINE}` }}>
              <div style={{ width: 44, height: 44, border: `1px solid ${YELLOW}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
                <Icon size={18} style={{ color: YELLOW }} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', marginBottom: 24, fontFamily: INTER }}>{title}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {points.map(p => (
                  <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontSize: 13, fontWeight: 300, color: INK, fontFamily: INTER }}>
                    <span style={{ width: 1, height: 14, background: YELLOW, flexShrink: 0 }} />{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How It Works ──────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { num: '01', title: 'Onboard',     body: 'Set up your company, invite your team, and configure your compliance areas in under 30 minutes.' },
    { num: '02', title: 'Configure',   body: 'Customise inspection forms, SWMS templates and notification rules to match your operations.' },
    { num: '03', title: 'Automate',    body: 'Let Briesa chase expiries, trigger corrective actions, and generate compliance reports automatically.' },
    { num: '04', title: 'Audit-Ready', body: 'Export audit packs, compliance reports and records in seconds — any time, any inspection.' },
  ]
  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <GoldLine />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontFamily: INTER }}>How It Works</p>
        <h2 data-reveal data-delay="100" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: 72, fontFamily: INTER }}>
          THE BRIESA<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>EXPERIENCE</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }} className="process-grid">
          {steps.map(({ num, title, body }, i) => (
            <div key={i} data-reveal data-delay={`${i * 100}`} style={{
              padding: i === 0 ? '0 40px 0 0' : '0 40px',
              borderRight: i < 3 ? `1px solid ${HAIRLINE}` : undefined,
              position: 'relative',
            }}>
              <p style={{ fontSize: 80, fontWeight: 900, lineHeight: 1, color: HAIRLINE_MID, letterSpacing: '-3px', marginBottom: 24, fontFamily: INTER }}>{num}</p>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', marginBottom: 16, fontFamily: INTER }}>{title}</p>
              <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, fontFamily: INTER }}>{body}</p>
              {i < 3 && (
                <div style={{ position: 'absolute', top: 40, right: -1, width: 1, height: 100, background: `linear-gradient(to bottom, ${YELLOW}, transparent)` }} />
              )}
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
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 20, fontFamily: INTER }}>Get Started Today</p>
        <h2 data-reveal data-delay="100" style={{
          fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900,
          textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '0.5px',
          color: '#000', marginBottom: 24, fontFamily: INTER,
        }}>
          MAKE COMPLIANCE<br />YOUR COMPETITIVE<br />EDGE.
        </h2>
        <p data-reveal data-delay="200" style={{ fontSize: 15, fontWeight: 300, color: 'rgba(0,0,0,0.5)', marginBottom: 44, fontFamily: INTER }}>
          Join thousands of Australian businesses that trust Briesa to manage their compliance.
        </p>
        <div data-reveal data-delay="300" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', fontFamily: INTER,
            textTransform: 'uppercase',
            background: '#000', color: YELLOW,
            padding: '18px 40px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>Start Free Trial <ArrowRight size={13} /></Link>
          <Link href="/login" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', fontFamily: INTER,
            textTransform: 'uppercase', color: '#000',
            border: '2px solid rgba(0,0,0,0.22)',
            padding: '18px 40px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>Talk to Sales</Link>
        </div>
        <p data-reveal data-delay="400" style={{ fontSize: 11, color: 'rgba(0,0,0,0.38)', marginTop: 24, letterSpacing: '1px', fontFamily: INTER }}>
          14-day free trial · No credit card required · Cancel anytime
        </p>
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
            <p style={{ fontSize: 9, fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', color: YELLOW, marginBottom: 20, fontFamily: INTER }}>
              Compliance Platform
            </p>
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
          <p style={{ fontSize: 11, fontWeight: 300, letterSpacing: '1px', color: INK, fontFamily: INTER }}>
            © 2025 Briesa Pty Ltd. All rights reserved. ABN 12 345 678 901
          </p>
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
        .process-grid  { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        .footer-grid   { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
      }
      @media (max-width: 600px) {
        .process-grid { grid-template-columns: 1fr !important; }
        .footer-grid  { grid-template-columns: 1fr !important; }
      }
    `}</style>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FeaturesPage() {
  useReveal()

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', background: '#000', fontFamily: INTER }}>
        <Nav />
        <main>
          <Hero />
          <Features />
          <Solutions />
          <Process />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
