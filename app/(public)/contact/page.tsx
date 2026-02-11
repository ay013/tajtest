"use client";

import React from "react"

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@workforcepro.com",
    href: "mailto:contact@workforcepro.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 000-1234",
    href: "tel:+15550001234",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "350 Fifth Avenue, New York, NY 10118",
    href: "#",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success("Message sent successfully. We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

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
              Contact
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              <span className="text-balance">
                {"Let's start a conversation"}
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Have questions about workforce management? Need a custom solution
              for your enterprise? Our team is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company" className="text-foreground">
                    Company
                  </Label>
                  <Input
                    id="company"
                    placeholder="Your Company Inc."
                    className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your workforce needs..."
                    rows={5}
                    required
                    className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Get in touch
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Reach out through any of the channels below. Our team
                  typically responds within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent transition-colors group-hover:bg-foreground/10">
                      <item.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex h-64 items-center justify-center bg-accent/30">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      350 Fifth Avenue, New York
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Empire State Building, Floor 72
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
