'use client'

import { useAuth } from '@/components/AuthProvider'
import { useEffect, useState } from 'react'
import { getMyProfile } from '@/lib/queries/contractors'
import { User, Mail, Clock, Shield, Download, Trash2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const p = await getMyProfile(user!.id)
        if (cancelled) return
        setProfile(p)
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [user])

  async function handleExport() {
    setExporting(true)
    try {
      const res = await fetch('/api/gdpr/export')
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `at-data-export-${user?.id}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Failed to export data. Please try again or contact support.')
    } finally {
      setExporting(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch('/api/gdpr/delete', { method: 'POST' })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Deletion failed')
      }
      await signOut()
    } catch (e: any) {
      alert(e.message || 'Failed to delete account. Please contact support.')
      setDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (loading) {
    return <div className="h-64 bg-muted animate-pulse rounded-lg" />
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="border rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile?.full_name || user?.email?.split('@')[0] || 'Contractor'}</h2>
            <p className="text-sm text-muted-foreground">{profile?.role || 'contractor'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <InfoRow icon={Mail} label="Email" value={user?.email || '--'} />
          <InfoRow icon={Clock} label="Timezone" value={profile?.timezone || 'UTC'} />
          <InfoRow icon={Shield} label="Status" value={profile?.status || 'pending'} />
          {profile?.skills?.length > 0 && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Skills</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.skills.map((s: string) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full bg-muted">{s}</span>
                ))}
              </div>
            </div>
          )}
          {profile?.bio && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">Bio</span>
              <p className="text-sm mt-1">{profile.bio}</p>
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-1">Your Data</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Export or delete your personal data per our <a href="/privacy" className="underline hover:text-foreground">privacy policy</a>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border hover:bg-muted transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Exporting...' : 'Export My Data'}
          </button>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-destructive font-medium">Are you sure?</span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-1.5 text-sm rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Yes, delete everything'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 text-sm rounded-md border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground w-24">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  )
}
