"use client";

import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import {
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Search,
  TrendingUp,
  BookOpen
} from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

export default function BlogPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of AI-Powered Development: Trends for 2024",
      excerpt: "Explore the latest trends in AI development and how they're shaping the future of software engineering. From advanced code generation to intelligent debugging.",
      author: "Sarah Chen",
      authorAvatar: "SC",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "AI Trends",
      tags: ["AI", "Development", "Future Tech"],
      featured: true,
      image: "/blog/post-1.jpg"
    },
    {
      id: 2,
      title: "Building Your First AI Plugin: A Complete Guide",
      excerpt: "Step-by-step tutorial on creating, testing, and deploying your first AI plugin on the AdvancingTechnology.dev marketplace.",
      author: "Michael Rodriguez",
      authorAvatar: "MR",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "Tutorials",
      tags: ["Tutorial", "Plugins", "Getting Started"],
      featured: false,
      image: "/blog/post-2.jpg"
    },
    {
      id: 3,
      title: "Best Practices for AI Model Integration",
      excerpt: "Learn how to effectively integrate various AI models into your applications, optimize performance, and handle edge cases.",
      author: "Emma Watson",
      authorAvatar: "EW",
      date: "2024-01-10",
      readTime: "10 min read",
      category: "Best Practices",
      tags: ["AI Models", "Integration", "Performance"],
      featured: false,
      image: "/blog/post-3.jpg"
    },
    {
      id: 4,
      title: "Security Considerations for AI-Powered Applications",
      excerpt: "Essential security practices for developers building AI-powered applications, including data privacy, model security, and API protection.",
      author: "David Kim",
      authorAvatar: "DK",
      date: "2024-01-08",
      readTime: "15 min read",
      category: "Security",
      tags: ["Security", "Privacy", "Best Practices"],
      featured: false,
      image: "/blog/post-4.jpg"
    },
    {
      id: 5,
      title: "Monetizing Your AI Plugins: Success Stories",
      excerpt: "Real success stories from developers who have built profitable businesses on the AdvancingTechnology.dev marketplace.",
      author: "Lisa Thompson",
      authorAvatar: "LT",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Business",
      tags: ["Business", "Success Stories", "Monetization"],
      featured: false,
      image: "/blog/post-5.jpg"
    }
  ];

  const categories = ["all", "AI Trends", "Tutorials", "Best Practices", "Security", "Business"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      
      <main className="flex-1">
        <div className="container py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and updates from the AdvancingTechnology.dev team and community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {category === "all" ? "All Posts" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-display font-semibold text-primary">Featured Post</span>
              </div>
              <article className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video bg-muted"></div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold mb-3">
                      <Link href={`/blog/${featuredPost.id}`} className="hover:text-primary transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-medium">
                          {featuredPost.authorAvatar}
                        </div>
                        <div>
                          <p className="font-medium">{featuredPost.author}</p>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${featuredPost.id}`}
                        className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {post.authorAvatar}
                      </div>
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-center text-primary-foreground">
            <h2 className="font-display text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="mb-6 opacity-90">
              Get the latest AI development insights delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 placeholder:text-white/60 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      {showChatDrawer && <ChatDrawer onClose={() => setShowChatDrawer(false)} />}
      
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChatDrawer(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}