'use client'

import { useEffect, useState } from 'react'
import { getBotConversations } from '@/lib/queries/botconvos'
import { cn } from '@/lib/utils'
import { Bot, User, MessageSquare } from 'lucide-react'

export default function BotConversationsPage() {
  const [convos, setConvos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterBot, setFilterBot] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const c = await getBotConversations(100)
        setConvos(c || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const bots = [...new Set(convos.map(c => c.bot_name))]
  const filtered = filterBot ? convos.filter(c => c.bot_name === filterBot) : convos

  if (loading) {
    return <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />)}</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bot Conversations</h1>

      {/* Filter by bot */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilterBot(null)}
          className={cn("px-4 py-2 text-sm rounded-lg border",
            !filterBot ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
          )}>All</button>
        {bots.map(bot => (
          <button key={bot} onClick={() => setFilterBot(bot)}
            className={cn("px-4 py-2 text-sm rounded-lg border",
              filterBot === bot ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
            )}>{bot}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground">
          <MessageSquare className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          No conversations logged yet
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">{c.bot_name}</span>
                  <span className="text-muted-foreground text-xs">→</span>
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{c.username || 'Unknown'}</span>
                  <span className="text-xs text-muted-foreground">in #{c.channel_name || 'unknown'}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.created_at).toLocaleString()}
                </span>
              </div>

              {/* User message */}
              {c.user_message && (
                <div className="mb-2 p-2 rounded bg-muted/50 text-sm">
                  <span className="text-xs font-medium text-muted-foreground">User:</span>
                  <p className="mt-0.5 whitespace-pre-wrap">{c.user_message}</p>
                </div>
              )}

              {/* Bot response */}
              {c.bot_response && (
                <div className="p-2 rounded bg-primary/5 text-sm border border-primary/10">
                  <span className="text-xs font-medium text-primary">Bot:</span>
                  <p className="mt-0.5 whitespace-pre-wrap">{c.bot_response.length > 500 ? c.bot_response.substring(0, 500) + '...' : c.bot_response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
