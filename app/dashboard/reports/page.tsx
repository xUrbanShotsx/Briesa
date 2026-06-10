'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { companyInfo } from '@/lib/mock-data'
import { Drawer, Field, TextInput, Select, RadioGroup, SubmitRow } from '@/components/ui/Drawer'
import {
  Download, FileText, BarChart3, Shield, GraduationCap,
  ClipboardList, AlertTriangle, ArrowRight, Clock, Loader2, Check,
} from 'lucide-react'

const reportTypes = [
  { id: '1', title: 'Audit Readiness Report', description: 'Full compliance status, gaps and recommendations for your next audit', icon: Shield, color: '#FFD940', lastGenerated: '2 days ago' },
  { id: '2', title: 'Compliance Summary', description: 'Overview of compliance scores across all areas', icon: BarChart3, color: '#3b82f6', lastGenerated: '1 week ago' },
  { id: '3', title: 'Incident Report', description: 'Detailed log of all incidents, severity and resolution status', icon: AlertTriangle, color: '#ef4444', lastGenerated: 'Yesterday' },
  { id: '4', title: 'Training Register Report', description: 'Staff training completion rates and upcoming renewals', icon: GraduationCap, color: '#22c55e', lastGenerated: '3 days ago' },
  { id: '5', title: 'Contractor Compliance Report', description: 'Contractor status, insurance, licences and compliance scores', icon: ClipboardList, color: '#a855f7', lastGenerated: '5 days ago' },
  { id: '6', title: 'Corrective Actions Report', description: 'Open, in-progress and overdue corrective actions summary', icon: FileText, color: '#f97316', lastGenerated: 'Today' },
]

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null)
  const [generated, setGenerated] = useState<string[]>([])
  const [showScheduleDrawer, setShowScheduleDrawer] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({ report: '', frequency: 'weekly', email: 'sarah@acme.com.au', day: 'Monday' })
  const [scheduleSaving, setScheduleSaving] = useState(false)
  const [scheduleSaved, setScheduleSaved] = useState(false)
  const [scheduledReports, setScheduledReports] = useState<typeof scheduleForm[]>([])

  function generate(id: string) {
    if (generating || generated.includes(id)) return
    setGenerating(id)
    setTimeout(() => {
      setGenerating(null)
      setGenerated(prev => [...prev, id])
    }, 1800)
  }

  function exportPdf(id: string) {
    // Simulate download by creating a blob link
    const report = reportTypes.find(r => r.id === id)
    const content = `${report?.title}\nGenerated: ${new Date().toLocaleDateString('en-AU')}\nCompany: ${companyInfo.name}\nAudit Readiness: ${companyInfo.auditReadiness}%\n\n[This is a simulated report export for ${report?.title}]`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${report?.title.replace(/\s+/g, '_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleScheduleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setScheduleSaving(true)
    setTimeout(() => {
      setScheduledReports(prev => [...prev, { ...scheduleForm }])
      setScheduleSaving(false)
      setScheduleSaved(true)
      setTimeout(() => { setScheduleSaved(false); setShowScheduleDrawer(false) }, 1200)
    }, 700)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="Reports"
        description="Generate and download compliance reports"
        action={{ label: 'Schedule Report', icon: <Clock size={14} />, onClick: () => setShowScheduleDrawer(true) }}
      />

      {/* Audit Readiness Banner */}
      <div className="p-6" style={{ background: '#000', border: '1px solid #222' }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#FFD940' }}>
              Audit Readiness Score
            </p>
            <h2 className="text-4xl font-black text-white">{companyInfo.auditReadiness}%</h2>
            <p className="text-white/60 text-sm mt-2">
              Your business is {companyInfo.auditReadiness >= 80 ? 'well-prepared' : 'making progress'} for your next audit.{' '}
              {100 - companyInfo.auditReadiness}% improvement remaining.
            </p>
          </div>
          <button
            onClick={() => exportPdf('1')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80 flex-shrink-0"
            style={{ background: '#FFD940', color: '#000' }}
          >
            <Download size={14} />
            Download Full Report
          </button>
        </div>
        <div className="mt-4 h-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="h-full" style={{ width: `${companyInfo.auditReadiness}%`, background: '#FFD940' }} />
        </div>
      </div>

      {/* Scheduled reports */}
      {scheduledReports.length > 0 && (
        <div className="p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Scheduled Reports
          </p>
          <div className="space-y-1">
            {scheduledReports.map((s, i) => (
              <p key={i} className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold" style={{ color: 'var(--text)' }}>{s.report}</span>
                {' '}· {s.frequency} on {s.day} → {s.email}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon
          const isGenerating = generating === report.id
          const isDone = generated.includes(report.id)
          return (
            <div
              key={report.id}
              className="p-5 group transition-all hover:bg-[var(--bg-hover)] cursor-default"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderTop: `3px solid ${report.color}` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0" style={{ background: report.color + '18' }}>
                  <Icon size={20} style={{ color: report.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{report.title}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{report.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock size={11} style={{ color: 'var(--text-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Last generated: {isDone ? 'Just now' : report.lastGenerated}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                {/* Export PDF */}
                <button
                  onClick={() => exportPdf(report.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-all hover:opacity-80"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                >
                  <Download size={11} />
                  Export PDF
                </button>

                {/* Generate */}
                <button
                  onClick={() => generate(report.id)}
                  disabled={isGenerating}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-all hover:opacity-80 disabled:opacity-60"
                  style={{
                    background: isDone ? '#22c55e' : 'var(--accent)',
                    color: isDone ? '#fff' : 'var(--accent-text)',
                  }}
                >
                  {isGenerating
                    ? <><Loader2 size={11} className="animate-spin" /> Generating…</>
                    : isDone
                    ? <><Check size={11} /> Generated</>
                    : <>Generate <ArrowRight size={11} /></>
                  }
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Schedule Drawer */}
      <Drawer
        open={showScheduleDrawer}
        onClose={() => setShowScheduleDrawer(false)}
        title="Schedule a Report"
        subtitle="Automatically generate and email reports on a recurring basis"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <Field label="Report Type" required>
            <Select
              value={scheduleForm.report}
              onChange={v => setScheduleForm(f => ({ ...f, report: v }))}
              options={reportTypes.map(r => r.title)}
              placeholder="Select a report…"
            />
          </Field>
          <Field label="Frequency" required>
            <RadioGroup
              value={scheduleForm.frequency}
              onChange={v => setScheduleForm(f => ({ ...f, frequency: v }))}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
          </Field>
          <Field label="Send on Day">
            <Select
              value={scheduleForm.day}
              onChange={v => setScheduleForm(f => ({ ...f, day: v }))}
              options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
            />
          </Field>
          <Field label="Email Address" required>
            <TextInput
              value={scheduleForm.email}
              onChange={v => setScheduleForm(f => ({ ...f, email: v }))}
              type="email"
              placeholder="email@company.com"
            />
          </Field>
          <SubmitRow
            saving={scheduleSaving}
            saved={scheduleSaved}
            submitLabel="Schedule Report"
            savedLabel="Scheduled! ✓"
            onCancel={() => setShowScheduleDrawer(false)}
          />
        </form>
      </Drawer>
    </div>
  )
}
