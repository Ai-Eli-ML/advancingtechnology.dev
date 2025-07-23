"use client";

import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import Sidebar from "@/components/Sidebar";
import { 
  Package, 
  Download, 
  DollarSign,
  Activity,
  Users,
  Code2,
  Star,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,486",
      change: "+23.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      title: "Active Plugins",
      value: "24",
      change: "+4",
      trend: "up",
      icon: Package,
      gradient: "from-blue-600 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      title: "Total Downloads",
      value: "18.2K",
      change: "+42.8%",
      trend: "up",
      icon: Download,
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      title: "Active Users",
      value: "3,892",
      change: "-2.4%",
      trend: "down",
      icon: Users,
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "purchase",
      message: "John Doe purchased your AI Chat Plugin",
      time: "2 hours ago",
      amount: "$49.99"
    },
    {
      id: 2,
      type: "review",
      message: "Sarah Smith left a 5-star review on Voice Assistant",
      time: "4 hours ago",
      rating: 5
    },
    {
      id: 3,
      type: "update",
      message: "Your Code Generator plugin was updated successfully",
      time: "6 hours ago"
    },
    {
      id: 4,
      type: "purchase",
      message: "Mike Johnson purchased your Data Analyzer",
      time: "1 day ago",
      amount: "$89.99"
    }
  ];

  const topPlugins = [
    {
      id: 1,
      name: "AI Chat Plugin",
      downloads: 1234,
      revenue: "$2,468.00",
      rating: 4.8,
      trend: "up"
    },
    {
      id: 2,
      name: "Voice Assistant",
      downloads: 892,
      revenue: "$1,784.00",
      rating: 4.9,
      trend: "up"
    },
    {
      id: 3,
      name: "Code Generator",
      downloads: 567,
      revenue: "$851.00",
      rating: 4.6,
      trend: "down"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      
      <div className="flex-1 flex">
        <Sidebar className="hidden lg:block" />
        
        <main className="flex-1 bg-background-secondary/50">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-display text-4xl font-bold text-gradient">Dashboard</h1>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    Last 30 days
                  </button>
                </div>
              </div>
              <p className="text-foreground-secondary">
                Track your performance and manage your AI plugin ecosystem
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden"
                >
                  <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-semibold ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.trend === 'up' ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )}
                          {stat.change}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div className="bg-card rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="font-display text-xl font-semibold">Recent Activity</h2>
                          <p className="text-xs text-muted-foreground mt-0.5">Your latest plugin interactions</p>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-1">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 group"
                      >
                        <div className={`p-2.5 rounded-xl ${
                          activity.type === "purchase" ? "bg-green-100 dark:bg-green-900/30" :
                          activity.type === "review" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                          "bg-blue-100 dark:bg-blue-900/30"
                        }`}>
                          {activity.type === "purchase" && <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />}
                          {activity.type === "review" && <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
                          {activity.type === "update" && <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                            {activity.message}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                            {activity.amount && (
                              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                {activity.amount}
                              </span>
                            )}
                            {activity.rating && (
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${i < activity.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Top Plugins */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="bg-card rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Package className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h2 className="font-display text-xl font-semibold">Top Plugins</h2>
                          <p className="text-xs text-muted-foreground mt-0.5">Your best performers</p>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {topPlugins.map((plugin, index) => (
                      <motion.div
                        key={plugin.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="space-y-3 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{plugin.name}</h3>
                          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                            plugin.trend === 'up' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {plugin.trend === 'up' ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )}
                            {plugin.trend === 'up' ? '+12%' : '-5%'}
                          </div>
                        </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{plugin.downloads} downloads</span>
                        <span className="font-medium text-foreground">{plugin.revenue}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium">{plugin.rating}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground">
              <h2 className="font-display text-xl font-semibold mb-2">Ready to create more?</h2>
              <p className="text-primary-foreground/80 mb-4">
                Build your next AI-powered plugin and reach thousands of developers.
              </p>
              <button className="px-6 py-2 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Create New Plugin
              </button>
            </div>
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