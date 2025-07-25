-- Sample plugins data for development
-- Run this after the main schema migration

-- Insert sample plugins
INSERT INTO public.plugins (slug, name, tagline, description, price, cover_image_url, rating, review_count, downloads, active_users, verified, featured, is_new, status, published_at)
VALUES
  ('chatgpt-code-assistant', 'ChatGPT Code Assistant', 'AI-powered code completion and refactoring for your IDE', 
   'Transform your development workflow with our advanced AI code assistant. Get intelligent code suggestions, automated refactoring, and real-time debugging help powered by ChatGPT.', 
   0, '/images/plugin-1.jpg', 5, 128, 15420, 3200, true, true, false, 'published', NOW()),
  
  ('langchain-memory-pro', 'LangChain Memory Pro', 'Advanced memory management for your LangChain applications',
   'Optimize your LangChain applications with sophisticated memory management. Handle complex conversation contexts, implement persistent memory stores, and scale your AI applications effortlessly.',
   29, '/images/plugin-2.jpg', 4.5, 64, 8930, 1850, true, true, false, 'published', NOW()),
  
  ('voice-synthesis-ai', 'Voice Synthesis AI', 'Natural-sounding voice generation for any application',
   'Create lifelike voices for your applications with our state-of-the-art voice synthesis technology. Support for multiple languages, emotions, and custom voice cloning.',
   49, '/images/plugin-3.jpg', 5, 92, 12300, 2400, true, false, false, 'published', NOW()),
  
  ('semantic-search-engine', 'Semantic Search Engine', 'Context-aware search powered by embeddings',
   'Implement intelligent search capabilities that understand context and meaning. Powered by advanced embedding models for superior search accuracy.',
   19, '/images/plugin-4.jpg', 4.2, 45, 6780, 1200, false, false, false, 'published', NOW()),
  
  ('ai-content-moderator', 'AI Content Moderator', 'Real-time content moderation using advanced AI models',
   'Keep your platform safe with intelligent content moderation. Detect and filter inappropriate content, spam, and policy violations in real-time.',
   39, '/images/plugin-5.jpg', 4.8, 78, 9850, 1900, true, false, true, 'published', NOW()),
  
  ('workflow-automation-bot', 'Workflow Automation Bot', 'Automate repetitive tasks with intelligent workflows',
   'Build smart automation workflows that adapt to your needs. Integrate with popular tools and services to streamline your operations.',
   0, '/images/plugin-6.jpg', 4.3, 156, 22100, 4500, false, false, true, 'published', NOW()),
  
  ('sentiment-analysis-pro', 'Sentiment Analysis Pro', 'Advanced sentiment detection for customer feedback',
   'Understand your customers better with deep sentiment analysis. Analyze emotions, intentions, and satisfaction levels from text data.',
   24, '/images/plugin-7.jpg', 4.6, 89, 11200, 2100, true, false, false, 'published', NOW()),
  
  ('ai-image-enhancer', 'AI Image Enhancer', 'Upscale and enhance images using state-of-the-art AI',
   'Transform low-quality images into stunning high-resolution visuals. Remove noise, enhance details, and upscale images up to 4x their original size.',
   15, '/images/plugin-8.jpg', 4.9, 234, 28900, 5600, true, true, false, 'published', NOW()),
  
  ('smart-data-extractor', 'Smart Data Extractor', 'Extract structured data from any document format',
   'Automatically extract and structure data from PDFs, images, and documents. Perfect for invoice processing, form automation, and data migration.',
   35, '/images/plugin-9.jpg', 4.4, 67, 8900, 1700, false, false, false, 'published', NOW()),
  
  ('real-time-translator', 'Real-time Translator', 'Instant translation for 100+ languages with context awareness',
   'Break language barriers with our context-aware translation engine. Support for 100+ languages with industry-specific terminology.',
   0, '/images/plugin-10.jpg', 4.7, 312, 45600, 8900, true, true, true, 'published', NOW());

-- Add plugin categories relationships
WITH plugin_category_mapping AS (
  SELECT 
    p.id as plugin_id,
    c.id as category_id
  FROM public.plugins p
  CROSS JOIN public.categories c
  WHERE 
    (p.slug = 'chatgpt-code-assistant' AND c.slug IN ('development', 'ai', 'productivity')) OR
    (p.slug = 'langchain-memory-pro' AND c.slug IN ('ai', 'enterprise', 'development')) OR
    (p.slug = 'voice-synthesis-ai' AND c.slug IN ('ai', 'media', 'communication')) OR
    (p.slug = 'semantic-search-engine' AND c.slug IN ('ai', 'nlp', 'analytics')) OR
    (p.slug = 'ai-content-moderator' AND c.slug IN ('security', 'ai', 'enterprise')) OR
    (p.slug = 'workflow-automation-bot' AND c.slug IN ('automation', 'productivity', 'integration')) OR
    (p.slug = 'sentiment-analysis-pro' AND c.slug IN ('analytics', 'nlp', 'ai')) OR
    (p.slug = 'ai-image-enhancer' AND c.slug IN ('media', 'ai', 'productivity')) OR
    (p.slug = 'smart-data-extractor' AND c.slug IN ('automation', 'enterprise', 'productivity')) OR
    (p.slug = 'real-time-translator' AND c.slug IN ('communication', 'nlp', 'ai'))
)
INSERT INTO public.plugin_categories (plugin_id, category_id)
SELECT plugin_id, category_id FROM plugin_category_mapping;

-- Add sample versions for each plugin
INSERT INTO public.plugin_versions (plugin_id, version, changelog, created_at)
SELECT 
  p.id,
  '1.0.0',
  'Initial release',
  p.created_at
FROM public.plugins p;

INSERT INTO public.plugin_versions (plugin_id, version, changelog, created_at)
SELECT 
  p.id,
  '1.1.0',
  'Performance improvements and bug fixes',
  p.created_at + INTERVAL '30 days'
FROM public.plugins p
WHERE p.slug IN ('chatgpt-code-assistant', 'langchain-memory-pro', 'ai-image-enhancer', 'real-time-translator');

INSERT INTO public.plugin_versions (plugin_id, version, changelog, created_at)
SELECT 
  p.id,
  '2.0.0',
  'Major update with new features and improved UI',
  p.created_at + INTERVAL '90 days'
FROM public.plugins p
WHERE p.slug IN ('chatgpt-code-assistant', 'real-time-translator');