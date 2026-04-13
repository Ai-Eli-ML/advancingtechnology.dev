'use client'

import { useAuth } from '@/components/AuthProvider'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getTaskById, getTaskSubmissions } from '@/lib/queries/tasks'
import { reviewSubmission } from '@/lib/queries/admin'
import { cn } from '@/lib/utils'
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, ExternalLink } from 'lucide-react'
import Link from 'next/link'

function getLoomEmbedUrl(url: string): string | null {
  const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  return match ? `https://www.loom.com/embed/${match[1]}` : null
}

export default function AdminTaskReviewPage() {
  const { user } = useAuth()
  const params = useParams()
  const taskId = params.id as string
  const [task, setTask] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [reviewNotes, setReviewNotes] = useState('')
  const [reviewing, setReviewing] = useState(false)
  const [result, setResult] = useState<{ type: 'success' | 'error', msg: string } | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const [t, subs] = await Promise.all([
          getTaskById(taskId),
          getTaskSubmissions(taskId),
        ])
        setTask(t)
        setSubmissions(subs || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [taskId])

  async function handleReview(submissionId: string, decision: string) {
    if (!user) return
    setReviewing(true)
    setResult(null)
    try {
      const res = await reviewSubmission(submissionId, user.id, decision, reviewNotes.trim() || undefined)
      if (res?.success) {
        setResult({ type: 'success', msg: `Submission ${decision}` })
        // Refresh
        const [t, subs] = await Promise.all([getTaskById(taskId), getTaskSubmissions(taskId)])
        setTask(t)
        setSubmissions(subs || [])
        setReviewNotes('')
      } else {
        setResult({ type: 'error', msg: res?.error || 'Failed' })
      }
    } catch (e: any) {
      setResult({ type: 'error', msg: e.message })
    } finally {
      setReviewing(false)
    }
  }

  if (loading) {
    return <div className="h-64 bg-muted animate-pulse rounded-lg" />
  }

  if (!task) {
    return <div className="p-12 text-center text-muted-foreground">Task not found</div>
  }

  return (
    <div className="max-w-3xl">
      <Link href="/admin/tasks" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to tasks
      </Link>

      <div className="border rounded-lg p-6 mb-6">
        <h1 className="text-xl font-bold mb-2">{task.title}</h1>
        <p className="text-muted-foreground mb-4">{task.description}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="px-2 py-1 rounded bg-muted">{task.status}</span>
          <span className="px-2 py-1 rounded bg-muted">{task.difficulty}</span>
          <span className="px-2 py-1 rounded bg-muted">{task.reward} XP</span>
          {task.payout_amount && <span className="px-2 py-1 rounded bg-green-500/10 text-green-600">${task.payout_amount}</span>}
        </div>
      </div>

      {result && (
        <div className={cn("p-3 mb-4 rounded-lg text-sm",
          result.type === 'success' ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"
        )}>{result.msg}</div>
      )}

      {/* Submissions */}
      <h2 className="text-lg font-semibold mb-4">Submissions ({submissions.length})</h2>
      {submissions.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground">No submissions yet</div>
      ) : (
        <div className="space-y-4">
          {submissions.map(sub => {
            const isPending = sub.status === 'pending'
            const loomEmbed = sub.proof_url ? getLoomEmbedUrl(sub.proof_url) : null
            return (
              <div key={sub.id} className={cn("border rounded-lg p-6", isPending && "border-yellow-500/30")}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Version {sub.version}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", {
                    'bg-yellow-500/10 text-yellow-500': sub.status === 'pending',
                    'bg-green-500/10 text-green-500': sub.status === 'approved',
                    'bg-orange-500/10 text-orange-500': sub.status === 'revision_requested',
                    'bg-red-500/10 text-red-500': sub.status === 'rejected',
                  })}>{sub.status.replace('_', ' ')}</span>
                </div>

                {sub.proof_url && (
                  <a href={sub.proof_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-2">
                    <ExternalLink className="w-3 h-3" /> View proof
                  </a>
                )}

                {loomEmbed && (
                  <div className="rounded-lg overflow-hidden border mb-3">
                    <iframe src={loomEmbed} className="w-full aspect-video" allowFullScreen />
                  </div>
                )}

                {sub.proof_text && <p className="text-sm text-muted-foreground mb-3">{sub.proof_text}</p>}

                {sub.reviewer_notes && (
                  <div className="p-2 rounded bg-muted text-sm mb-3">
                    <span className="font-medium">Review notes:</span> {sub.reviewer_notes}
                  </div>
                )}

                {/* Review controls */}
                {isPending && (
                  <div className="border-t pt-4 mt-4 space-y-3">
                    <textarea
                      value={reviewNotes}
                      onChange={e => setReviewNotes(e.target.value)}
                      placeholder="Review notes (optional)..."
                      rows={2}
                      className="w-full px-3 py-2 border rounded-lg bg-background text-sm resize-none"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleReview(sub.id, 'approved')} disabled={reviewing}
                        className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50">
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </button>
                      <button onClick={() => handleReview(sub.id, 'revision_requested')} disabled={reviewing}
                        className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 disabled:opacity-50">
                        <RotateCcw className="w-4 h-4" /> Request Revision
                      </button>
                      <button onClick={() => handleReview(sub.id, 'rejected')} disabled={reviewing}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50">
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
