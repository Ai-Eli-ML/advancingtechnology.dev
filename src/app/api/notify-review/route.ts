import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase-server'

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || ''
const DISCORD_API = 'https://discord.com/api/v10'

// Contractor office channels — map discord_id to their office general channel
const OFFICE_CHANNELS: Record<string, string> = {
  '1460700035502178520': '1463953468518699142', // Ziva's office general
}

async function sendDiscordDM(userId: string, content: string) {
  if (!DISCORD_BOT_TOKEN) return
  try {
    // Create DM channel
    const dmRes = await fetch(`${DISCORD_API}/users/@me/channels`, {
      method: 'POST',
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient_id: userId }),
    })
    const dm = await dmRes.json()
    if (!dm.id) return

    // Send message
    await fetch(`${DISCORD_API}/channels/${dm.id}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
  } catch (e) {
    console.error('Discord DM error:', e)
  }
}

async function sendDiscordChannel(channelId: string, content: string) {
  if (!DISCORD_BOT_TOKEN) return
  try {
    await fetch(`${DISCORD_API}/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
  } catch (e) {
    console.error('Discord channel error:', e)
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { taskTitle, decision, notes, contractorDiscordId, contractorEmail } = body

    if (!taskTitle || !decision) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const statusEmoji = decision === 'approved' ? '✅' : decision === 'rejected' ? '❌' : '🔄'
    const statusLabel = decision === 'approved' ? 'Approved' : decision === 'rejected' ? 'Rejected' : 'Revision Requested'

    const message = `${statusEmoji} **Task Review Update**\n\nTask: **${taskTitle}**\nStatus: **${statusLabel}**${notes ? `\n\nReviewer notes: ${notes}` : ''}\n\nView in portal: https://advancingtechnology.dev/tasks`

    // Send Discord DM
    if (contractorDiscordId) {
      await sendDiscordDM(contractorDiscordId, message)

      // Send to office channel
      const officeChannel = OFFICE_CHANNELS[contractorDiscordId]
      if (officeChannel) {
        await sendDiscordChannel(officeChannel, message)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Notify review error:', error)
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 })
  }
}
