"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Shield, ArrowRight } from "lucide-react";

export default function HomePage() {
  const { user, loading, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <Shield className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold">AT Portal</h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Advancing Technology</h2>
          <p className="text-muted-foreground">
            Contractor Portal — Task management, daily reporting, and collaboration.
          </p>
        </div>

        {/* CTA */}
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : user ? (
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Admin Panel <Shield className="w-4 h-4" />
              </Link>
            )}
          </div>
        ) : (
          <Link
            href="/auth"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        <p className="text-xs text-muted-foreground">
          Advancing Technology LLC
        </p>
      </div>
    </div>
  );
}
