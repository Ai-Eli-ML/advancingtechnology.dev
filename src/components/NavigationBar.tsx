"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Sparkles, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#tech-stack", label: "Tech Stack", description: "Technologies used" },
    { href: "/marketplace", label: "Demo Pages", description: "Sample interfaces" },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-[60] w-full transition-all duration-300",
      scrolled
        ? "bg-background/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-primary/5"
        : "bg-background/40 backdrop-blur-xl"
    )}>
      <div className="container flex h-16 sm:h-20 items-center">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
            <Sparkles className="h-8 w-8 text-primary relative transition-transform group-hover:rotate-12 group-hover:scale-110 duration-300" />
          </div>
          <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">AT.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:ml-8 lg:ml-12">
          <div className="flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  pathname === link.href
                    ? "text-primary bg-primary/10 backdrop-blur-xl border border-primary/20 shadow-lg shadow-primary/20"
                    : "text-foreground/70 hover:text-primary hover:bg-white/5 hover:backdrop-blur-xl hover:border hover:border-white/10"
                )}
              >
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative inline-flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg hover:bg-accent/10 transition-colors group"
              aria-label="Toggle dark mode"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-5 w-5 relative transition-transform group-hover:rotate-90 duration-500 text-accent" />
              ) : (
                <Moon className="h-5 w-5 relative transition-transform group-hover:-rotate-12 duration-500 text-primary" />
              )}
            </button>
            <a
              href="https://github.com/Ai-Eli-ML"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 lg:h-10 items-center rounded-lg px-3 lg:px-5 text-sm font-medium text-primary hover:text-primary-dark bg-transparent hover:bg-accent/10 transition-all duration-200"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex flex-1 items-center justify-end md:hidden space-x-1.5 sm:space-x-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span className={cn(
                "absolute top-0 left-0 w-5 h-0.5 bg-current transition-all duration-300 origin-center",
                isMenuOpen ? "rotate-45 translate-y-2" : "translate-y-0"
              )} />
              <span className={cn(
                "absolute top-2 left-0 w-5 h-0.5 bg-current transition-all duration-300",
                isMenuOpen ? "opacity-0" : "opacity-100"
              )} />
              <span className={cn(
                "absolute top-4 left-0 w-5 h-0.5 bg-current transition-all duration-300 origin-center",
                isMenuOpen ? "-rotate-45 -translate-y-2" : "translate-y-0"
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/30 overflow-hidden z-[60]"
          >
          <div className="container py-4 sm:py-6">
            <div className="flex flex-col space-y-1.5 sm:space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex flex-col px-4 py-3 rounded-lg transition-all duration-200",
                    pathname === link.href
                      ? "bg-accent/10 text-primary border border-accent/20"
                      : "text-foreground/70 hover:bg-accent/10 hover:text-primary"
                  )}
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{link.description}</span>
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border">
                <a
                  href="https://github.com/Ai-Eli-ML"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-center font-medium rounded-lg bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View GitHub
                </a>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;
