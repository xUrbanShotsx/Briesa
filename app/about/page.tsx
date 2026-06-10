'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { ArrowRight, Menu, X, Mail, Phone, MapPin, Send } from 'lucide-react'

const YELLOW   = '#FFD940'
const HAIRLINE = '#1e1e1e'
const INK      = '#5a5a5f'
const INTER    = `'Inter', Arial, sans-serif`
const GRAIN    = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

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
      h.style.transform = 'translateY(24px)'
      h.style.transition = 'opacity .7s cubic-bezier(.23,1,.32,1), transform .7s cubic-bezier(.23,1,.32,1)'
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
          {[['Features', '/features'], ['Product', '/product'], ['About', '/about']].map(([label, href]) => (
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
          {[['Features', '/features'], ['Product', '/product'], ['About', '/about']].map(([label, href]) => (
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
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '56vh', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.88) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.18, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(28px,6vw,100px)',
        paddingBottom: 'clamp(60px,8vh,100px)',
        paddingTop: 'clamp(120px,16vh,160px)',
        maxWidth: 800,
      }}>
        <p style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20, fontFamily: INTER }}>About Us</p>
        <GoldLine />
        <h1 style={{
          fontSize: 'clamp(40px,6vw,76px)', fontWeight: 900,
          textTransform: 'uppercase', lineHeight: 0.9,
          letterSpacing: '-1.5px', color: '#fff',
          marginBottom: 24, fontFamily: INTER,
        }}>
          BUILT BY PEOPLE<br />WHO LIVED THE<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>PROBLEM.</em>
        </h1>
        <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', maxWidth: 480, fontFamily: INTER }}>
          Briesa was born out of frustration with the way compliance was being managed on Australian worksites — and a belief that it could be done far better.
        </p>
      </div>
    </section>
  )
}

