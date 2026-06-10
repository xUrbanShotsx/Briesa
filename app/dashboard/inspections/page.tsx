'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Drawer, Field, TextInput, Select, RadioGroup, SubmitRow } from '@/components/ui/Drawer'
import { inspections as initialInspections } from '@/lib/mock-data'
import { formatDate, scoreColor } from '@/lib/utils'
import { Plus, ClipboardList, MapPin, User, Calendar, Download, ChevronRight } from 'lucide-react'

type Inspection = {
  id: string
  site: string
  formType: string
  date: string
  inspector: string
  score: number
  status: 'completed' | 'in-progress' | 'scheduled'
  items?: unknown[]
}

const FORM_TYPES = [
  'Monthly WHS Inspection',
  'Pre-Start Safety Check',
  'Fire Safety Inspection',
  'Chemical Storage Audit',
  'Site Safety Inspection',
  'Equipment Inspection',
  'Environmental Audit',
  'Scaffold Inspection',
  'Electrical Safety Check',
]

const BLANK_FORM = { formType: '', site: '', inspector: '', date: '', status: 'scheduled' as const }

export default function InspectionsPage() {
  const router = useRouter()
  const [list, setList] = useState<Inspection[]>([...initialInspections])
  const [showDrawer, setShowDrawer] = useState(false)
  const [form, setForm] = useState({ ...BLANK_FORM })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const completed  = list.filter(i => i.status === 'completed').length
  const inProgress = list.filter(i => i.status === 'in-progress').length
  const scoredList = list.filter(i => i.score > 0)
  const avgScore   = scoredList.length
    ? Math.round(scoredList.reduce((s, i) => s + i.score, 0) / scoredList.length)
    : 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      const newItem: Inspection = {
        id: String(list.length + 1),
        formType: form.formType,
        site: form.site,
        inspector: form.inspector,
        date: form.date || new Date().toISOString().split('T')[0],
        score: 0,
        status: form.status as Inspection['status'],
        items: [],
      }
      setList(prev => [newItem, ...prev])
      setSaving(false)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        setShowDrawer(false)
        setForm({ ...BLANK_FORM })
        router.push(`/dashboard/inspections/${newItem.id}`)
      }, 800)
    }, 700)
  }

  function downloadReport(e: React.MouseEvent, insp: Inspection) {
    e.stopPropagation()
    const lines = [
      `INSPECTION REPORT`,
      `=================`,
      `Form: ${insp.formType}`,
      `Site: ${insp.site}`,
      `Inspector: ${insp.inspector}`,
      `Date: ${formatDate(insp.date)}`,
      `Score: ${insp.score > 0 ? `${insp.score}/100` : 'N/A'}`,
      `Status: ${insp.status}`,
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Inspection_${insp.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="Inspections"
        description="Site inspections, safety checks and audit forms"
        action={{ label: 'New Inspection', icon: <Plus size={14} />, onClick: () => { setForm({ ...BLANK_FORM }); setShowDrawer(true) } }}
      />

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Inspections', value: list.length,       color: 'var(--text)'         },
          { label: 'Completed',         value: completed,          color: '#22c55e'              },
          { label: 'In Progress',       value: inProgress,         color: '#f59e0b'              },
          { label: 'Avg Score',         value: `${avgScore}/100`,  color: scoreColor(avgScore)   },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-5" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Inspections List */}
      <div className="space-y-3">
        {list.map((insp) => (
          <div
            key={insp.id}
            className="group cursor-pointer transition-all hover:shadow-md"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
            onClick={() => router.push(`/dashboard/inspections/${insp.id}`)}
          >
            <div className="flex items-start justify-between p-5">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <ClipboardList size={18} style={{ color: 'var(--text-muted)' }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{insp.formType}</p>
                  <div className="flex items-center gap-4 mt-1.5 flex-wrap" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1 text-xs"><MapPin size={11} />{insp.site}</span>
                    <span className="flex items-center gap-1 text-xs"><User size={11} />{insp.inspector}</span>
                    <span className="flex items-center gap-1 text-xs"><Calendar size={11} />{formatDate(insp.date)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {insp.score > 0 && (
                  <div className="text-right">
                    <p className="text-xl font-black" style={{ color: scoreColor(insp.score) }}>{insp.score}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>/100</p>
                  </div>
                )}
                <StatusBadge status={insp.status} />
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Inline action strip — visible on hover */}
            <div
              className="flex gap-2 px-5 py-3 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {insp.status === 'scheduled' && (
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
                  style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
                >
                  Start Inspection
                </span>
              )}
              {insp.status === 'in-progress' && (
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
                  style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
                >
                  Continue Inspection
                </span>
              )}
              {insp.status === 'completed' && (
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
                  style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
                >
                  View Report
                </span>
              )}
              {insp.status === 'completed' && (
                <button
                  onClick={(e) => downloadReport(e, insp)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                >
                  <Download size={11} /> Download PDF
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Inspection Drawer */}
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="New Inspection"
        subtitle="Schedule or start a new site inspection"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Inspection Type" required>
            <Select
              value={form.formType}
              onChange={v => setForm(f => ({ ...f, formType: v }))}
              options={FORM_TYPES}
              placeholder="Select inspection type…"
            />
          </Field>
          <Field label="Site / Location" required>
            <TextInput
              value={form.site}
              onChange={v => setForm(f => ({ ...f, site: v }))}
              placeholder="e.g. Site A — Building 3"
            />
          </Field>
          <Field label="Inspector" required>
            <TextInput
              value={form.inspector}
              onChange={v => setForm(f => ({ ...f, inspector: v }))}
              placeholder="Inspector name"
            />
          </Field>
          <Field label="Scheduled Date">
            <TextInput
              type="date"
              value={form.date}
              onChange={v => setForm(f => ({ ...f, date: v }))}
            />
          </Field>
          <Field label="Initial Status">
            <RadioGroup
              value={form.status}
              onChange={v => setForm(f => ({ ...f, status: v as typeof form.status }))}
              options={[
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'in-progress', label: 'Start Now' },
              ]}
            />
          </Field>
          <SubmitRow
            saving={saving}
            saved={saved}
            submitLabel="Create Inspection"
            savedLabel="Opening…"
            onCancel={() => setShowDrawer(false)}
          />
        </form>
      </Drawer>
    </div>
  )
}
