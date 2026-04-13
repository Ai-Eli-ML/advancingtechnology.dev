'use client'

import { useAuth } from '@/components/AuthProvider'
import { useEffect, useState, useCallback } from 'react'
import { getMyTasks } from '@/lib/queries/tasks'
import { getTodayReport } from '@/lib/queries/eod'
import { getActiveShift, clockIn, clockOut } from '@/lib/queries/timeclock'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ListTodo, ClipboardCheck, Clock, CheckCircle2, Play, Square, Timer } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const [myTasks, setMyTasks] = useState<any[]>([])
  const [hasEod, setHasEod] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeShift, setActiveShift] = useState<any>(null)
  const [clockLoading, setClockLoading] = useState(false)
  const [elapsed, setElapsed] = useState('')

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const [tasks, eod, shift] = await Promise.all([
          getMyTasks(user!.id),
          getTodayReport(user!.id),
          getActiveShift(user!.id),
        ])
        if (cancelled) return
        setMyTasks(tasks || [])
        setHasEod(!!eod)
        setActiveShift(shift)
      } catch (e) {
        console.error('Dashboard load error:', e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [user])

  // Elapsed time ticker
  useEffect(() => {
    if (!activeShift) { setElapsed(''); return }
    function tick() {
      const start = new Date(activeShift.clock_in).getTime()
      const diff = Date.now() - start
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setElapsed(`${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [activeShift])

  const handleClockIn = useCallback(async () => {
    if (!user) return
    setClockLoading(true)
    try {
      const shift = await clockIn(user.id)
      setActiveShift(shift)
    } catch (e) {
      console.error('Clock in error:', e)
    } finally {
      setClockLoading(false)
    }
  }, [user])

  const handleClockOut = useCallback(async () => {
    if (!activeShift) return
    setClockLoading(true)
    try {
      await clockOut(activeShift.id)
      setActiveShift(null)
    } catch (e) {
      console.error('Clock out error:', e)
    } finally {
      setClockLoading(false)
    }
  }, [activeShift])

  if (loading) {
    return <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />)}</div>
  }

  const claimed = myTasks.filter(t => t.status === 'claimed')
  const submitted = myTasks.filter(t => t.status === 'submitted')
  const approved = myTasks.filter(t => t.status === 'approved')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back</h1>

      {/* Clock In/Out */}
      <div className={cn(
        "p-4 border rounded-lg mb-6 flex items-center justify-between",
        activeShift ? "border-green-500/30 bg-green-500/5" : "border-border"
      )}>
        <div className="flex items-center gap-3">
          <Timer className={cn("w-5 h-5", activeShift ? "text-green-500" : "text-muted-foreground")} />
          <div>
            <p className="font-medium">{activeShift ? 'Clocked In' : 'Not Clocked In'}</p>
            {elapsed && <p className="text-sm text-green-500 font-mono">{elapsed}</p>}
          </div>
        </div>
        {activeShift ? (
          <button
            onClick={handleClockOut}
            disabled={clockLoading}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50"
          >
            <Square className="w-4 h-4" />
            {clockLoading ? 'Clocking out...' : 'Clock Out'}
          </button>
        ) : (
          <button
            onClick={handleClockIn}
            disabled={clockLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {clockLoading ? 'Clocking in...' : 'Clock In'}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ListTodo} label="In Progress" value={claimed.length} color="text-blue-500" />
        <StatCard icon={Clock} label="Awaiting Review" value={submitted.length} color="text-yellow-500" />
        <StatCard icon={CheckCircle2} label="Approved" value={approved.length} color="text-green-500" />
        <StatCard
          icon={ClipboardCheck}
          label="EOD Today"
          value={hasEod ? 'Done' : 'Pending'}
          color={hasEod ? 'text-green-500' : 'text-red-500'}
        />
      </div>

      {/* Active tasks */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Tasks</h2>
          <Link href="/tasks" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {claimed.length === 0 ? (
          <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground">
            No active tasks. <Link href="/tasks" className="text-primary hover:underline">Browse available tasks</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {claimed.slice(0, 5).map(task => (
              <Link key={task.id} href={`/tasks/${task.id}`}
                className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{task.difficulty} · {task.category} · {task.reward} XP</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">In Progress</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* EOD reminder */}
      {!hasEod && (
        <Link href="/eod"
          className="block p-4 border border-yellow-500/30 bg-yellow-500/5 rounded-lg hover:bg-yellow-500/10 transition-colors">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="font-medium">EOD Report Due</p>
              <p className="text-sm text-muted-foreground">Submit your daily report before end of shift</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: LucideIcon, label: string, value: string | number, color: string }) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <Icon className={cn('w-5 h-5', color)} />
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
