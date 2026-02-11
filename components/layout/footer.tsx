"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Platform: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/#" },
  ],
  Legal: [
    { label: "Privacy", href: "/#" },
    { label: "Terms", href: "/#" },
    { label: "Cookies", href: "/#" },
  ],
};

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  WF
                </span>
              </div>
              <span className="font-heading text-lg font-bold text-foreground">
                WorkForce Pro
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Enterprise workforce management. Deploy talent. Manage payments.
              Scale operations.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            2025 WorkForce Pro. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for enterprise workforce management.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
