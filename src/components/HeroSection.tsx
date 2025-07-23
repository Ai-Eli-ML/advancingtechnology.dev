"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background-secondary/20 to-background">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl opacity-60 animate-pulse" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-5xl py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div 
              className="inline-flex items-center rounded-full border border-border/50 bg-gradient-to-r from-background/80 to-muted/50 backdrop-blur-sm px-4 py-2 text-sm mb-12 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="mr-2 h-4 w-4 text-accent animate-pulse" />
              <span className="font-medium bg-gradient-to-r from-foreground to-foreground-secondary bg-clip-text text-transparent">Welcome to the Future of AI Development</span>
            </motion.div>
            
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl mb-8">
              <span className="inline-block text-gradient">AI Tools</span>
              <span className="block mt-2">Marketplace</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium text-foreground-secondary">for the Next Generation</span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-lg sm:text-xl text-foreground-secondary leading-relaxed mb-2">
              The premier ecosystem where innovators discover, integrate, and monetize
            </p>
            <p className="mx-auto max-w-3xl text-lg sm:text-xl text-foreground-secondary leading-relaxed">
              cutting-edge AI plugins. Transform your ideas into reality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href="/marketplace"
              className="group relative inline-flex h-14 items-center rounded-xl bg-gradient-to-r from-primary to-primary-light px-8 text-base font-semibold text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10">Explore Marketplace</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 duration-300" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/auth?mode=signup"
              className="group inline-flex h-14 items-center rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm px-8 text-base font-semibold hover:bg-muted hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <Code2 className="mr-2 h-5 w-5 text-primary" />
              Start Building
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-24"
          >
            {[
              { value: "10K+", label: "Active Developers" },
              { value: "500+", label: "AI Plugins" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                icon: Code2,
                title: "Developer First",
                description: "Built with modern APIs, SDKs, and comprehensive documentation for seamless integration.",
                gradient: "from-blue-500/10 to-purple-500/10",
                iconColor: "text-blue-600"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Deploy in seconds with our optimized infrastructure and global CDN distribution.",
                gradient: "from-yellow-500/10 to-orange-500/10",
                iconColor: "text-yellow-600"
              },
              {
                icon: Shield,
                title: "Enterprise Secure",
                description: "Bank-level security with SOC 2 compliance, encryption, and comprehensive audit logs.",
                gradient: "from-green-500/10 to-emerald-500/10",
                iconColor: "text-green-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-primary/30 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;