/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Advancing Technology Contractor Portal",
  description: "Privacy Policy for the Advancing Technology contractor portal. How we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | Advancing Technology",
    description: "Privacy Policy for the Advancing Technology contractor portal",
    url: "https://advancingtechnology.dev/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "May 8, 2026";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">AT Portal</span>
          </Link>
        </div>
      </nav>
      <main className="min-h-screen py-16 sm:py-24">
        <div className="container max-w-4xl">
          <div className="mb-8 sm:mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-foreground-secondary">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="card mb-8">
              <p className="text-foreground-secondary">
                At Advancing Technology, we take your privacy seriously. This Privacy Policy explains how we collect, use, and safeguard your information when you use the Contractor Portal.
              </p>
            </div>

            <div className="card mb-8 bg-background-secondary">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                <a href="#information-collection" className="block text-primary hover:underline">1. Information We Collect</a>
                <a href="#how-we-use" className="block text-primary hover:underline">2. How We Use Your Information</a>
                <a href="#data-sharing" className="block text-primary hover:underline">3. Data Sharing and Disclosure</a>
                <a href="#third-party-services" className="block text-primary hover:underline">4. Third-Party Services</a>
                <a href="#cookies" className="block text-primary hover:underline">5. Cookies and Tracking</a>
                <a href="#data-security" className="block text-primary hover:underline">6. Data Security</a>
                <a href="#data-retention" className="block text-primary hover:underline">7. Data Retention</a>
                <a href="#your-rights" className="block text-primary hover:underline">8. Your Privacy Rights</a>
                <a href="#policy-changes" className="block text-primary hover:underline">9. Changes to This Policy</a>
                <a href="#contact-privacy" className="block text-primary hover:underline">10. Contact Us</a>
              </nav>
            </div>

            <section id="information-collection" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">Information You Provide</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, password</li>
                <li><strong>Profile Data:</strong> Discord ID, role, status</li>
                <li><strong>Task Submissions:</strong> Proof of work links, notes, attachments</li>
                <li><strong>EOD Reports:</strong> Daily reports including tasks completed, blockers, hours worked, mood</li>
                <li><strong>Time Tracking:</strong> Clock in/out records</li>
                <li><strong>Payment Information:</strong> Payment details processed through Stripe</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Information Automatically Collected</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Usage Data:</strong> Pages viewed, features used, time on pages</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                <li><strong>Analytics:</strong> Vercel Analytics and Speed Insights for performance monitoring</li>
              </ul>
            </section>

            <section id="how-we-use" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage your contractor account</li>
                <li>Process task claims, submissions, and reviews</li>
                <li>Track time and generate reports</li>
                <li>Process payments for completed work</li>
                <li>Send notifications about task reviews via Discord</li>
                <li>Improve the Portal's functionality and user experience</li>
                <li>Enforce our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link></li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section id="data-sharing" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">3. Data Sharing and Disclosure</h2>
              <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Administrators:</strong> Portal admins can view contractor profiles, submissions, EOD reports, and time records for task management purposes</li>
                <li><strong>Service Providers:</strong> Stripe (payments), Supabase (database/auth), Vercel (hosting), Discord (notifications)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect rights and safety</li>
              </ul>
            </section>

            <section id="third-party-services" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Stripe:</strong> Payment processing (PCI-DSS compliant). <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy policy</a></li>
                <li><strong>Supabase:</strong> Authentication and database (SOC 2 Type II). <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy policy</a></li>
                <li><strong>Vercel:</strong> Hosting and analytics. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy policy</a></li>
                <li><strong>Discord:</strong> Task review notifications sent via bot to contractors with linked Discord accounts</li>
              </ul>
            </section>

            <section id="cookies" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
              <p className="mb-4">We use cookies for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential:</strong> Authentication session, security</li>
                <li><strong>Preferences:</strong> Theme (light/dark mode)</li>
                <li><strong>Analytics:</strong> Vercel Analytics for performance monitoring</li>
              </ul>
              <p>
                You can manage cookies through your browser settings. Disabling essential cookies will prevent you from signing in.
              </p>
            </section>

            <section id="data-security" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data in transit encrypted via TLS/SSL</li>
                <li>Passwords hashed using Supabase Auth (bcrypt)</li>
                <li>Row Level Security (RLS) enforced on all database tables</li>
                <li>Stripe webhook signatures verified for payment security</li>
                <li>Security headers (HSTS, X-Frame-Options, CSP) on all responses</li>
              </ul>
            </section>

            <section id="data-retention" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Data:</strong> Retained while active, deleted within 30 days of account closure</li>
                <li><strong>Task Submissions:</strong> Retained for the duration of the contractor relationship</li>
                <li><strong>EOD Reports:</strong> Retained for 1 year</li>
                <li><strong>Time Records:</strong> Retained for 2 years (tax compliance)</li>
                <li><strong>Payment Records:</strong> Retained for 7 years (legal requirement)</li>
              </ul>
            </section>

            <section id="your-rights" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">8. Your Privacy Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to specific uses of your data</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at <a href="mailto:elijah@advancingtechnology.online" className="text-primary hover:underline">elijah@advancingtechnology.online</a>. We will respond within 30 days.
              </p>
            </section>

            <section id="policy-changes" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify contractors of material changes via the Portal or email. Changes become effective 30 days after posting. Your continued use of the Portal constitutes acceptance.
              </p>
            </section>

            <section id="contact-privacy" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                Questions about this Privacy Policy?
              </p>
              <div className="bg-background-secondary p-6 rounded-lg">
                <p className="mb-2"><strong>Advancing Technology LLC</strong></p>
                <p className="mb-2">Email: <a href="mailto:elijah@advancingtechnology.online" className="text-primary hover:underline">elijah@advancingtechnology.online</a></p>
                <p>Response time: Within 48 business hours</p>
              </div>
            </section>

            <div className="card bg-primary/10 border-primary/30">
              <p className="text-center font-semibold">
                By using the Advancing Technology Contractor Portal, you consent to the collection and use of information as described in this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        <p>Advancing Technology LLC</p>
      </footer>
    </>
  );
}
