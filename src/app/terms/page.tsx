/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | AdvancingTechnology.dev",
  description: "Terms of Service for AdvancingTechnology.dev AI Tools Marketplace. Learn about user accounts, plugin submissions, payment policies, and usage guidelines.",
  openGraph: {
    title: "Terms of Service | AdvancingTechnology.dev",
    description: "Terms of Service for AdvancingTechnology.dev AI Tools Marketplace",
    url: "https://advancingtechnology.dev/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "November 6, 2025";

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen py-16 sm:py-24">
        <div className="container max-w-4xl">
          {/* Header */}
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

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="card mb-8">
              <p className="text-foreground-secondary">
                Welcome to AdvancingTechnology.dev. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="card mb-8 bg-background-secondary">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                <a href="#acceptance" className="block text-primary hover:underline">1. Acceptance of Terms</a>
                <a href="#accounts" className="block text-primary hover:underline">2. User Accounts and Registration</a>
                <a href="#plugin-submissions" className="block text-primary hover:underline">3. Plugin Submission Guidelines</a>
                <a href="#payments" className="block text-primary hover:underline">4. Payment and Refund Policy</a>
                <a href="#intellectual-property" className="block text-primary hover:underline">5. Intellectual Property Rights</a>
                <a href="#platform-usage" className="block text-primary hover:underline">6. Platform Usage Rules</a>
                <a href="#developer-responsibilities" className="block text-primary hover:underline">7. Plugin Developer Responsibilities</a>
                <a href="#liability" className="block text-primary hover:underline">8. Liability Limitations</a>
                <a href="#dispute-resolution" className="block text-primary hover:underline">9. Dispute Resolution</a>
                <a href="#termination" className="block text-primary hover:underline">10. Account Termination</a>
                <a href="#changes" className="block text-primary hover:underline">11. Changes to Terms</a>
                <a href="#contact" className="block text-primary hover:underline">12. Contact Information</a>
              </nav>
            </div>

            {/* Section 1 */}
            <section id="acceptance" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing AdvancingTechnology.dev (the "Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our Platform.
              </p>
              <p>
                These terms constitute a legally binding agreement between you and AdvancingTechnology ("we," "us," or "our"). Your continued use of the Platform constitutes acceptance of any modifications to these terms.
              </p>
            </section>

            {/* Section 2 */}
            <section id="accounts" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">2. User Accounts and Registration</h2>
              <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You must be at least 18 years old to create an account</li>
                <li>You must provide accurate, complete, and current information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You agree to notify us immediately of any unauthorized access to your account</li>
                <li>One person or legal entity may not maintain more than one account</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Account Types</h3>
              <p className="mb-2">We offer the following account types:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Basic User:</strong> Browse and purchase plugins from the marketplace</li>
                <li><strong>Developer Account:</strong> Submit, sell, and maintain plugins on the marketplace</li>
                <li><strong>Enterprise Account:</strong> Access to enterprise features and priority support</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="plugin-submissions" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">3. Plugin Submission Guidelines</h2>
              <h3 className="text-xl font-semibold mb-3">Quality Standards</h3>
              <p className="mb-4">All submitted plugins must meet the following criteria:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Functional and tested code with no critical bugs</li>
                <li>Clear documentation including installation instructions and API references</li>
                <li>Adherence to security best practices</li>
                <li>Compliance with applicable laws and regulations</li>
                <li>No malicious code, backdoors, or unauthorized data collection</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Review Process</h3>
              <p className="mb-4">
                All plugin submissions undergo a review process that typically takes 3-5 business days. We reserve the right to reject submissions that do not meet our quality standards or violate these terms.
              </p>
              <h3 className="text-xl font-semibold mb-3">Updates and Maintenance</h3>
              <p>
                Developers are required to maintain their plugins, provide updates for security vulnerabilities, and ensure compatibility with platform updates. Failure to maintain plugins may result in removal from the marketplace.
              </p>
            </section>

            {/* Section 4 */}
            <section id="payments" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">4. Payment and Refund Policy</h2>
              <h3 className="text-xl font-semibold mb-3">Payment Processing</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All payments are processed securely through Stripe</li>
                <li>Prices are listed in USD unless otherwise specified</li>
                <li>Applicable taxes will be calculated at checkout</li>
                <li>Payment information is never stored on our servers</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Developer Revenue</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Developers receive 70% of plugin sale price (after payment processing fees)</li>
                <li>AdvancingTechnology retains 30% as platform fee</li>
                <li>Payouts are processed monthly for balances over $100</li>
                <li>Developers must provide valid tax information for payouts</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Refund Policy</h3>
              <p className="mb-4">
                <strong>30-Day Money-Back Guarantee:</strong> Users may request a full refund within 30 days of purchase if the plugin does not work as described or has critical defects.
              </p>
              <p className="mb-2">Refunds will be denied for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Buyer's remorse or change of mind after 30 days</li>
                <li>User error or incompatibility with user's system (if disclosed in documentation)</li>
                <li>Requests made after substantial use of the plugin (defined as more than 30 days of active use)</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="intellectual-property" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property Rights</h2>
              <h3 className="text-xl font-semibold mb-3">Platform Content</h3>
              <p className="mb-4">
                All content on AdvancingTechnology.dev, including but not limited to text, graphics, logos, icons, images, and software, is the property of AdvancingTechnology or its content suppliers and is protected by United States and international copyright laws.
              </p>
              <h3 className="text-xl font-semibold mb-3">Plugin Ownership</h3>
              <p className="mb-4">
                Plugin developers retain all intellectual property rights to their plugins. By submitting a plugin to our marketplace, developers grant AdvancingTechnology a non-exclusive, worldwide license to distribute, market, and display the plugin on the Platform.
              </p>
              <h3 className="text-xl font-semibold mb-3">License Grant to Users</h3>
              <p className="mb-4">
                Upon purchase, users receive a non-exclusive, non-transferable license to use the plugin in accordance with the developer's specified license terms. Users may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Resell, redistribute, or sublicense plugins</li>
                <li>Reverse engineer, decompile, or disassemble plugins (unless permitted by applicable law)</li>
                <li>Remove or modify copyright notices or license information</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="platform-usage" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">6. Platform Usage Rules</h2>
              <p className="mb-4">Users agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Platform for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Violate, or encourage others to violate, the rights of third parties, including intellectual property rights</li>
                <li>Post, upload, or distribute any content that is unlawful, defamatory, libelous, inaccurate, or that a reasonable person could deem to be objectionable</li>
                <li>Interfere with security-related features of the Platform</li>
                <li>Engage in unauthorized framing or linking to the Platform</li>
                <li>Engage in any automated use of the Platform, such as scraping or using bots</li>
                <li>Interfere with, disrupt, or create an undue burden on the Platform or the networks connected to the Platform</li>
                <li>Attempt to impersonate another user or person</li>
                <li>Sell or transfer your profile or account</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="developer-responsibilities" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">7. Plugin Developer Responsibilities</h2>
              <p className="mb-4">Developers agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate and complete information about their plugins</li>
                <li>Maintain their plugins and provide updates in a timely manner</li>
                <li>Respond to user support requests within a reasonable timeframe</li>
                <li>Disclose any known limitations, compatibility issues, or security risks</li>
                <li>Not upload malicious code, viruses, or any harmful software</li>
                <li>Comply with all applicable data protection and privacy laws</li>
                <li>Honor refund requests that meet the criteria outlined in Section 4</li>
                <li>Not engage in fraudulent activities or manipulation of reviews/ratings</li>
              </ul>
              <p>
                Violation of these responsibilities may result in removal of plugins from the marketplace, account suspension, or termination.
              </p>
            </section>

            {/* Section 8 */}
            <section id="liability" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">8. Liability Limitations</h2>
              <h3 className="text-xl font-semibold mb-3">Disclaimer of Warranties</h3>
              <p className="mb-4">
                THE PLATFORM AND ALL PLUGINS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ADVANCINGTECHNOLOGY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="mb-4">
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT PAID BY YOU TO US IN THE TWELVE (12) MONTHS PRIOR TO THE ACTION GIVING RISE TO LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
              </p>
              <h3 className="text-xl font-semibold mb-3">Third-Party Plugins</h3>
              <p>
                AdvancingTechnology is not responsible for the functionality, security, or performance of third-party plugins. Users purchase and use plugins at their own risk. Disputes regarding plugins should be directed to the plugin developer.
              </p>
            </section>

            {/* Section 9 */}
            <section id="dispute-resolution" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">9. Dispute Resolution</h2>
              <h3 className="text-xl font-semibold mb-3">Informal Resolution</h3>
              <p className="mb-4">
                Before filing a formal dispute, you agree to contact us at <a href="mailto:legal@advancingtechnology.dev" className="text-primary hover:underline">legal@advancingtechnology.dev</a> to attempt to resolve the issue informally. We will make good faith efforts to resolve disputes amicably.
              </p>
              <h3 className="text-xl font-semibold mb-3">Arbitration Agreement</h3>
              <p className="mb-4">
                If informal resolution fails, any dispute arising out of or relating to these Terms or the Platform will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration will be conducted in English in the United States.
              </p>
              <h3 className="text-xl font-semibold mb-3">Class Action Waiver</h3>
              <p>
                You agree that any arbitration or proceeding shall be limited to the dispute between you and us individually. To the full extent permitted by law, no arbitration or proceeding shall be joined with any other, no dispute shall be arbitrated on a class-action basis, and there is no right or authority for any dispute to be brought in a purported representative capacity.
              </p>
            </section>

            {/* Section 10 */}
            <section id="termination" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">10. Account Termination</h2>
              <h3 className="text-xl font-semibold mb-3">Termination by You</h3>
              <p className="mb-4">
                You may terminate your account at any time by contacting us at <a href="mailto:legal@advancingtechnology.dev" className="text-primary hover:underline">legal@advancingtechnology.dev</a>. Upon termination, you will lose access to purchased plugins and any stored data.
              </p>
              <h3 className="text-xl font-semibold mb-3">Termination by Us</h3>
              <p className="mb-4">
                We reserve the right to suspend or terminate your account at any time, with or without notice, for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violation of these Terms of Service</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Extended periods of inactivity</li>
                <li>Requests by law enforcement or other government agencies</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Effect of Termination</h3>
              <p>
                Upon termination, your right to use the Platform will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
              </p>
            </section>

            {/* Section 11 */}
            <section id="changes" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting a notice on the Platform or sending an email to registered users. Changes will become effective 30 days after posting unless otherwise specified.
              </p>
              <p>
                Your continued use of the Platform after changes become effective constitutes acceptance of the modified Terms. If you do not agree to the changes, you must stop using the Platform and terminate your account.
              </p>
            </section>

            {/* Section 12 */}
            <section id="contact" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <p className="mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-background-secondary p-6 rounded-lg">
                <p className="mb-2"><strong>AdvancingTechnology</strong></p>
                <p className="mb-2">Email: <a href="mailto:legal@advancingtechnology.dev" className="text-primary hover:underline">legal@advancingtechnology.dev</a></p>
                <p className="mb-2">Website: <a href="https://advancingtechnology.dev" className="text-primary hover:underline">https://advancingtechnology.dev</a></p>
                <p>Response time: Within 48 business hours</p>
              </div>
            </section>

            {/* Acceptance */}
            <div className="card bg-primary/10 border-primary/30">
              <p className="text-center font-semibold">
                By using AdvancingTechnology.dev, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
