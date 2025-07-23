"use client";

import { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import PluginCard from "@/components/PluginCard";
import { mockPlugins, getFeaturedPlugins, getNewPlugins, getPopularPlugins } from "@/data/mockPlugins";
import { Search, Filter, TrendingUp, Sparkles, Clock } from "lucide-react";

const categories = [
  "All",
  "AI",
  "Development",
  "Productivity",
  "Enterprise",
  "Media",
  "Analytics",
  "Integration",
  "Security",
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "featured" | "new" | "popular">("all");

  const getFilteredPlugins = () => {
    let plugins = mockPlugins;

    // Filter by view mode
    switch (viewMode) {
      case "featured":
        plugins = getFeaturedPlugins();
        break;
      case "new":
        plugins = getNewPlugins();
        break;
      case "popular":
        plugins = getPopularPlugins();
        break;
    }

    // Filter by category
    if (selectedCategory !== "All") {
      plugins = plugins.filter(plugin =>
        plugin.categories.some((cat: string) => 
          cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    // Filter by search query
    if (searchQuery) {
      plugins = plugins.filter(plugin =>
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.categories.some((cat: string) => 
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return plugins;
  };

  const filteredPlugins = getFilteredPlugins();

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen bg-background">
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
            <div className="flex items-center justify-center gap-2 mb-8">
              <button
                onClick={() => setViewMode("all")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <Filter className="h-4 w-4" />
                All Plugins
              </button>
              <button
                onClick={() => setViewMode("featured")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "featured"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Featured
              </button>
              <button
                onClick={() => setViewMode("new")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "new"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <Clock className="h-4 w-4" />
                New
              </button>
              <button
                onClick={() => setViewMode("popular")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "popular"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
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
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                Showing {filteredPlugins.length} plugin{filteredPlugins.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Plugin Grid */}
            {filteredPlugins.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {filteredPlugins.map((plugin) => (
                  <PluginCard key={plugin.id} plugin={plugin} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No plugins found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setViewMode("all");
                  }}
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
      </main>
      <Footer />
      <ChatDrawer />
    </>
  );
}