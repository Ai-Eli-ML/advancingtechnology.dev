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
import type { DashboardStats, RecentActivity, TopPlugin } from "@/lib/queries/dashboard";
import { formatActivityTime, formatCurrency, formatNumber } from "@/lib/queries/dashboard";

interface DashboardContentProps {
  initialStats: DashboardStats;
  initialActivity: RecentActivity[];
  initialTopPlugins: TopPlugin[];
}

export default function DashboardContent({
  initialStats,
  initialActivity,
  initialTopPlugins
}: DashboardContentProps) {
  const [showChatDrawer, setShowChatDrawer] = useState(false);

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(initialStats.total_revenue),
      change: `${initialStats.revenue_change_percentage > 0 ? '+' : ''}${initialStats.revenue_change_percentage.toFixed(1)}%`,
      trend: initialStats.revenue_change_percentage >= 0 ? "up" : "down",
      icon: DollarSign,
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      title: "Active Plugins",
      value: initialStats.plugin_count.toString(),
      change: initialStats.plugin_count > 0 ? `${initialStats.plugin_count} total` : "Get started",
      trend: "up",
      icon: Package,
      gradient: "from-blue-600 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      title: "Total Downloads",
      value: formatNumber(initialStats.total_downloads),
      change: `${initialStats.downloads_change_percentage > 0 ? '+' : ''}${initialStats.downloads_change_percentage.toFixed(1)}%`,
      trend: initialStats.downloads_change_percentage >= 0 ? "up" : "down",
      icon: Download,
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      title: "Active Users",
      value: formatNumber(initialStats.active_users),
      change: initialStats.active_users > 0 ? "Last 30 days" : "No users yet",
      trend: initialStats.active_users > 0 ? "up" : "down",
      icon: Users,
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 bg-background-secondary/50 lg:ml-72">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient">Dashboard</h1>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors text-xs sm:text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Last 30 days</span>
                    <span className="sm:hidden">30d</span>
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50 -z-10`} />
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
                    {initialActivity.length === 0 ? (
                      <div className="text-center py-12">
                        <Activity className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                        <p className="text-muted-foreground">No activity yet</p>
                        <p className="text-sm text-muted-foreground/70 mt-1">
                          Your plugin activity will appear here
                        </p>
                      </div>
                    ) : (
                      initialActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 group"
                        >
                          <div className={`p-2.5 rounded-xl ${
                            activity.activity_type === "purchase" ? "bg-green-100 dark:bg-green-900/30" :
                            activity.activity_type === "review" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                            "bg-blue-100 dark:bg-blue-900/30"
                          }`}>
                            {activity.activity_type === "purchase" && <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />}
                            {activity.activity_type === "review" && <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
                            {activity.activity_type === "update" && <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                              {activity.message}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground">
                                {formatActivityTime(activity.created_at)}
                              </span>
                              {activity.amount && (
                                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                  {formatCurrency(activity.amount)}
                                </span>
                              )}
                              {activity.rating && (
                                <div className="flex items-center gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${i < activity.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
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
                    {initialTopPlugins.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                        <p className="text-muted-foreground">No plugins yet</p>
                        <p className="text-sm text-muted-foreground/70 mt-1">
                          Create your first plugin to get started
                        </p>
                      </div>
                    ) : (
                      initialTopPlugins.map((plugin, index) => (
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
                                : plugin.trend === 'down'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                            }`}>
                              {plugin.trend === 'up' ? (
                                <ArrowUp className="w-3 h-3" />
                              ) : plugin.trend === 'down' ? (
                                <ArrowDown className="w-3 h-3" />
                              ) : null}
                              {plugin.trend_percentage > 0 ? '+' : ''}{plugin.trend_percentage.toFixed(1)}%
                            </div>
                          </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{formatNumber(plugin.downloads)} downloads</span>
                          <span className="font-medium text-foreground">{formatCurrency(plugin.revenue)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm font-medium">{plugin.rating.toFixed(1)}</span>
                        </div>
                      </motion.div>
                    ))
                  )}
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
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}
