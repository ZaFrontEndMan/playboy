'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Drop } from '@/types/drop';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import Toast from '@/components/ui/toast';

interface DropDetailClientProps {
  drop: Drop;
}

export default function DropDetailClient({ drop }: DropDetailClientProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>(drop.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addItem } = useCartStore();
  const isAvailable = drop.availability === 'avail';

  const handleAddToCart = () => {
    if (!drop || !selectedSize || !isAvailable) return;

    addItem({
      id: drop.id,
      name: drop.name,
      price: drop.price,
      image: drop.image,
      size: selectedSize,
    }, quantity);

    // Show toast notification
    setShowToast(true);
  };

  return (
    <>
    <section className="pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2   hover:text-brand-green transition-colors mb-8 !uppercase !tracking-wider"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-heading">Back</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Drop Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-3/4 overflow-hidden"
          >
            <Image
              src={drop.image}
              alt={drop.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute top-4 left-4  px-3 py-1">
              <span className="text-xs font-heading font-bold uppercase text-brand-green">
                LIMITED EDITION
              </span>
            </div>
            {/* Availability Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 backdrop-blur-sm ${
              isAvailable 
                ? 'bg-brand-green/80 text-white' 
                : 'bg-gray-600/80  '
            }`}>
              <span className="text-xs font-heading font-bold uppercase">
                {isAvailable ? 'Available' : 'Coming Soon'}
              </span>
            </div>
          </motion.div>

          {/* Drop Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold uppercase mb-4">
              {drop.name}
            </h1>

            <p className="text-2xl sm:text-3xl font-heading font-bold text-brand-green mb-6">
              ${drop.price}
            </p>

            <p className="  text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
              {drop.description}
            </p>

            {/* Availability Notice for Coming Soon */}
            {!isAvailable && (
              <div className="mb-6 p-4 border border-brand-green/40 bg-brand-green/10">
                <p className="text-brand-green font-heading uppercase text-sm">
                  This item is coming soon. Stay tuned for the release date.
                </p>
              </div>
            )}

            {/* Size Selection */}
            {drop.sizes.length > 0 && (
              <div className="mb-5">
                <label className="block font-heading text-xs sm:text-sm uppercase tracking-wider mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {drop.sizes.map((size) => (
                    <Button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!isAvailable}
                      variant="ghost"
                      size="sm"
                      className={`px-4 py-2 text-xs sm:text-sm border-2 font-heading uppercase transition-all rounded-md ${
                        !isAvailable
                          ? 'border-gray-600/40 text-gray-600 cursor-not-allowed'
                          : selectedSize === size
                          ? 'border-brand-green bg-brand-green text-white'
                          : 'border-brand-green/40 text-brand-green hover:border-brand-green/60'
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {isAvailable && (
              <div className="mb-7">
                <label className="block font-heading text-xs sm:text-sm uppercase tracking-wider mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    variant="ghost"
                    size="sm"
                    className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-brand-green/40 hover:bg-brand-green/10 flex items-center justify-center transition-colors text-sm sm:text-base !uppercase !tracking-normal px-0"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <span className="font-heading text-xl sm:text-2xl font-bold w-10 sm:w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    variant="ghost"
                    size="sm"
                    className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-brand-green/40 hover:bg-brand-green/10 flex items-center justify-center transition-colors text-sm sm:text-base !uppercase !tracking-normal px-0"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !isAvailable}
              variant="solid"
              size="lg"
              className={`w-full py-3 sm:py-4 text-sm sm:text-base font-heading uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-lg ${
                selectedSize && isAvailable
                  ? 'bg-brand-green text-white hover:bg-brand-green/80'
                  : 'bg-gray-600   cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {isAvailable ? 'Add to Cart' : 'Coming Soon'}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
    <Toast
      message={`${drop.name} added to cart!`}
      isVisible={showToast}
      onClose={() => setShowToast(false)}
    />
    </>
  );
}

