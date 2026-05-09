import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createSupabaseServer()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = user.id

  const [profile, bounties, submissions, eodReports, timeClock] = await Promise.all([
    supabase.from('contractor_profiles').select('*').eq('id', userId).single(),
    supabase.from('bounties').select('*').eq('claimed_by', userId),
    supabase.from('task_submissions').select('*').eq('submitted_by', userId),
    supabase.from('eod_reports').select('*').eq('contractor_id', userId),
    supabase.from('time_clock').select('*').eq('contractor_id', userId),
  ])

  const exportData = {
    exported_at: new Date().toISOString(),
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
    profile: profile.data,
    bounties: bounties.data ?? [],
    task_submissions: submissions.data ?? [],
    eod_reports: eodReports.data ?? [],
    time_clock: timeClock.data ?? [],
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="at-data-export-${userId}.json"`,
    },
  })
}
