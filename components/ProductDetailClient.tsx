'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { SaleBadge } from '@/components/ui/SaleBadge';
import Toast from '@/components/ui/toast';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addItem } = useCartStore();

  const isOnSale = product.isOnSale === true;
  const displayPrice = isOnSale && product.salePrice ? product.salePrice : product.price;

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;

    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: product.image,
      size: selectedSize,
    }, quantity);

    // Show toast notification
    setShowToast(true);
  };

  const categoryLabels = {
    top: 'TOP',
    mid: 'MID',
    bottom: 'BOTTOM',
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
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-3/4 overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute top-4 left-4 px-3 py-1">
              <span className="text-xs font-heading font-bold uppercase text-brand-pink">
                {categoryLabels[product.category]}
              </span>
            </div>
            {/* Sale Badge */}
            {isOnSale && (
              <div className="absolute top-4 right-4">
                <SaleBadge percentage={product.salePercentage} />
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold uppercase mb-4">
              {product.name}
            </h1>

            {/* Price Display */}
            <div className="mb-6">
              {isOnSale ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-2xl sm:text-3xl font-heading font-bold text-brand-green">
                    ${displayPrice}
                  </span>
                  <span className="text-xl sm:text-2xl font-heading text-gray-500 line-through">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <p className="text-2xl sm:text-3xl font-heading font-bold text-brand-green">
                  ${product.price}
                </p>
              )}
            </div>

            <p className="  text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-5">
                <label className="block font-heading text-xs sm:text-sm uppercase tracking-wider mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      variant="ghost"
                      size="sm"
                      className={`px-4 py-2 text-xs sm:text-sm border-2 font-heading uppercase transition-all rounded-md ${
                        selectedSize === size
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

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <label className="block font-heading text-xs sm:text-sm uppercase tracking-wider mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      variant="ghost"
                      size="sm"
                      className={`px-4 py-2 text-xs sm:text-sm border-2 font-heading uppercase transition-all rounded-md ${
                        selectedColor === color
                          ? 'border-brand-green bg-brand-green text-white'
                          : 'border-brand-green/40 text-brand-green hover:border-brand-green/60'
                      }`}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
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

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              variant="solid"
              size="lg"
              className={`w-full py-3 sm:py-4 text-sm sm:text-base font-heading uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-lg ${
                selectedSize
                  ? 'bg-brand-green text-white hover:bg-brand-green/80'
                  : 'bg-gray-600   cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
    <Toast
      message={`${product.name} added to cart!`}
      isVisible={showToast}
      onClose={() => setShowToast(false)}
    />
    </>
  );
}
