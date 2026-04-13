import { createSupabaseBrowser } from '@/lib/supabase'

export async function getMyProfile(userId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('contractor_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getAllContractors() {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('contractor_profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getDocuments() {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}
