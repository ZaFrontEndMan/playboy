'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface KineticTextProps {
  children: string;
  className?: string;
}

export default function KineticText({ children, className = '' }: KineticTextProps) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  const skewX = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastTime.current;

      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      setScrollVelocity(velocity * 10); // Amplify for visibility

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;

      skewX.set(velocity * -0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [skewX]);

  return (
    <motion.div
      style={{ skewX }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

