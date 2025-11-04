"use client";

import React from "react";
import { ArrowRight, Code2, Layers, Palette, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Modern Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10 gradient-mesh-brand" />

      <div className="container relative">
        <div className="mx-auto max-w-5xl py-32 md:py-48 text-center">
          {/* Simplified Hero Content */}
          <div className="mb-16">
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8">
              <span className="block text-gradient-purple">Modern AI</span>
              <span className="block mt-2">Platform Design</span>
            </h1>

            <p className="mx-auto max-w-2xl text-xl text-foreground-secondary leading-relaxed mb-12">
              Showcasing Next.js 15, TypeScript, and modern design patterns with a focus on performance and user experience.
            </p>

            {/* Single Clear CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://github.com/Ai-Eli-ML"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center rounded-xl bg-gradient-purple-coral px-8 text-base font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>View Projects</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#tech-stack"
                className="inline-flex h-14 items-center rounded-xl border-2 border-primary bg-transparent px-8 text-base font-semibold text-foreground hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Code2 className="mr-2 h-5 w-5" />
                Tech Stack
              </a>
            </div>
          </div>

          {/* Clean Tech Stack Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8" id="tech-stack">
            {[
              {
                icon: Layers,
                title: "Modern Stack",
                description: "Next.js 15 with App Router, React 19, and TypeScript for type-safe development."
              },
              {
                icon: Palette,
                title: "Design System",
                description: "Custom Tailwind CSS configuration with shadcn/ui components and Framer Motion."
              },
              {
                icon: Zap,
                title: "Performance",
                description: "Server components, edge runtime, and optimized for Core Web Vitals."
              }
            ].map((feature) => (
              <div key={feature.title} className="group relative card-hover">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary transition-all duration-300">
                  <div className="relative">
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                      <feature.icon className="h-6 w-6 text-primary" />
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
