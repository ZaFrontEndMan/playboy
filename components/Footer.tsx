"use client";

import { Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-3 sm:mb-4">
              <Logo forcePink={true} size="lg" />
            </div>
            <p className="  max-w-md mb-4 sm:mb-6 text-sm sm:text-base">
              Redefining streetwear for the digital age. Premium quality,
              limited drops, infinite possibilities.
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                href="#"
                className="hover:opacity-80 transition-opacity"
                title="Instagram"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Instagram className="w-6 h-6 text-brand-pink" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:opacity-80 transition-opacity"
                title="Twitter"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Twitter className="w-6 h-6 text-brand-pink" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:opacity-80 transition-opacity"
                title="YouTube"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Youtube className="w-6 h-6 text-brand-pink" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:block">
            <h4 className="font-heading text-base md:text-lg font-semibold uppercase mb-3 md:mb-4">
              Shop
            </h4>
            <ul className="space-y-2   text-sm md:text-base">
              <li>
                <a
                  href="/new-arrivals"
                  className="hover:text-brand-green transition-colors"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="/bestsellers"
                  className="hover:text-brand-green transition-colors"
                >
                  Bestsellers
                </a>
              </li>
              <li>
                <a
                  href="/collection"
                  className="hover:text-brand-green transition-colors"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="/sale"
                  className="hover:text-brand-green transition-colors"
                >
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-heading text-base md:text-lg font-semibold uppercase mb-3 md:mb-4">
              Support
            </h4>
            <ul className="space-y-2   text-sm md:text-base">
              <li>
                <a
                  href="/contact"
                  className="hover:text-brand-green transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-brand-green transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="hover:text-brand-green transition-colors"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="hover:text-brand-green transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-brand-green/20 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            © 2025 FUTUREWEAR. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 text-center">
            <a href="#" className="hover:text-brand-green transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-green transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
