'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, HardHat, CheckCircle2, Menu, X,
  Shield, BarChart3, ClipboardCheck, GraduationCap,
  AlertTriangle, Building2, FileText, Zap, Users,
} from 'lucide-react'

// ── Brand ─────────────────────────────────────────────────────────────────────
const YELLOW   = '#FFD940'
const HAIRLINE = '#1e1e1e'
const HAIRLINE_MID = '#2a2a2a'
const INK      = '#5a5a5f'
const INTER    = `'Inter', Arial, sans-serif`

// Grain SVG (identical to Innovate Web)
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

// Unsplash construction photos
const PHOTOS = {
  hero:      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
  platform:  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80',
  ai:        'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1920&q=80',
}

// ── Cursor (Innovate-style) ───────────────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) { dotRef.current.style.left = mx + 'px'; dotRef.current.style.top = my + 'px' }
    }
    let id: number
    const loop = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' }
      id = requestAnimationFrame(loop)
    }
    loop()
    document.addEventListener('mousemove', onMove)
    document.body.style.cursor = 'none'
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(id)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
        width: 10, height: 10, borderRadius: '50%', background: '#fff',
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'difference' as const,
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none',
        width: 40, height: 40, borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.4)',
        transform: 'translate(-50%,-50%)',
        transition: 'width .35s ease, height .35s ease',
      }} />
    </>
  )
}

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, Number(el.dataset.delay ?? 0))
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => {
      const h = el as HTMLElement
      h.style.opacity = '0'
      h.style.transform = 'translateY(36px)'
      h.style.transition = 'opacity .9s cubic-bezier(.23,1,.32,1), transform .9s cubic-bezier(.23,1,.32,1)'
      obs.observe(h)
    })
    return () => obs.disconnect()
  }, [])
}

function useCounters() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-count]')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !(e.target as HTMLElement).dataset.done) {
          const el = e.target as HTMLElement
          el.dataset.done = 'true'
          const target = parseFloat(el.dataset.count!)
          const isFloat = el.dataset.count!.includes('.')
          let cur = 0; const dur = 2000, step = 16, steps = dur / step
          const t = setInterval(() => {
            cur += target / steps
            if (cur >= target) { cur = target; clearInterval(t) }
            el.textContent = isFloat ? cur.toFixed(1) : Math.floor(cur).toString()
          }, step)
        }
      })
    }, { threshold: 0.5 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function GrainOverlay({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      backgroundImage: GRAIN, opacity, mixBlendMode: 'overlay' as const,
    }} />
  )
}

function GoldLine({ center = false }: { center?: boolean }) {
  return (
    <div style={{
      width: 32, height: 1, background: YELLOW, marginBottom: 20,
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

  const linkStyle = {
    fontSize: 11, fontWeight: 500, letterSpacing: '2px',
    textTransform: 'uppercase' as const, color: linkColor,
    textDecoration: 'none', transition: 'color .3s', cursor: 'none',
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
          }}>
            Briesa
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Solutions', 'About'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
            >{item}</a>
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
            textTransform: 'uppercase' as const, fontFamily: INTER,
            background: scrolled ? '#000' : 'transparent',
            color: scrolled ? '#fff' : '#fff',
            border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.4)',
            padding: '12px 24px', textDecoration: 'none', cursor: 'none',
            transition: 'background .3s, color .3s, border-color .3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = YELLOW; (e.currentTarget as HTMLElement).style.color = '#000'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent' }}
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
          {['Features', 'Solutions', 'About'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} style={{
              padding: '20px 28px', fontSize: 13, fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase' as const,
              color: '#000', textDecoration: 'none', borderBottom: '1px solid #f0f0f0',
              display: 'flex', justifyContent: 'space-between',
            }}>
              {item} <span style={{ color: '#aaa' }}>→</span>
            </a>
          ))}
          <Link href="/pricing" onClick={() => setOpen(false)} style={{
            padding: '20px 28px', fontSize: 13, fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase' as const,
            color: '#000', textDecoration: 'none', borderBottom: '1px solid #f0f0f0',
            display: 'flex', justifyContent: 'space-between',
          }}>
            Pricing <span style={{ color: '#aaa' }}>→</span>
          </Link>
          <div style={{ padding: 28, marginTop: 'auto', borderTop: '1px solid #f0f0f0' }}>
            <Link href="/login" onClick={() => setOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: 16,
              background: '#000', color: '#fff', fontSize: 11,
              fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase' as const, textDecoration: 'none',
            }}>Log In</Link>
          </div>
        </div>
      )}
    </>
  )
}

