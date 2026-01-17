"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2  border border-brand-green/30 rounded-full text-brand-green text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
            Join The Movement
          </span>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold uppercase mb-4 sm:mb-6">
            Be Part of the
            <br />
            <span className="text-brand-green">Future</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl   max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Sign up for early access to exclusive drops, limited editions, and
            behind-the-scenes content.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-white/5 border-brand-green/20 focus:border-brand-green/60 text-white placeholder:text-gray-500"
          />
          <Button
            type="submit"
            variant="solid"
            size="md"
            className="group px-8 py-4 bg-brand-green text-white font-heading uppercase tracking-wider hover:bg-brand-green/80 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Subscribe
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-500"
        >
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </motion.p>
      </div>
    </section>
  );
}
