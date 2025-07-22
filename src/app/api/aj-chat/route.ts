import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  context?: string;
}

// Canned responses for different contexts
const responses = {
  greeting: [
    "Hello! I'm AJ, your AI assistant for AdvancingTechnology.dev. How can I help you today?",
    "Welcome to the Agentic Ecosystem! I'm here to help you discover amazing AI plugins and tools.",
    "Hi there! I'm AJ. Whether you're looking to build, buy, or explore AI solutions, I'm here to guide you."
  ],
  plugins: [
    "Looking for plugins? Our marketplace features cutting-edge AI tools for development, productivity, and more. What specific functionality are you interested in?",
    "I can help you find the perfect plugin! Are you looking for development tools, AI assistants, or enterprise solutions?",
    "Our plugin ecosystem is growing rapidly! From code assistants to voice synthesis, we have tools for every need."
  ],
  help: [
    "I can help you with:\n• Finding the right AI plugins\n• Understanding how to integrate tools\n• Publishing your own plugins\n• Navigating the marketplace\n\nWhat would you like to know more about?",
    "Here's what I can assist with:\n• Plugin recommendations\n• Technical documentation\n• Account setup\n• Publishing guidelines\n\nWhat interests you most?"
  ],
  publishing: [
    "Ready to publish your own plugin? It's easy! You'll need to:\n1. Create an account\n2. Prepare your plugin package\n3. Submit for review\n4. Set your pricing\n\nWould you like me to walk you through the process?",
    "Publishing on AT.dev is straightforward! We support various AI frameworks and provide comprehensive documentation. What kind of plugin are you planning to build?"
  ],
  pricing: [
    "Our platform offers flexible pricing:\n• Free tier for open-source plugins\n• Starter plan at $19/month\n• Pro plan at $49/month\n• Enterprise custom pricing\n\nWhich tier interests you?",
    "We have pricing options for everyone! Developers can start free, and businesses can scale with our Pro and Enterprise plans. What's your use case?"
  ],
  default: [
    "That's an interesting question! While I'm still learning, I'd be happy to help you explore our marketplace or connect you with our documentation.",
    "I'm here to help! Could you tell me more about what you're looking for? I can assist with plugins, documentation, or general questions about the platform.",
    "Thanks for your message! I'm continuously improving. In the meantime, feel free to browse our marketplace or check out the docs section."
  ]
};

function getResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  
  // Check for keywords and return appropriate response
  if (lastMessage.includes('hello') || lastMessage.includes('hi') || lastMessage.includes('hey')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  
  if (lastMessage.includes('plugin') || lastMessage.includes('marketplace') || lastMessage.includes('tool')) {
    return responses.plugins[Math.floor(Math.random() * responses.plugins.length)];
  }
  
  if (lastMessage.includes('help') || lastMessage.includes('assist') || lastMessage.includes('support')) {
    return responses.help[Math.floor(Math.random() * responses.help.length)];
  }
  
  if (lastMessage.includes('publish') || lastMessage.includes('sell') || lastMessage.includes('create')) {
    return responses.publishing[Math.floor(Math.random() * responses.publishing.length)];
  }
  
  if (lastMessage.includes('price') || lastMessage.includes('cost') || lastMessage.includes('pricing')) {
    return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
  }
  
  // Default response
  return responses.default[Math.floor(Math.random() * responses.default.length)];
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    const responseContent = getResponse(body.messages);
    
    return NextResponse.json({
      message: {
        role: 'assistant',
        content: responseContent
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'AJ Chat API',
    version: '1.0.0',
    message: 'Use POST method to send chat messages'
  });
}