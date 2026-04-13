'use client'

import { useEffect, useState } from 'react'
import { getAllTasks, createTask } from '@/lib/queries/admin'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Plus, X } from 'lucide-react'

const statusColors: Record<string, string> = {
  available: 'bg-green-500/10 text-green-500',
  claimed: 'bg-blue-500/10 text-blue-500',
  submitted: 'bg-yellow-500/10 text-yellow-500',
  approved: 'bg-emerald-500/10 text-emerald-500',
  rejected: 'bg-red-500/10 text-red-500',
  paid: 'bg-purple-500/10 text-purple-500',
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '', description: '', reward: 100, difficulty: 'Easy',
    category: 'Operations', galaxy_id: 'nexus', payout_amount: 0,
  })

  useEffect(() => {
    async function load() {
      try {
        const t = await getAllTasks()
        setTasks(t || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    try {
      const task = await createTask({
        ...newTask,
        payout_amount: newTask.payout_amount || undefined,
      })
      setTasks([task, ...tasks])
      setShowCreate(false)
      setNewTask({ title: '', description: '', reward: 100, difficulty: 'Easy', category: 'Operations', galaxy_id: 'nexus', payout_amount: 0 })
    } catch (e) {
      console.error(e)
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />)}</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">
          {showCreate ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showCreate ? 'Cancel' : 'Create Task'}
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <form onSubmit={handleCreate} className="border rounded-lg p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input type="text" required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea required rows={3} value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm resize-none" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">XP Reward</label>
              <input type="number" value={newTask.reward} onChange={e => setNewTask({...newTask, reward: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payout ($)</label>
              <input type="number" value={newTask.payout_amount} onChange={e => setNewTask({...newTask, payout_amount: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select value={newTask.difficulty} onChange={e => setNewTask({...newTask, difficulty: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm">
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={newTask.category} onChange={e => setNewTask({...newTask, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm">
                <option>Operations</option><option>Design</option><option>Content</option>
                <option>Engineering</option><option>AI/ML</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={creating}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50">
            {creating ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      )}

      {/* Task list */}
      <div className="space-y-2">
        {tasks.map(task => (
          <Link key={task.id} href={`/admin/tasks/${task.id}`}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{task.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{task.difficulty} · {task.category} · {task.reward} XP</p>
            </div>
            <span className={cn("text-xs px-2 py-1 rounded-full whitespace-nowrap ml-3", statusColors[task.status] || '')}>{task.status}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
