/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | AdvancingTechnology.dev",
  description: "Privacy Policy for AdvancingTechnology.dev. Learn how we collect, use, and protect your personal information in compliance with GDPR and CCPA.",
  openGraph: {
    title: "Privacy Policy | AdvancingTechnology.dev",
    description: "Privacy Policy for AdvancingTechnology.dev - GDPR and CCPA compliant",
    url: "https://advancingtechnology.dev/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "November 6, 2025";

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen py-16 sm:py-24">
        <div className="container max-w-4xl">
          {/* Header */}
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

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="card mb-8">
              <p className="text-foreground-secondary">
                At AdvancingTechnology, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform. This policy is compliant with GDPR, CCPA, and other applicable privacy regulations.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="card mb-8 bg-background-secondary">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                <a href="#information-collection" className="block text-primary hover:underline">1. Information We Collect</a>
                <a href="#how-we-use" className="block text-primary hover:underline">2. How We Use Your Information</a>
                <a href="#data-sharing" className="block text-primary hover:underline">3. Data Sharing and Disclosure</a>
                <a href="#third-party-services" className="block text-primary hover:underline">4. Third-Party Services</a>
                <a href="#cookies" className="block text-primary hover:underline">5. Cookies and Tracking Technologies</a>
                <a href="#data-security" className="block text-primary hover:underline">6. Data Security</a>
                <a href="#data-retention" className="block text-primary hover:underline">7. Data Retention</a>
                <a href="#your-rights" className="block text-primary hover:underline">8. Your Privacy Rights</a>
                <a href="#childrens-privacy" className="block text-primary hover:underline">9. Children's Privacy</a>
                <a href="#international-transfers" className="block text-primary hover:underline">10. International Data Transfers</a>
                <a href="#policy-changes" className="block text-primary hover:underline">11. Changes to This Policy</a>
                <a href="#contact-privacy" className="block text-primary hover:underline">12. Contact Us</a>
              </nav>
            </div>

            {/* Section 1 */}
            <section id="information-collection" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">Personal Information You Provide</h3>
              <p className="mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, username, password, and profile information</li>
                <li><strong>Payment Information:</strong> Payment card details, billing address (processed securely through Stripe)</li>
                <li><strong>Developer Information:</strong> Tax identification numbers, payout information for plugin developers</li>
                <li><strong>Communication Data:</strong> Messages, feedback, and support requests you send to us</li>
                <li><strong>Profile Data:</strong> Profile pictures, bio, social media links (optional)</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Information Automatically Collected</h3>
              <p className="mb-4">When you access our Platform, we automatically collect:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on pages, click patterns</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type, IP address</li>
                <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                <li><strong>Log Data:</strong> Access times, errors, referral URLs</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Analytics and Performance Data</h3>
              <p>
                We use Vercel Analytics and Speed Insights to collect performance metrics and improve user experience. This includes page load times, interaction metrics, and Core Web Vitals.
              </p>
            </section>

            {/* Section 2 */}
            <section id="how-we-use" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use collected information for the following purposes:</p>
              <h3 className="text-xl font-semibold mb-3">Platform Operations</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Create and manage your account</li>
                <li>Process transactions and send purchase confirmations</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Enable plugin downloads and license management</li>
                <li>Facilitate communication between buyers and developers</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Platform Improvement</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Analyze usage patterns to improve user experience</li>
                <li>Develop new features and functionality</li>
                <li>Conduct research and analytics</li>
                <li>Monitor and improve Platform performance and security</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Communication</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Send transactional emails (purchase confirmations, password resets)</li>
                <li>Notify you of Platform updates and new features</li>
                <li>Send marketing communications (with your consent, opt-out available)</li>
                <li>Respond to your comments and questions</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Legal and Security</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with legal obligations and enforce our Terms of Service</li>
                <li>Detect, prevent, and address fraud, security issues, and technical problems</li>
                <li>Protect the rights, property, and safety of our users and the public</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="data-sharing" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">3. Data Sharing and Disclosure</h2>
              <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
              <h3 className="text-xl font-semibold mb-3">With Your Consent</h3>
              <p className="mb-4">
                We may share your information when you explicitly authorize us to do so.
              </p>
              <h3 className="text-xl font-semibold mb-3">With Service Providers</h3>
              <p className="mb-4">
                We share information with third-party service providers who perform services on our behalf:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Stripe:</strong> Payment processing (PCI-DSS compliant)</li>
                <li><strong>Supabase:</strong> Database and authentication services</li>
                <li><strong>Vercel:</strong> Hosting and analytics</li>
                <li><strong>Email Service Providers:</strong> Transactional and marketing emails</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">With Plugin Developers</h3>
              <p className="mb-4">
                When you purchase a plugin, we share your email address with the developer for support purposes. Developers must comply with this Privacy Policy and applicable data protection laws.
              </p>
              <h3 className="text-xl font-semibold mb-3">Legal Requirements</h3>
              <p className="mb-4">
                We may disclose information if required by law, court order, or governmental request, or to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with legal processes</li>
                <li>Enforce our Terms of Service</li>
                <li>Respond to claims of illegal activity</li>
                <li>Protect the rights, property, and safety of AdvancingTechnology, our users, or the public</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="third-party-services" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
              <h3 className="text-xl font-semibold mb-3">Stripe Payment Processing</h3>
              <p className="mb-4">
                Payment information is processed by Stripe, a PCI-DSS Level 1 certified payment processor. We do not store credit card numbers on our servers. Stripe's privacy policy is available at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stripe.com/privacy</a>.
              </p>
              <h3 className="text-xl font-semibold mb-3">Supabase Authentication and Database</h3>
              <p className="mb-4">
                We use Supabase for secure authentication and database services. Supabase is SOC 2 Type II certified. Their privacy policy is available at <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com/privacy</a>.
              </p>
              <h3 className="text-xl font-semibold mb-3">Vercel Hosting and Analytics</h3>
              <p className="mb-4">
                Our Platform is hosted on Vercel, and we use Vercel Analytics for performance monitoring. Vercel's privacy policy is available at <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com/legal/privacy-policy</a>.
              </p>
              <h3 className="text-xl font-semibold mb-3">Third-Party Links</h3>
              <p>
                Our Platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            {/* Section 5 */}
            <section id="cookies" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking Technologies</h2>
              <h3 className="text-xl font-semibold mb-3">What Are Cookies?</h3>
              <p className="mb-4">
                Cookies are small text files stored on your device that help us provide and improve our services. We use both session cookies (deleted when you close your browser) and persistent cookies (remain on your device).
              </p>
              <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for Platform functionality (authentication, security)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the Platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences (theme, language)</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Cookie Management</h3>
              <p>
                You can control cookies through your browser settings. Note that disabling essential cookies may affect Platform functionality. Most browsers accept cookies automatically, but you can modify your settings to decline cookies.
              </p>
            </section>

            {/* Section 6 */}
            <section id="data-security" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Encryption:</strong> Data in transit is encrypted using TLS/SSL</li>
                <li><strong>Authentication:</strong> Secure password hashing using bcrypt</li>
                <li><strong>Access Controls:</strong> Strict access limitations to personal data</li>
                <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                <li><strong>Monitoring:</strong> 24/7 monitoring for suspicious activity</li>
              </ul>
              <p className="mb-4">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
              <p>
                If you become aware of any security vulnerability or breach, please contact us immediately at <a href="mailto:security@advancingtechnology.dev" className="text-primary hover:underline">security@advancingtechnology.dev</a>.
              </p>
            </section>

            {/* Section 7 */}
            <section id="data-retention" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
              </p>
              <h3 className="text-xl font-semibold mb-3">Retention Periods</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Account Data:</strong> Retained while your account is active and for 30 days after deletion</li>
                <li><strong>Transaction Records:</strong> Retained for 7 years for tax and legal compliance</li>
                <li><strong>Support Communications:</strong> Retained for 3 years</li>
                <li><strong>Analytics Data:</strong> Aggregated and anonymized after 2 years</li>
              </ul>
              <p>
                When data is no longer needed, we securely delete or anonymize it. You can request deletion of your data at any time (subject to legal retention requirements).
              </p>
            </section>

            {/* Section 8 */}
            <section id="your-rights" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">8. Your Privacy Rights</h2>
              <h3 className="text-xl font-semibold mb-3">GDPR Rights (European Users)</h3>
              <p className="mb-4">If you are located in the European Economic Area, you have the following rights:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">CCPA Rights (California Users)</h3>
              <p className="mb-4">If you are a California resident, you have the following rights:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Right to Know:</strong> Request information about data collection and use</li>
                <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell data)</li>
                <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of exercising privacy rights</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">How to Exercise Your Rights</h3>
              <p className="mb-4">
                To exercise any of these rights, contact us at <a href="mailto:privacy@advancingtechnology.dev" className="text-primary hover:underline">privacy@advancingtechnology.dev</a>. We will respond to your request within 30 days.
              </p>
              <p>
                You also have the right to lodge a complaint with a supervisory authority if you believe your privacy rights have been violated.
              </p>
            </section>

            {/* Section 9 */}
            <section id="childrens-privacy" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy (COPPA Compliance)</h2>
              <p className="mb-4">
                Our Platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are under 18, do not use the Platform or provide any personal information.
              </p>
              <p className="mb-4">
                If we learn that we have collected personal information from a child under 18, we will delete that information as quickly as possible.
              </p>
              <p>
                If you believe we have collected information from a child under 18, please contact us immediately at <a href="mailto:privacy@advancingtechnology.dev" className="text-primary hover:underline">privacy@advancingtechnology.dev</a>.
              </p>
            </section>

            {/* Section 10 */}
            <section id="international-transfers" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">10. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.
              </p>
              <p className="mb-4">
                If you are located outside the United States and choose to provide information to us, please note that we transfer the data, including personal data, to the United States and process it there.
              </p>
              <p>
                We ensure appropriate safeguards are in place for international data transfers, including Standard Contractual Clauses approved by the European Commission for transfers to third countries.
              </p>
            </section>

            {/* Section 11 */}
            <section id="policy-changes" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Posting the updated policy on this page</li>
                <li>Updating the "Last Updated" date at the top</li>
                <li>Sending an email notification to registered users (for significant changes)</li>
                <li>Displaying a prominent notice on the Platform</li>
              </ul>
              <p>
                Changes become effective 30 days after posting unless otherwise specified. Your continued use of the Platform after changes become effective constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Section 12 */}
            <section id="contact-privacy" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
              <p className="mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-background-secondary p-6 rounded-lg">
                <p className="mb-2"><strong>AdvancingTechnology - Privacy Team</strong></p>
                <p className="mb-2">Email: <a href="mailto:privacy@advancingtechnology.dev" className="text-primary hover:underline">privacy@advancingtechnology.dev</a></p>
                <p className="mb-2">Security Issues: <a href="mailto:security@advancingtechnology.dev" className="text-primary hover:underline">security@advancingtechnology.dev</a></p>
                <p className="mb-2">Website: <a href="https://advancingtechnology.dev" className="text-primary hover:underline">https://advancingtechnology.dev</a></p>
                <p>Response time: Within 48 business hours</p>
              </div>
            </section>

            {/* Consent */}
            <div className="card bg-primary/10 border-primary/30">
              <p className="text-center font-semibold">
                By using AdvancingTechnology.dev, you consent to the collection and use of information as described in this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
