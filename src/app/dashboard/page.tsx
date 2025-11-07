"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardContent from "./DashboardContent";
import { createSupabaseBrowser } from "@/lib/supabase";
import { getAllDashboardData } from "@/lib/queries/dashboard";
import type { DashboardStats, RecentActivity, TopPlugin } from "@/lib/queries/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    stats: DashboardStats;
    activity: RecentActivity[];
    topPlugins: TopPlugin[];
  }>({
    stats: {
      plugin_count: 0,
      total_revenue: 0,
      total_downloads: 0,
      active_users: 0,
      revenue_change_percentage: 0,
      downloads_change_percentage: 0,
    },
    activity: [],
    topPlugins: [],
  });

  useEffect(() => {
    const supabase = createSupabaseBrowser();

    // Check authentication
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error || !user) {
        router.push("/auth");
        return;
      }

      // Fetch dashboard data
      getAllDashboardData(user.id)
        .then(data => {
          setDashboardData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to load dashboard data:', error);
          setLoading(false);
        });
    });
  }, [router]);

  if (loading) {
    return <DashboardLoadingState />;
  }

  return (
    <DashboardContent
      initialStats={dashboardData.stats}
      initialActivity={dashboardData.activity}
      initialTopPlugins={dashboardData.topPlugins}
    />
  );
}

function DashboardLoadingState() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex">
        <main className="flex-1 bg-background-secondary/50 lg:ml-72">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
              <div className="h-10 bg-muted rounded w-48 mb-2 animate-pulse" />
              <div className="h-4 bg-muted rounded w-96 animate-pulse" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-6 h-32 animate-pulse">
                  <div className="h-6 bg-muted rounded w-16 mb-4" />
                  <div className="h-8 bg-muted rounded w-24" />
                </div>
              ))}
            </div>

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 h-96 animate-pulse" />
              <div className="bg-card rounded-2xl border border-border p-6 h-96 animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
