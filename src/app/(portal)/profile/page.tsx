'use client'

import { useAuth } from '@/components/AuthProvider'
import { useEffect, useState } from 'react'
import { getMyProfile } from '@/lib/queries/contractors'
import { User, Mail, Clock, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
