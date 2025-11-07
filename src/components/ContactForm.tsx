"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Contact form submission:", data);

    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background-secondary" id="contact">
      <div className="container max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 mb-4">
            <Mail className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Get in Touch</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-3 sm:mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Have a question or want to work together? Send us a message.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-12">
          {isSubmitted && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-sm font-medium text-green-500">
                Thank you! Your message has been received.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={6}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                placeholder="Tell us about your project or inquiry..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-gradient-purple-coral px-8 text-base font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
