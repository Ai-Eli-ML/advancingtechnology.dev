"use client";

import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import Sidebar from "@/components/Sidebar";
import { 
  TrendingUp, 
  Package, 
  Download, 
  DollarSign,
  Activity,
  Users,
  Code2,
  Star
} from "lucide-react";

export default function DashboardPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);

  const stats = [
    {
      title: "Total Earnings",
      value: "$4,231.89",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Plugins",
      value: "12",
      change: "+2",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Total Downloads",
      value: "3,842",
      change: "+18.2%",
      icon: Download,
      color: "text-purple-600"
    },
    {
      title: "Active Users",
      value: "892",
      change: "+5.4%",
      icon: Users,
      color: "text-orange-600"
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
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">Dashboard Overview</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your plugins.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-muted ${stat.color} bg-opacity-10`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold">Recent Activity</h2>
                  <Activity className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="p-2 rounded-lg bg-muted">
                        {activity.type === "purchase" && <DollarSign className="w-4 h-4 text-green-600" />}
                        {activity.type === "review" && <Star className="w-4 h-4 text-yellow-600" />}
                        {activity.type === "update" && <Code2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                          {activity.amount && (
                            <span className="text-xs font-medium text-green-600">{activity.amount}</span>
                          )}
                          {activity.rating && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < activity.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Plugins */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold">Top Plugins</h2>
                  <Package className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {topPlugins.map((plugin) => (
                    <div key={plugin.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{plugin.name}</h3>
                        <span className={`text-xs flex items-center gap-1 ${plugin.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          <TrendingUp className={`w-3 h-3 ${plugin.trend === 'down' ? 'rotate-180' : ''}`} />
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{plugin.downloads} downloads</span>
                        <span className="font-medium text-foreground">{plugin.revenue}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium">{plugin.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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