// ── Sticky hero stack ─────────────────────────────────────────────────────────
function StickyStack() {
  const heroBgRef = useRef<HTMLDivElement>(null)

  // Parallax on hero bg (same technique as Innovate)
  useEffect(() => {
    const onScroll = () => {
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `scale(1.06) translateY(${window.scrollY * 0.28}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const panelBase: React.CSSProperties = {
    position: 'sticky', top: 0, height: '100vh',
    overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
    fontFamily: INTER,
  }

  const contentBase: React.CSSProperties = {
    position: 'relative', zIndex: 2,
    padding: 'clamp(28px,5vw,80px)',
    paddingBottom: 'clamp(60px,8vh,100px)',
  }

  const overlay: React.CSSProperties = {
    position: 'absolute', inset: 0, zIndex: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,0.97) 100%)',
  }

  const eyebrow: React.CSSProperties = {
    fontSize: 10, fontWeight: 400, letterSpacing: '4px',
    textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.55)',
    marginBottom: 20, fontFamily: INTER,
  }

  const headline: React.CSSProperties = {
    fontSize: 'clamp(40px,6.5vw,86px)',
    fontWeight: 900, lineHeight: 0.9,
    letterSpacing: '-1px', textTransform: 'uppercase' as const,
    color: '#fff', marginBottom: 24, fontFamily: INTER,
  }

  const body: React.CSSProperties = {
    fontSize: 14, fontWeight: 300, lineHeight: 1.78,
    color: 'rgba(255,255,255,0.55)', maxWidth: 420,
    marginBottom: 40, fontFamily: INTER,
  }

  const btnYellow: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, letterSpacing: '2px',
    textTransform: 'uppercase' as const, fontFamily: INTER,
    background: YELLOW, color: '#000',
    padding: '16px 32px', textDecoration: 'none', cursor: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  }

  const btnGhost: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, letterSpacing: '2px',
    textTransform: 'uppercase' as const, fontFamily: INTER,
    color: '#fff', border: '1px solid rgba(255,255,255,0.35)',
    padding: '16px 32px', textDecoration: 'none', cursor: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  }

  return (
    <div style={{ height: '300vh' }}>

      {/* ── Panel 1: Hero ── */}
      <section style={{ ...panelBase, zIndex: 1 }}>
        {/* Parallax bg */}
        <div ref={heroBgRef} style={{
          position: 'absolute', inset: '-5%',
          backgroundImage: `url('${PHOTOS.hero}')`,
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          transform: 'scale(1.06)',
          willChange: 'transform',
        }} />
        <div style={overlay} />
        <GrainOverlay opacity={0.22} />

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 40, right: 60, zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 1, height: 60,
            background: `linear-gradient(to bottom, ${YELLOW}, transparent)`,
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
          <span style={{
            fontSize: 9, fontWeight: 500, letterSpacing: '3px',
            textTransform: 'uppercase' as const, color: INK, fontFamily: INTER,
            writingMode: 'vertical-rl' as const,
          }}>Scroll</span>
        </div>

        <div style={{ ...contentBase, maxWidth: 900 }}>
          <p style={{ ...eyebrow, animation: 'fadeUp .9s .3s both' }}>
            AI-Powered Compliance Management
          </p>
          <h1 style={{ ...headline, animation: 'fadeUp .9s .5s both' }}>
            COMPLIANCE.<br />
            <em style={{ fontStyle: 'normal', color: YELLOW }}>SIMPLIFIED.</em><br />
            AUDIT-READY<br />BY DESIGN.
          </h1>
          <p style={{ ...body, animation: 'fadeUp .9s .7s both' }}>
            One platform to centralise, automate and manage WHS, ISO, contractor and training compliance — built for Australian businesses that can't afford to fail an audit.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const, animation: 'fadeUp .9s .9s both' }}>
            <Link href="/login" style={btnYellow}>Start Free Trial <ArrowRight size={13} /></Link>
            <Link href="/login" style={btnGhost}>View Demo</Link>
          </div>
        </div>
      </section>

      {/* ── Panel 2: Platform ── */}
      <section style={{ ...panelBase, zIndex: 2 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${PHOTOS.platform}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={overlay} />
        <GrainOverlay opacity={0.25} />

        <div style={{ ...contentBase, maxWidth: 680 }}>
          <GoldLine />
          <p data-reveal style={eyebrow}>The Platform</p>
          <h2 data-reveal data-delay="100" style={{
            ...headline,
            fontSize: 'clamp(28px,4.5vw,64px)',
          }}>
            EVERY COMPLIANCE<br />WORKFLOW.<br />
            <em style={{ fontStyle: 'normal', color: YELLOW }}>ONE PLACE.</em>
          </h2>
          <p data-reveal data-delay="200" style={body}>
            From incident reporting to contractor onboarding, SWMS generation to audit preparation — Briesa replaces spreadsheets, email folders and manual checklists with one intelligent platform.
          </p>
          <div data-reveal data-delay="300" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const }}>
            <Link href="/login" style={btnYellow}>Explore Features <ArrowRight size={13} /></Link>
            <Link href="/login" style={btnGhost}>See Pricing</Link>
          </div>
        </div>
      </section>

      {/* ── Panel 3: AI ── */}
      <section style={{ ...panelBase, zIndex: 3 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${PHOTOS.ai}')`,
          backgroundSize: 'cover', backgroundPosition: 'center 60%',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.97) 100%)',
        }} />
        <GrainOverlay opacity={0.22} />

        {/* AI card floated right */}
        <div style={{
          position: 'absolute', right: 'clamp(24px,6vw,80px)', top: '50%',
          transform: 'translateY(-50%)', zIndex: 2,
          width: 'min(380px,38vw)', display: 'none',
        }} className="ai-card-desktop">
          <div style={{ border: `1px solid ${HAIRLINE_MID}`, background: 'rgba(10,10,10,0.92)', padding: 28 }}>
            <p style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase' as const, color: YELLOW, marginBottom: 18, fontFamily: INTER }}>
              ⚡ Briesa AI — Generating SWMS
            </p>
            {[
              { label: 'Hazard identification', pct: 100, done: true },
              { label: 'Control measures',      pct: 100, done: true },
              { label: 'Risk matrix',           pct: 100, done: true },
              { label: 'PPE requirements',      pct: 72,  done: false },
              { label: 'Sign-off fields',       pct: 40,  done: false },
            ].map(({ label, pct, done }) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: done ? 'rgba(255,255,255,0.7)' : INK, fontFamily: INTER }}>{label}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: done ? '#22c55e' : YELLOW, fontFamily: INTER }}>{done ? '✓' : `${pct}%`}</span>
                </div>
                <div style={{ height: 2, background: HAIRLINE_MID }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: done ? '#22c55e' : YELLOW }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...contentBase, maxWidth: 680 }}>
          <GoldLine />
          <p data-reveal style={eyebrow}>AI Build Tools</p>
          <h2 data-reveal data-delay="100" style={{
            ...headline,
            fontSize: 'clamp(28px,4.5vw,64px)',
          }}>
            GENERATE WHAT<br />USED TO TAKE<br />
            <em style={{ fontStyle: 'normal', color: YELLOW }}>HALF A DAY.</em>
          </h2>
          <p data-reveal data-delay="200" style={body}>
            Briesa AI generates SWMS, toolbox talks, risk assessments, inspection forms and compliance reports in seconds — using your live project data, not generic templates.
          </p>
          <div data-reveal data-delay="300" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const }}>
            <Link href="/login" style={btnYellow}>Try AI Tools <Zap size={13} /></Link>
            <Link href="/login" style={btnGhost}>Book Demo</Link>
          </div>
        </div>
      </section>

    </div>
  )
}

