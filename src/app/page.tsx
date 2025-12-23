"use client";

import { useState } from "react";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Check,
  Star,
  Zap,
  Shield,
  Code,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const [calculatorValue, setCalculatorValue] = useState(10);
  const savings = calculatorValue * 120; // $120 saved per hour automated

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {/* Hero Section - Above the fold, clear value prop */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Copy */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              {/* Trust badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Star className="w-4 h-4 text-primary fill-primary mr-2" />
                <span className="text-sm font-semibold text-primary">
                  Trusted by 5,000+ developers worldwide
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Ship 10x Faster<br />
                With AI Plugins
              </h1>

              <p className="text-xl md:text-2xl text-foreground-secondary mb-8 leading-relaxed">
                Pre-built, production-ready AI tools that plug into your stack in minutes.
                Stop building from scratch. Start shipping faster.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/marketplace"
                  className="group inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-8 text-base font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span>Browse 150+ Plugins</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#calculator"
                  className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-primary bg-transparent px-8 text-base font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <span>Calculate Your Savings</span>
                </Link>
              </div>

              {/* Social Proof Numbers */}
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start text-sm text-gray-600">
                <div>
                  <div className="text-2xl font-bold text-gray-900">1M+</div>
                  <div>Downloads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div>Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">&lt;24h</div>
                  <div>Avg Integration</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Pricing Element */}
            <div className="flex-1 w-full max-w-lg">
              <div className="relative rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-border backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground-secondary">AI Chatbot</span>
                      <Check className="w-5 h-5 text-success" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">$299</div>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground-secondary">Analytics Dashboard</span>
                      <Check className="w-5 h-5 text-success" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">$199</div>
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground-secondary">Email Automation</span>
                      <Check className="w-5 h-5 text-success" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">$149</div>
                  </div>
                  <div className="mt-6 p-6 bg-gradient-to-r from-primary to-accent rounded-xl text-white text-center shadow-xl">
                    <div className="text-sm opacity-90 mb-2">You save</div>
                    <div className="text-4xl font-bold">$12,000+</div>
                    <div className="text-sm opacity-90 mt-1">vs building in-house</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-600 mb-8">
            POWERING STARTUPS TO ENTERPRISES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {["Stripe", "Vercel", "OpenAI", "Supabase", "Linear"].map((logo) => (
              <div key={logo} className="text-2xl font-bold text-gray-400">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section id="calculator" className="py-24 px-4 bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-success mr-2" />
            <span className="text-sm font-semibold text-success">ROI Calculator</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            See Your Potential Savings
          </h2>
          <p className="text-xl text-foreground-secondary mb-12 max-w-2xl mx-auto">
            Calculate how much time and money you&apos;ll save by using our plugins
          </p>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border backdrop-blur-sm">
            <div className="mb-10">
              <label className="block text-left text-lg font-semibold text-foreground mb-6">
                Hours per week you currently spend on repetitive development:
              </label>
              <input
                type="range"
                min="1"
                max="40"
                value={calculatorValue}
                onChange={(e) => setCalculatorValue(Number(e.target.value))}
                className="w-full h-3 bg-primary/20 rounded-lg appearance-none cursor-pointer slider accent-primary"
              />
              <div className="flex justify-between items-center text-sm text-foreground-secondary mt-4">
                <span>1 hour</span>
                <span className="text-4xl font-bold text-primary">{calculatorValue}h</span>
                <span>40 hours</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-card rounded-xl p-6 text-center border border-border shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-sm font-medium text-foreground-secondary mb-3">Time Saved</div>
                <div className="text-3xl font-bold text-foreground">{calculatorValue}h/week</div>
              </div>
              <div className="bg-card rounded-xl p-6 text-center border border-border shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-sm font-medium text-foreground-secondary mb-3">Money Saved</div>
                <div className="text-3xl font-bold text-success">${savings.toLocaleString()}/week</div>
              </div>
              <div className="bg-card rounded-xl p-6 text-center border border-border shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-sm font-medium text-foreground-secondary mb-3">Annual Savings</div>
                <div className="text-3xl font-bold text-primary">${(savings * 52).toLocaleString()}/year</div>
              </div>
            </div>

            <Link
              href="/marketplace"
              className="group inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent px-8 text-base font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span>Start Saving Now</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Everything You Need to Build Faster
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              Production-ready plugins that integrate in minutes, not months
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Deploy in Minutes",
                description: "One-click installation. Copy-paste integration. Start using in under 5 minutes.",
                stat: "Avg: 4 min setup"
              },
              {
                icon: Shield,
                title: "Enterprise Secure",
                description: "SOC 2 Type II certified. GDPR compliant. Penetration tested monthly.",
                stat: "99.99% uptime"
              },
              {
                icon: Code,
                title: "Full Code Access",
                description: "Own the code. Customize everything. No vendor lock-in. Self-host if needed.",
                stat: "MIT Licensed"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6 [&>svg]:h-7 [&>svg]:w-7">
                  <feature.icon />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-foreground-secondary mb-6 leading-relaxed">{feature.description}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-4 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Loved by Thousands of Developers
            </h2>
            <div className="inline-flex items-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-500" />
              ))}
            </div>
            <p className="text-xl text-foreground-secondary">4.9/5 from 2,847 reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Cut our development time by 70%. Best $500 we ever spent.",
                author: "Sarah Chen",
                role: "CTO at TechStartup",
                saved: "$45,000"
              },
              {
                quote: "Integrated in 10 minutes. Now shipping features 3x faster.",
                author: "Marcus Rivera",
                role: "Lead Developer at SaaS Co",
                saved: "$28,000"
              },
              {
                quote: "Finally, plugins that actually work. No more reinventing the wheel.",
                author: "Jessica Park",
                role: "Solo Founder",
                saved: "$12,000"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border shadow-md hover:shadow-xl transition-all duration-300">
                <div className="inline-flex gap-1 text-yellow-500 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-foreground text-lg mb-8 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-foreground-secondary mt-1">{testimonial.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-success font-bold text-lg">{testimonial.saved}</div>
                    <div className="text-xs text-foreground-secondary mt-1">saved/year</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary via-accent to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build 10x Faster?
          </h2>
          <p className="text-xl mb-12 opacity-95 max-w-2xl mx-auto">
            Join 5,000+ developers who stopped reinventing the wheel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace"
              className="inline-flex h-16 items-center justify-center rounded-xl bg-white px-10 text-lg font-bold text-primary shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Browse Marketplace</span>
            </Link>
            <Link
              href="/auth"
              className="inline-flex h-16 items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-10 text-lg font-bold text-white hover:bg-white/20 transition-all duration-300"
            >
              <span>Start Free Trial</span>
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-90">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
