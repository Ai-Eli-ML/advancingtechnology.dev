"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ChatDrawer from "@/components/ChatDrawer";
import { Mail, Lock, User, Eye, EyeOff, Github, Chrome, Sparkles, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function AuthForm() {
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
    <div className="min-h-screen bg-gradient-to-b from-background via-background-secondary/20 to-background flex flex-col">
      <NavigationBar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-border/50 p-8 hover:shadow-3xl transition-shadow duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold mb-2 text-gradient">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-foreground-secondary">
                {isSignUp 
                  ? "Join the AI revolution today" 
                  : "Continue your journey with us"}
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-border rounded-xl hover:bg-muted hover:border-primary/30 transition-all duration-200 group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Continue with GitHub</span>
                <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-border rounded-xl hover:bg-muted hover:border-primary/30 transition-all duration-200 group"
              >
                <Chrome className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Continue with Google</span>
                <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card/80 backdrop-blur-sm text-muted-foreground rounded-full">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-foreground">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input pl-11 pr-4 py-3.5 w-full"
                      placeholder="Enter your full name"
                      required={isSignUp}
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-foreground">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input pl-11 pr-4 py-3.5 w-full"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                    Password
                  </label>
                  {!isSignUp && (
                    <Link href="/auth/reset-password" className="text-xs text-primary hover:text-primary-dark transition-colors">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input pl-11 pr-12 py-3.5 w-full"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {isSignUp && (
                  <div className="mt-2 space-y-1">
                    <div className={cn(
                      "text-xs flex items-center gap-2 transition-colors",
                      formData.password.length >= 8 ? "text-green-600" : "text-muted-foreground"
                    )}>
                      <Check className={cn(
                        "w-3 h-3",
                        formData.password.length >= 8 ? "opacity-100" : "opacity-0"
                      )} />
                      At least 8 characters
                    </div>
                    <div className={cn(
                      "text-xs flex items-center gap-2 transition-colors",
                      /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? "text-green-600" : "text-muted-foreground"
                    )}>
                      <Check className={cn(
                        "w-3 h-3",
                        /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? "opacity-100" : "opacity-0"
                      )} />
                      Mix of uppercase & lowercase
                    </div>
                  </div>
                )}
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
        </motion.div>
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