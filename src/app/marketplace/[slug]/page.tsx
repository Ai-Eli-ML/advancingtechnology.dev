"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import PluginCard from "@/components/PluginCard";
import { getPluginById, mockPlugins } from "@/data/mockPlugins";
import { 
  Star, 
  Download, 
  Users, 
  Code2, 
  Shield, 
  Zap,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink
} from "lucide-react";

export default function PluginDetailPage() {
  const params = useParams();
  const plugin = getPluginById(params.slug as string);
  const [activeTab, setActiveTab] = useState<"overview" | "documentation" | "changelog">("overview");
  const [copied, setCopied] = useState(false);

  if (!plugin) {
    notFound();
  }

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(`npm install @at-dev/${plugin.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPlugins = mockPlugins
    .filter(p => 
      p.id !== plugin.id && 
      p.categories.some(cat => plugin.categories.includes(cat))
    )
    .slice(0, 3);

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container py-4">
            <Link
              href="/marketplace"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </div>
        </div>

        {/* Plugin Header */}
        <section className="border-b">
          <div className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={plugin.coverImage}
                      alt={plugin.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="font-display text-3xl font-bold mb-2">{plugin.name}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{plugin.tagline}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < plugin.rating ? "fill-accent text-accent" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="ml-1">({plugin.rating}.0)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Download className="h-4 w-4" />
                        <span>12.5k downloads</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>2.3k users</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {plugin.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Install Command */}
                <div className="bg-muted rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Install via npm</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background rounded px-3 py-2 text-sm font-mono">
                      npm install @at-dev/{plugin.id}
                    </code>
                    <button
                      onClick={handleCopyInstall}
                      className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-background transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-lg border bg-card p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold">
                      {plugin.price === 0 ? "Free" : `$${plugin.price}`}
                    </p>
                    {plugin.price > 0 && (
                      <p className="text-sm text-muted-foreground">per month</p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>Lifetime updates</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>Premium support</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>Commercial license</span>
                    </div>
                  </div>

                  <button className="w-full h-11 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    {plugin.price === 0 ? "Install Now" : "Purchase License"}
                  </button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    14-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-8">
          <div className="container">
            {/* Tab Navigation */}
            <div className="flex items-center gap-8 border-b mb-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === "overview"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Overview
                {activeTab === "overview" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("documentation")}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === "documentation"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Documentation
                {activeTab === "documentation" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("changelog")}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === "changelog"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Changelog
                {activeTab === "changelog" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl">
              {activeTab === "overview" && (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2>About {plugin.name}</h2>
                  <p>
                    {plugin.name} is a powerful AI plugin that enhances your development workflow
                    with cutting-edge machine learning capabilities. Built for modern applications,
                    it provides seamless integration and exceptional performance.
                  </p>

                  <h3>Key Features</h3>
                  <ul>
                    <li>Easy integration with existing projects</li>
                    <li>Comprehensive API documentation</li>
                    <li>Regular updates and improvements</li>
                    <li>Active community support</li>
                    <li>Enterprise-grade security</li>
                  </ul>

                  <h3>Use Cases</h3>
                  <p>Perfect for:</p>
                  <ul>
                    <li>Startups building AI-powered applications</li>
                    <li>Enterprise teams looking to enhance productivity</li>
                    <li>Developers seeking to integrate AI capabilities</li>
                    <li>Research projects requiring advanced ML tools</li>
                  </ul>

                  <h3>Requirements</h3>
                  <ul>
                    <li>Node.js 16.0 or higher</li>
                    <li>npm or yarn package manager</li>
                    <li>Basic understanding of AI/ML concepts</li>
                  </ul>
                </div>
              )}

              {activeTab === "documentation" && (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2>Getting Started</h2>
                  <pre><code>{`npm install @at-dev/${plugin.id}

# or with yarn
yarn add @at-dev/${plugin.id}`}</code></pre>

                  <h3>Basic Usage</h3>
                  <pre><code>{`import { ${plugin.name.replace(/\s+/g, '')} } from '@at-dev/${plugin.id}';

const instance = new ${plugin.name.replace(/\s+/g, '')}({
  apiKey: process.env.AT_API_KEY,
  // Additional configuration
});

// Example usage
const result = await instance.process({
  input: 'Your data here',
  options: {
    // Plugin-specific options
  }
});`}</code></pre>

                  <h3>Configuration Options</h3>
                  <p>The plugin accepts the following configuration options:</p>
                  <ul>
                    <li><code>apiKey</code> - Your AT.dev API key (required)</li>
                    <li><code>timeout</code> - Request timeout in milliseconds (default: 30000)</li>
                    <li><code>retries</code> - Number of retry attempts (default: 3)</li>
                    <li><code>debug</code> - Enable debug logging (default: false)</li>
                  </ul>

                  <p>
                    For complete documentation, visit our{" "}
                    <a href="/docs" className="text-primary hover:underline">
                      documentation portal
                    </a>
                    .
                  </p>
                </div>
              )}

              {activeTab === "changelog" && (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2>Changelog</h2>
                  
                  <h3>Version 2.1.0 - Latest</h3>
                  <p className="text-sm text-muted-foreground">Released on March 15, 2024</p>
                  <ul>
                    <li>Added support for streaming responses</li>
                    <li>Improved error handling and retry logic</li>
                    <li>Performance optimizations for large datasets</li>
                    <li>Fixed memory leak in long-running processes</li>
                  </ul>

                  <h3>Version 2.0.0</h3>
                  <p className="text-sm text-muted-foreground">Released on February 1, 2024</p>
                  <ul>
                    <li>Major API redesign for better developer experience</li>
                    <li>Added TypeScript support</li>
                    <li>New authentication system</li>
                    <li>Breaking: Changed configuration structure</li>
                  </ul>

                  <h3>Version 1.5.0</h3>
                  <p className="text-sm text-muted-foreground">Released on December 10, 2023</p>
                  <ul>
                    <li>Initial public release</li>
                    <li>Core functionality implementation</li>
                    <li>Basic documentation</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Plugins */}
        <section className="py-12 border-t">
          <div className="container">
            <h2 className="font-display text-2xl font-bold mb-6">Related Plugins</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              {relatedPlugins.map((relatedPlugin) => (
                <PluginCard key={relatedPlugin.id} plugin={relatedPlugin} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatDrawer />
    </>
  );
}