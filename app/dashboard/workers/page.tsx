"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Filter,
} from "lucide-react";
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
import {
  useWorkers,
  useCreateWorker,
  useUpdateWorker,
  useDeleteWorker,
} from "@/hooks/use-api";
import { useAuth } from "@/context/auth-context";
import { WorkerModal } from "@/components/dashboard/worker-modal";
import type { Worker } from "@/lib/types";
import { toast } from "sonner";

export default function WorkersPage() {
  const { isAdmin } = useAuth();
  const { data: workers, isLoading } = useWorkers();
  const createWorker = useCreateWorker();
  const updateWorker = useUpdateWorker();
  const deleteWorker = useDeleteWorker();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );

  const filtered = workers?.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.position.toLowerCase().includes(search.toLowerCase()) ||
      w.assignedCompany.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    if (!isAdmin) {
      toast.error("Only administrators can add workers.");
      return;
    }
    setSelectedWorker(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleEdit = (worker: Worker) => {
    setSelectedWorker(worker);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleView = (worker: Worker) => {
    setSelectedWorker(worker);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleDelete = async (worker: Worker) => {
    if (!isAdmin) {
      toast.error("Only administrators can delete workers.");
      return;
    }
    try {
      await deleteWorker.mutateAsync(worker.id);
      toast.success(`${worker.name} has been removed.`);
    } catch {
      toast.error("Failed to delete worker.");
    }
  };

  const handleSave = async (data: Omit<Worker, "id"> | Worker) => {
    try {
      if (modalMode === "create") {
        await createWorker.mutateAsync(data as Omit<Worker, "id">);
        toast.success("Worker added successfully.");
      } else {
        await updateWorker.mutateAsync(data as Worker);
        toast.success("Worker updated successfully.");
      }
      setModalOpen(false);
    } catch {
      toast.error("Operation failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-20 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Workers
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isAdmin
              ? "Manage all workers, assignments, and deployment details."
              : "View workers and their deployment details."}
          </p>
        </div>
        {isAdmin && (
          <Button
            onClick={handleAdd}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Worker
          </Button>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search workers, positions, or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] border-border bg-card text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-foreground">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Workers Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="overflow-hidden rounded-lg border border-border bg-card"
      >
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Worker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Salary
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-9 w-9 rounded-full bg-accent" />
                          <div>
                            <Skeleton className="mb-1 h-4 w-28 bg-accent" />
                            <Skeleton className="h-3 w-36 bg-accent" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-24 bg-accent" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-28 bg-accent" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-6 w-16 bg-accent" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-16 bg-accent" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="ml-auto h-8 w-24 bg-accent" />
                      </td>
                    </tr>
                  ))
                : filtered?.map((worker) => (
                    <tr
                      key={worker.id}
                      className="transition-colors hover:bg-accent/20"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
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
                              {worker.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {worker.position}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {worker.assignedCompany}
                      </td>
                      <td className="px-6 py-4">
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
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        ${worker.salary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(worker)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="View worker"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(worker)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Edit worker"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(worker)}
                                className="text-muted-foreground hover:text-destructive"
                                aria-label="Delete worker"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col divide-y divide-border md:hidden">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4">
                  <Skeleton className="mb-2 h-5 w-32 bg-accent" />
                  <Skeleton className="mb-1 h-4 w-48 bg-accent" />
                  <Skeleton className="h-4 w-24 bg-accent" />
                </div>
              ))
            : filtered?.map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
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
                        {worker.position} at {worker.assignedCompany}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            worker.status === "active"
                              ? "border-0 bg-foreground/10 text-foreground"
                              : "border-border text-muted-foreground"
                          }
                        >
                          {worker.status}
                        </Badge>
                        <span className="text-xs font-medium text-foreground">
                          ${worker.salary.toLocaleString()}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(worker)}
                      className="text-muted-foreground"
                      aria-label="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(worker)}
                        className="text-muted-foreground"
                        aria-label="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
        </div>

        {filtered?.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-sm text-muted-foreground">
              No workers found matching your criteria.
            </p>
          </div>
        )}
      </motion.div>

      <WorkerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        worker={selectedWorker}
        isAdmin={isAdmin}
        mode={modalMode}
      />
    </div>
  );
}
