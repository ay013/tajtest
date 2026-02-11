"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      toast.success("Welcome back. Redirecting to dashboard...");
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden flex-col justify-between border-r border-border bg-card p-12 lg:flex lg:w-1/2"
      >
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                WF
              </span>
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              WorkForce Pro
            </span>
          </Link>
        </div>

        <div>
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground xl:text-5xl">
            <span className="text-balance">
              Manage your workforce with precision
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Access your dashboard to manage workers, track payments, and oversee
            deployments across all client companies.
          </p>

          <div className="mt-12 flex flex-col gap-4">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Admin Access
              </p>
              <p className="mt-1 text-sm text-foreground">
                admin@workforce.com / admin123
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Employee Access
              </p>
              <p className="mt-1 text-sm text-foreground">
                employee@workforce.com / employee123
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Enterprise-grade security. SOC 2 compliant.
        </p>
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20"
      >
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Mobile branding */}
        <div className="mb-8 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                WF
              </span>
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              WorkForce Pro
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access the dashboard.
          </p>

          {/* Mobile credentials hint */}
          <div className="mt-4 flex flex-col gap-2 lg:hidden">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Admin
              </p>
              <p className="text-xs text-foreground">
                admin@workforce.com / admin123
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Employee
              </p>
              <p className="text-xs text-foreground">
                employee@workforce.com / employee123
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-border bg-card pl-10 pr-10 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
