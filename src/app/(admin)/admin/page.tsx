'use client'

import { useEffect, useState } from 'react'
import { getAllTasks, getPendingSubmissions, getRecentActivity } from '@/lib/queries/admin'
import { getAllContractors } from '@/lib/queries/contractors'
import Link from 'next/link'
import { Users, ListTodo, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export default function AdminDashboardPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [contractors, setContractors] = useState<any[]>([])
  const [pending, setPending] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [t, c, p, a] = await Promise.all([
          getAllTasks(),
          getAllContractors(),
          getPendingSubmissions(),
          getRecentActivity(),
        ])
        setTasks(t || [])
        setContractors(c || [])
        setPending(p || [])
        setActivity(a || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />)}</div>
  }

  const available = tasks.filter(t => t.status === 'available').length
  const inProgress = tasks.filter(t => t.status === 'claimed').length
  const submitted = tasks.filter(t => t.status === 'submitted').length
  const approved = tasks.filter(t => t.status === 'approved').length

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Contractors" value={contractors.length} icon={Users} />
        <StatCard label="Available Tasks" value={available} icon={ListTodo} />
        <StatCard label="Pending Review" value={pending.length} icon={Clock} color="text-yellow-500" />
        <StatCard label="Completed" value={approved} icon={CheckCircle2} color="text-green-500" />
      </div>

      {/* Pending submissions */}
      {pending.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Pending Review ({pending.length})</h2>
          </div>
          <div className="space-y-3">
            {pending.map(sub => (
              <Link key={sub.id} href={`/admin/tasks/${sub.bounty_id}`}
                className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors border-yellow-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{sub.bounties?.title || 'Task'}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Version {sub.version} · {new Date(sub.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">Review</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        {activity.length === 0 ? (
          <p className="text-muted-foreground text-sm">No activity yet</p>
        ) : (
          <div className="space-y-2">
            {activity.slice(0, 10).map(a => (
              <Link key={a.id} href={`/admin/tasks/${a.bounty_id}`}
                className="flex items-center gap-3 p-3 border rounded-lg text-sm hover:bg-muted/50 transition-colors">
                <span className={`px-2 py-0.5 rounded text-xs ${
                  a.action === 'approved' ? 'bg-green-500/10 text-green-500' :
                  a.action === 'rejected' ? 'bg-red-500/10 text-red-500' :
                  a.action === 'submitted' ? 'bg-yellow-500/10 text-yellow-500' :
                  a.action === 'claimed' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-muted text-muted-foreground'
                }`}>{a.action}</span>
                <span className="flex-1 truncate">{a.bounties?.title || 'Task'}</span>
                <span className="text-muted-foreground text-xs">{new Date(a.created_at).toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color = 'text-primary' }: { label: string, value: number, icon: any, color?: string }) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
