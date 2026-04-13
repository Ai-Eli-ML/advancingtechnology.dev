import { createSupabaseBrowser } from '@/lib/supabase'

export async function getAllTasks() {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('bounties')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getPendingSubmissions() {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('task_submissions')
    .select('*, bounties(title, reward, difficulty, category)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getAllEodReports(limit = 50) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('eod_reports')
    .select('*, contractor_profiles(full_name, email)')
    .order('report_date', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export async function reviewSubmission(submissionId: string, reviewerId: string, decision: string, notes?: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase.rpc('review_submission', {
    p_submission_id: submissionId,
    p_reviewer_id: reviewerId,
    p_decision: decision,
    p_notes: notes || null,
  })
  if (error) throw error
  return data
}

export async function createTask(task: {
  title: string
  description: string
  reward: number
  difficulty: string
  category: string
  galaxy_id: string
  payout_amount?: number
}) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('bounties')
    .insert({ ...task, source: 'portal', status: 'available' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getRecentActivity(limit = 20) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('bounty_activity')
    .select('*, bounties(title)')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}
