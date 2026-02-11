"use client";

import React from "react"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Payment } from "@/lib/types";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payment: Payment) => void;
  payment: Payment | null;
  isAdmin: boolean;
  mode: "edit" | "view";
}

export function PaymentModal({
  isOpen,
  onClose,
  onSave,
  payment,
  isAdmin,
  mode,
}: PaymentModalProps) {
  const [formData, setFormData] = useState<Payment | null>(payment);

  useEffect(() => {
    setFormData(payment);
  }, [payment, isOpen]);

  if (!formData) return null;

  const isReadOnly = mode === "view" || !isAdmin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mx-4 w-full max-w-md rounded-lg border border-border bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-foreground">
                {mode === "edit" ? "Edit Payment" : "Payment Details"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Worker</Label>
                <Input
                  value={formData.workerName}
                  disabled
                  className="border-border bg-background text-foreground disabled:opacity-60"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Amount ($)</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: Number(e.target.value),
                      })
                    }
                    disabled={isReadOnly}
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(
                      value: "salary" | "bonus" | "reimbursement"
                    ) => setFormData({ ...formData, type: value })}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="border-border bg-background text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-card text-foreground">
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="bonus">Bonus</SelectItem>
                      <SelectItem value="reimbursement">
                        Reimbursement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(
                      value: "paid" | "pending" | "overdue"
                    ) => setFormData({ ...formData, status: value })}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="border-border bg-background text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-card text-foreground">
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    disabled={isReadOnly}
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Company</Label>
                <Input
                  value={formData.assignedCompany}
                  disabled
                  className="border-border bg-background text-foreground disabled:opacity-60"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="border-border text-foreground hover:bg-accent bg-transparent"
                >
                  {isReadOnly ? "Close" : "Cancel"}
                </Button>
                {!isReadOnly && (
                  <Button
                    type="submit"
                    className="bg-foreground text-background hover:bg-foreground/90"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