// ── Our Story ─────────────────────────────────────────────────────────────────
function Story() {
  const milestones = [
    { year: '2021', text: 'Our founders spent years working across construction, labour hire and manufacturing — watching compliance failures happen not because people didn\'t care, but because the tools weren\'t good enough.' },
    { year: '2022', text: 'After watching a close colleague\'s business face a six-figure fine after a missed contractor induction — despite doing everything they thought was right — we decided to build the platform we always wished existed.' },
    { year: '2023', text: 'Briesa launched in private beta with a small group of construction and labour hire businesses. Within six months, not one had failed an audit. We knew we were onto something.' },
    { year: '2024', text: 'We added AI tools, expanded to manufacturing and industrial clients, and built the contractor portal — giving the whole supply chain visibility for the first time.' },
    { year: 'Today', text: 'Briesa serves businesses across Australia, from single-site operators to national enterprises. Our mission hasn\'t changed: make compliance simple enough that no business ever has to fail an audit again.' },
  ]

  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#000', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="split-grid">

          {/* Left — headline */}
          <div style={{ position: 'sticky', top: 120 }}>
            <GoldLine />
            <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: INTER }}>Our Story</p>
            <h2 data-reveal data-delay="100" style={{
              fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900,
              textTransform: 'uppercase', lineHeight: 0.92,
              color: '#fff', marginBottom: 28, fontFamily: INTER,
            }}>
              WHY WE<br />BUILT<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>BRIESA.</em>
            </h2>
            <p data-reveal data-delay="200" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, marginBottom: 32, fontFamily: INTER }}>
              Compliance in Australia isn't optional — but the tools available to manage it have always been generic, clunky, or built for industries that look nothing like construction or labour hire.
            </p>
            <p data-reveal data-delay="300" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, fontFamily: INTER }}>
              We built Briesa because we believe that the workers, contractors and businesses doing the hard work of keeping Australia running deserve software that actually works for them — not against them.
            </p>
          </div>

          {/* Right — timeline */}
          <div>
            {milestones.map(({ year, text }, i) => (
              <div key={i} data-reveal data-delay={`${i * 80}`} style={{
                display: 'flex', gap: 28,
                paddingBottom: i < milestones.length - 1 ? 40 : 0,
                marginBottom: i < milestones.length - 1 ? 40 : 0,
                borderBottom: i < milestones.length - 1 ? `1px solid ${HAIRLINE}` : undefined,
              }}>
                <div style={{ flexShrink: 0, paddingTop: 3 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '2px',
                    textTransform: 'uppercase', color: YELLOW, fontFamily: INTER,
                  }}>{year}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', fontFamily: INTER }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Values ────────────────────────────────────────────────────────────────────
function Values() {
  const values = [
    { title: 'Honesty over hype',       body: 'We don\'t oversell. If a feature isn\'t ready, we don\'t ship it. If Briesa isn\'t the right fit for your business, we\'ll tell you.' },
    { title: 'Built for the field',     body: 'Every feature is designed with the person in the hi-vis vest in mind, not just the compliance manager at a desk.' },
    { title: 'Australian by design',    body: 'WHS legislation, ISO standards, Fair Work — we\'re built for the Australian regulatory environment, not adapted from a US product.' },
    { title: 'Safety is not optional',  body: 'We believe compliance done right protects people. That\'s not a marketing line — it\'s why we come to work every day.' },
  ]

  return (
    <section style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#0a0a0a', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <GoldLine />
        <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: INTER }}>What We Stand For</p>
        <h2 data-reveal data-delay="100" style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', marginBottom: 64, fontFamily: INTER }}>
          OUR<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>VALUES.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {values.map(({ title, body }, i) => (
            <div key={i} data-reveal data-delay={`${i * 70}`} style={{
              padding: '36px 32px', background: '#000', border: `1px solid ${HAIRLINE}`,
              borderTop: `2px solid ${YELLOW}`,
              transition: 'background .3s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#080808'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#000'}
            >
              <div style={{ width: 6, height: 6, background: YELLOW, marginBottom: 20 }} />
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#fff', marginBottom: 14, fontFamily: INTER }}>{title}</p>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: INK, fontFamily: INTER }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact form ──────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: `1px solid ${focused === field ? YELLOW : '#2a2a2a'}`,
    color: '#fff', fontSize: 13, fontWeight: 300, fontFamily: INTER,
    padding: '12px 0', outline: 'none',
    transition: 'border-color .3s',
    boxSizing: 'border-box',
  })

  const labelStyle: React.CSSProperties = {
    fontSize: 9, fontWeight: 700, letterSpacing: '3px',
    textTransform: 'uppercase', color: INK,
    display: 'block', marginBottom: 8, fontFamily: INTER,
  }

  return (
    <section id="contact" style={{ padding: 'clamp(60px,10vh,120px) clamp(24px,6vw,80px)', background: '#000', borderTop: `1px solid ${HAIRLINE}`, fontFamily: INTER }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="split-grid">

          {/* Left — contact info */}
          <div>
            <GoldLine />
            <p data-reveal style={{ fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: INTER }}>Get In Touch</p>
            <h2 data-reveal data-delay="100" style={{
              fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900,
              textTransform: 'uppercase', lineHeight: 0.92,
              color: '#fff', marginBottom: 28, fontFamily: INTER,
            }}>
              LET'S TALK<br /><em style={{ fontStyle: 'normal', color: YELLOW }}>COMPLIANCE.</em>
            </h2>
            <p data-reveal data-delay="200" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: INK, marginBottom: 52, fontFamily: INTER }}>
              Whether you're ready to get started, have questions about the platform, or want to explore enterprise options — we'd love to hear from you.
            </p>

            <div data-reveal data-delay="300" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {[
                { icon: Mail,    label: 'Email',    value: 'hello@briesa.com.au' },
                { icon: Phone,   label: 'Phone',    value: '+61 2 0000 0000' },
                { icon: MapPin,  label: 'Location', value: 'Sydney, NSW, Australia' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div style={{
                    width: 40, height: 40, border: `1px solid #222`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={15} style={{ color: YELLOW }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: INK, marginBottom: 3, fontFamily: INTER }}>{label}</p>
                    <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.7)', fontFamily: INTER }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div data-reveal data-delay="150">
            {sent ? (
              <div style={{
                padding: '52px 44px', border: `1px solid ${YELLOW}30`,
                background: 'rgba(255,217,64,0.03)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16,
              }}>
                <div style={{ width: 48, height: 48, border: `1px solid ${YELLOW}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={18} style={{ color: YELLOW }} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: INTER }}>Message sent.</p>
                <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: INK, fontFamily: INTER }}>
                  Thanks for reaching out — we'll get back to you within one business day.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', subject: '', message: '' }) }} style={{
                  marginTop: 8, fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                  background: 'transparent', border: `1px solid #2a2a2a`, color: INK,
                  padding: '10px 24px', cursor: 'pointer', fontFamily: INTER, transition: 'border-color .3s, color .3s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = YELLOW; (e.currentTarget as HTMLElement).style.color = YELLOW }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.color = INK }}
                >Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  <div>
                    <label style={labelStyle}>Full name</label>
                    <input
                      required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      placeholder="Jane Smith" style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email address</label>
                    <input
                      type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      placeholder="jane@company.com.au" style={inputStyle('email')}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      onFocus={() => setFocused('company')} onBlur={() => setFocused(null)}
                      placeholder="Apex Civil Group" style={inputStyle('company')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                      placeholder="Demo request" style={inputStyle('subject')}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    placeholder="Tell us about your business and what you're looking for..."
                    style={{
                      ...inputStyle('message'),
                      resize: 'none', borderBottom: 'none',
                      border: `1px solid ${focused === 'message' ? YELLOW : '#2a2a2a'}`,
                      padding: '14px 16px',
                    }}
                  />
                </div>
                <button type="submit" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '15px 0', fontSize: 10, fontWeight: 700, letterSpacing: '2.5px',
                  textTransform: 'uppercase', background: YELLOW, color: '#000',
                  border: 'none', cursor: 'pointer', fontFamily: INTER,
                  transition: 'opacity .25s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  Send Message <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
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

function GlobalStyles() {
  return (
    <style>{`
      @media (max-width: 900px) {
        .split-grid  { grid-template-columns: 1fr !important; gap: 48px !important; }
        .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
      }
      @media (max-width: 600px) {
        .footer-grid { grid-template-columns: 1fr !important; }
      }
      input::placeholder, textarea::placeholder { color: #2a2a2a; }
      input, textarea { color-scheme: dark; }
    `}</style>
  )
}

export default function AboutPage() {
  useReveal()
  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', background: '#000', fontFamily: INTER }}>
        <Nav />
        <main>
          <Hero />
          <Story />
          <Values />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
