"use client";

import { motion } from "framer-motion";
import { Users, Building2, CreditCard, DollarSign } from "lucide-react";
import { useDashboardStats } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCards() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-lg bg-card" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Total Workers",
      value: stats?.totalWorkers ?? 0,
      icon: Users,
      format: (v: number) => v.toString(),
    },
    {
      label: "Active Companies",
      value: stats?.activeCompanies ?? 0,
      icon: Building2,
      format: (v: number) => v.toString(),
    },
    {
      label: "Pending Payments",
      value: stats?.pendingPayments ?? 0,
      icon: CreditCard,
      format: (v: number) => v.toString(),
    },
    {
      label: "Total Revenue",
      value: stats?.totalRevenue ?? 0,
      icon: DollarSign,
      format: (v: number) =>
        `$${v.toLocaleString("en-US", { minimumFractionDigits: 0 })}`,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:border-foreground/20"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-3 font-heading text-2xl font-bold text-foreground">
            {card.format(card.value)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
