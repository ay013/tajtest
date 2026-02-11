"use client";

import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  Building2,
  BarChart3,
  Shield,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Worker Management",
    description:
      "Complete lifecycle management from onboarding to deployment. Track skills, assignments, and performance in real-time.",
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description:
      "Automated salary disbursement, bonus management, and reimbursement tracking. Never miss a payment deadline.",
  },
  {
    icon: Building2,
    title: "Client Deployment",
    description:
      "Seamlessly deploy workers to client companies. Manage multi-company assignments with role-based access controls.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Real-time insights into workforce utilization, revenue metrics, and operational efficiency across all deployments.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Granular permission controls. Admins manage everything, employees view and submit. Enterprise-grade security.",
  },
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description:
      "Monitor worker status, attendance, and project progress in real-time. Instant notifications for critical updates.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Platform Capabilities
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">
              Everything you need to manage your workforce
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A complete suite of tools designed for enterprises that deploy and
            manage talent across multiple client organizations.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20 hover:bg-accent/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent transition-colors group-hover:bg-foreground/10">
                <feature.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
