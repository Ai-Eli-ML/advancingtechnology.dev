"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center rounded-full border bg-background/50 backdrop-blur px-3 py-1 text-sm mb-8">
              <Sparkles className="mr-2 h-3.5 w-3.5 text-accent" />
              <span className="text-muted-foreground">Welcome to the Agentic Ecosystem</span>
            </div>
            
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
              AI Tools Marketplace
              <span className="block text-primary mt-2">for the Future</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              The flagship hub where developers and businesses discover, share, and collaborate on cutting-edge AI plugins. 
              Build the future with plug-and-play AI tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/marketplace"
              className="group inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth?mode=signup"
              className="inline-flex h-12 items-center rounded-md border bg-background px-6 text-sm font-medium hover:bg-muted transition-colors"
            >
              Start Building
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-lg bg-primary/10 p-3">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Developer First</h3>
              <p className="text-sm text-muted-foreground">
                Built by developers, for developers. Easy integration with your existing stack.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-lg bg-accent/10 p-3">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Instant Deploy</h3>
              <p className="text-sm text-muted-foreground">
                One-click deployment. Get your AI tools up and running in minutes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-lg bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Leverage the power of AJ, your AI assistant for seamless integration.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;