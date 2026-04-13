import { createSupabaseBrowser } from '@/lib/supabase'

export async function getActiveShift(contractorId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('time_clock')
    .select('*')
    .eq('contractor_id', contractorId)
    .is('clock_out', null)
    .order('clock_in', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function clockIn(contractorId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('time_clock')
    .insert({ contractor_id: contractorId })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function clockOut(shiftId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('time_clock')
    .update({ clock_out: new Date().toISOString() })
    .eq('id', shiftId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getRecentShifts(contractorId: string, limit = 7) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('time_clock')
    .select('*')
    .eq('contractor_id', contractorId)
    .not('clock_out', 'is', null)
    .order('clock_in', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}
