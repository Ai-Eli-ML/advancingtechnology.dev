"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Code2, Package, Users, TrendingUp } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      {/* Hero Section */}
      <section className="flex-1 pt-24 pb-16 px-6" style={{ backgroundColor: "#FFFAEC" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: "#3A4AB215" }}>
              <Sparkles className="w-4 h-4" style={{ color: "#3A4AB2" }} />
              <span className="text-sm font-semibold" style={{ color: "#3A4AB2" }}>AI-Powered Development Marketplace</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: "#1a1a1a" }}>
              Build Faster with
              <br />
              <span style={{ color: "#3A4AB2" }}>AI-Powered Tools</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto" style={{ color: "#4a4a4a" }}>
              The premier marketplace for AI plugins, development tools, and production-ready components.
              Trusted by thousands of developers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/marketplace"
                className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-white text-lg flex items-center gap-2 hover:opacity-90 shadow-lg"
                style={{ backgroundColor: "#3A4AB2" }}
              >
                Browse Marketplace
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auth"
                className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-lg border-2"
                style={{ borderColor: "#3A4AB2", color: "#3A4AB2" }}
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 bg-white rounded-2xl p-8 shadow-xl">
            {[
              { label: "Active Plugins", value: "150+" },
              { label: "Developers", value: "5,000+" },
              { label: "Total Downloads", value: "1M+" },
              { label: "Satisfaction Rate", value: "98%" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: "#3A4AB2" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
              Why Developers Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to accelerate your development workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Deploy plugins in seconds with our optimized infrastructure. Average response time under 100ms.",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption, security audits, and SOC 2 compliance on every plugin.",
              },
              {
                icon: Code2,
                title: "Developer First",
                description: "Comprehensive documentation, TypeScript support, and world-class developer experience.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border-2 transition-all duration-200 hover:shadow-xl"
                style={{ borderColor: "#e5e5e5" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#3A4AB215" }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: "#3A4AB2" }} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFAEC" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore our most popular plugin categories
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code2, name: "Development Tools", count: "45 plugins" },
              { icon: Package, name: "AI Components", count: "38 plugins" },
              { icon: Users, name: "Collaboration", count: "22 plugins" },
              { icon: TrendingUp, name: "Analytics", count: "19 plugins" },
              { icon: Shield, name: "Security", count: "16 plugins" },
              { icon: Zap, name: "Automation", count: "31 plugins" },
            ].map((category, idx) => (
              <Link
                key={idx}
                href={`/marketplace?category=${category.name.toLowerCase()}`}
                className="p-6 bg-white rounded-xl border-2 transition-all duration-200 hover:shadow-lg group"
                style={{ borderColor: "#e5e5e5" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "#3A4AB215" }}
                  >
                    <category.icon className="w-6 h-6" style={{ color: "#3A4AB2" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1" style={{ color: "#1a1a1a" }}>
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-white" style={{ backgroundColor: "#3A4AB2" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Accelerate Your Development?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of developers building the future with our AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/auth"
              className="px-8 py-4 bg-white rounded-lg font-semibold transition-all duration-200 text-lg hover:opacity-90 shadow-xl"
              style={{ color: "#3A4AB2" }}
            >
              Start Free Trial
            </Link>
            <Link
              href="/marketplace"
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-lg border-2 border-white hover:bg-white/10"
            >
              Browse Plugins
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
