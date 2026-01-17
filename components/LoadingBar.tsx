"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function LoadingBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;

    // Defer state updates to prevent synchronous setState warning
    setTimeout(() => {
      setLoading(true);
      setProgress(0);
    }, 0);

    prevPathnameRef.current = pathname;

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 8; // smoother progress
      if (current >= 92) {
        current = 92;
        clearInterval(interval);
      }
      setProgress(current);
    }, 80);

    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 400);
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-transparent pointer-events-none"
        >
          <motion.div
            className="h-full bg-brand-pink shadow-[0_0_12px_rgba(5,120,58,0.7)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            exit={{ width: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}