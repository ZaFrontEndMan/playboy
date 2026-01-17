"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider"; // ← your theme provider

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  forcePink?: boolean; // optional: force pink logo regardless of theme
}

export default function Logo({
  className = "",
  size = "md",
  priority = false,
  forcePink = false,
}: LogoProps) {
  const { theme } = useTheme(); // Get current theme ('dark' | 'light' | custom)

  // Decide which logo to show
  // 1. If forcePink = true → always pink
  // 2. If theme includes pink accent or custom logic → pink
  // 3. Default → green
  const logoSrc = forcePink || theme?.includes("pink")
    ? "/logo-pink.png"
    : "/logo.png";

  const altText = forcePink || theme?.includes("pink")
    ? "Future Wear Pink Logo"
    : "Future Wear Green Logo";

  const sizeClasses = {
    sm: "w-10 h-10 sm:w-12 sm:h-12",
    md: "w-14 h-14 sm:w-16 sm:h-16",
    lg: "w-20 h-20 sm:w-24 sm:h-24",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <motion.div
        className={`relative ${sizeClasses[size]} flex-shrink-0`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Image
          src={logoSrc}
          alt={altText}
          fill
          className="object-contain w-full"
          priority={priority}
          quality={90}
          // Optional: better responsive sizes
          sizes="(max-width: 768px) 64px, 96px"
        />
      </motion.div>


    </Link>
  );
}