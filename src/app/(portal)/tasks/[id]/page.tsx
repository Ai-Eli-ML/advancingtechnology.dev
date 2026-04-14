'use client'

import { useAuth } from '@/components/AuthProvider'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getTaskById, getTaskSubmissions, claimTask, submitTaskProof } from '@/lib/queries/tasks'
import { cn } from '@/lib/utils'
import { ArrowLeft, Send, ExternalLink, Plus, X } from 'lucide-react'
import Link from 'next/link'

function getLoomEmbedUrl(url: string): string | null {
  const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  return match ? `https://www.loom.com/embed/${match[1]}` : null
}

export default function TaskDetailPage() {
  const { user } = useAuth()
  const params = useParams()
  const [task, setTask] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [proofLinks, setProofLinks] = useState<string[]>([''])
  const [proofText, setProofText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const taskId = params.id as string

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [t, subs] = await Promise.all([
          getTaskById(taskId),
          getTaskSubmissions(taskId),
        ])
        if (cancelled) return
        setTask(t)
        setSubmissions(subs || [])
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [taskId])

  async function handleClaim() {
    if (!user) return
    setClaiming(true)
    setError('')
    try {
      const result = await claimTask(taskId, user.id)
      if (result?.success) {
        setSuccess('Task claimed!')
        setTask({ ...task, status: 'claimed', claimed_by: user.id })
      } else {
        setError(result?.error || 'Failed to claim task')
      }
    } catch (e: any) {
      setError(e.message || 'Failed to claim task')
    } finally {
      setClaiming(false)
    }
  }

  function addLinkField() {
    setProofLinks([...proofLinks, ''])
  }

  function updateLink(index: number, value: string) {
    const updated = [...proofLinks]
    updated[index] = value
    setProofLinks(updated)
  }

  function removeLink(index: number) {
    if (proofLinks.length <= 1) return
    setProofLinks(proofLinks.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validLinks = proofLinks.map(l => l.trim()).filter(Boolean)
    if (!user || validLinks.length === 0) return
    setSubmitting(true)
    setError('')
    try {
      const mainUrl = validLinks[0]
      const allLinks = validLinks.length > 1
        ? `${proofText.trim()}\n\nLinks:\n${validLinks.map((l, i) => `${i + 1}. ${l}`).join('\n')}`
        : proofText.trim() || undefined
      const result = await submitTaskProof(taskId, user.id, mainUrl, validLinks.length > 1 ? allLinks : (proofText.trim() || undefined))
      if (result?.success) {
        setSuccess(`Submitted! (Version ${result.version})`)
        setTask({ ...task, status: 'submitted' })
        setProofLinks([''])
        setProofText('')
        const subs = await getTaskSubmissions(taskId)
        setSubmissions(subs || [])
      } else {
        setError(result?.error || 'Failed to submit')
      }
    } catch (e: any) {
      setError(e.message || 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="space-y-4"><div className="h-8 w-48 bg-muted animate-pulse rounded" /><div className="h-40 bg-muted animate-pulse rounded-lg" /></div>
  }

  if (!task) {
    return <div className="p-12 text-center text-muted-foreground">Task not found</div>
  }

  const isMyTask = task.claimed_by === user?.id
  const canClaim = task.status === 'available' && user
  const canSubmit = isMyTask && (task.status === 'claimed' || task.status === 'submitted')

  return (
    <div className="max-w-3xl">
      <Link href="/tasks" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to tasks
      </Link>

      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-xl font-bold">{task.title}</h1>
          <span className={cn("text-xs px-3 py-1 rounded-full whitespace-nowrap", {
            'bg-green-500/10 text-green-500': task.status === 'available',
            'bg-blue-500/10 text-blue-500': task.status === 'claimed',
            'bg-yellow-500/10 text-yellow-500': task.status === 'submitted',
            'bg-emerald-500/10 text-emerald-500': task.status === 'approved',
            'bg-red-500/10 text-red-500': task.status === 'rejected',
          })}>{task.status}</span>
        </div>

        <p className="text-muted-foreground mb-4">{task.description}</p>

        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-2 py-1 rounded bg-muted">{task.difficulty}</span>
          {task.category && <span className="px-2 py-1 rounded bg-muted">{task.category}</span>}
          <span className="px-2 py-1 rounded bg-muted">{task.reward} XP</span>
          {task.payout_amount && <span className="px-2 py-1 rounded bg-green-500/10 text-green-600">${task.payout_amount}</span>}
        </div>
      </div>

      {/* Messages */}
      {error && <div className="p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
      {success && <div className="p-3 mb-4 rounded-lg bg-green-500/10 text-green-600 text-sm">{success}</div>}

      {/* Claim button */}
      {canClaim && (
        <button onClick={handleClaim} disabled={claiming}
          className="w-full mb-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50">
          {claiming ? 'Claiming...' : 'Claim This Task'}
        </button>
      )}

      {/* Submit proof */}
      {canSubmit && (
        <form onSubmit={handleSubmit} className="border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Submit Proof of Work</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Links (Google Sheet, Loom, etc.) *</label>
              <div className="space-y-2">
                {proofLinks.map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="url"
                      value={link}
                      onChange={e => updateLink(i, e.target.value)}
                      placeholder={i === 0 ? "https://docs.google.com/... or https://www.loom.com/share/..." : "Add another link..."}
                      required={i === 0}
                      className="flex-1 px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    {proofLinks.length > 1 && (
                      <button type="button" onClick={() => removeLink(i)}
                        className="p-2 text-muted-foreground hover:text-destructive">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addLinkField}
                  className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <Plus className="w-3 h-3" /> Add another link
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="proof-text" className="block text-sm font-medium mb-1">Notes (optional)</label>
              <textarea
                id="proof-text"
                value={proofText}
                onChange={e => setProofText(e.target.value)}
                placeholder="Describe what you did..."
                rows={3}
                className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
            {proofLinks.filter(l => l.trim()).map((link, i) => {
              const embed = getLoomEmbedUrl(link)
              return embed ? (
                <div key={i} className="rounded-lg overflow-hidden border">
                  <iframe src={embed} title={`Loom preview ${i + 1}`} className="w-full aspect-video" allowFullScreen />
                </div>
              ) : null
            })}
            <button type="submit" disabled={submitting || !proofLinks[0]?.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50">
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting...' : `Submit (${proofLinks.filter(l => l.trim()).length} link${proofLinks.filter(l => l.trim()).length !== 1 ? 's' : ''})`}
            </button>
          </div>
        </form>
      )}

      {/* Previous submissions */}
      {submissions.length > 0 && (
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Submissions</h2>
          <div className="space-y-4">
            {submissions.map(sub => (
              <div key={sub.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Version {sub.version}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", {
                    'bg-yellow-500/10 text-yellow-500': sub.status === 'pending',
                    'bg-green-500/10 text-green-500': sub.status === 'approved',
                    'bg-orange-500/10 text-orange-500': sub.status === 'revision_requested',
                    'bg-red-500/10 text-red-500': sub.status === 'rejected',
                  })}>{sub.status.replace('_', ' ')}</span>
                </div>
                {sub.proof_url && (
                  <a href={sub.proof_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    <ExternalLink className="w-3 h-3" /> View proof
                  </a>
                )}
                {sub.proof_text && <p className="text-sm text-muted-foreground mt-1">{sub.proof_text}</p>}
                {sub.reviewer_notes && (
                  <div className="mt-2 p-2 rounded bg-muted text-sm">
                    <span className="font-medium">Reviewer:</span> {sub.reviewer_notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