// ── Stats band ────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <div style={{
      background: '#0a0a0a', fontFamily: INTER,
      borderTop: `1px solid ${HAIRLINE}`, borderBottom: `1px solid ${HAIRLINE}`,
      display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
    }}>
      {[
        { value: '2400', suffix: '+', label: 'Active users'         },
        { value: '98',   suffix: '%', label: 'Audit pass rate'       },
        { value: '60',   suffix: '%', label: 'Time saved on admin'   },
        { value: '4.9',  suffix: '★', label: 'Customer rating'       },
      ].map(({ value, suffix, label }, i) => (
        <div key={i} data-reveal data-delay={`${i * 80}`} style={{
          padding: 'clamp(32px,5vw,64px) clamp(20px,3vw,44px)',
          borderRight: i < 3 ? `1px solid ${HAIRLINE}` : undefined,
        }}>
          <p style={{ fontSize: 'clamp(44px,5vw,68px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-1.5px', color: '#fff', fontFamily: INTER }}>
            <span data-count={value}>{value}</span>
            <span style={{ color: YELLOW }}>{suffix}</span>
          </p>
          <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase' as const, color: INK, marginTop: 10, fontFamily: INTER }}>{label}</p>
        </div>
      ))}
    </div>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
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
        <GoldLine />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontFamily: INTER }}>Platform Features</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 72 }} className="features-header">
          <h2 data-reveal data-delay="100" style={{
            fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900,
            textTransform: 'uppercase' as const, lineHeight: 0.92,
            letterSpacing: '0.5px', color: '#fff', fontFamily: INTER,
          }}>
            EVERYTHING YOU NEED<br />TO STAY<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>COMPLIANT</em>
          </h2>
          <p data-reveal data-delay="200" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, fontFamily: INTER }}>
            From contractor onboarding to incident reporting — every compliance workflow in one place. No more spreadsheets, email threads, or missed expiry dates.
          </p>
        </div>
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
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#fff', marginBottom: 12, fontFamily: INTER }}>{title}</p>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: INK, fontFamily: INTER }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Solutions ─────────────────────────────────────────────────────────────────
function Solutions() {
  const items = [
    { icon: Building2, title: 'Construction & Building', points: ['SWMS & JSEA management', 'Subcontractor compliance', 'Site inspection forms', 'Permit-to-work workflows'] },
    { icon: Users,     title: 'Labour Hire & Staffing',  points: ['Worker licence tracking', 'Induction management', 'Training expiry alerts', 'Compliance dashboards'] },
    { icon: FileText,  title: 'Manufacturing & Industrial', points: ['ISO 9001 / 45001 readiness', 'Plant & equipment registers', 'Chemical registers', 'Audit trail documentation'] },
  ]

  return (
    <section id="solutions" style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <GoldLine />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontFamily: INTER }}>By Industry</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap' as const, gap: 32 }}>
          <h2 data-reveal data-delay="100" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900, textTransform: 'uppercase' as const, lineHeight: 0.92, color: '#fff', fontFamily: INTER }}>
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
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#fff', marginBottom: 24, fontFamily: INTER }}>{title}</p>
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

