import { NextResponse } from 'next/server'
import { createSupabaseServer, createSupabaseAdmin } from '@/lib/supabase-server'

export async function POST() {
  const supabase = await createSupabaseServer()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createSupabaseAdmin()
  const userId = user.id

  const deletions = await Promise.allSettled([
    admin.from('time_clock').delete().eq('contractor_id', userId),
    admin.from('eod_reports').delete().eq('contractor_id', userId),
    admin.from('task_submissions').delete().eq('submitted_by', userId),
    admin.from('bounty_activity').delete().eq('actor_id', userId),
    admin.from('contractor_profiles').delete().eq('id', userId),
  ])

  const failures = deletions.filter(r => r.status === 'rejected')
  if (failures.length > 0) {
    return NextResponse.json(
      { error: 'Some data could not be deleted. Contact support.' },
      { status: 500 }
    )
  }

  const { error: deleteUserError } = await admin.auth.admin.deleteUser(userId)
  if (deleteUserError) {
    return NextResponse.json(
      { error: 'Account data deleted but auth removal failed. Contact support.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
