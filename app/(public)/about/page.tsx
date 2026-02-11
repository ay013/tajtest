"use client";

import { motion } from "framer-motion";
import { Target, Eye, Zap, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every deployment is carefully matched. We ensure the right talent reaches the right organization at the right time.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Full visibility into operations, payments, and performance. No hidden fees, no surprises. Complete financial clarity.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "Streamlined processes that eliminate redundancy. Automated payment workflows and intelligent worker assignment.",
  },
  {
    icon: Users,
    title: "People First",
    description:
      "Workers are our core asset. We ensure fair compensation, professional growth, and workplace satisfaction.",
  },
];

const stats = [
  { value: "8+", label: "Years in Operation" },
  { value: "200+", label: "Client Companies" },
  { value: "2,500+", label: "Workers Managed" },
  { value: "15", label: "Countries Served" },
];

const team = [
  {
    name: "Alexander Mitchell",
    role: "Chief Executive Officer",
    bio: "15+ years in workforce management and enterprise operations.",
  },
  {
    name: "Victoria Chang",
    role: "Chief Operations Officer",
    bio: "Former VP of Operations at a Fortune 500 staffing firm.",
  },
  {
    name: "Marcus Rivera",
    role: "Chief Technology Officer",
    bio: "Built scalable platforms serving millions of transactions.",
  },
  {
    name: "Sarah Blackwell",
    role: "Head of Client Relations",
    bio: "Decade of experience in enterprise client management.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              About Us
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              <span className="text-balance">
                Building the future of workforce deployment
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              WorkForce Pro was founded with a singular mission: to
              revolutionize how companies hire, deploy, and manage talent across
              organizations. We bridge the gap between skilled professionals and
              the companies that need them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Our Values
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">
              What drives us
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20"
              >
                <value.icon className="mb-4 h-6 w-6 text-foreground" />
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-border bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Leadership
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">
              Meet our team
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-lg border border-border bg-background p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <span className="text-sm font-bold text-foreground">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
