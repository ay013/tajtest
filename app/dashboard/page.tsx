"use client";

import { motion } from "framer-motion";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { useWorkers, usePayments } from "@/hooks/use-api";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { isAdmin } = useAuth();
  const { data: workers, isLoading: workersLoading } = useWorkers();
  const { data: payments, isLoading: paymentsLoading } = usePayments();

  const recentWorkers = workers?.slice(0, 5);
  const recentPayments = payments?.slice(0, 5);

  return (
    <div className="flex flex-col gap-8 pb-20 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isAdmin
            ? "Full administrative access to workforce operations."
            : "View workforce data and submit updates."}
        </p>
      </motion.div>

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Workers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-lg border border-border bg-card"
        >
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-heading text-base font-semibold text-foreground">
              Recent Workers
            </h2>
          </div>
          <div className="divide-y divide-border">
            {workersLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4">
                    <Skeleton className="h-9 w-9 rounded-full bg-accent" />
                    <div className="flex-1">
                      <Skeleton className="mb-1 h-4 w-32 bg-accent" />
                      <Skeleton className="h-3 w-24 bg-accent" />
                    </div>
                  </div>
                ))
              : recentWorkers?.map((worker) => (
                  <div
                    key={worker.id}
                    className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-accent/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                        <span className="text-xs font-medium text-foreground">
                          {worker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {worker.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {worker.position}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        worker.status === "active"
                          ? "default"
                          : worker.status === "on-leave"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        worker.status === "active"
                          ? "border-0 bg-foreground/10 text-foreground"
                          : worker.status === "on-leave"
                            ? "border-border bg-secondary text-muted-foreground"
                            : "border-border text-muted-foreground"
                      }
                    >
                      {worker.status}
                    </Badge>
                  </div>
                ))}
          </div>
        </motion.div>

        {/* Recent Payments */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-lg border border-border bg-card"
        >
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-heading text-base font-semibold text-foreground">
              Recent Payments
            </h2>
          </div>
          <div className="divide-y divide-border">
            {paymentsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4">
                    <div className="flex-1">
                      <Skeleton className="mb-1 h-4 w-32 bg-accent" />
                      <Skeleton className="h-3 w-24 bg-accent" />
                    </div>
                    <Skeleton className="h-6 w-16 bg-accent" />
                  </div>
                ))
              : recentPayments?.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-accent/30"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {payment.workerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.assignedCompany} - {payment.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">
                        ${payment.amount.toLocaleString()}
                      </span>
                      <Badge
                        variant={
                          payment.status === "paid"
                            ? "default"
                            : payment.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          payment.status === "paid"
                            ? "border-0 bg-foreground/10 text-foreground"
                            : payment.status === "pending"
                              ? "border-border bg-secondary text-muted-foreground"
                              : "border-0 bg-destructive/20 text-destructive"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
