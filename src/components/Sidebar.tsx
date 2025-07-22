import React from "react";
import { 
  Blocks, 
  Settings, 
  Home, 
  Package, 
  FileText, 
  CreditCard,
  HelpCircle,
  ChevronLeft,
  User
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const navItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/plugins", icon: Blocks, label: "My Plugins" },
    { href: "/dashboard/purchases", icon: Package, label: "Purchases" },
    { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
    { href: "/dashboard/docs", icon: FileText, label: "Documentation" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className={`w-64 h-full bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] text-white flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-white/70 mt-1">Manage your plugins & settings</p>
      </div>

      {/* User Info */}
      <div className="mx-6 mb-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Welcome back</p>
            <p className="text-xs text-white/70 truncate">user@example.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10">
        <a
          href="/dashboard/support"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Support</span>
        </a>
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 mt-1"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar; 