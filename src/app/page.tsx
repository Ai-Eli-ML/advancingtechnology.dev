import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import PricingTable from "@/components/PricingTable";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import { 
  Rocket, 
  Shield, 
  Globe, 
  Cpu, 
  Users, 
  BarChart3 
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
                Built for Modern AI Development
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build, deploy, and scale AI-powered applications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <FeatureCard
                icon={<Rocket className="h-6 w-6" />}
                title="One-Click Deploy"
                description="Deploy your AI plugins instantly with our streamlined infrastructure. No complex setup required."
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Enterprise Security"
                description="Bank-grade security with SOC2 compliance, encryption at rest, and comprehensive audit logs."
              />
              <FeatureCard
                icon={<Globe className="h-6 w-6" />}
                title="Global CDN"
                description="Lightning-fast performance with edge deployment across 100+ locations worldwide."
              />
              <FeatureCard
                icon={<Cpu className="h-6 w-6" />}
                title="AI-First Architecture"
                description="Built from the ground up for AI workloads with GPU optimization and model caching."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Collaboration Tools"
                description="Work seamlessly with your team. Share plugins, manage permissions, and track changes."
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6" />}
                title="Advanced Analytics"
                description="Deep insights into plugin performance, usage patterns, and user engagement metrics."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-muted/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get your AI tools to market in three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Browse & Discover</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our marketplace of AI plugins or upload your own creation.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Integrate & Customize</h3>
                <p className="text-sm text-muted-foreground">
                  Use our SDK to integrate plugins seamlessly into your workflow.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Deploy & Scale</h3>
                <p className="text-sm text-muted-foreground">
                  Launch with one click and scale automatically as your user base grows.
                </p>
              </div>
            </div>
          </div>
        </section>

        <PricingTable />

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Build the Future?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of developers building the next generation of AI-powered applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth?mode=signup"
                className="inline-flex h-12 items-center rounded-md bg-background px-6 text-sm font-medium text-foreground hover:opacity-90 transition-opacity"
              >
                Start Building for Free
              </a>
              <a
                href="/docs"
                className="inline-flex h-12 items-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-6 text-sm font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                View Documentation
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