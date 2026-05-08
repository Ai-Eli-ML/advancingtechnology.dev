/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Advancing Technology Contractor Portal",
  description: "Terms of Service for the Advancing Technology contractor portal. Covers contractor accounts, task submissions, payments, and usage guidelines.",
  openGraph: {
    title: "Terms of Service | Advancing Technology",
    description: "Terms of Service for the Advancing Technology contractor portal",
    url: "https://advancingtechnology.dev/terms",
  },
};

export default function TermsPage() {
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
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-foreground-secondary">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="card mb-8">
              <p className="text-foreground-secondary">
                Welcome to the Advancing Technology Contractor Portal. By accessing or using this platform, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </div>

            <div className="card mb-8 bg-background-secondary">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                <a href="#acceptance" className="block text-primary hover:underline">1. Acceptance of Terms</a>
                <a href="#accounts" className="block text-primary hover:underline">2. Contractor Accounts</a>
                <a href="#tasks" className="block text-primary hover:underline">3. Tasks and Submissions</a>
                <a href="#payments" className="block text-primary hover:underline">4. Payments and Compensation</a>
                <a href="#intellectual-property" className="block text-primary hover:underline">5. Intellectual Property</a>
                <a href="#platform-usage" className="block text-primary hover:underline">6. Platform Usage Rules</a>
                <a href="#confidentiality" className="block text-primary hover:underline">7. Confidentiality</a>
                <a href="#liability" className="block text-primary hover:underline">8. Liability Limitations</a>
                <a href="#termination" className="block text-primary hover:underline">9. Account Termination</a>
                <a href="#changes" className="block text-primary hover:underline">10. Changes to Terms</a>
                <a href="#contact" className="block text-primary hover:underline">11. Contact Information</a>
              </nav>
            </div>

            <section id="acceptance" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing the Advancing Technology Contractor Portal ("Portal"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
              <p>
                These terms constitute a legally binding agreement between you and Advancing Technology LLC ("we," "us," or "our"). Your continued use of the Portal constitutes acceptance of any modifications to these terms.
              </p>
            </section>

            <section id="accounts" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">2. Contractor Accounts</h2>
              <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You must be at least 18 years old to create an account</li>
                <li>You must provide accurate, complete, and current information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You agree to notify us immediately of any unauthorized access to your account</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Contractor Relationship</h3>
              <p>
                Contractors using this Portal are independent contractors, not employees of Advancing Technology LLC. Nothing in these terms creates an employment, partnership, or agency relationship. You are responsible for your own taxes, insurance, and compliance with applicable laws.
              </p>
            </section>

            <section id="tasks" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">3. Tasks and Submissions</h2>
              <h3 className="text-xl font-semibold mb-3">Task Claims</h3>
              <p className="mb-4">
                Tasks posted on the Portal are available on a first-come, first-served basis. Claiming a task means you commit to completing it within the specified timeframe. If you cannot complete a claimed task, release it promptly so others can claim it.
              </p>
              <h3 className="text-xl font-semibold mb-3">Submission Standards</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All submissions must include proof of work (links, screenshots, or recordings)</li>
                <li>Work must be original and completed by you</li>
                <li>Submissions are reviewed by administrators and may be approved, rejected, or sent back for revision</li>
                <li>Repeated low-quality submissions may result in account restrictions</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Daily Reports</h3>
              <p>
                Contractors are expected to submit end-of-day (EOD) reports documenting tasks completed, blockers encountered, and plans for the following day. EOD reports help us track progress and provide support where needed.
              </p>
            </section>

            <section id="payments" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">4. Payments and Compensation</h2>
              <h3 className="text-xl font-semibold mb-3">Task Rewards</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Tasks display reward amounts (XP and/or monetary compensation) before you claim them</li>
                <li>Compensation is paid only for approved submissions</li>
                <li>Payment is processed after admin approval of your submission</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Payment Processing</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Payments are processed securely through Stripe</li>
                <li>You are responsible for providing accurate payment information</li>
                <li>Advancing Technology LLC is not responsible for delays caused by payment processors</li>
              </ul>
            </section>

            <section id="intellectual-property" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
              <p className="mb-4">
                All work completed through this Portal for Advancing Technology LLC becomes the intellectual property of Advancing Technology LLC upon approval and payment, unless otherwise specified in a separate written agreement.
              </p>
              <p className="mb-4">
                The Portal itself, including its design, code, and content, is the property of Advancing Technology LLC and is protected by copyright and other intellectual property laws.
              </p>
              <p>
                You retain ownership of any pre-existing intellectual property you bring to a task, but grant Advancing Technology LLC a license to use it as part of the completed deliverable.
              </p>
            </section>

            <section id="platform-usage" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">6. Platform Usage Rules</h2>
              <p className="mb-4">Users agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Portal for any illegal purpose</li>
                <li>Share account credentials with others</li>
                <li>Claim tasks you do not intend to complete</li>
                <li>Submit work completed by someone else as your own</li>
                <li>Attempt to manipulate the task review process</li>
                <li>Interfere with the Portal's functionality or security</li>
                <li>Scrape, crawl, or automated access the Portal without authorization</li>
                <li>Harass, threaten, or disrespect other contractors or administrators</li>
              </ul>
            </section>

            <section id="confidentiality" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">7. Confidentiality</h2>
              <p className="mb-4">
                As a contractor, you may have access to confidential information about Advancing Technology LLC, its clients, and its operations. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep all confidential information private and not disclose it to third parties</li>
                <li>Use confidential information only for completing assigned tasks</li>
                <li>Return or destroy confidential materials upon request or termination</li>
                <li>Not use confidential information for personal benefit or competitive advantage</li>
              </ul>
            </section>

            <section id="liability" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">8. Liability Limitations</h2>
              <p className="mb-4">
                THE PORTAL IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ADVANCING TECHNOLOGY LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </p>
              <p>
                IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT PAID TO YOU THROUGH THE PORTAL IN THE TWELVE (12) MONTHS PRIOR TO THE ACTION GIVING RISE TO LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
              </p>
            </section>

            <section id="termination" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">9. Account Termination</h2>
              <p className="mb-4">
                You may request termination of your account at any time by contacting us. We reserve the right to suspend or terminate your account for violation of these terms, fraudulent activity, or extended inactivity.
              </p>
              <p>
                Upon termination, your access to the Portal will cease. Any pending approved payments will still be processed. Unpaid work for unapproved submissions will not be compensated.
              </p>
            </section>

            <section id="changes" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify contractors of material changes via the Portal or email. Changes become effective 30 days after posting. Your continued use of the Portal after changes become effective constitutes acceptance.
              </p>
            </section>

            <section id="contact" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
              <p className="mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-background-secondary p-6 rounded-lg">
                <p className="mb-2"><strong>Advancing Technology LLC</strong></p>
                <p className="mb-2">Email: <a href="mailto:elijah@advancingtechnology.online" className="text-primary hover:underline">elijah@advancingtechnology.online</a></p>
                <p>Response time: Within 48 business hours</p>
              </div>
            </section>

            <div className="card bg-primary/10 border-primary/30">
              <p className="text-center font-semibold">
                By using the Advancing Technology Contractor Portal, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