// ── Process ───────────────────────────────────────────────────────────────────
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
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontFamily: INTER }}>How It Works</p>
        <h2 data-reveal data-delay="100" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900, textTransform: 'uppercase' as const, lineHeight: 0.92, color: '#fff', marginBottom: 72, fontFamily: INTER }}>
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
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#fff', marginBottom: 16, fontFamily: INTER }}>{title}</p>
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

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    { quote: "Briesa cut our audit preparation time from two weeks down to two days. It's the compliance platform we've been waiting for.", author: 'Michael Torres', role: 'HSE Manager · Apex Civil Group' },
    { quote: "We used to lose track of contractor documents constantly. Now everything is in one place and we get alerts before anything expires.", author: 'Lisa Chen', role: 'Operations Director · Premier Labour Hire' },
    { quote: "The AI tools are a game changer. Generating a full SWMS used to take half a day — now it's five minutes.", author: 'James Walters', role: 'Site Manager · Stronghold Construction' },
  ]
  const [idx, setIdx] = useState(0)
  const [vis, setVis]   = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setVis(0)
      setTimeout(() => { setIdx(i => (i + 1) % items.length); setVis(1) }, 350)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  function go(i: number) {
    setVis(0)
    setTimeout(() => { setIdx(i); setVis(1) }, 350)
  }

  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#000', borderTop: `1px solid ${HAIRLINE}`, position: 'relative', overflow: 'hidden', fontFamily: INTER }}>
      <GrainOverlay opacity={0.12} />
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <GoldLine center />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 56, fontFamily: INTER }}>Client Stories</p>
        <div style={{ transition: 'opacity .35s ease', opacity: vis }}>
          <p style={{
            fontSize: 'clamp(18px,2.2vw,28px)', fontWeight: 300, lineHeight: 1.65,
            color: '#fff', marginBottom: 40, fontStyle: 'italic', fontFamily: INTER,
          }}>
            <span style={{ color: YELLOW, fontSize: '1.8em', lineHeight: 0, verticalAlign: '-0.3em', marginRight: 6, fontStyle: 'normal' }}>"</span>
            {items[idx].quote}
          </p>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: YELLOW, marginBottom: 4, fontFamily: INTER }}>{items[idx].author}</p>
          <p style={{ fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase' as const, color: INK, fontFamily: INTER }}>{items[idx].role}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 48 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === idx ? 24 : 6, height: 6,
              borderRadius: i === idx ? 3 : '50%',
              background: i === idx ? YELLOW : HAIRLINE_MID,
              border: 'none', cursor: 'none', padding: 0,
              transition: 'width .3s, background .3s',
            }} />
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
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase' as const, color: 'rgba(0,0,0,0.4)', marginBottom: 20, fontFamily: INTER }}>Get Started Today</p>
        <h2 data-reveal data-delay="100" style={{
          fontSize: 'clamp(32px,5vw,72px)', fontWeight: 900,
          textTransform: 'uppercase' as const, lineHeight: 0.88, letterSpacing: '0.5px',
          color: '#000', marginBottom: 24, fontFamily: INTER,
        }}>
          MAKE COMPLIANCE<br />YOUR COMPETITIVE<br />EDGE.
        </h2>
        <p data-reveal data-delay="200" style={{ fontSize: 15, fontWeight: 300, color: 'rgba(0,0,0,0.5)', marginBottom: 44, fontFamily: INTER }}>
          Join thousands of Australian businesses that trust Briesa to manage their compliance.
        </p>
        <div data-reveal data-delay="300" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <Link href="/login" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', fontFamily: INTER,
            textTransform: 'uppercase' as const,
            background: '#000', color: YELLOW,
            padding: '18px 40px', textDecoration: 'none', cursor: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>Start Free Trial <ArrowRight size={13} /></Link>
          <Link href="/login" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', fontFamily: INTER,
            textTransform: 'uppercase' as const, color: '#000',
            border: '2px solid rgba(0,0,0,0.22)',
            padding: '18px 40px', textDecoration: 'none', cursor: 'none',
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

