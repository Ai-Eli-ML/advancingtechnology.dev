"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import Sidebar from "@/components/Sidebar";
import {
  DollarSign,
  Download,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  FileDown,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getAnalyticsData } from "@/lib/actions/dashboard";
import { toast } from "sonner";

interface AnalyticsData {
  revenue: {
    total: number;
    trend: number;
    daily: Array<{ date: string; value: number }>;
  };
  downloads: {
    total: number;
    trend: number;
    daily: Array<{ date: string; value: number }>;
  };
  users: {
    total: number;
    trend: number;
    daily: Array<{ date: string; value: number }>;
  };
  topPlugins: Array<{
    id: number;
    name: string;
    downloads: number;
    revenue: number;
    rating: number;
    trend: number;
  }>;
}

export default function AnalyticsPage() {
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAnalyticsData = async () => {
    setLoading(true);
    const result = await getAnalyticsData(timeRange);

    if (result.success && result.data) {
      setData(result.data);
    } else {
      toast.error("Failed to load analytics data");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  const exportToCSV = () => {
    if (!data) return;

    const csvContent = [
      ["Date", "Revenue", "Downloads", "Users"],
      ...data.revenue.daily.map((item, index) => [
        item.date,
        item.value,
        data.downloads.daily[index].value,
        data.users.daily[index].value,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${timeRange}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Analytics data exported successfully");
  };

  const stats = data
    ? [
        {
          title: "Total Revenue",
          value: `$${data.revenue.total.toLocaleString()}`,
          change: `${data.revenue.trend > 0 ? "+" : ""}${data.revenue.trend}%`,
          trend: data.revenue.trend > 0 ? "up" : "down",
          icon: DollarSign,
          gradient: "from-green-600 to-emerald-600",
          bgGradient:
            "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        },
        {
          title: "Total Downloads",
          value: data.downloads.total.toLocaleString(),
          change: `${data.downloads.trend > 0 ? "+" : ""}${data.downloads.trend}%`,
          trend: data.downloads.trend > 0 ? "up" : "down",
          icon: Download,
          gradient: "from-purple-600 to-pink-600",
          bgGradient:
            "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
        },
        {
          title: "Active Users",
          value: data.users.total.toLocaleString(),
          change: `${data.users.trend > 0 ? "+" : ""}${data.users.trend}%`,
          trend: data.users.trend > 0 ? "up" : "down",
          icon: Users,
          gradient: "from-blue-600 to-indigo-600",
          bgGradient:
            "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
        },
      ]
    : [];

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
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient">
                  Analytics
                </h1>
                <div className="flex items-center gap-2">
                  <Select
                    value={timeRange}
                    onValueChange={(value: "7d" | "30d" | "90d") =>
                      setTimeRange(value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={exportToCSV}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
              <p className="text-foreground-secondary">
                Track your revenue, downloads, and user engagement metrics
              </p>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : data ? (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50 -z-10 rounded-xl`}
                          />
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                            >
                              <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div
                              className={`flex items-center gap-1 text-sm font-semibold ${
                                stat.trend === "up"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {stat.trend === "up" ? (
                                <ArrowUp className="w-4 h-4" />
                              ) : (
                                <ArrowDown className="w-4 h-4" />
                              )}
                              {stat.change}
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold mb-1">
                            {stat.value}
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            {stat.title}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Revenue Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                        <CardDescription>
                          Daily revenue over selected period
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={data.revenue.daily}>
                            <defs>
                              <linearGradient
                                id="colorRevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#10b981"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#10b981"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              }
                            />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => `$${value}`}
                              labelFormatter={(label) =>
                                new Date(label).toLocaleDateString()
                              }
                            />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#10b981"
                              fillOpacity={1}
                              fill="url(#colorRevenue)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Downloads Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Download Trend</CardTitle>
                        <CardDescription>
                          Daily downloads over selected period
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={data.downloads.daily}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              }
                            />
                            <YAxis />
                            <Tooltip
                              labelFormatter={(label) =>
                                new Date(label).toLocaleDateString()
                              }
                            />
                            <Bar dataKey="value" fill="#a855f7" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Top Plugins Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Plugins</CardTitle>
                      <CardDescription>
                        Your best performing plugins ranked by revenue
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Plugin Name</TableHead>
                            <TableHead className="text-right">
                              Downloads
                            </TableHead>
                            <TableHead className="text-right">Revenue</TableHead>
                            <TableHead className="text-right">Rating</TableHead>
                            <TableHead className="text-right">Trend</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.topPlugins.map((plugin) => (
                            <TableRow key={plugin.id}>
                              <TableCell className="font-medium">
                                {plugin.name}
                              </TableCell>
                              <TableCell className="text-right">
                                {plugin.downloads.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">
                                ${plugin.revenue.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">
                                {plugin.rating}
                              </TableCell>
                              <TableCell className="text-right">
                                <span
                                  className={`inline-flex items-center gap-1 ${
                                    plugin.trend > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {plugin.trend > 0 ? (
                                    <TrendingUp className="w-4 h-4" />
                                  ) : (
                                    <TrendingDown className="w-4 h-4" />
                                  )}
                                  {Math.abs(plugin.trend)}%
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No analytics data available</p>
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
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
    </div>
  );
}
