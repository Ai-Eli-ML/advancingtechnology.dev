"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import { Mail, Lock, User, Eye, EyeOff, Github, Chrome } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-lg border border-border p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">
                {isSignUp ? "Create an account" : "Welcome back"}
              </h1>
              <p className="text-muted-foreground">
                {isSignUp 
                  ? "Start building with AI-powered tools" 
                  : "Sign in to your account to continue"}
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                <Github className="w-5 h-5" />
                <span className="font-medium">Continue with GitHub</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                <Chrome className="w-5 h-5" />
                <span className="font-medium">Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
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
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                      placeholder="John Doe"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
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
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                      placeholder="••••••••"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded border-input" />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:opacity-80">
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Footer Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <Link 
                href={isSignUp ? "/auth" : "/auth?mode=signup"} 
                className="text-primary font-medium hover:opacity-80"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </Link>
            </p>
          </div>

          {/* Terms */}
          {isSignUp && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:opacity-80">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:opacity-80">
                Privacy Policy
              </Link>
            </p>
          )}
        </div>
      </main>

      <Footer />
      {showChatDrawer && <ChatDrawer onClose={() => setShowChatDrawer(false)} />}
      
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChatDrawer(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}