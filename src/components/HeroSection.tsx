"use client";

import React from "react";
import { ArrowRight, Sparkles, Code2, Layers, Palette, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-5xl py-32 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full border border-accent/50 bg-card/80 px-4 py-2 text-sm mb-6">
              <Sparkles className="mr-2 h-4 w-4 text-gold" />
              <span className="font-medium text-foreground">UI/UX Design Showcase</span>
            </div>

            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
              <span className="inline-block text-gradient-blue">Modern AI</span>
              <span className="block mt-2">Platform Design</span>
            </h1>

            <p className="mx-auto max-w-3xl text-lg sm:text-xl text-foreground-secondary leading-relaxed">
              A conceptual marketplace interface showcasing modern web design patterns,
              built with Next.js 15, TypeScript, and Tailwind CSS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://github.com/Ai-Eli-ML"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary-dark transition-colors"
            >
              <span>View on GitHub</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#tech-stack"
              className="inline-flex h-14 items-center rounded-xl border-2 border-primary bg-transparent px-8 text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Code2 className="mr-2 h-5 w-5" />
              Tech Stack
            </a>
          </div>

          {/* Tech Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-24">
            {[
              { value: "Prototype", label: "Status" },
              { value: "Next.js 15", label: "Built With" },
              { value: "Portfolio", label: "Showcase" },
              { value: "2025", label: "Year" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient-gold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8" id="tech-stack">
            {[
              {
                icon: Layers,
                title: "Modern Stack",
                description: "Next.js 15 with App Router, React 19, and TypeScript for type-safe development.",
                iconColor: "text-blue"
              },
              {
                icon: Palette,
                title: "Design System",
                description: "Custom Tailwind CSS configuration with shadcn/ui components and Framer Motion.",
                iconColor: "text-gold-dark"
              },
              {
                icon: Zap,
                title: "Performance",
                description: "Server components, edge runtime, and optimized for Core Web Vitals.",
                iconColor: "text-blue"
              }
            ].map((feature) => (
              <div key={feature.title} className="group relative">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 p-8 hover:border-border-hover transition-all duration-300">
                  <div className="relative">
                    <div className="mb-4 inline-flex rounded-xl bg-background/80 p-3 shadow-sm">
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
