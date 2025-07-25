import { Plugin } from "@/types/plugin";

export const mockPlugins: Plugin[] = [
  {
    id: "chatgpt-code-assistant",
    name: "ChatGPT Code Assistant",
    tagline: "AI-powered code completion and refactoring for your IDE",
    price: 0,
    coverImage: "/images/plugin-1.jpg",
    rating: 5,
    categories: ["Development", "AI", "Productivity"]
  },
  {
    id: "langchain-memory-pro",
    name: "LangChain Memory Pro",
    tagline: "Advanced memory management for your LangChain applications",
    price: 29,
    coverImage: "/images/plugin-2.jpg",
    rating: 4,
    categories: ["LangChain", "Memory", "Enterprise"]
  },
  {
    id: "voice-synthesis-ai",
    name: "Voice Synthesis AI",
    tagline: "Natural-sounding voice generation for any application",
    price: 49,
    coverImage: "/images/plugin-3.jpg",
    rating: 5,
    categories: ["Voice", "AI", "Media"]
  },
  {
    id: "semantic-search-engine",
    name: "Semantic Search Engine",
    tagline: "Context-aware search powered by embeddings",
    price: 19,
    coverImage: "/images/plugin-4.jpg",
    rating: 4,
    categories: ["Search", "NLP", "Database"]
  },
  {
    id: "ai-content-moderator",
    name: "AI Content Moderator",
    tagline: "Real-time content moderation using advanced AI models",
    price: 39,
    coverImage: "/images/plugin-5.jpg",
    rating: 5,
    categories: ["Moderation", "Security", "AI"]
  },
  {
    id: "workflow-automation-bot",
    name: "Workflow Automation Bot",
    tagline: "Automate repetitive tasks with intelligent workflows",
    price: 0,
    coverImage: "/images/plugin-6.jpg",
    rating: 4,
    categories: ["Automation", "Productivity", "Integration"]
  },
  {
    id: "sentiment-analysis-pro",
    name: "Sentiment Analysis Pro",
    tagline: "Advanced sentiment detection for customer feedback",
    price: 24,
    coverImage: "/images/plugin-7.jpg",
    rating: 4,
    categories: ["Analytics", "NLP", "Customer Service"]
  },
  {
    id: "ai-image-enhancer",
    name: "AI Image Enhancer",
    tagline: "Upscale and enhance images using state-of-the-art AI",
    price: 15,
    coverImage: "/images/plugin-8.jpg",
    rating: 5,
    categories: ["Image Processing", "AI", "Media"]
  },
  {
    id: "smart-data-extractor",
    name: "Smart Data Extractor",
    tagline: "Extract structured data from any document format",
    price: 35,
    coverImage: "/images/plugin-9.jpg",
    rating: 4,
    categories: ["Data Processing", "OCR", "Enterprise"]
  },
  {
    id: "real-time-translator",
    name: "Real-time Translator",
    tagline: "Instant translation for 100+ languages with context awareness",
    price: 0,
    coverImage: "/images/plugin-10.jpg",
    rating: 5,
    categories: ["Translation", "NLP", "Communication"]
  },
  {
    id: "ai-test-generator",
    name: "AI Test Generator",
    tagline: "Automatically generate comprehensive test suites",
    price: 45,
    coverImage: "/images/plugin-11.jpg",
    rating: 4,
    categories: ["Testing", "Development", "QA"]
  },
  {
    id: "prompt-optimizer",
    name: "Prompt Optimizer",
    tagline: "Optimize your AI prompts for better results",
    price: 12,
    coverImage: "/images/plugin-12.jpg",
    rating: 5,
    categories: ["AI", "Optimization", "Tools"]
  }
];

export function getPluginById(id: string): Plugin | undefined {
  return mockPlugins.find(plugin => plugin.id === id);
}

export function getPluginsByCategory(category: string): Plugin[] {
  return mockPlugins.filter(plugin => 
    plugin.categories.some((cat: string) => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

export function getFeaturedPlugins(): Plugin[] {
  return mockPlugins.filter(plugin => plugin.rating === 5).slice(0, 6);
}

export function getNewPlugins(): Plugin[] {
  return [...mockPlugins].reverse().slice(0, 6);
}

export function getPopularPlugins(): Plugin[] {
  return mockPlugins.filter(plugin => plugin.price === 0 || plugin.rating >= 4).slice(0, 6);
}