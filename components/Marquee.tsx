"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

// Simple wrap utility (similar to @motionone/utils)
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// Generate delays using index-based pseudo-randomness (deterministic but varied)
const generateDelays = (index: number) => {
  const seed = index * 0.618; // Golden ratio for better distribution
  return {
    repeatDelay: ((seed * 4) % 4) + 2,
    delay: ((seed * 3) % 3),
  };
};

export default function Marquee({ text, reverse = false }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Calculate wrap range based on number of spans (20 spans = 5% per span, wrap between -20% and -45%)
  // This creates seamless looping
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(reverse ? -1 : 1);
  const baseVelocity = reverse ? -5 : 5;

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Change direction based on scroll velocity
    if (velocityFactor.get() < 0) {
      directionFactor.current = reverse ? 1 : -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = reverse ? -1 : 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  // Flicker effect for random text elements
  const flickerVariants = {
    normal: { opacity: 1 },
    flicker: {
      opacity: [1, 0.3, 1, 0.5, 1, 0.2, 1, 0.8, 1],
      transition: {
        duration: 0.2,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
      },
    },
  };

  return (
    <div className="relative overflow-hidden py-4 sm:py-6 md:py-8 border-y border-brand-green/20 bg-brand-green/5">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold uppercase mx-4 sm:mx-6 md:mx-8 text-brand-green/80"
            animate="flicker"
            variants={flickerVariants}
            transition={{
              repeat: Infinity,
              repeatDelay: generateDelays(i).repeatDelay,
              delay: generateDelays(i).delay,
            }}
          >
            {text}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
