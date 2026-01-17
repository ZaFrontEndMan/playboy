'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Express shipping worldwide in 2-3 days',
  },
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Crafted with cutting-edge materials',
  },
  {
    icon: Sparkles,
    title: 'Limited Drops',
    description: 'Exclusive releases every season',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 sm:p-8  transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-brand-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-brand-green" />
                  </div>
                  
                  <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="  text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



