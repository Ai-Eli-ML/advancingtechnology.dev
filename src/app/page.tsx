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
    <div className="min-h-screen bg-white">
      <NavigationBar />

      {/* Hero Section - Above the fold, clear value prop */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Copy */}
            <div className="flex-1 text-center lg:text-left">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Trusted by 5,000+ developers worldwide
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Ship 10x Faster<br />
                With AI Plugins
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Pre-built, production-ready AI tools that plug into your stack in minutes.
                Stop building from scratch. Start shipping faster.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  href="/marketplace"
                  className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Browse 150+ Plugins
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#calculator"
                  className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 rounded-xl font-semibold text-lg transition-all border-2 border-blue-600"
                >
                  Calculate Your Savings
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

            {/* Right: Interactive Element */}
            <div className="flex-1 w-full max-w-lg">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">AI Chatbot</span>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$299</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Analytics Dashboard</span>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$199</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Email Automation</span>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$149</div>
                </div>
                <div className="mt-6 p-4 bg-blue-600 rounded-xl text-white text-center">
                  <div className="text-sm opacity-90 mb-1">You save</div>
                  <div className="text-3xl font-bold">$12,000+</div>
                  <div className="text-sm opacity-90">vs building in-house</div>
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
      <section id="calculator" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">ROI Calculator</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See Your Potential Savings
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Calculate how much time and money you&apos;ll save by using our plugins
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <label className="block text-left text-lg font-semibold text-gray-900 mb-4">
                Hours per week you currently spend on repetitive development:
              </label>
              <input
                type="range"
                min="1"
                max="40"
                value={calculatorValue}
                onChange={(e) => setCalculatorValue(Number(e.target.value))}
                className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 hour</span>
                <span className="text-3xl font-bold text-blue-600">{calculatorValue} hours</span>
                <span>40 hours</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-sm text-gray-600 mb-2">Time Saved</div>
                <div className="text-3xl font-bold text-gray-900">{calculatorValue}h/week</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-sm text-gray-600 mb-2">Money Saved</div>
                <div className="text-3xl font-bold text-green-600">${savings.toLocaleString()}/week</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-sm text-gray-600 mb-2">Annual Savings</div>
                <div className="text-3xl font-bold text-blue-600">${(savings * 52).toLocaleString()}/year</div>
              </div>
            </div>

            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg"
            >
              Start Saving Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Faster
            </h2>
            <p className="text-xl text-gray-600">
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
              <div key={i} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="text-sm font-semibold text-blue-600">{feature.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Thousands of Developers
            </h2>
            <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-500" />
              ))}
            </div>
            <p className="text-xl text-gray-600">4.9/5 from 2,847 reviews</p>
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
              <div key={i} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-900 text-lg mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold">{testimonial.saved}</div>
                    <div className="text-xs text-gray-600">saved/year</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build 10x Faster?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join 5,000+ developers who stopped reinventing the wheel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace"
              className="px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
            >
              Browse Marketplace
            </Link>
            <Link
              href="/auth"
              className="px-10 py-5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold text-lg transition-all border-2 border-white/30"
            >
              Start Free Trial
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-75">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
