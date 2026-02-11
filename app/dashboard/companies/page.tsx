"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Building2, Users, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompanies } from "@/hooks/use-api";
import { useAuth } from "@/context/auth-context";

export default function CompaniesPage() {
  const { isAdmin } = useAuth();
  const { data: companies, isLoading } = useCompanies();
  const [search, setSearch] = useState("");

  const filtered = companies?.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 pb-20 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Client Companies
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isAdmin
            ? "Manage client companies where workers are deployed."
            : "View client companies and their deployment details."}
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search companies or industries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </motion.div>

      {/* Company Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[200px] rounded-lg bg-card"
              />
            ))
          : filtered?.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent transition-colors group-hover:bg-foreground/10">
                    <Building2 className="h-5 w-5 text-foreground" />
                  </div>
                  <Badge
                    className={
                      company.status === "active"
                        ? "border-0 bg-foreground/10 text-foreground"
                        : "border-border text-muted-foreground"
                    }
                  >
                    {company.status}
                  </Badge>
                </div>

                <h3 className="font-heading text-base font-semibold text-foreground">
                  {company.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {company.industry}
                </p>

                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>
                      {company.workersAssigned} workers deployed
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{company.contactPerson}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {company.email}
                  </p>
                </div>
              </motion.div>
            ))}
      </div>

      {filtered?.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-sm text-muted-foreground">
            No companies found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