// ── Contractor Banner ─────────────────────────────────────────────────────────
function ContractorBanner() {
  return (
    <section style={{ padding: 'clamp(40px,6vh,80px) clamp(24px,6vw,80px)', background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div data-reveal style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 48, flexWrap: 'wrap' as const,
          padding: 'clamp(28px,4vw,52px)',
          border: `1px solid ${HAIRLINE_MID}`, background: '#000',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flex: 1, minWidth: 260 }}>
            <div style={{ width: 48, height: 48, border: `1px solid ${YELLOW}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <HardHat size={20} style={{ color: YELLOW }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: INTER }}>Are you a contractor or subcontractor?</p>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, padding: '4px 8px', background: '#22c55e', color: '#fff', fontFamily: INTER }}>FREE</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 300, color: INK, lineHeight: 1.7, maxWidth: 480, fontFamily: INTER }}>
                Get your free Briesa Contractor Portal — see assigned jobs, site guidelines, safety requirements and manage your compliance documents.
              </p>
            </div>
          </div>
          <Link href="/contractor/login" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '2px', fontFamily: INTER,
            textTransform: 'uppercase' as const,
            background: YELLOW, color: '#000',
            padding: '16px 32px', textDecoration: 'none', cursor: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
          }}>Contractor Sign Up <ArrowRight size={13} /></Link>
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
            <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 4, fontFamily: INTER }}>
              Briesa
            </p>
            <p style={{ fontSize: 9, fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase' as const, color: YELLOW, marginBottom: 20, fontFamily: INTER }}>
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
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#fff', marginBottom: 24, fontFamily: INTER }}>{heading}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map(l => (
                  <li key={l} style={{ marginBottom: 14 }}>
                    <a href="#" style={{ fontSize: 13, fontWeight: 300, color: INK, textDecoration: 'none', cursor: 'none', fontFamily: INTER, transition: 'color .3s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = YELLOW)}
                      onMouseLeave={e => (e.currentTarget.style.color = INK)}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, borderTop: `1px solid ${HAIRLINE}`, flexWrap: 'wrap' as const, gap: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 300, letterSpacing: '1px', color: INK, fontFamily: INTER }}>
            © 2025 Briesa Pty Ltd. All rights reserved. ABN 12 345 678 901
          </p>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Privacy Policy', 'Terms', 'Cookie Policy'].map(item => (
              <a key={item} href="#" style={{ fontSize: 11, fontWeight: 300, color: INK, textDecoration: 'none', cursor: 'none', fontFamily: INTER, transition: 'color .3s' }}
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
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
      @keyframes scrollPulse {
        0%, 100% { opacity: 1;    }
        50%       { opacity: 0.2; }
      }
      .ai-card-desktop { display: none !important; }
      @media (min-width: 1024px) {
        .ai-card-desktop { display: block !important; }
      }
      @media (max-width: 900px) {
        .process-grid   { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        .footer-grid    { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        .features-header{ grid-template-columns: 1fr    !important; }
      }
      @media (max-width: 600px) {
        .process-grid { grid-template-columns: 1fr !important; }
        .footer-grid  { grid-template-columns: 1fr !important; }
      }
    `}</style>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useReveal()
  useCounters()

  return (
    <>
      <GlobalStyles />
      <Cursor />
      <Nav />
      <main>
        <StickyStack />
        <Stats />
        <Features />
        <Solutions />
        <Process />
        <Testimonials />
        <CTA />
        <ContractorBanner />
      </main>
      <Footer />
    </>
  )
}
