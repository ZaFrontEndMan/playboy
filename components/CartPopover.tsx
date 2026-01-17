'use client';

import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';

export default function CartPopover() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { theme } = useTheme();

  const total = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className={`fixed inset-0 backdrop-blur-sm z-[60] ${
              theme === 'dark' ? 'bg-black/50' : 'bg-black/30'
            }`}
          />

          {/* Popover */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 bottom-0 h-screen w-full max-w-md border-l border-brand-green/20 z-[70] flex flex-col shadow-2xl ${
              theme === 'dark' ? 'bg-black' : 'bg-white'
            }`}
            style={{ position: 'fixed' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-green/20">
              <h2 className="font-heading text-2xl font-bold uppercase">
                Your <span className="text-brand-green">Cart</span>
              </h2>
              <Button
                onClick={closeCart}
                variant="ghost"
                size="sm"
                className="w-8 h-8 flex items-center justify-center hover:bg-brand-green/10 rounded-full transition-colors !uppercase !tracking-normal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-brand-green/20 mb-4" />
                  <p className={`font-heading text-lg uppercase mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>Your cart is empty</p>
                  <p className={theme === 'dark' ? ' ' : 'text-gray-600'}>
                    Add some items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size || 'default'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 border border-brand-green/20 rounded-lg bg-brand-green/5"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 flex-shrink-0 bg-gradient-to-br from-brand-green/20 to-brand-pink/20 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-sm font-semibold uppercase mb-1 truncate">
                          {item.name}
                        </h3>
                        {item.size && (
                          <p className={`text-xs mb-2 ${
                            theme === 'dark' ? ' ' : 'text-gray-600'
                          }`}>Size: {item.size}</p>
                        )}
                        <p className="text-brand-green font-heading font-bold mb-3">
                          ${item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            variant="ghost"
                            size="sm"
                            className="w-7 h-7 flex items-center justify-center border border-brand-green/40 hover:bg-brand-green/10 rounded transition-colors !uppercase !tracking-normal px-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-heading font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            variant="ghost"
                            size="sm"
                            className="w-7 h-7 flex items-center justify-center border border-brand-green/40 hover:bg-brand-green/10 rounded transition-colors !uppercase !tracking-normal px-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="ghost"
                        size="sm"
                        className="self-start p-1 hover:bg-brand-pink/10 rounded transition-colors !uppercase !tracking-normal"
                      >
                        <X
                          className={`w-4 h-4 ${
                            theme === 'dark' ? ' ' : 'text-gray-600'
                          }`}
                        />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total and CTA */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 border-t border-brand-green/20 backdrop-blur-sm ${
                  theme === 'dark' ? 'bg-black/50' : 'bg-white/50'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-heading text-lg uppercase">Total</span>
                  <span className="font-heading text-2xl font-bold text-brand-green">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Link href="/cart" onClick={closeCart} className="group block">
                  <Button
                    type="button"
                    className="w-full py-4 bg-brand-green text-white font-heading uppercase tracking-wider hover:bg-brand-green/80 transition-all flex items-center justify-center gap-2"
                  >
                    Go to Cart
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}



