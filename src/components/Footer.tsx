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
    <footer className="w-full bg-blue-dark dark:bg-gray-900 border-t border-gold/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* Brand Section */}
            <div>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Code2 className="h-8 w-8 text-gold" />
                <h3 className="text-2xl font-bold text-gradient-gold">
                  AdvancingTechnology.Dev
                </h3>
              </div>
              <p className="text-sm text-cream/80 max-w-md">
                A portfolio showcase demonstrating modern web development with Next.js 15, TypeScript, and Tailwind CSS.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue/20 rounded-lg hover:bg-gold/30 transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-cream group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>

            {/* Tech Stack Badge */}
            <div className="flex flex-wrap justify-center gap-2 text-xs text-cream/60">
              <span className="px-3 py-1 bg-white/10 rounded-full">Next.js 15</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">React 19</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">TypeScript</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Tailwind CSS</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Supabase</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gold/20">
          <div className="text-center text-sm text-cream/60">
            <p>&copy; {currentYear} AdvancingTechnology.Dev. Built as a portfolio showcase.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
