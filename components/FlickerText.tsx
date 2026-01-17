'use client';

import { motion } from 'framer-motion';

interface FlickerTextProps {
  children: string;
  className?: string;
}

export default function FlickerText({ children, className = '' }: FlickerTextProps) {
  // Random flicker animation like a broken lamp
  const flickerVariants = {
    normal: { opacity: 1 },
    flicker: {
      opacity: [1, 0.3, 1, 0.5, 1, 0.2, 1, 0.8, 1],
      transition: {
        duration: 0.15,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      animate="flicker"
      variants={flickerVariants}
      transition={{
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2, // Random delay between 2-5 seconds
        delay: Math.random() * 2, // Random initial delay
      }}
    >
      {children}
    </motion.span>
  );
}



