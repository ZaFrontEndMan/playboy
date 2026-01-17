'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Drop } from '@/types/drop';
import { SaleBadge } from '@/components/ui/SaleBadge';

type CardItem = Product | Drop;

interface UnifiedCardProps {
  item: CardItem;
  description?: boolean;
  type?: 'default' | 'skeleton';
  index?: number;
  href?: string;
}

// Type guard to check if item is a Product
function isProduct(item: CardItem): item is Product {
  return 'category' in item;
}

// Type guard to check if item is a Drop
function isDrop(item: CardItem): item is Drop {
  return 'availability' in item;
}

export default function UnifiedCard({ 
  item, 
  description = false, 
  type = 'default',
  index = 0,
  href 
}: UnifiedCardProps) {
  const categoryLabels = {
    top: 'TOP',
    mid: 'MID',
    bottom: 'BOTTOM',
  };

  // Generate href if not provided
  const cardHref = href || (isProduct(item) ? `/product/${item.id}` : `/drops/${item.id}`);

  // Skeleton loading state
  if (type === 'skeleton') {
    return (
      <div className="group">
        <div className="relative aspect-3/4 mb-4 overflow-hidden bg-transparent animate-pulse">
          <div className="w-full h-full bg-gray-800" />
        </div>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-6 bg-gray-800 rounded mb-2 w-3/4 animate-pulse" />
            {description && (
              <div className="h-4 bg-gray-800 rounded mb-2 w-full animate-pulse" />
            )}
          </div>
          <div className="h-6 bg-gray-800 rounded w-16 ml-4 animate-pulse" />
        </div>
      </div>
    );
  }

  const isProductItem = isProduct(item);
  const isDropItem = isDrop(item);
  const isAvailable = isDropItem && item.availability === 'avail';
  const isOnSale = isProductItem && item.isOnSale === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link 
        href={cardHref}
      >
        <div className="relative aspect-3/4 mb-4 overflow-hidden bg-transparent">
          {/* Image with shake animation on hover */}
          <motion.div
            className="relative w-full h-full"
            whileHover={{
              x: [0, -3, 3, -3, 3, 0],
              y: [0, 2, -2, 2, -2, 0],
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Badges */}
          {isProductItem && (
            <>
              <div className="absolute top-4 left-4 px-3 py-1">
                <span className="text-xs font-heading font-bold uppercase text-brand-pink">
                  {categoryLabels[item.category]}
                </span>
              </div>
              {/* Sale Badge */}
              {isOnSale && (
                <div className="absolute top-4 right-4">
                  <SaleBadge percentage={item.salePercentage} />
                </div>
              )}
            </>
          )}

          {isDropItem && (
            <>
              {/* Limited badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-heading uppercase ${
                isAvailable 
                  ? 'bg-brand-green text-white' 
                  : 'bg-gray-600 text-white'
              }`}>
                Limited
              </div>

              {/* Availability badge */}
              <div className="absolute top-4 left-4 px-3 py-1">
                <span className={`text-xs font-heading font-bold uppercase ${
                  isAvailable ? 'text-brand-green' : ' '
                }`}>
                  {isAvailable ? 'Available' : 'Coming Soon'}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:justify-between sm:gap-2">
          <div className="flex-1">
            <h3 className="font-heading text-lg sm:text-xl font-semibold uppercase mb-1">
              {item.name}
            </h3>
            {description && isProductItem && (
              <p className="text-xs sm:text-sm   line-clamp-2 mb-2">
                {item.description}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end mt-1 sm:mt-0 sm:ml-4">
            {isOnSale && isProductItem ? (
              <>
                <span className="text-brand-green font-heading font-bold text-lg sm:text-xl">
                  ${item.salePrice}
                </span>
                <span className="text-gray-500 font-heading text-sm line-through">
                  ${item.price}
                </span>
              </>
            ) : (
              <span className="text-brand-green font-heading font-bold text-lg sm:text-xl">
                ${item.price}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

