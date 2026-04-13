'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { getDocuments } from '@/lib/queries/contractors'
import { getMyTasks } from '@/lib/queries/tasks'
import { getActiveShift } from '@/lib/queries/timeclock'
import { FileText, ExternalLink, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const categoryLabels: Record<string, string> = {
  legal: 'Legal',
  sop: 'SOPs',
  onboarding: 'Onboarding',
  reference: 'Reference',
  template: 'Templates',
}

export default function DocumentsPage() {
  const { user } = useAuth()
  const [docs, setDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const [d, tasks, shift] = await Promise.all([
          getDocuments(),
          getMyTasks(user!.id),
          getActiveShift(user!.id),
        ])
        if (cancelled) return
        setDocs(d || [])
        // Unlocked if clocked in OR has claimed at least one task
        setUnlocked(!!shift || (tasks && tasks.length > 0))
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [user])

  const categories = [...new Set(docs.map(d => d.category))]
  const filtered = activeCategory ? docs.filter(d => d.category === activeCategory) : docs

  if (loading) {
    return <div className="space-y-4"><div className="h-8 w-48 bg-muted animate-pulse rounded" /><div className="h-32 bg-muted animate-pulse rounded-lg" /></div>
  }

  if (!unlocked) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Documents</h1>
        <div className="p-8 text-center border border-dashed rounded-lg">
          <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium mb-1">Documents are locked</p>
          <p className="text-sm text-muted-foreground mb-4">Clock in and claim a task to access documents.</p>
          <Link href="/dashboard" className="text-sm text-primary hover:underline">Go to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Documents</h1>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setActiveCategory(null)}
          className={cn("px-4 py-2 text-sm rounded-lg border whitespace-nowrap",
            !activeCategory ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
          )}>All</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={cn("px-4 py-2 text-sm rounded-lg border whitespace-nowrap",
              activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
            )}>{categoryLabels[cat] || cat}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground">No documents</div>
      ) : (
        <div className="grid gap-3">
          {filtered.map(doc => (
            <a key={doc.id} href={doc.file_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
              <FileText className="w-8 h-8 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium flex items-center gap-2">
                  {doc.title}
                  {doc.required_for_onboarding && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-500">Required</span>
                  )}
                </h3>
                {doc.description && <p className="text-sm text-muted-foreground mt-0.5">{doc.description}</p>}
                <p className="text-xs text-muted-foreground mt-1">{categoryLabels[doc.category] || doc.category}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
