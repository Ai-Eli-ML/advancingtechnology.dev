import React from "react";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  FileText,
  BookOpen,
  ShoppingBag,
  Users,
  Shield,
  HelpCircle
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
        { href: "/docs", label: "Documentation", icon: FileText },
        { href: "/blog", label: "Blog", icon: BookOpen },
        { href: "/community", label: "Community", icon: Users },
      ]
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact", icon: Mail },
        { href: "/press", label: "Press Kit" },
      ]
    },
    {
      title: "Support",
      links: [
        { href: "/help", label: "Help Center", icon: HelpCircle },
        { href: "/privacy", label: "Privacy Policy", icon: Shield },
        { href: "/terms", label: "Terms of Service" },
        { href: "/status", label: "System Status" },
      ]
    },
  ];

  const socialLinks = [
    { href: "https://github.com/advancingtechnology", icon: Github, label: "GitHub" },
    { href: "https://twitter.com/advancingtech", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com/company/advancingtechnology", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="w-full bg-blue-dark dark:bg-gray-900 border-t border-gold/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gradient-gold">
                AdvancingTechnology.Dev
              </h3>
              <p className="mt-2 text-sm text-cream/80">
                Building the future of AI-powered development tools and marketplace for innovative plugins.
              </p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue/20 rounded-lg hover:bg-gold/30 transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-cream group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-cream mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors"
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gold/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-cream">
                Stay updated with our newsletter
              </h4>
              <p className="text-sm text-cream/70 mt-1">
                Get the latest updates on new plugins and features
              </p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-cream/50 flex-1 sm:w-64"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gold text-white rounded-lg hover:bg-gold-dark transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gold/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream/60">
            <p>&copy; {currentYear} AdvancingTechnology.Dev. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/sitemap" className="hover:text-gold transition-colors">
                Sitemap
              </a>
              <a href="/accessibility" className="hover:text-gold transition-colors">
                Accessibility
              </a>
              <a href="/cookies" className="hover:text-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 