'use client';

import { useState, useEffect, useTransition } from 'react';
import { Search, Filter, TrendingUp, Sparkles, Clock } from 'lucide-react';
import PluginCard from '@/components/PluginCard';
import { fetchPlugins, type PluginWithCategories } from './actions';

interface MarketplaceClientProps {
  initialPlugins: PluginWithCategories[];
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export default function MarketplaceClient({ initialPlugins, categories }: MarketplaceClientProps) {
  const [plugins, setPlugins] = useState<PluginWithCategories[]>(initialPlugins);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'all' | 'featured' | 'new' | 'popular'>('all');
  const [isLoading, startTransition] = useTransition();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(async () => {
        const results = await fetchPlugins({
          search: searchQuery,
          category: selectedCategory === 'all' ? 'All' : selectedCategory,
          viewMode,
        });
        setPlugins(results);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, viewMode]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
  };

  const handleViewModeChange = (mode: typeof viewMode) => {
    setViewMode(mode);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setViewMode('all');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-muted/20">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              AI Plugin Marketplace
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover and deploy cutting-edge AI tools. From development assistants to enterprise solutions.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search plugins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Content */}
      <section className="py-8">
        <div className="container">
          {/* View Mode Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => handleViewModeChange('all')}
              className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                viewMode === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">All Plugins</span>
              <span className="sm:hidden">All</span>
            </button>
            <button
              onClick={() => handleViewModeChange('featured')}
              className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                viewMode === 'featured'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Featured
            </button>
            <button
              onClick={() => handleViewModeChange('new')}
              className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                viewMode === 'new'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Clock className="h-4 w-4" />
              New
            </button>
            <button
              onClick={() => handleViewModeChange('popular')}
              className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                viewMode === 'popular'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Popular
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                'Loading...'
              ) : (
                `Showing ${plugins.length} plugin${plugins.length !== 1 ? 's' : ''}`
              )}
            </p>
          </div>

          {/* Plugin Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64"></div>
                </div>
              ))}
            </div>
          ) : plugins.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plugins.map((plugin) => (
                <PluginCard 
                  key={plugin.id} 
                  plugin={{
                    id: plugin.id,
                    slug: plugin.slug,
                    name: plugin.name,
                    tagline: plugin.tagline,
                    price: plugin.price,
                    coverImage: plugin.cover_image_url || undefined,
                    rating: plugin.rating,
                    categories: plugin.categories.map(cat => cat.name),
                    reviewCount: plugin.review_count,
                    downloads: plugin.downloads,
                    verified: plugin.verified,
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No plugins found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t">
        <div className="container text-center">
          <h2 className="font-display text-2xl font-bold mb-4">
            Want to publish your own plugin?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community of developers and start earning from your AI innovations.
          </p>
          <a
            href="/auth?mode=signup"
            className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Start Publishing
          </a>
        </div>
      </section>
    </>
  );
}