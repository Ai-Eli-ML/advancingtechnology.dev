"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Blocks, 
  Settings, 
  Home, 
  Package, 
  FileText, 
  CreditCard,
  HelpCircle,
  ChevronLeft,
  User,
  BarChart3,
  Bell,
  Shield,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  // TODO: Replace with actual user data from Supabase auth
  // This is mock data for development
  const mockUser = {
    email: "developer@example.com",
    name: "Developer",
    pluginCount: 3,
    revenue: 1250
  };
  
  const navItems = [
    { href: "/dashboard", icon: Home, label: "Overview", badge: null },
    { href: "/dashboard/plugins", icon: Blocks, label: "My Plugins", badge: mockUser.pluginCount.toString() },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", badge: null },
    { href: "/dashboard/purchases", icon: Package, label: "Purchases", badge: null },
    { href: "/dashboard/billing", icon: CreditCard, label: "Billing", badge: null },
    { href: "/dashboard/settings", icon: Settings, label: "Settings", badge: null },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-24 left-4 z-50 p-2 bg-card rounded-lg border border-border shadow-lg lg:hidden"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: -300 } : false}
        animate={{
          x: isMobile && !isOpen ? -300 : 0
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "w-72 h-full bg-card border-r border-border flex flex-col",
          isMobile ? "fixed left-0 top-0 z-50" : "",
          className
        )}
      >
        {/* Header */}
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold text-gradient">Dashboard</h2>
          <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        </div>
        <p className="text-sm text-muted-foreground">Manage your AI ecosystem</p>
      </div>

      {/* User Info */}
      <div className="p-6 pb-4">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Welcome back{mockUser.name ? `, ${mockUser.name}` : ''}</p>
              <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-lg font-bold text-primary">{mockUser.pluginCount}</p>
              <p className="text-xs text-muted-foreground">Plugins</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-accent">${mockUser.revenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <item.icon className={cn(
                    "w-5 h-5 flex-shrink-0 relative transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <span className="relative flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "relative px-2 py-0.5 text-xs rounded-full",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* Quick Actions */}
        <div className="mt-8 mb-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 mb-2">
            Quick Actions
          </h3>
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 text-left">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Documentation</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 text-left">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Security</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <Link
          href="/dashboard/support"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Help & Support</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 mt-1"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
      </motion.aside>
    </>
  );
};

export default Sidebar; 