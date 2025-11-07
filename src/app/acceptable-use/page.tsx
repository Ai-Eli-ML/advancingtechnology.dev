/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | AdvancingTechnology.dev",
  description: "Acceptable Use Policy for AdvancingTechnology.dev. Learn about prohibited content, plugin quality standards, code of conduct, and enforcement procedures.",
  openGraph: {
    title: "Acceptable Use Policy | AdvancingTechnology.dev",
    description: "Acceptable Use Policy for AdvancingTechnology.dev AI Tools Marketplace",
    url: "https://advancingtechnology.dev/acceptable-use",
  },
};

export default function AcceptableUsePage() {
  const lastUpdated = "November 6, 2025";

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen py-16 sm:py-24">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-warning" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Acceptable Use Policy
            </h1>
            <p className="text-lg text-foreground-secondary">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="card mb-8">
              <p className="text-foreground-secondary">
                This Acceptable Use Policy outlines the standards of behavior and content that all users and developers must follow when using AdvancingTechnology.dev. Violations may result in account suspension or termination.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="card mb-8 bg-background-secondary">
              <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                <a href="#policy-scope" className="block text-primary hover:underline">1. Policy Scope</a>
                <a href="#prohibited-content" className="block text-primary hover:underline">2. Prohibited Content</a>
                <a href="#prohibited-activities" className="block text-primary hover:underline">3. Prohibited Activities</a>
                <a href="#plugin-standards" className="block text-primary hover:underline">4. Plugin Quality Standards</a>
                <a href="#code-of-conduct" className="block text-primary hover:underline">5. Developer Code of Conduct</a>
                <a href="#user-conduct" className="block text-primary hover:underline">6. User Conduct Guidelines</a>
                <a href="#security-requirements" className="block text-primary hover:underline">7. Security Requirements</a>
                <a href="#enforcement" className="block text-primary hover:underline">8. Enforcement Procedures</a>
                <a href="#reporting" className="block text-primary hover:underline">9. Reporting Violations</a>
                <a href="#appeals" className="block text-primary hover:underline">10. Appeal Process</a>
              </nav>
            </div>

            {/* Section 1 */}
            <section id="policy-scope" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">1. Policy Scope</h2>
              <p className="mb-4">
                This Acceptable Use Policy applies to all users, developers, and visitors of the AdvancingTechnology.dev Platform. It covers:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>User accounts and profiles</li>
                <li>Plugin submissions and listings</li>
                <li>Communications on the Platform (comments, reviews, messages)</li>
                <li>Use of Platform features and services</li>
                <li>Interactions with other users and developers</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="prohibited-content" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">2. Prohibited Content</h2>
              <p className="mb-4">
                The following types of content are strictly prohibited on the Platform:
              </p>
              <h3 className="text-xl font-semibold mb-3">Illegal Content</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Content that violates any local, state, national, or international law</li>
                <li>Content that infringes intellectual property rights (copyright, trademark, patent, trade secret)</li>
                <li>Content that facilitates illegal activities</li>
                <li>Pirated software or tools designed to circumvent copyright protection</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Malicious Software</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Malware, viruses, trojans, ransomware, or other harmful code</li>
                <li>Backdoors or unauthorized remote access tools</li>
                <li>Keyloggers, spyware, or data harvesting tools (without explicit disclosure and consent)</li>
                <li>Code that intentionally damages, interferes with, or exploits systems</li>
                <li>Cryptominers (unless explicitly disclosed and user-consented)</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Harmful or Offensive Content</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Content that promotes violence, hatred, or discrimination based on race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics</li>
                <li>Harassment, bullying, threats, or intimidation</li>
                <li>Sexual or pornographic content</li>
                <li>Graphic violence or gore</li>
                <li>Content that promotes self-harm or suicide</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Fraudulent or Deceptive Content</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Phishing tools or content designed to deceive users</li>
                <li>Fake reviews, ratings, or testimonials</li>
                <li>Misleading descriptions or false advertising</li>
                <li>Impersonation of individuals, organizations, or brands</li>
                <li>Pyramid schemes, multi-level marketing, or get-rich-quick schemes</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Spam and Unwanted Content</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unsolicited bulk messages or spam</li>
                <li>Excessive self-promotion or link farming</li>
                <li>Repetitive, low-quality, or duplicative content</li>
                <li>Content designed solely to manipulate search rankings</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="prohibited-activities" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">3. Prohibited Activities</h2>
              <p className="mb-4">
                Users and developers must not engage in the following activities:
              </p>
              <h3 className="text-xl font-semibold mb-3">Security Violations</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Attempting to gain unauthorized access to accounts, systems, or networks</li>
                <li>Probing, scanning, or testing vulnerabilities without authorization</li>
                <li>Circumventing security measures or authentication mechanisms</li>
                <li>Accessing data not intended for you</li>
                <li>Interfering with Platform security features</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Platform Abuse</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Automated scraping or data harvesting (without written permission)</li>
                <li>Using bots, scripts, or automated tools to manipulate Platform features</li>
                <li>Overloading servers or conducting denial-of-service attacks</li>
                <li>Creating multiple accounts to abuse features or circumvent restrictions</li>
                <li>Manipulating reviews, ratings, or download counts</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Commercial Misconduct</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Price manipulation or collusion with other developers</li>
                <li>False or misleading advertising</li>
                <li>Charging for features that don't work as described</li>
                <li>Refusing legitimate refund requests</li>
                <li>Using the Platform for money laundering or fraudulent transactions</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Intellectual Property Violations</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uploading content you don't have rights to distribute</li>
                <li>Using copyrighted material without permission</li>
                <li>Trademark infringement or brand impersonation</li>
                <li>Plagiarizing code, documentation, or other creative works</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="plugin-standards" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">4. Plugin Quality Standards</h2>
              <p className="mb-4">
                All plugins must meet the following quality standards:
              </p>
              <h3 className="text-xl font-semibold mb-3">Functionality Requirements</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Working Code:</strong> Plugin must function as described without critical bugs</li>
                <li><strong>Complete Features:</strong> All advertised features must be implemented</li>
                <li><strong>Performance:</strong> Plugin should not cause excessive slowdowns or resource consumption</li>
                <li><strong>Compatibility:</strong> Must work with specified platforms/versions as claimed</li>
                <li><strong>Stability:</strong> Should not crash or cause data loss under normal usage</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Documentation Requirements</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Installation Guide:</strong> Clear step-by-step installation instructions</li>
                <li><strong>Usage Documentation:</strong> Comprehensive guide on how to use all features</li>
                <li><strong>API Documentation:</strong> For plugins with APIs, complete reference documentation</li>
                <li><strong>System Requirements:</strong> Clear list of dependencies and compatibility</li>
                <li><strong>Troubleshooting:</strong> Common issues and their solutions</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Code Quality Standards</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Clean Code:</strong> Well-organized, readable code following best practices</li>
                <li><strong>Security:</strong> No known vulnerabilities or insecure practices</li>
                <li><strong>Error Handling:</strong> Proper error handling and logging</li>
                <li><strong>Dependencies:</strong> No unnecessary or malicious dependencies</li>
                <li><strong>Testing:</strong> Evidence of testing (unit tests preferred)</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Disclosure Requirements</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data collection must be disclosed</li>
                <li>Third-party services integration must be documented</li>
                <li>Known limitations or issues must be stated</li>
                <li>Licensing terms must be clear</li>
                <li>Any costs beyond initial purchase must be disclosed (API fees, subscriptions, etc.)</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="code-of-conduct" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">5. Developer Code of Conduct</h2>
              <p className="mb-4">
                Plugin developers are held to a higher standard and must:
              </p>
              <h3 className="text-xl font-semibold mb-3">Professional Responsibility</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate and truthful information about plugins</li>
                <li>Respond to user support requests in a timely manner (within 48 hours for critical issues)</li>
                <li>Maintain plugins with regular updates and security patches</li>
                <li>Honor refund requests that meet policy criteria</li>
                <li>Treat users with respect and professionalism</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Ethical Practices</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Do not manipulate reviews, ratings, or download counts</li>
                <li>Do not engage in anti-competitive behavior</li>
                <li>Do not copy or plagiarize other developers' work</li>
                <li>Respect user privacy and data protection laws</li>
                <li>Disclose conflicts of interest</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Security Practices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Follow secure coding practices</li>
                <li>Promptly address reported security vulnerabilities</li>
                <li>Do not collect unnecessary user data</li>
                <li>Encrypt sensitive data in transit and at rest</li>
                <li>Conduct security testing before major releases</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="user-conduct" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">6. User Conduct Guidelines</h2>
              <p className="mb-4">
                All users must:
              </p>
              <h3 className="text-xl font-semibold mb-3">Respectful Interaction</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Treat developers and other users with respect</li>
                <li>Provide constructive feedback in reviews and comments</li>
                <li>Do not harass, threaten, or abuse others</li>
                <li>Keep communications professional and on-topic</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Honest Usage</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Use purchased plugins in accordance with license terms</li>
                <li>Do not share credentials or license keys</li>
                <li>Provide honest, accurate reviews based on actual experience</li>
                <li>Do not abuse refund policies</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Intellectual Property Respect</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Do not redistribute or resell purchased plugins (unless license permits)</li>
                <li>Respect copyright and licensing terms</li>
                <li>Do not reverse engineer plugins (unless permitted by license)</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="security-requirements" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">7. Security Requirements</h2>
              <p className="mb-4">
                To maintain Platform security, all users must:
              </p>
              <h3 className="text-xl font-semibold mb-3">Account Security</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Use strong, unique passwords</li>
                <li>Enable two-factor authentication (recommended)</li>
                <li>Keep login credentials confidential</li>
                <li>Report suspicious activity immediately</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Responsible Disclosure</h3>
              <p className="mb-4">
                If you discover a security vulnerability:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Report it to <a href="mailto:security@advancingtechnology.dev" className="text-primary hover:underline">security@advancingtechnology.dev</a> immediately</li>
                <li>Do not exploit the vulnerability</li>
                <li>Do not publicly disclose it until we've had time to address it</li>
                <li>Provide detailed information to help us reproduce and fix the issue</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="enforcement" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">8. Enforcement Procedures</h2>
              <h3 className="text-xl font-semibold mb-3">Violation Response</h3>
              <p className="mb-4">
                When violations are detected or reported, we may take the following actions:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Warning:</strong> First offense for minor violations</li>
                <li><strong>Content Removal:</strong> Removal of violating content (plugins, comments, reviews)</li>
                <li><strong>Temporary Suspension:</strong> 7-30 day account suspension for moderate violations</li>
                <li><strong>Permanent Ban:</strong> Account termination for severe or repeated violations</li>
                <li><strong>Legal Action:</strong> In cases involving illegal activity or significant harm</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Severity Levels</h3>
              <div className="bg-background-secondary p-4 rounded-lg mb-4">
                <p className="mb-2"><strong className="text-warning">Minor Violations:</strong> Spam, low-quality content, minor documentation issues</p>
                <p className="mb-2"><strong className="text-destructive">Moderate Violations:</strong> Misleading descriptions, harassment, repeated spam</p>
                <p><strong className="text-destructive font-bold">Severe Violations:</strong> Malware, fraud, illegal content, security breaches</p>
              </div>
              <h3 className="text-xl font-semibold mb-3">Immediate Termination</h3>
              <p className="mb-4">
                The following violations result in immediate account termination without warning:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uploading malware or malicious code</li>
                <li>Fraud or financial crimes</li>
                <li>Child exploitation content</li>
                <li>Terrorism or violent extremism</li>
                <li>Severe security breaches</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="reporting" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">9. Reporting Violations</h2>
              <h3 className="text-xl font-semibold mb-3">How to Report</h3>
              <p className="mb-4">
                If you encounter content or behavior that violates this policy:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Use the "Report" button on plugins, reviews, or comments</li>
                <li>Email <a href="mailto:abuse@advancingtechnology.dev" className="text-primary hover:underline">abuse@advancingtechnology.dev</a> with details</li>
                <li>For security issues, email <a href="mailto:security@advancingtechnology.dev" className="text-primary hover:underline">security@advancingtechnology.dev</a></li>
                <li>For legal matters, email <a href="mailto:legal@advancingtechnology.dev" className="text-primary hover:underline">legal@advancingtechnology.dev</a></li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">What to Include</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>URL or identifier of the violating content</li>
                <li>Description of the violation</li>
                <li>Screenshots or evidence (if applicable)</li>
                <li>Your contact information for follow-up</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Investigation Process</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All reports are reviewed within 24-48 hours</li>
                <li>Reporter may be contacted for additional information</li>
                <li>Actions taken are communicated to the reporter and affected party</li>
                <li>Reports are kept confidential</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section id="appeals" className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">10. Appeal Process</h2>
              <h3 className="text-xl font-semibold mb-3">Right to Appeal</h3>
              <p className="mb-4">
                If your content is removed or your account is suspended, you may appeal the decision:
              </p>
              <h3 className="text-xl font-semibold mb-3">How to Appeal</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Email <a href="mailto:appeals@advancingtechnology.dev" className="text-primary hover:underline">appeals@advancingtechnology.dev</a> within 30 days</li>
                <li>Include your account details and case reference number</li>
                <li>Provide explanation of why you believe the decision was incorrect</li>
                <li>Submit any additional evidence or context</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Appeal Review</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Appeals are reviewed by a different team member than the original reviewer</li>
                <li>Review is completed within 7 business days</li>
                <li>Decision is communicated via email with explanation</li>
                <li>Appeal decisions are final</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Reinstatement</h3>
              <p>
                If your appeal is successful, your account or content will be reinstated. If your appeal is denied, you may submit new evidence for reconsideration, but repeated frivolous appeals may result in extended suspension.
              </p>
            </section>

            {/* Contact */}
            <section className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-4">
                For questions about this Acceptable Use Policy:
              </p>
              <div className="bg-background-secondary p-6 rounded-lg">
                <p className="mb-2"><strong>AdvancingTechnology - Trust & Safety</strong></p>
                <p className="mb-2">General Inquiries: <a href="mailto:legal@advancingtechnology.dev" className="text-primary hover:underline">legal@advancingtechnology.dev</a></p>
                <p className="mb-2">Report Abuse: <a href="mailto:abuse@advancingtechnology.dev" className="text-primary hover:underline">abuse@advancingtechnology.dev</a></p>
                <p className="mb-2">Security Issues: <a href="mailto:security@advancingtechnology.dev" className="text-primary hover:underline">security@advancingtechnology.dev</a></p>
                <p>Appeals: <a href="mailto:appeals@advancingtechnology.dev" className="text-primary hover:underline">appeals@advancingtechnology.dev</a></p>
              </div>
            </section>

            {/* Acknowledgment */}
            <div className="card bg-warning/10 border-warning/30">
              <p className="text-center font-semibold">
                By using AdvancingTechnology.dev, you acknowledge that you have read and agree to abide by this Acceptable Use Policy. Violations may result in account suspension or termination.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
