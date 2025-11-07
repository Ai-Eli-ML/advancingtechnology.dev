"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerContainer from "@/components/animations/StaggerContainer";
import {
  Code2,
  Palette,
  Layers,
  Zap,
  Database,
  Lock,
  Sparkles,
  ArrowRight,
  Cpu,
  Globe,
  Shield
} from "lucide-react";

// Dynamically import interactive components
const EasterEggs = dynamic(() => import('@/components/interactions/EasterEggs'), {
  ssr: false
});

const CursorGlow = dynamic(() => import('@/components/interactions/CursorGlow'), {
  ssr: false
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AdvancingTechnology.dev",
  "description": "The flagship hub of the Agentic Ecosystem - a marketplace where developers and clients buy, sell, and collaborate on plug-and-play AI tools.",
  "url": "https://advancingtechnology.dev",
  "publisher": {
    "@type": "Organization",
    "name": "AdvancingTechnology",
    "url": "https://advancingtechnology.dev",
    "logo": {
      "@type": "ImageObject",
      "url": "https://advancingtechnology.dev/og-image.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://advancingtechnology.dev/marketplace?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const features = [
  {
    icon: Code2,
    title: "TypeScript First",
    description: "Fully typed codebase with strict mode enabled for enhanced type safety and better developer experience.",
    gradient: "from-purple/20 to-primary/20"
  },
  {
    icon: Layers,
    title: "Next.js 15",
    description: "Latest App Router with React Server Components, server actions, and edge runtime support.",
    gradient: "from-primary/20 to-accent/20"
  },
  {
    icon: Palette,
    title: "Modern UI/UX",
    description: "Glass morphism, 3D effects, and shader backgrounds powered by Three.js and WebGL.",
    gradient: "from-accent/20 to-coral/20"
  },
  {
    icon: Database,
    title: "Supabase Backend",
    description: "PostgreSQL database with Row Level Security, authentication, and real-time capabilities.",
    gradient: "from-primary/20 to-purple/20"
  },
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Optimized for Core Web Vitals with automatic code splitting and image optimization.",
    gradient: "from-accent/20 to-primary/20"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Rate limiting, CSRF protection, security headers, and comprehensive input validation.",
    gradient: "from-purple/20 to-accent/20"
  }
];

const capabilities = [
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Integrate GPT-4, Claude, and custom AI models seamlessly"
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Lightning-fast delivery worldwide with edge computing"
  },
  {
    icon: Shield,
    title: "SOC 2 Compliant",
    description: "Enterprise-grade security and data protection"
  }
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={null}>
        <CursorGlow />
        <EasterEggs />
      </Suspense>

      <NavigationBar />

      <main className="min-h-screen relative overflow-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background -z-10" />

          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Cutting-Edge Technology</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                  Built with Modern Technologies
                </h2>
                <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                  A showcase of current web development best practices, design patterns, and next-generation effects.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {features.map((feature, i) => (
                <GlassCard key={i} className="p-8 group" hover gradient>
                  <div className={`inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-gradient-purple">{feature.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background-secondary to-background -z-10" />

          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                  Enterprise-Grade Capabilities
                </h2>
                <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                  Everything you need to build production-ready AI applications at scale.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {capabilities.map((cap, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-purple-coral shadow-2xl shadow-primary/20 animate-glow-pulse">
                      <cap.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{cap.title}</h3>
                    <p className="text-sm text-foreground-secondary">
                      {cap.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-mesh-brand -z-10 opacity-30" />

          <div className="container">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <GlassCard className="p-8 md:p-12" hover gradient>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-4">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-accent">Live Demo</span>
                      </div>
                      <h3 className="font-display text-3xl font-bold mb-4">
                        See It In Action
                      </h3>
                      <p className="text-foreground-secondary mb-6">
                        Explore our interactive marketplace showcasing AI plugins, developer tools, and production-ready components.
                      </p>
                      <Link
                        href="/marketplace"
                        className="group inline-flex h-12 items-center justify-center rounded-lg bg-gradient-purple-coral px-6 text-base font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <span>View Marketplace</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">50+</div>
                        <div className="text-xs text-foreground-tertiary">AI Plugins</div>
                      </div>
                      <div className="bg-accent/10 backdrop-blur-xl border border-accent/20 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-accent mb-1">99.9%</div>
                        <div className="text-xs text-foreground-tertiary">Uptime SLA</div>
                      </div>
                      <div className="bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">10k+</div>
                        <div className="text-xs text-foreground-tertiary">Developers</div>
                      </div>
                      <div className="bg-accent/10 backdrop-blur-xl border border-accent/20 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-accent mb-1">&lt;100ms</div>
                        <div className="text-xs text-foreground-tertiary">Response Time</div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-purple-coral opacity-90 -z-10" />
          <div className="absolute inset-0 bg-gradient-mesh-brand -z-10" />

          <div className="container text-center relative z-10">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                  Ready to Build the Future?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Join thousands of developers building next-generation AI applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/Ai-Eli-ML"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center rounded-xl bg-white px-8 text-base font-semibold text-primary hover:bg-white/90 transition-all duration-200 shadow-2xl hover:shadow-white/20 hover:scale-105"
                  >
                    View GitHub Profile
                  </a>
                  <a
                    href="/docs"
                    className="inline-flex h-14 items-center rounded-xl border-2 border-white/30 bg-white/10 px-8 text-base font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    Read Documentation
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
      <ChatDrawer />
    </>
  );
}
