"use client";

import { ShoppingBag, Plus, Minus, X, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const total = getTotalPrice();
  const subtotal = total;
  const shipping = total > 500 ? 0 : 15; // Free shipping over $500
  const finalTotal = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="relative min-h-screen">
        <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-12 min-h-[70vh]">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold uppercase mb-10 sm:mb-12">
              Your <span className="text-brand-green">Cart</span>
            </h1>

            {/* Empty Cart State */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <ShoppingBag className="w-24 h-24 text-brand-green/20 mb-8" />
              <h2 className="font-heading text-3xl font-bold uppercase mb-4">
                Your cart is empty
              </h2>
              <p className="  mb-8">
                Add some items to get started
              </p>
              <Link
                href="/collection"
                className="px-8 py-4 bg-brand-green text-white font-heading uppercase tracking-wider hover:bg-brand-green/80 transition-all"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <section className="pt-32 pb-20 px-6 lg:px-12 min-h-[70vh]">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase mb-12">
            Your <span className="text-brand-green">Cart</span>
          </h1>

          {/* Cart Items */}
          <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size || "default"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 sm:gap-6 border border-brand-green/20 p-4 sm:p-6 bg-brand-green/5 hover:bg-brand-green/10 transition-colors rounded-xl"
              >
                {/* Product Image */}
                <div className="relative w-24 h-32 sm:w-32 sm:h-40 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-lg sm:text-xl font-semibold uppercase mb-1.5 sm:mb-2">
                    {item.name}
                  </h3>
                  {item.size && (
                    <p className="  mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Size: {item.size}
                    </p>
                  )}
                  <p className="text-brand-green font-heading font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                    ${item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1, item.size)
                      }
                      variant="ghost"
                      size="sm"
                      className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-brand-green/40 hover:bg-brand-green/10 flex items-center justify-center transition-colors !uppercase !tracking-normal px-0 text-xs"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-heading font-semibold text-base sm:text-lg w-10 sm:w-12 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1, item.size)
                      }
                      variant="ghost"
                      size="sm"
                      className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-brand-green/40 hover:bg-brand-green/10 flex items-center justify-center transition-colors !uppercase !tracking-normal px-0 text-xs"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <span className="ml-auto text-brand-green font-heading font-bold text-base sm:text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  onClick={() => removeItem(item.id, item.size)}
                  variant="ghost"
                  size="sm"
                  className="self-start p-2 hover:bg-brand-pink/10 rounded transition-colors !uppercase !tracking-normal"
                  aria-label="Remove item"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5  " />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t border-brand-green/20 pt-8">
            <div className="max-w-md ml-auto space-y-4">
              <div className="flex justify-between text-base sm:text-lg">
                <span className="font-heading uppercase">Subtotal</span>
                <span className="font-heading font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base sm:text-lg">
                <span className="font-heading uppercase">Shipping</span>
                <span className="font-heading font-bold">
                  {shipping === 0 ? (
                    <span className="text-brand-green">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              {subtotal < 500 && (
                <p className="text-sm   text-right">
                  Add ${(500 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="flex justify-between text-xl sm:text-2xl border-t border-brand-green/20 pt-4">
                <span className="font-heading font-bold uppercase">Total</span>
                <span className="font-heading font-bold text-brand-green">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-3 sm:gap-4 pt-4 flex-col sm:flex-row">
                <Button
                  onClick={clearCart}
                  variant="ghost"
                  size="md"
                  className="flex-1 py-3 sm:py-4 border-2 border-brand-green/40 text-brand-green font-heading uppercase tracking-wider hover:bg-brand-green/10 transition-all"
                >
                  Clear Cart
                </Button>
                <Button
                  variant="solid"
                  size="md"
                  className="flex-1 py-3 sm:py-4 bg-brand-green text-white font-heading uppercase tracking-wider hover:bg-brand-green/80 transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
