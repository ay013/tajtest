"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Onboard Workers",
    description:
      "Add workers to the platform with their skills, certifications, and preferences. Build a comprehensive talent pool.",
  },
  {
    step: "02",
    title: "Deploy to Clients",
    description:
      "Match and assign workers to client companies based on requirements. Manage contracts and assignments seamlessly.",
  },
  {
    step: "03",
    title: "Manage Payments",
    description:
      "Automate salary processing, track bonuses, and handle reimbursements. Complete financial transparency.",
  },
  {
    step: "04",
    title: "Monitor & Scale",
    description:
      "Track performance metrics, optimize deployments, and scale your workforce operations with data-driven insights.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-border bg-card py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Process
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">How it works</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="font-heading text-5xl font-bold text-accent">
                {item.step}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-8 bg-border lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
