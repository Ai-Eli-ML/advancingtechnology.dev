/**
 * @deprecated This file contains mock data and should NOT be used in production.
 *
 * Use real database queries instead:
 * - For plugin listings: Use `src/lib/queries/plugins.ts` (to be created)
 * - For user dashboard: Use `src/lib/queries/dashboard.ts`
 * - For user profile: Use `src/lib/queries/user.ts`
 *
 * This file is kept for reference only and will be removed in a future update.
 *
 * Migration guide:
 * 1. Replace imports from this file with database query functions
 * 2. Use server components where possible for better performance
 * 3. Implement loading states and error boundaries
 * 4. Add proper TypeScript types from the query files
 */

import { Plugin } from "@/types/plugin";

console.warn('⚠️ WARNING: mockPlugins.ts is deprecated. Use real database queries instead.');

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

/**
 * @deprecated Use database query functions from src/lib/queries/plugins.ts instead
 */
export function getPluginById(id: string): Plugin | undefined {
  console.warn('⚠️ getPluginById is deprecated. Use database query instead.');
  return mockPlugins.find(plugin => plugin.id === id);
}

/**
 * @deprecated Use database query functions from src/lib/queries/plugins.ts instead
 */
export function getPluginsByCategory(category: string): Plugin[] {
  console.warn('⚠️ getPluginsByCategory is deprecated. Use database query instead.');
  return mockPlugins.filter(plugin =>
    plugin.categories.some((cat: string) =>
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

/**
 * @deprecated Use database query functions from src/lib/queries/plugins.ts instead
 */
export function getFeaturedPlugins(): Plugin[] {
  console.warn('⚠️ getFeaturedPlugins is deprecated. Use database query instead.');
  return mockPlugins.filter(plugin => plugin.rating === 5).slice(0, 6);
}

/**
 * @deprecated Use database query functions from src/lib/queries/plugins.ts instead
 */
export function getNewPlugins(): Plugin[] {
  console.warn('⚠️ getNewPlugins is deprecated. Use database query instead.');
  return [...mockPlugins].reverse().slice(0, 6);
}

/**
 * @deprecated Use database query functions from src/lib/queries/plugins.ts instead
 */
export function getPopularPlugins(): Plugin[] {
  console.warn('⚠️ getPopularPlugins is deprecated. Use database query instead.');
  return mockPlugins.filter(plugin => plugin.price === 0 || plugin.rating >= 4).slice(0, 6);
}
