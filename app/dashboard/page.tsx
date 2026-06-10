import { ComplianceScoreRing } from '@/components/dashboard/ComplianceScoreRing'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { companyInfo, tasks, expiringItems, activityFeed, smartAlerts } from '@/lib/mock-data'
import { dailyChallenges, userProfile } from '@/lib/gamification'
import { formatDate } from '@/lib/utils'
import {
  AlertTriangle, Clock, ChevronRight, TrendingUp, TrendingDown,
  FileSignature, ClipboardList, Upload, CheckSquare,
  Zap, BellRing, UserCheck, HardHat, GraduationCap,
  Settings2, MapPin, FolderOpen, Flame, Star, ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { AIInsights } from '@/components/ai/AIInsights'

// ── Derived data ──────────────────────────────────────────────────────────────
const urgentTasks   = tasks.filter(t => t.status === 'overdue' || t.status === 'due-today')
const expiringSoon  = expiringItems.filter(i => i.status !== 'active').slice(0, 4)
const openIncidents = 2
const moduleIcons   = [UserCheck, HardHat, GraduationCap, Settings2, MapPin, FolderOpen]

function scoreColor(n: number) {
  if (n >= 80) return '#22c55e'
  if (n >= 60) return '#f59e0b'
  return '#ef4444'
}

function priorityColor(p: string) {
  if (p === 'high')   return '#ef4444'
  if (p === 'medium') return '#f59e0b'
  return '#60a5fa'
}

// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const date = new Date().toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  const challengeXPLeft = dailyChallenges
    .filter(c => !c.completed)
    .reduce((sum, c) => sum + c.reward, 0)

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* ══ 1. HEADER ══════════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden px-7 py-6"
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent)',
        }}
      >
        {/* Subtle grid watermark */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,var(--text) 0,var(--text) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,var(--text) 0,var(--text) 1px,transparent 1px,transparent 32px)',
          }}
        />

        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--text-muted)' }}>
              {date}
            </p>
            <h1 className="text-3xl font-black tracking-tight leading-none" style={{ color: 'var(--text)' }}>
              Good morning,{' '}
              <span style={{ color: 'var(--accent)', WebkitTextStroke: '1px #d4a800' }}>Sarah</span>
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              {companyInfo.name} &mdash; here&apos;s your compliance snapshot for today.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              <Flame size={12} style={{ color: '#f97316' }} />
              {userProfile.streak}-day streak
            </div>
            <div
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black tracking-wide"
              style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              <Star size={11} />
              LV{userProfile.level} &middot; {userProfile.levelName}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 2. QUICK ACTIONS ════════════════════════════════════════════════════ */}
      <div
        className="flex items-stretch overflow-x-auto"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
      >
        {[
          { label: 'AI Template',     icon: Zap,           href: '/dashboard/ai-templates', accent: true  },
          { label: 'New Pre-start',   icon: ClipboardList, href: '/dashboard/prestart'                    },
          { label: 'Report Incident', icon: AlertTriangle, href: '/dashboard/incidents'                   },
          { label: 'New Permit',      icon: FileSignature, href: '/dashboard/permits'                     },
          { label: 'Upload Doc',      icon: Upload,        href: '/dashboard/documents'                   },
          { label: 'Add Task',        icon: CheckSquare,   href: '/dashboard/tasks'                       },
        ].map(({ label, icon: Icon, href, accent }, i, arr) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2.5 px-5 py-3.5 text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all hover:opacity-80 group"
            style={{
              ...(accent
                ? { background: 'var(--accent)', color: 'var(--accent-text)' }
                : { color: 'var(--text-secondary)' }),
              ...(i < arr.length - 1 ? { borderRight: '1px solid var(--border)' } : {}),
            }}
          >
            <Icon size={13} className="transition-transform group-hover:scale-110" />
            {label}
          </Link>
        ))}
      </div>

      {/* ══ 3. KPI METRICS ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label:  'Compliance Score',
            value:  companyInfo.complianceScore,
            unit:   '/100',
            sub:    `${companyInfo.auditReadiness}% audit ready`,
            color:  scoreColor(companyInfo.complianceScore),
            pct:    companyInfo.complianceScore,
            trend:  { dir: 'up', label: '+2 this week' },
          },
          {
            label:  'Tasks Due',
            value:  urgentTasks.length,
            unit:   '',
            sub:    `${tasks.filter(t => t.status === 'overdue').length} overdue`,
            color:  urgentTasks.length > 0 ? '#ef4444' : '#22c55e',
            pct:    Math.round((urgentTasks.length / Math.max(tasks.length, 1)) * 100),
            trend:  null,
          },
          {
            label:  'Expiring Soon',
            value:  expiringSoon.length,
            unit:   '',
            sub:    'certs & licences',
            color:  expiringSoon.length > 0 ? '#f59e0b' : '#22c55e',
            pct:    Math.round((expiringSoon.length / Math.max(expiringItems.length, 1)) * 100),
            trend:  null,
          },
          {
            label:  'Open Incidents',
            value:  openIncidents,
            unit:   '',
            sub:    '1 under review',
            color:  openIncidents > 0 ? '#ef4444' : '#22c55e',
            pct:    openIncidents * 25,
            trend:  null,
          },
        ].map(({ label, value, unit, sub, color, pct, trend }) => (
          <div
            key={label}
            className="relative overflow-hidden px-5 pt-5 pb-4 flex flex-col gap-3"
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderTop: `3px solid ${color}`,
            }}
          >
            {/* Tint wash */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: color + '07' }} />

            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--text-muted)' }}>
                {label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black leading-none" style={{ color }}>{value}</span>
                {unit && <span className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>{unit}</span>}
              </div>
            </div>

            {/* Mini progress bar */}
            <div className="relative h-0.5 w-full" style={{ background: 'var(--border)' }}>
              <div className="h-full transition-all duration-700" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
            </div>

            {/* Footer */}
            <div className="relative flex items-center justify-between">
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{sub}</p>
              {trend && (
                <span
                  className="flex items-center gap-0.5 text-[10px] font-bold"
                  style={{ color: trend.dir === 'up' ? '#22c55e' : '#ef4444' }}
                >
                  {trend.dir === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {trend.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ══ 4. AI INSIGHTS ══════════════════════════════════════════════════════ */}
      <AIInsights />

      {/* ══ 5. MAIN CONTENT — Needs Attention + Compliance Health ══════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* ── Left 3/5: Needs Attention ─────────────────────────────────────── */}
        <div className="lg:col-span-3 flex flex-col" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>

          {/* Card header */}
          <div
            className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4" style={{ background: '#ef4444' }} />
              <h2 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Needs Attention</h2>
            </div>
            <Link
              href="/dashboard/tasks"
              className="flex items-center gap-1 text-[11px] font-semibold transition-opacity hover:opacity-60"
              style={{ color: 'var(--text-muted)' }}
            >
              All tasks <ChevronRight size={11} />
            </Link>
          </div>

          {/* Urgent task rows */}
          {urgentTasks.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-10">
              <div className="text-center">
                <p className="text-2xl mb-1">🎉</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>You&apos;re all caught up</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>No overdue or due-today tasks</p>
              </div>
            </div>
          ) : (
            urgentTasks.slice(0, 5).map(task => (
              <div
                key={task.id}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[var(--bg-hover)] cursor-pointer"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                {/* Priority stripe */}
                <div className="w-0.5 h-10 self-stretch flex-shrink-0" style={{ background: priorityColor(task.priority) }} />

                {/* Icon */}
                <div
                  className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: task.status === 'overdue' ? '#fee2e2' : '#fef3c7',
                  }}
                >
                  {task.status === 'overdue'
                    ? <AlertTriangle size={12} style={{ color: '#ef4444' }} />
                    : <Clock size={12} style={{ color: '#f59e0b' }} />}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{task.title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {task.assignedTo} &middot; {formatDate(task.dueDate)}
                  </p>
                </div>

                {/* Badge */}
                <span
                  className="text-[10px] font-bold px-2 py-0.5 flex-shrink-0"
                  style={{
                    background: task.status === 'overdue' ? '#fee2e2' : '#fef3c7',
                    color:      task.status === 'overdue' ? '#dc2626'  : '#b45309',
                  }}
                >
                  {task.status === 'overdue' ? 'Overdue' : 'Due Today'}
                </span>
              </div>
            ))
          )}

          {/* Expiring items section */}
          {expiringSoon.length > 0 && (
            <>
              <div
                className="flex items-center justify-between px-5 py-2.5"
                style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>
                  Expiring Certificates &amp; Licences
                </p>
                <span className="text-[10px] font-bold px-2 py-0.5" style={{ background: '#fef3c7', color: '#b45309' }}>
                  {expiringSoon.length} items
                </span>
              </div>
              {expiringSoon.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-[var(--bg-hover)]"
                  style={{ borderBottom: i < expiringSoon.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: item.status === 'expired' ? '#ef4444' : '#f59e0b' }} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{item.name}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.owner} &middot; {item.type}</p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 flex-shrink-0 ml-4"
                    style={{
                      background: item.status === 'expired' ? '#fee2e2' : '#fef3c7',
                      color:      item.status === 'expired' ? '#dc2626' : '#b45309',
                    }}
                  >
                    {item.status === 'expired' ? 'Expired' : formatDate(item.expiryDate)}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>

        {/* ── Right 2/5: Compliance Health ──────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>

          {/* Score ring section */}
          <div
            className="flex flex-col items-center px-5 pt-6 pb-5 flex-shrink-0"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <ComplianceScoreRing score={companyInfo.complianceScore} size={148} />

            <div className="w-full mt-5 space-y-2">
              {/* Audit readiness bar */}
              <div className="flex justify-between text-[11px] mb-1.5">
                <span style={{ color: 'var(--text-muted)' }}>Audit Readiness</span>
                <span className="font-bold" style={{ color: 'var(--text)' }}>{companyInfo.auditReadiness}%</span>
              </div>
              <div className="h-2 w-full" style={{ background: 'var(--bg-secondary)' }}>
                <div className="h-full transition-all duration-700" style={{ width: `${companyInfo.auditReadiness}%`, background: 'var(--accent)' }} />
              </div>
            </div>
          </div>

          {/* Area breakdown bars */}
          <div className="flex-1 px-5 py-4 space-y-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--text-muted)' }}>
              Compliance by Area
            </p>
            {companyInfo.areas.map((area, idx) => {
              const Icon = moduleIcons[idx]
              const col  = scoreColor(area.score)
              return (
                <div key={area.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon size={11} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                      <span className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{area.name}</span>
                    </div>
                    <span className="text-xs font-black ml-2 flex-shrink-0" style={{ color: col }}>{area.score}</span>
                  </div>
                  <div className="h-1.5" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="h-full transition-all duration-700" style={{ width: `${area.score}%`, background: col }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══ 6. BOTTOM ROW ═══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* ── Recent Activity ─────────────────────────────────────────────────── */}
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <div
            className="flex items-center gap-2.5 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="w-1.5 h-4" style={{ background: '#3b82f6' }} />
            <h2 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Recent Activity</h2>
          </div>
          <div className="px-5 py-4">
            <ActivityFeed items={activityFeed.slice(0, 5)} />
          </div>
        </div>

        {/* ── Smart Alerts ────────────────────────────────────────────────────── */}
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4" style={{ background: '#ef4444' }} />
              <div className="flex items-center gap-2">
                <BellRing size={13} style={{ color: 'var(--accent)' }} />
                <h2 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Smart Alerts</h2>
              </div>
            </div>
            <span
              className="text-[10px] font-bold px-2 py-0.5"
              style={{ background: '#fee2e2', color: '#dc2626' }}
            >
              {smartAlerts.filter(a => a.severity === 'critical').length} critical
            </span>
          </div>
          <div>
            {smartAlerts.map((alert, i) => {
              const cfg = {
                critical: { bar: '#ef4444', label: 'Critical' },
                warning:  { bar: '#f59e0b', label: 'Warning'  },
                info:     { bar: '#3b82f6', label: 'Info'     },
                success:  { bar: '#22c55e', label: 'OK'       },
              }[alert.severity]
              return (
                <div
                  key={alert.id}
                  className="px-5 py-3.5 transition-colors hover:bg-[var(--bg-hover)]"
                  style={{
                    borderBottom: i < smartAlerts.length - 1 ? '1px solid var(--border)' : 'none',
                    borderLeft: `3px solid ${cfg.bar}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-xs font-bold leading-snug" style={{ color: 'var(--text)' }}>{alert.title}</p>
                    <span
                      className="text-[9px] font-black px-1.5 py-0.5 flex-shrink-0 uppercase tracking-wide"
                      style={{ background: cfg.bar + '20', color: cfg.bar }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{alert.message}</p>
                  {alert.action && alert.link && (
                    <Link
                      href={alert.link}
                      className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold transition-opacity hover:opacity-70"
                      style={{ color: cfg.bar }}
                    >
                      {alert.action} <ArrowRight size={9} />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Daily Challenges ────────────────────────────────────────────────── */}
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4" style={{ background: 'var(--accent)' }} />
              <h2 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Today&apos;s Challenges</h2>
            </div>
            {challengeXPLeft > 0 && (
              <span
                className="text-[10px] font-black px-2.5 py-1"
                style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
              >
                +{challengeXPLeft} XP left
              </span>
            )}
          </div>

          <div className="px-5 py-4 space-y-5">
            {dailyChallenges.map(c => {
              const pct = Math.round((c.progress / c.total) * 100)
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base leading-none flex-shrink-0">{c.icon}</span>
                      <span
                        className="text-xs font-semibold truncate"
                        style={{ color: c.completed ? 'var(--text-muted)' : 'var(--text)' }}
                      >
                        {c.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        {c.progress}/{c.total}
                      </span>
                      {c.completed
                        ? <span className="text-[10px] font-black px-2 py-0.5" style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}>✓</span>
                        : <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>+{c.reward} XP</span>
                      }
                    </div>
                  </div>
                  <div className="h-2 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: c.completed ? 'var(--accent)' : 'var(--text)',
                      }}
                    />
                  </div>
                </div>
              )
            })}

            {/* XP level progress */}
            <div className="pt-4 mt-1" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex justify-between text-[11px] mb-2">
                <span style={{ color: 'var(--text-muted)' }}>Level {userProfile.level} progress</span>
                <span className="font-bold" style={{ color: 'var(--text)' }}>
                  {userProfile.xp.toLocaleString()} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {userProfile.xpToNextLevel.toLocaleString()} XP</span>
                </span>
              </div>
              <div className="h-2.5 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${Math.round((userProfile.xp / userProfile.xpToNextLevel) * 100)}%`,
                    background: 'var(--accent)',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                <span>Rank #{userProfile.rank} on team</span>
                <span>{userProfile.totalPoints.toLocaleString()} pts total</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
