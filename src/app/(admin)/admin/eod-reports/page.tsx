'use client'

import { useEffect, useState } from 'react'
import { getAllEodReports } from '@/lib/queries/admin'
import { cn } from '@/lib/utils'

const moodLabels: Record<string, string> = {
  great: 'Great', good: 'Good', okay: 'Okay', struggling: 'Struggling',
}

export default function AdminEodReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const r = await getAllEodReports()
        setReports(r || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />)}</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">EOD Reports</h1>

      {reports.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground">No reports submitted</div>
      ) : (
        <div className="space-y-3">
          {reports.map(r => (
            <div key={r.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{r.contractor_profiles?.full_name || 'Unknown'}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(r.report_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {r.hours_worked && <span>{r.hours_worked}h</span>}
                  {r.mood && <span>{moodLabels[r.mood]}</span>}
                </div>
              </div>
              <div className="text-sm whitespace-pre-wrap">{r.tasks_completed}</div>
              {r.blockers && <p className="text-sm text-red-400 mt-2">Blockers: {r.blockers}</p>}
              {r.plan_tomorrow && <p className="text-sm text-blue-400 mt-1">Tomorrow: {r.plan_tomorrow}</p>}
              {r.loom_url && (
                <a href={r.loom_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2">
                  View recording
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
