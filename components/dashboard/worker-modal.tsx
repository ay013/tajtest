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
import type { Worker } from "@/lib/types";

interface WorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (worker: Omit<Worker, "id"> | Worker) => void;
  worker?: Worker | null;
  isAdmin: boolean;
  mode: "create" | "edit" | "view";
}

const emptyWorker: Omit<Worker, "id"> = {
  name: "",
  email: "",
  phone: "",
  position: "",
  assignedCompany: "",
  status: "active",
  joinDate: new Date().toISOString().split("T")[0],
  salary: 0,
  skills: [],
};

export function WorkerModal({
  isOpen,
  onClose,
  onSave,
  worker,
  isAdmin,
  mode,
}: WorkerModalProps) {
  const [formData, setFormData] = useState<Omit<Worker, "id"> | Worker>(
    worker ?? emptyWorker
  );
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (worker) {
      setFormData(worker);
    } else {
      setFormData(emptyWorker);
    }
    setSkillInput("");
  }, [worker, isOpen]);

  const isReadOnly = mode === "view" || (!isAdmin && mode === "edit");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
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
            className="mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-foreground">
                {mode === "create"
                  ? "Add Worker"
                  : mode === "edit"
                    ? "Edit Worker"
                    : "Worker Details"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Full Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isReadOnly}
                    required
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isReadOnly}
                    required
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={isReadOnly}
                    required
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Position</Label>
                  <Input
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    disabled={isReadOnly}
                    required
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Assigned Company</Label>
                  <Input
                    value={formData.assignedCompany}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedCompany: e.target.value,
                      })
                    }
                    disabled={isReadOnly}
                    required
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive" | "on-leave") =>
                      setFormData({ ...formData, status: value })
                    }
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="border-border bg-background text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-card text-foreground">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Join Date</Label>
                  <Input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) =>
                      setFormData({ ...formData, joinDate: e.target.value })
                    }
                    disabled={isReadOnly}
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">Salary ($/month)</Label>
                  <Input
                    type="number"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salary: Number(e.target.value),
                      })
                    }
                    disabled={isReadOnly}
                    required
                    className="border-border bg-background text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 rounded-md bg-accent px-2.5 py-1 text-xs text-foreground"
                    >
                      {skill}
                      {!isReadOnly && (
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-1 text-muted-foreground hover:text-foreground"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {!isReadOnly && (
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill..."
                      className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSkill}
                      className="shrink-0 border-border text-foreground hover:bg-accent bg-transparent"
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>

              {/* Actions */}
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
                    {mode === "create" ? "Add Worker" : "Save Changes"}
                  </Button>
                )}
                {!isAdmin && mode === "edit" && (
                  <p className="self-center text-xs text-muted-foreground">
                    Editing restricted to administrators.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
