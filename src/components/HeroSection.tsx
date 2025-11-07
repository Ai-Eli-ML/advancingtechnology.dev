"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import RevealText from '@/components/animations/RevealText';
import ScrollReveal from '@/components/animations/ScrollReveal';
import RippleEffect from '@/components/interactions/RippleEffect';

// Dynamically import 3D components to reduce initial bundle
const FloatingOrb = dynamic(() => import('@/components/effects/FloatingOrb'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-mesh-brand" />
});

const ShaderBackground = dynamic(() => import('@/components/effects/ShaderBackground'), {
  ssr: false
});

const ParticleBackground = dynamic(() => import('@/components/effects/ParticleBackground'), {
  ssr: false
});

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />

        {/* Shader background */}
        <Suspense fallback={null}>
          <ShaderBackground variant="holographic" speed={0.5} className="opacity-40" />
        </Suspense>

        {/* Particle field */}
        <Suspense fallback={null}>
          <ParticleBackground particleCount={60} color="#6366F1" mouseInteraction className="opacity-60" />
        </Suspense>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">The Future of AI Plugins</span>
              </div>
            </ScrollReveal>

            {/* Main Heading */}
            <RevealText
              text="Build Stunning AI Applications"
              delay={0.3}
              stagger={0.02}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            />

            <ScrollReveal delay={0.6}>
              <p className="text-xl sm:text-2xl text-foreground-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
                Discover, integrate, and deploy cutting-edge AI plugins for your next-generation applications.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <RippleEffect>
                  <Link
                    href="/marketplace"
                    className="group inline-flex h-14 items-center justify-center rounded-xl bg-gradient-purple-coral px-8 text-base font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <span>Explore Marketplace</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </RippleEffect>

                <RippleEffect>
                  <a
                    href="/docs"
                    className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-primary bg-transparent px-8 text-base font-semibold text-foreground hover:bg-primary hover:text-white transition-all duration-300 backdrop-blur-sm"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    <span>View Documentation</span>
                  </a>
                </RippleEffect>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={1}>
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12">
                {[
                  { value: '50+', label: 'AI Plugins' },
                  { value: '10k+', label: 'Developers' },
                  { value: '99.9%', label: 'Uptime' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-gradient-purple mb-1">{stat.value}</div>
                    <div className="text-sm text-foreground-tertiary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: 3D Orb */}
          <ScrollReveal delay={0.4} direction="right" className="hidden lg:block">
            <div className="relative h-[600px] w-full">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-purple-coral opacity-20 blur-3xl" />
                </div>
              }>
                <FloatingOrb size="large" color="#6366F1" speed={0.8} className="w-full h-full" />
              </Suspense>

              {/* Floating feature badges */}
              <div className="absolute top-20 -left-4 animate-float">
                <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-4 py-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-medium">WebGL Powered</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-32 -right-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-4 py-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Lightning Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollReveal delay={1.2}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HeroSection;
