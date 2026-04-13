'use client'

import { useAuth } from '@/components/AuthProvider'
import { useEffect, useState } from 'react'
import { getAvailableTasks } from '@/lib/queries/tasks'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

const statusColors: Record<string, string> = {
  available: 'bg-green-500/10 text-green-500',
  claimed: 'bg-blue-500/10 text-blue-500',
  submitted: 'bg-yellow-500/10 text-yellow-500',
  approved: 'bg-emerald-500/10 text-emerald-500',
  rejected: 'bg-red-500/10 text-red-500',
}

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-500/10 text-green-600',
  Medium: 'bg-yellow-500/10 text-yellow-600',
  Hard: 'bg-red-500/10 text-red-600',
}

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'mine' | 'available'>('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const allTasks = await getAvailableTasks()
        if (cancelled) return
        setTasks(allTasks || [])
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [user])

  const filtered = tasks.filter(t => {
    if (filter === 'mine') return t.claimed_by === user?.id
    if (filter === 'available') return t.status === 'available'
    return true
  }).filter(t =>
    !search || t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'available', 'mine'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 text-sm rounded-lg border transition-colors capitalize",
                filter === f ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
              )}>
              {f === 'mine' ? 'My Tasks' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      {loading ? (
        <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center border border-dashed rounded-lg text-muted-foreground">
          No tasks found
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(task => (
            <Link key={task.id} href={`/tasks/${task.id}`}
              className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full", difficultyColors[task.difficulty] || '')}>
                      {task.difficulty}
                    </span>
                    {task.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{task.category}</span>
                    )}
                    <span className="text-xs text-muted-foreground">{task.reward} XP</span>
                    {task.payout_amount && (
                      <span className="text-xs font-medium text-green-600">${task.payout_amount}</span>
                    )}
                  </div>
                </div>
                <span className={cn("text-xs px-2 py-1 rounded-full whitespace-nowrap", statusColors[task.status] || '')}>
                  {task.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
