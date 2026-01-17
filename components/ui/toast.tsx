'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-black/95 border border-brand-green/50 rounded-lg px-6 py-4 shadow-2xl backdrop-blur-sm min-w-[280px] pointer-events-auto"
            style={{
              boxShadow: '0 8px 32px rgba(5, 120, 58, 0.3)',
            }}
          >
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(5, 120, 58, 0.4) 0%, transparent 70%)',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  width: ['0px', '400px'],
                  height: ['0px', '400px'],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              />
            </motion.div>

            <div className="relative flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
              </motion.div>
              <p className="text-white font-heading text-sm uppercase tracking-wider">
                {message}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

