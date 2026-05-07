import { NextRequest, NextResponse } from 'next/server';

const AJ_ENDPOINT = 'http://localhost:8002/api/chat';
const AJ_SYSTEM = 'You are AJ, the AI assistant for the Advancing Technology contractor portal. Help contractors with tasks, EOD reports, and general questions about the portal. Be concise and helpful.';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const lastMessage = body.messages[body.messages.length - 1]?.content || '';

    try {
      const ajResponse = await fetch(AJ_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: lastMessage,
          system: AJ_SYSTEM,
          use_memories: false,
          use_tools: false,
          max_new_tokens: 300,
        }),
        signal: AbortSignal.timeout?.(30000),
      });

      if (ajResponse.ok) {
        const data = await ajResponse.json();
        return NextResponse.json({
          message: { role: 'assistant', content: data.response || data.text || 'AJ is thinking...' },
          source: data.source || 'aj',
          timestamp: new Date().toISOString(),
        });
      }
    } catch {
      // AJ unreachable — fall through to fallback
    }

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: "I'm AJ, but I'm currently warming up. Try again in a moment, or head to your dashboard for task management.",
      },
      source: 'fallback',
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  let ajHealthy = false;
  try {
    const res = await fetch('http://localhost:8002/health', { signal: AbortSignal.timeout?.(3000) });
    ajHealthy = res.ok;
  } catch { /* AJ unreachable */ }

  return NextResponse.json({
    status: ajHealthy ? 'connected' : 'fallback',
    service: 'AJ Chat API',
    backend: 'localhost:8002',
  });
}