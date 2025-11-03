import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import {
  Code2,
  Palette,
  Layers,
  Zap,
  Database,
  Lock
} from "lucide-react";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main className="min-h-screen">
        <HeroSection />

        {/* Features Section */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Built with Modern Technologies
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A showcase of current web development best practices and design patterns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              <FeatureCard
                icon={<Code2 className="h-6 w-6" />}
                title="TypeScript"
                description="Fully typed codebase with strict mode enabled for enhanced type safety and better developer experience."
              />
              <FeatureCard
                icon={<Layers className="h-6 w-6" />}
                title="Next.js 15"
                description="Latest App Router with React Server Components, server actions, and edge runtime support."
              />
              <FeatureCard
                icon={<Palette className="h-6 w-6" />}
                title="Tailwind CSS v4"
                description="Modern utility-first CSS with custom design tokens and component variants using shadcn/ui."
              />
              <FeatureCard
                icon={<Database className="h-6 w-6" />}
                title="Supabase"
                description="PostgreSQL database with Row Level Security, authentication, and real-time capabilities."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Performance"
                description="Optimized for Core Web Vitals with automatic code splitting and image optimization."
              />
              <FeatureCard
                icon={<Lock className="h-6 w-6" />}
                title="Security"
                description="Rate limiting, CSRF protection, security headers, and comprehensive input validation."
              />
            </div>
          </div>
        </section>

        {/* Design System Section */}
        <section className="py-24 bg-background-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Design System
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Consistent UI patterns following modern design principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold shadow-lg">
                  <Palette className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Color System</h3>
                <p className="text-sm text-foreground-secondary">
                  Custom theme with blue and gold accents, supporting both light and dark modes.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold shadow-lg">
                  <Code2 className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Components</h3>
                <p className="text-sm text-foreground-secondary">
                  Reusable shadcn/ui components with Radix UI primitives for accessibility.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold shadow-lg">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Animations</h3>
                <p className="text-sm text-foreground-secondary">
                  Subtle transitions with Framer Motion for enhanced user experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              This is a portfolio showcase demonstrating modern web development capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/Ai-Eli-ML"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-md bg-white px-6 text-sm font-medium text-primary hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View GitHub Profile
              </a>
              <a
                href="mailto:contact@advancingtechnology.dev"
                className="inline-flex h-12 items-center rounded-md border border-white/30 bg-white/10 px-6 text-sm font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatDrawer />
    </>
  );
}
