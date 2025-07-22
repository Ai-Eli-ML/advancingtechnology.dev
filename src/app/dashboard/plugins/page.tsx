"use client";

import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import Sidebar from "@/components/Sidebar";
import { 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  Package
} from "lucide-react";

interface Plugin {
  id: number;
  name: string;
  description: string;
  status: "active" | "draft" | "pending";
  downloads: number;
  revenue: string;
  rating: number;
  lastUpdated: string;
  version: string;
}

export default function DashboardPluginsPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft" | "pending">("all");

  const plugins: Plugin[] = [
    {
      id: 1,
      name: "AI Chat Plugin",
      description: "Advanced conversational AI with natural language processing",
      status: "active",
      downloads: 1234,
      revenue: "$2,468.00",
      rating: 4.8,
      lastUpdated: "2 days ago",
      version: "2.1.0"
    },
    {
      id: 2,
      name: "Voice Assistant",
      description: "Voice-enabled AI assistant for hands-free interaction",
      status: "active",
      downloads: 892,
      revenue: "$1,784.00",
      rating: 4.9,
      lastUpdated: "1 week ago",
      version: "1.8.2"
    },
    {
      id: 3,
      name: "Code Generator",
      description: "AI-powered code generation and completion tool",
      status: "pending",
      downloads: 567,
      revenue: "$851.00",
      rating: 4.6,
      lastUpdated: "3 days ago",
      version: "3.0.0"
    },
    {
      id: 4,
      name: "Data Analyzer",
      description: "Machine learning-based data analysis and visualization",
      status: "draft",
      downloads: 0,
      revenue: "$0.00",
      rating: 0,
      lastUpdated: "5 hours ago",
      version: "0.9.0"
    }
  ];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || plugin.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Plugin["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      
      <div className="flex-1 flex">
        <Sidebar className="hidden lg:block" />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold mb-2">My Plugins</h1>
                <p className="text-muted-foreground">
                  Manage and monitor your AI-powered plugins
                </p>
              </div>
              <button className="mt-4 sm:mt-0 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Plugin
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search plugins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                </select>
                <button className="px-4 py-3 border border-input rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="hidden sm:inline">More Filters</span>
                </button>
              </div>
            </div>

            {/* Plugin Cards */}
            <div className="grid gap-6">
              {filteredPlugins.map((plugin) => (
                <div key={plugin.id} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Plugin Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-display text-xl font-semibold">{plugin.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plugin.status)}`}>
                              {plugin.status}
                            </span>
                            <span className="text-sm text-muted-foreground">v{plugin.version}</span>
                          </div>
                          <p className="text-muted-foreground mb-3">{plugin.description}</p>
                          
                          {/* Stats */}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{plugin.downloads}</span>
                              <span className="text-muted-foreground">downloads</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{plugin.revenue}</span>
                              <span className="text-muted-foreground">revenue</span>
                            </div>
                            {plugin.rating > 0 && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                <span className="font-medium">{plugin.rating}</span>
                                <span className="text-muted-foreground">rating</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Updated {plugin.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Performance Graph (for active plugins) */}
                  {plugin.status === "active" && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Last 7 days performance</span>
                      </div>
                      <div className="h-24 bg-muted rounded-lg flex items-end justify-around p-2">
                        {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                          <div
                            key={i}
                            className="w-full max-w-[40px] bg-primary rounded-t"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPlugins.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">No plugins found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || filterStatus !== "all" 
                    ? "Try adjusting your search or filters"
                    : "Create your first plugin to get started"}
                </p>
                {!searchQuery && filterStatus === "all" && (
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto">
                    <Plus className="w-5 h-5" />
                    Create Your First Plugin
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
      {showChatDrawer && <ChatDrawer onClose={() => setShowChatDrawer(false)} />}
      
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChatDrawer(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}