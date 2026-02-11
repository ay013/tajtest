"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Edit2, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayments, useUpdatePayment } from "@/hooks/use-api";
import { useAuth } from "@/context/auth-context";
import type { Payment } from "@/lib/types";
import { toast } from "sonner";
import { PaymentModal } from "@/components/dashboard/payment-modal";

export default function PaymentsPage() {
  const { isAdmin } = useAuth();
  const { data: payments, isLoading } = usePayments();
  const updatePayment = useUpdatePayment();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "view">("view");

  const filtered = payments?.filter((p) => {
    const matchesSearch =
      p.workerName.toLowerCase().includes(search.toLowerCase()) ||
      p.assignedCompany.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter;
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalAmount =
    filtered?.reduce((sum, p) => sum + p.amount, 0) ?? 0;
  const paidAmount =
    filtered
      ?.filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0) ?? 0;
  const pendingAmount =
    filtered
      ?.filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0) ?? 0;

  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleEdit = (payment: Payment) => {
    if (!isAdmin) {
      toast.error("Only administrators can edit payments.");
      return;
    }
    setSelectedPayment(payment);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleMarkPaid = async (payment: Payment) => {
    if (!isAdmin) {
      toast.error("Only administrators can update payment status.");
      return;
    }
    try {
      await updatePayment.mutateAsync({ ...payment, status: "paid" });
      toast.success(`Payment for ${payment.workerName} marked as paid.`);
    } catch {
      toast.error("Failed to update payment status.");
    }
  };

  const handleSave = async (data: Payment) => {
    try {
      await updatePayment.mutateAsync(data);
      toast.success("Payment updated successfully.");
      setModalOpen(false);
    } catch {
      toast.error("Failed to update payment.");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-20 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Payments
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isAdmin
            ? "Manage all payment records and update statuses."
            : "View payment records for deployed workers."}
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total
          </p>
          <p className="mt-1 font-heading text-xl font-bold text-foreground">
            ${totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Paid
          </p>
          <p className="mt-1 font-heading text-xl font-bold text-foreground">
            ${paidAmount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Pending
          </p>
          <p className="mt-1 font-heading text-xl font-bold text-foreground">
            ${pendingAmount.toLocaleString()}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by worker or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] border-border bg-card text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-foreground">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] border-border bg-card text-foreground">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-foreground">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="bonus">Bonus</SelectItem>
              <SelectItem value="reimbursement">Reimbursement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="overflow-hidden rounded-lg border border-border bg-card"
      >
        {/* Desktop */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Worker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <Skeleton className="h-4 w-20 bg-accent" />
                        </td>
                      ))}
                    </tr>
                  ))
                : filtered?.map((payment) => (
                    <tr
                      key={payment.id}
                      className="transition-colors hover:bg-accent/20"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {payment.workerName}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {payment.assignedCompany}
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-sm text-foreground">
                          {payment.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        ${payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
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
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(payment)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="View payment"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(payment)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Edit payment"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              {payment.status !== "paid" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkPaid(payment)}
                                  className="text-muted-foreground hover:text-foreground"
                                  aria-label="Mark as paid"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="flex flex-col divide-y divide-border md:hidden">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4">
                  <Skeleton className="mb-2 h-5 w-32 bg-accent" />
                  <Skeleton className="h-4 w-48 bg-accent" />
                </div>
              ))
            : filtered?.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {payment.workerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.assignedCompany} - {payment.type}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        ${payment.amount.toLocaleString()}
                      </span>
                      <Badge
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
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(payment)}
                      className="text-muted-foreground"
                      aria-label="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {isAdmin && payment.status !== "paid" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkPaid(payment)}
                        className="text-muted-foreground"
                        aria-label="Mark paid"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
        </div>

        {filtered?.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-sm text-muted-foreground">
              No payments found matching your criteria.
            </p>
          </div>
        )}
      </motion.div>

      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        payment={selectedPayment}
        isAdmin={isAdmin}
        mode={modalMode}
      />
    </div>
  );
}
