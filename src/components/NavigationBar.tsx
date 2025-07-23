"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      setIsDarkMode(true);
    } else {
      root.classList.remove("dark");
      setIsDarkMode(false);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { href: "/marketplace", label: "Marketplace", description: "Browse AI plugins" },
    { href: "/dashboard", label: "Dashboard", description: "Manage your account" },
    { href: "/docs", label: "Documentation", description: "Learn how to build" },
    { href: "/blog", label: "Blog", description: "Latest updates" },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "bg-cream/95 backdrop-blur-lg border-b border-gold-light/30 shadow-sm"
        : "bg-cream/80 backdrop-blur-sm"
    )}>
      <div className="container flex h-20 items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 rounded-lg blur-lg group-hover:bg-gold/30 transition-colors" />
            <Sparkles className="h-8 w-8 text-gold relative" />
          </div>
          <span className="font-display text-2xl font-bold text-gradient-blue">AT.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:ml-12">
          <div className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                  pathname === link.href
                    ? "text-blue"
                    : "text-blue-dark/70 hover:text-blue"
                )}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-gold/10 border border-gold/20 rounded-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gold/10 transition-colors group"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue/0 to-blue/0 group-hover:from-blue/10 group-hover:to-gold/10 rounded-lg transition-all duration-300" />
              {isDarkMode ? (
                <Sun className="h-5 w-5 relative transition-transform group-hover:rotate-90 duration-500 text-gold" />
              ) : (
                <Moon className="h-5 w-5 relative transition-transform group-hover:-rotate-12 duration-500 text-blue" />
              )}
            </button>
            <Link
              href="/auth"
              className="inline-flex h-10 items-center rounded-lg px-5 text-sm font-medium text-blue hover:text-blue-dark bg-transparent hover:bg-gold/10 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=signup"
              className="group inline-flex h-10 items-center rounded-lg bg-blue px-5 text-sm font-medium text-white shadow-md hover:shadow-lg hover:bg-blue-dark transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex flex-1 items-center justify-end md:hidden space-x-2">
          <button
            onClick={toggleDarkMode}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted transition-colors"
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
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-cream/95 backdrop-blur-lg border-t border-gold-light/30"
      >
        <div className="container py-6">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex flex-col px-4 py-3 rounded-lg transition-all duration-200",
                    pathname === link.href
                      ? "bg-gold/10 text-blue border border-gold/20"
                      : "text-blue-dark/70 hover:bg-gold/10 hover:text-blue"
                  )}
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{link.description}</span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navLinks.length * 0.1 }}
              className="flex flex-col space-y-3 pt-4 mt-4 border-t border-border"
            >
              <Link
                href="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-center font-medium rounded-lg bg-transparent border border-blue text-blue hover:bg-blue hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth?mode=signup"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-center font-medium rounded-lg bg-blue text-white shadow-md hover:bg-blue-dark transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavigationBar;