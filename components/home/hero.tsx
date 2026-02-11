"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(0_0%_4%)_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                Trusted by 200+ companies worldwide
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">
                Deploy talent.
                <br />
                Manage with
                <br />
                precision.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              The enterprise platform for hiring, deploying, and managing your
              workforce across client companies. End-to-end payment management
              included.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-accent bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                icon: Users,
                stat: "2,500+",
                label: "Workers Managed",
                desc: "Active workforce deployed across clients",
              },
              {
                icon: Building2,
                stat: "200+",
                label: "Client Companies",
                desc: "Enterprises trust our platform",
              },
              {
                icon: Shield,
                stat: "99.9%",
                label: "Uptime",
                desc: "Reliable infrastructure always on",
              },
              {
                icon: ArrowRight,
                stat: "$4.2M",
                label: "Processed Monthly",
                desc: "Seamless payment processing",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20 hover:bg-accent/50"
              >
                <item.icon className="mb-3 h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                <p className="font-heading text-2xl font-bold text-foreground">
                  {item.stat}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
