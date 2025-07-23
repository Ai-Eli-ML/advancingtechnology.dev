"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  href: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out the platform",
    features: [
      "Access to free plugins",
      "Basic support",
      "Community forum access",
      "1 deployment",
    ],
    cta: "Get Started",
    href: "/auth?mode=signup",
  },
  {
    name: "Pro",
    price: "$19",
    description: "Everything you need to scale",
    features: [
      "All Starter features",
      "Unlimited deployments",
      "Premium plugins access",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
    ],
    highlighted: true,
    cta: "Start Free Trial",
    href: "/auth?mode=signup&plan=pro",
  },
  {
    name: "Enterprise",
    price: "Contact",
    description: "Custom solutions for large teams",
    features: [
      "All Pro features",
      "Custom plugin development",
      "Dedicated support",
      "SLA guarantees",
      "Security compliance",
      "Team training",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

const PricingTable = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-cream/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Always flexible to scale up or down.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "relative rounded-lg border border-gold/30 bg-cream p-8 shadow-sm transition-all hover:shadow-md hover:border-gold",
                  tier.highlighted && "border-gold shadow-xl scale-105 bg-gradient-to-br from-cream to-gold/10"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.price !== "Free" && tier.price !== "Contact" && (
                      <span className="text-blue-dark/70">/month</span>
                    )}
                  </div>
                  <p className="text-sm text-blue-dark/70">{tier.description}</p>
                </div>

                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 shrink-0 text-blue" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={cn(
                    "block w-full rounded-md px-4 py-3 text-center text-sm font-medium transition-colors",
                    tier.highlighted
                      ? "bg-blue text-white hover:bg-blue-dark shadow-lg"
                      : "bg-transparent border border-blue text-blue hover:bg-blue hover:text-white"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-blue-dark/70">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;