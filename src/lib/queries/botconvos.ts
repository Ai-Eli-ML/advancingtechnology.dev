import { createSupabaseBrowser } from '@/lib/supabase'

export async function getBotConversations(limit = 50) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('bot_conversations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}
