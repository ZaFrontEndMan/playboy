"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import CartPopover from "./CartPopover";
import LoadingBar from "./LoadingBar";
import FlickerText from "./FlickerText";
import { useCartStore } from "@/store/cartStore";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCollectionHovered, setIsCollectionHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { openCart, getTotalItems } = useCartStore();
  const cartCount = getTotalItems();
  const collectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get current category from URL
  const currentCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsVisible(y > 80);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <LoadingBar />
      <nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 `}
      >
        {/* Blurred background */}
        <div
          className={`absolute inset-0 backdrop-blur-md transition-opacity duration-500 w-10/12 ${isVisible || isHovered ? "opacity-100" : "opacity-0"
            } ${theme === "dark" ? "bg-black/10" : ""}`}
        />
        <div className="relative max-w-screen-2xl mx-auto ">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <Logo size="md" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              <div
                className="relative"
                onMouseEnter={() => {
                  if (collectionTimeoutRef.current) {
                    clearTimeout(collectionTimeoutRef.current);
                  }
                  setIsCollectionHovered(true);
                }}
                onMouseLeave={() => {
                  collectionTimeoutRef.current = setTimeout(() => {
                    setIsCollectionHovered(false);
                  }, 150);
                }}
              >
                <Link
                  href="/collection"
                  className={`text-sm uppercase tracking-widest transition-all duration-300 relative ${pathname === "/collection"
                      ? "text-brand-green"
                      : "hover:text-brand-green"
                    }`}
                >
                  Collection
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-brand-green transition-all duration-300 ${pathname === "/collection" ? "w-full" : "w-0"
                      }`}
                  />
                </Link>

                {/* Collection Popover */}
                <AnimatePresence>
                  {isCollectionHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full left-0 mt-2 backdrop-blur-xl border border-brand-green/20 shadow-xl z-50 min-w-[200px] ${theme === "dark" ? "bg-black/95" : "bg-white/95"
                        }`}
                      onMouseEnter={() => {
                        if (collectionTimeoutRef.current) {
                          clearTimeout(collectionTimeoutRef.current);
                        }
                        setIsCollectionHovered(true);
                      }}
                      onMouseLeave={() => {
                        setIsCollectionHovered(false);
                      }}
                    >
                      <div className="py-2">
                        <Link
                          href="/collection"
                          className={`block px-6 py-3 text-sm uppercase tracking-widest transition-colors ${currentCategory === "all"
                              ? "bg-brand-green/20 text-brand-green"
                              : "hover:bg-brand-green/10 hover:text-brand-green"
                            }`}
                        >
                          All
                        </Link>
                        <Link
                          href="/collection?category=top"
                          className={`block px-6 py-3 text-sm uppercase tracking-widest transition-colors ${currentCategory === "top"
                              ? "bg-brand-green/20 text-brand-green"
                              : "hover:bg-brand-green/10 hover:text-brand-green"
                            }`}
                        >
                          Top
                        </Link>
                        <Link
                          href="/collection?category=mid"
                          className={`block px-6 py-3 text-sm uppercase tracking-widest transition-colors ${currentCategory === "mid"
                              ? "bg-brand-green/20 text-brand-green"
                              : "hover:bg-brand-green/10 hover:text-brand-green"
                            }`}
                        >
                          Mid
                        </Link>
                        <Link
                          href="/collection?category=bottom"
                          className={`block px-6 py-3 text-sm uppercase tracking-widest transition-colors ${currentCategory === "bottom"
                              ? "bg-brand-green/20 text-brand-green"
                              : "hover:bg-brand-green/10 hover:text-brand-green"
                            }`}
                        >
                          Bottom
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                href="/sale"
                className={`text-sm uppercase tracking-widest transition-all duration-300 relative ${pathname === "/sale"
                    ? "text-brand-green"
                    : "hover:text-brand-green"
                  }`}
              >
                <span className="flex items-center gap-2">
                  Sale
                  <FlickerText className="text-red-500 text-xs">●</FlickerText>
                </span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-green transition-all duration-300 ${pathname === "/sale" ? "w-full" : "w-0"
                    }`}
                />
              </Link>
              <Link
                href="/drops"
                className={`text-sm uppercase tracking-widest transition-all duration-300 relative ${pathname === "/drops"
                    ? "text-brand-green"
                    : "hover:text-brand-green"
                  }`}
              >
                Drops
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-green transition-all duration-300 ${pathname === "/drops" ? "w-full" : "w-0"
                    }`}
                />
              </Link>
              <Link
                href="/new-arrivals"
                className={`text-sm uppercase tracking-widest transition-all duration-300 relative ${pathname === "/new-arrivals"
                    ? "text-brand-green"
                    : "hover:text-brand-green"
                  }`}
              >
                New Arrivals
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-green transition-all duration-300 ${pathname === "/new-arrivals" ? "w-full" : "w-0"
                    }`}
                />
              </Link>
              <Link
                href="/bestsellers"
                className={`text-sm uppercase tracking-widest transition-all duration-300 relative ${pathname === "/bestsellers"
                    ? "text-brand-green"
                    : "hover:text-brand-green"
                  }`}
              >
                Bestsellers
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-green transition-all duration-300 ${pathname === "/bestsellers" ? "w-full" : "w-0"
                    }`}
                />
              </Link>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6 px-8">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="hidden md:flex relative group p-2 rounded-full normal-case tracking-normal hover:bg-brand-green/10"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-brand-green transition-transform group-hover:rotate-180 duration-500" />
                ) : (
                  <Moon className="w-5 h-5 text-brand-green transition-transform group-hover:-rotate-180 duration-500" />
                )}
              </Button>

              <Button
                onClick={openCart}
                variant="ghost"
                size="sm"
                className="hidden md:flex relative group px-0 py-0 normal-case tracking-normal"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-6 h-6 transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-brand-green text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5 font-heading font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Cart Popover */}
        <CartPopover />
      </nav>
    </>
  );
}
