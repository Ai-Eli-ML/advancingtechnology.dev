import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Code2
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/Ai-Eli-ML", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/elijahbrown", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:contact@advancingtechnology.dev", icon: Mail, label: "Email" },
  ];

  return (
    <footer className="w-full flex-shrink-0 bg-background/40 backdrop-blur-2xl border-t border-white/10 mt-auto relative overflow-hidden">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
            {/* Brand Section */}
            <div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <Code2 className="h-8 w-8 text-primary relative" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  AdvancingTechnology.Dev
                </h3>
              </div>
              <p className="text-sm text-foreground-secondary max-w-md">
                A portfolio showcase demonstrating modern web development with Next.js 15, TypeScript, and Tailwind CSS.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 md:p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-primary/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>

            {/* Tech Stack Badge */}
            <div className="flex flex-wrap justify-center gap-3 text-xs text-foreground-tertiary">
              <span className="px-3 py-1 bg-muted rounded-full">Next.js 15</span>
              <span className="px-3 py-1 bg-muted rounded-full">React 19</span>
              <span className="px-3 py-1 bg-muted rounded-full">TypeScript</span>
              <span className="px-3 py-1 bg-muted rounded-full">Tailwind CSS</span>
              <span className="px-3 py-1 bg-muted rounded-full">Supabase</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-foreground-secondary">
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/acceptable-use" className="hover:text-primary transition-colors">
                Acceptable Use
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 border-t border-accent/20">
          <div className="text-center text-sm text-foreground-tertiary">
            <p>&copy; {currentYear} AdvancingTechnology.Dev. Built as a portfolio showcase.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
