'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  Star, Download, Users, Shield, Clock, Tag, 
  ArrowLeft, ShoppingCart, CheckCircle, Code,
  Package, History, MessageSquare, TrendingUp
} from 'lucide-react';
import { PluginWithCategories } from '../actions';
import { cn } from '@/lib/utils';

interface PluginVersion {
  id: string;
  version: string;
  changelog: string | null;
  created_at: string;
}

interface PluginDetailClientProps {
  plugin: PluginWithCategories & { versions?: PluginVersion[] };
  userOwnsPlugin: boolean;
}

export default function PluginDetailClient({ plugin, userOwnsPlugin }: PluginDetailClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(
    plugin.versions?.[0]?.version || 'latest'
  );

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pluginId: plugin.id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to start checkout');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-5 w-5",
          i < Math.floor(rating) 
            ? "fill-gold text-gold" 
            : i < rating 
            ? "fill-gold/50 text-gold" 
            : "fill-transparent text-gold/30"
        )}
      />
    ));
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-muted/20">
        <div className="container py-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b">
        <div className="container py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Image and Info */}
            <div className="space-y-6">
              {/* Cover Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                {plugin.cover_image_url ? (
                  <Image
                    src={plugin.cover_image_url}
                    alt={plugin.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Tag className="h-24 w-24 text-muted-foreground/20" />
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Download className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold">{plugin.downloads || 0}</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Users className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold">{plugin.active_users || 0}</div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <MessageSquare className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold">{plugin.review_count || 0}</div>
                  <div className="text-xs text-muted-foreground">Reviews</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <TrendingUp className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold">#{Math.floor(Math.random() * 20) + 1}</div>
                  <div className="text-xs text-muted-foreground">Trending</div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="font-display text-3xl font-bold mb-2">{plugin.name}</h1>
                    <p className="text-lg text-muted-foreground">{plugin.tagline}</p>
                  </div>
                  {plugin.verified && (
                    <div className="flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5 text-sm font-medium text-gold">
                      <Shield className="h-4 w-4" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(plugin.rating)}</div>
                    <span className="font-semibold">{plugin.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({plugin.review_count} reviews)</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {plugin.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center rounded-lg bg-blue/10 px-3 py-1.5 text-sm font-medium text-blue"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-3xl font-bold">
                      {plugin.price === 0 ? (
                        <span className="text-blue">Free</span>
                      ) : (
                        <span>${plugin.price}</span>
                      )}
                    </p>
                  </div>
                  {plugin.is_new && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600">
                      <Clock className="h-3 w-3" />
                      New
                    </span>
                  )}
                </div>

                {/* Action Button */}
                {userOwnsPlugin ? (
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground px-6 py-3 text-sm font-medium cursor-not-allowed"
                  >
                    <CheckCircle className="h-4 w-4" />
                    You own this plugin
                  </button>
                ) : plugin.price === 0 ? (
                  <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    {isLoading ? 'Processing...' : 'Install Free Plugin'}
                  </button>
                ) : (
                  <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {isLoading ? 'Processing...' : `Purchase for $${plugin.price}`}
                  </button>
                )}

                {/* Features */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Free updates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Premium support</span>
                  </div>
                </div>
              </div>

              {/* Version Selector */}
              {plugin.versions && plugin.versions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Version</label>
                  <select
                    value={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {plugin.versions.map((version) => (
                      <option key={version.id} value={version.version}>
                        v{version.version} - {new Date(version.created_at).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description and Details */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {plugin.description || plugin.tagline}
                  </p>
                </div>
              </div>

              {/* Installation */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Installation</h2>
                <div className="bg-muted/50 rounded-lg p-4">
                  <code className="text-sm">npm install @ai-plugins/{plugin.slug}</code>
                </div>
              </div>

              {/* Version History */}
              {plugin.versions && plugin.versions.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold mb-4">Version History</h2>
                  <div className="space-y-4">
                    {plugin.versions.slice(0, 3).map((version) => (
                      <div key={version.id} className="border-l-2 border-muted pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">v{version.version}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(version.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {version.changelog && (
                          <p className="text-sm text-muted-foreground">{version.changelog}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Developer Info */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Developer</h3>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <Code className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">AdvancingTechnology</p>
                    <p className="text-sm text-muted-foreground">Verified Developer</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Requirements</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Node.js 16.0 or higher</li>
                  <li>• Compatible with all major frameworks</li>
                  <li>• TypeScript support included</li>
                </ul>
              </div>

              {/* Support */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Support</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Package className="h-4 w-4" />
                    Documentation
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <MessageSquare className="h-4 w-4" />
                    Community Forum
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Code className="h-4 w-4" />
                    GitHub Repository
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}