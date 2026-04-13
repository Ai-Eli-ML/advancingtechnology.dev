'use client'

import { useAuth } from '@/components/AuthProvider'
import { useEffect, useState } from 'react'
import { getMyEodReports, getTodayReport, upsertEodReport } from '@/lib/queries/eod'
import { cn } from '@/lib/utils'
import { CheckCircle2, Send } from 'lucide-react'

const moodLabels: Record<string, string> = {
  great: 'Great',
  good: 'Good',
  okay: 'Okay',
  struggling: 'Struggling',
}

export default function EodPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState<any[]>([])
  const [todayReport, setTodayReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Form state
  const [tasksCompleted, setTasksCompleted] = useState('')
  const [blockers, setBlockers] = useState('')
  const [planTomorrow, setPlanTomorrow] = useState('')
  const [hoursWorked, setHoursWorked] = useState('')
  const [loomUrl, setLoomUrl] = useState('')
  const [mood, setMood] = useState('')

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const [allReports, today] = await Promise.all([
          getMyEodReports(user!.id),
          getTodayReport(user!.id),
        ])
        if (cancelled) return
        setReports(allReports || [])
        if (today) {
          setTodayReport(today)
          setTasksCompleted(today.tasks_completed || '')
          setBlockers(today.blockers || '')
          setPlanTomorrow(today.plan_tomorrow || '')
          setHoursWorked(today.hours_worked?.toString() || '')
          setLoomUrl(today.loom_url || '')
          setMood(today.mood || '')
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [user])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !tasksCompleted.trim()) return
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      const today = new Date().toISOString().split('T')[0]
      const report = await upsertEodReport({
        contractor_id: user.id,
        report_date: today,
        tasks_completed: tasksCompleted.trim(),
        blockers: blockers.trim() || undefined,
        plan_tomorrow: planTomorrow.trim() || undefined,
        hours_worked: hoursWorked ? parseFloat(hoursWorked) : undefined,
        loom_url: loomUrl.trim() || undefined,
        mood: mood || undefined,
      })
      setTodayReport(report)
      setSuccess('EOD report saved!')
      // Refresh list
      const allReports = await getMyEodReports(user.id)
      setReports(allReports || [])
    } catch (e: any) {
      setError(e.message || 'Failed to save report')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="space-y-4"><div className="h-8 w-48 bg-muted animate-pulse rounded" /><div className="h-64 bg-muted animate-pulse rounded-lg" /></div>
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">EOD Reports</h1>

      {/* Today's form */}
      <form onSubmit={handleSubmit} className="border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {todayReport ? "Update Today's Report" : "Today's Report"}
          </h2>
          {todayReport && <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Submitted</span>}
        </div>

        {error && <div className="p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
        {success && <div className="p-3 mb-4 rounded-lg bg-green-500/10 text-green-600 text-sm">{success}</div>}

        <div className="space-y-4">
          <div>
            <label htmlFor="tasks-completed" className="block text-sm font-medium mb-1">What did you complete today? *</label>
            <textarea
              id="tasks-completed"
              value={tasksCompleted}
              onChange={e => setTasksCompleted(e.target.value)}
              placeholder={"- Completed task X\n- Reviewed task Y"}
              rows={4}
              required
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div>
            <label htmlFor="blockers" className="block text-sm font-medium mb-1">Blockers</label>
            <textarea
              id="blockers"
              value={blockers}
              onChange={e => setBlockers(e.target.value)}
              placeholder="Anything stopping your progress?"
              rows={2}
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div>
            <label htmlFor="plan-tomorrow" className="block text-sm font-medium mb-1">Plan for tomorrow</label>
            <textarea
              id="plan-tomorrow"
              value={planTomorrow}
              onChange={e => setPlanTomorrow(e.target.value)}
              placeholder="What will you work on next?"
              rows={2}
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="hours-worked" className="block text-sm font-medium mb-1">Hours worked</label>
              <input
                id="hours-worked"
                type="number"
                value={hoursWorked}
                onChange={e => setHoursWorked(e.target.value)}
                placeholder="7"
                step="0.5"
                min="0"
                max="24"
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label htmlFor="mood" className="block text-sm font-medium mb-1">How are you feeling?</label>
              <select id="mood" value={mood} onChange={e => setMood(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">Select...</option>
                {Object.entries(moodLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="loom-url" className="block text-sm font-medium mb-1">Loom recording (optional)</label>
            <input
              id="loom-url"
              type="url"
              value={loomUrl}
              onChange={e => setLoomUrl(e.target.value)}
              placeholder="https://www.loom.com/share/..."
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <button type="submit" disabled={submitting || !tasksCompleted.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50">
            <Send className="w-4 h-4" />
            {submitting ? 'Saving...' : todayReport ? 'Update Report' : 'Submit Report'}
          </button>
        </div>
      </form>

      {/* Past reports */}
      <h2 className="text-lg font-semibold mb-4">Past Reports</h2>
      {reports.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground">
          No past reports
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map(r => (
            <div key={r.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{new Date(r.report_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {r.hours_worked && <span>{r.hours_worked}h</span>}
                  {r.mood && <span>{moodLabels[r.mood]}</span>}
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap">{r.tasks_completed}</p>
              {r.blockers && <p className="text-sm text-red-400 mt-1">Blockers: {r.blockers}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
