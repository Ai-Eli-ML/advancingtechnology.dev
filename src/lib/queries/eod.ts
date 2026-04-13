import { createSupabaseBrowser } from '@/lib/supabase'

export async function getMyEodReports(contractorId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('eod_reports')
    .select('*')
    .eq('contractor_id', contractorId)
    .order('report_date', { ascending: false })
    .limit(30)
  if (error) throw error
  return data
}

export async function getTodayReport(contractorId: string) {
  const supabase = createSupabaseBrowser()
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('eod_reports')
    .select('*')
    .eq('contractor_id', contractorId)
    .eq('report_date', today)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function upsertEodReport(report: {
  contractor_id: string
  report_date: string
  tasks_completed: string
  blockers?: string
  plan_tomorrow?: string
  hours_worked?: number
  loom_url?: string
  mood?: string
}) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('eod_reports')
    .upsert(report, { onConflict: 'contractor_id,report_date' })
    .select()
    .single()
  if (error) throw error
  return data
}
