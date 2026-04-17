'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createSupabaseBrowser } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface ContractorProfile {
  id: string
  full_name: string | null
  email: string | null
  role: string | null
  status: string | null
  discord_id: string | null
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: ContractorProfile | null
  isAdmin: boolean
  loading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<ContractorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let supabase
    try {
      supabase = createSupabaseBrowser()
    } catch (error) {
      console.error('Supabase initialization error:', error)
      setLoading(false)
      return
    }

    const loadProfile = async (userId: string) => {
      try {
        const { data } = await supabase
          .from('contractor_profiles')
          .select('id, full_name, email, role, status, discord_id')
          .eq('id', userId)
          .maybeSingle()
        setProfile((data as ContractorProfile) ?? null)
      } catch (error) {
        console.error('Error loading contractor profile:', error)
        setProfile(null)
      }
    }

    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadProfile(session.user.id)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)

      // Handle specific auth events
      if (event === 'SIGNED_IN') {
        router.refresh()
      } else if (event === 'SIGNED_OUT') {
        router.push('/auth')
      } else if (event === 'USER_UPDATED') {
        // Refresh user data if needed
        if (session?.user) {
          setUser(session.user)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signOut = async () => {
    try {
      const supabase = createSupabaseBrowser()
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Clear local state
      setUser(null)
      setSession(null)
      setProfile(null)

      // Redirect to auth page
      router.push('/auth')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshSession = async () => {
    try {
      const supabase = createSupabaseBrowser()
      const { data: { session }, error } = await supabase.auth.refreshSession()
      if (error) throw error
      
      setSession(session)
      setUser(session?.user ?? null)
    } catch (error) {
      console.error('Error refreshing session:', error)
      // If refresh fails, sign out the user
      await signOut()
    }
  }

  // Admin = contractor_profiles.role OR legacy auth.user_metadata.role
  // Covers consolidated accounts that may lack a profile row
  const isAdmin =
    profile?.role === 'admin' ||
    (user?.user_metadata as { role?: string } | undefined)?.role === 'admin'

  const value: AuthContextType = {
    user,
    session,
    profile,
    isAdmin,
    loading,
    signOut,
    refreshSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Helper hook to require authentication
export function useRequireAuth(redirectTo = '/auth') {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  return { user, loading }
}