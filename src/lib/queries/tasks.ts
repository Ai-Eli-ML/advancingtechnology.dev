import { createSupabaseBrowser } from '@/lib/supabase'

export async function getAvailableTasks() {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('bounties')
    .select('*')
    .in('status', ['available', 'claimed', 'submitted'])
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getMyTasks(userId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('bounties')
    .select('*')
    .eq('claimed_by', userId)
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getTaskById(id: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('bounties')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function getTaskSubmissions(bountyId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('task_submissions')
    .select('*')
    .eq('bounty_id', bountyId)
    .order('version', { ascending: false })
  if (error) throw error
  return data
}

export async function claimTask(bountyId: string, userId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase.rpc('claim_bounty', {
    p_bounty_id: bountyId,
    p_user_id: userId,
  })
  if (error) throw error
  return data
}

export async function submitTaskProof(bountyId: string, userId: string, proofUrl: string, proofText?: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase.rpc('submit_bounty_work', {
    p_bounty_id: bountyId,
    p_user_id: userId,
    p_proof_url: proofUrl,
    p_proof_text: proofText || null,
    p_attachments: '[]',
  })
  if (error) throw error
  return data
}
