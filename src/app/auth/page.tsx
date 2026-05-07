"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createSupabaseBrowser } from "@/lib/supabase";

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSignUp = searchParams.get("mode") === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Validation
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    setLoading(true);

    try {
      const supabase = createSupabaseBrowser();

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { name: formData.name || '' },
          },
        });
        if (error) throw error;
        setSuccess('Account created! Check your email to verify, or try signing in.');
        setFormData({ email: "", password: "", name: "", confirmPassword: "" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    try {
      const supabase = createSupabaseBrowser();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setError(error.message);
      }
    } catch {
      setError('Failed to initiate OAuth login');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold">AT Portal</h1>
          </div>
          <p className="text-muted-foreground">
            {isSignUp ? "Create your contractor account" : "Sign in to your contractor portal"}
          </p>
        </div>

        {/* Error/Success Messages */}
        {(error || success) && (
          <div className={cn(
            "p-4 rounded-lg text-sm font-medium",
            error
              ? "bg-red-50 border border-red-300 text-red-700 dark:bg-red-950/50 dark:border-red-800 dark:text-red-400"
              : "bg-green-50 border border-green-300 text-green-700 dark:bg-green-950/50 dark:border-green-800 dark:text-green-400"
          )}>
            {error || success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Your full name"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              {!isSignUp && (
                <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {isSignUp && (
              <div className="mt-2 space-y-1">
                <div className={cn("text-xs flex items-center gap-2", formData.password.length >= 8 ? "text-green-600" : "text-muted-foreground")}>
                  <Check className={cn("w-3 h-3", formData.password.length >= 8 ? "opacity-100" : "opacity-0")} />
                  At least 8 characters
                </div>
              </div>
            )}
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Confirm your password"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors",
              loading
                ? "bg-primary/50 text-primary-foreground/70 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isSignUp ? "Creating account..." : "Signing in..."}
              </>
            ) : (
              <>
                {isSignUp ? "Create Account" : "Sign In"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link href={isSignUp ? "/auth" : "/auth?mode=signup"} className="text-primary font-medium hover:underline">
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>

        {isSignUp && (
          <p className="text-center text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Advancing Technology LLC
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-primary/20 rounded-full"></div>
        </div>
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}