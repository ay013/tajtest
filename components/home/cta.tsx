"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">
              Ready to transform your workforce operations?
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Join hundreds of enterprises already managing their deployed
            workforce with WorkForce Pro.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Start Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-accent bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
