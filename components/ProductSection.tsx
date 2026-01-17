"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import UnifiedCard from "@/components/UnifiedCard";
import { useProducts } from "@/hooks/useProducts";

export default function ProductSection() {
  // Fetch products using React Query hook
  const { data, isLoading } = useProducts({ limit: 6 });
  const products = data?.products || [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    skipSnaps: false,
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, products]);

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-12 mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold uppercase mb-2 md:mb-4"
          >
            Latest <span className="text-brand-green">Collection</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="  text-sm sm:text-base md:text-lg"
          >
            Drop 01 — Winter 2025
          </motion.p>
        </div>
        <div className="relative px-2 sm:px-4">
          <div className="flex gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="shrink-0 basis-[75%] sm:basis-1/2 lg:basis-1/3"
              >
                <UnifiedCard 
                  item={{} as any} 
                  index={index}
                  description={false}
                  type="skeleton"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-12 mb-8 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold uppercase mb-2 md:mb-4"
        >
          Latest <span className="text-brand-green">Collection</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="  text-sm sm:text-base md:text-lg"
        >
          Drop 01 — Winter 2025
        </motion.p>
      </div>

      <div className="relative px-2 sm:px-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="shrink-0 basis-[75%] sm:basis-1/2 lg:basis-1/3"
              >
                <UnifiedCard 
                  item={product} 
                  index={index}
                  description={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
